// Static site builder: posts/*.md -> dist/
// Produces pages plus everything search engines and AI assistants read:
// JSON-LD (Article, FAQPage, BreadcrumbList), sitemap.xml, rss.xml, robots.txt, llms.txt, llms-full.txt.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const cfg = require('./site.config');

let sharp = null;
try { sharp = require('sharp'); } catch { /* optional: PNG social images */ }

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(ROOT, 'posts');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const iso = (d) => new Date(d + 'T12:00:00Z').toISOString();
const write = (rel, content) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
const utm = (url, slug, spot) => {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'healthynoses');
  u.searchParams.set('utm_medium', 'blog');
  u.searchParams.set('utm_campaign', slug || 'site');
  u.searchParams.set('utm_content', spot);
  return u.toString();
};

// ---------- posts ----------
function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
      const updated = data.updated ? (data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated)) : date;
      const slug = data.slug || f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      const words = content.split(/\s+/).length;
      return { ...data, date, updated, slug, body: content, minutes: Math.max(2, Math.round(words / 230)) };
    })
    .filter((p) => !p.draft && p.date <= new Date().toISOString().slice(0, 10))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ---------- generated cover art: airflow lines, unique per slug ----------
function hash(str) {
  let h = 2166136261;
  for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; };
}
function coverSvg(slug, category) {
  const rnd = hash(slug);
  const accent = (cfg.categories[category] || cfg.categories['nose-care']).color;
  const W = 1200, H = 630;
  const lines = [];
  const n = 14 + Math.floor(rnd() * 8);
  const amp = 30 + rnd() * 70, freq = 0.004 + rnd() * 0.006, phase = rnd() * 6;
  for (let i = 0; i < n; i++) {
    const y0 = 70 + (i / n) * (H - 140);
    let d = `M -20 ${y0.toFixed(1)}`;
    for (let x = 0; x <= W + 40; x += 40) {
      const pinch = Math.exp(-Math.pow((x - W * (0.45 + rnd() * 0.02)) / 260, 2)); // narrows like a nasal valve
      const y = y0 + Math.sin(x * freq + phase + i * 0.35) * amp * (1 - pinch * 0.7) + (H / 2 - y0) * pinch * 0.55;
      d += ` L ${x} ${y.toFixed(1)}`;
    }
    const strong = i % 4 === 0;
    lines.push(`<path d="${d}" fill="none" stroke="${strong ? accent : '#12302E'}" stroke-opacity="${strong ? 0.9 : 0.18}" stroke-width="${strong ? 3 : 1.6}" stroke-linecap="round"/>`);
  }
  const dots = Array.from({ length: 26 }, () => `<circle cx="${(rnd() * W).toFixed(0)}" cy="${(rnd() * H).toFixed(0)}" r="${(1.5 + rnd() * 4).toFixed(1)}" fill="${accent}" fill-opacity="${(0.15 + rnd() * 0.4).toFixed(2)}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#E3EEEC"/>${lines.join('')}${dots}</svg>`;
}

async function imagesFor(post) {
  // Returns { src, og, alt, credit }
  if (post.image) {
    const src = post.image.startsWith('http') ? post.image : '/' + post.image.replace(/^\/?(public\/)?/, '');
    return { src, og: src.startsWith('http') ? src : cfg.url + src, alt: post.imageAlt || post.title, credit: post.imageCredit, creditUrl: post.imageCreditUrl };
  }
  const svg = coverSvg(post.slug, post.category);
  write(`covers/${post.slug}.svg`, svg);
  let og = `${cfg.url}/covers/${post.slug}.svg`;
  if (sharp) {
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    write(`covers/${post.slug}.png`, png);
    og = `${cfg.url}/covers/${post.slug}.png`;
  }
  return { src: `/covers/${post.slug}.svg`, og, alt: '', credit: null };
}

// ---------- layout ----------
const FONTS = 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Schibsted+Grotesk:wght@500;700;800&display=swap';

function layout({ title, description, canonical, og, ogType = 'website', jsonld = [], body, extraHead = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta property="og:site_name" content="${esc(cfg.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="${ogType}">
${og ? `<meta property="og:image" content="${og}"><meta name="twitter:image" content="${og}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#EEF4F3">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="${esc(cfg.name)}" href="/rss.xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/style.css">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
${extraHead}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <a class="brand" href="/"><svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 26c6-2 9-7 9-14M32 26c-6-2-9-7-9-14M6 30c8 4 20 4 28 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><span>Healthy Noses</span></a>
  <nav aria-label="Sections">
    ${Object.entries(cfg.categories).map(([k, c]) => `<a href="/topics/${k}/">${c.label}</a>`).join('')}
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="footer-inner">
    <p class="footer-brand">Healthy Noses</p>
    <p>${esc(cfg.disclosure)}</p>
    <p><a href="/about/">About &amp; editorial policy</a> <a href="/rss.xml">RSS feed</a> <a href="${utm(cfg.product.url, 'footer', 'footer')}">Narisure</a></p>
    <p class="fine">© ${new Date().getFullYear()} ${esc(cfg.publisher)}</p>
  </div>
</footer>
</body>
</html>`;
}

function productBox(slug, spot, compact = false) {
  const p = cfg.product;
  return `<aside class="product${compact ? ' product--compact' : ''}" aria-label="Sponsor">
  <img src="${p.image}" alt="Two bottles of Narisure Dry Nose Relief" loading="lazy" width="320" height="200">
  <div>
    <p class="product-kicker">Our sponsor</p>
    <h2 class="product-name">${esc(p.name)}</h2>
    <p>${esc(p.pitch)}</p>
    <p class="product-actions"><a class="btn" href="${utm(p.shopUrl, slug, spot)}">Shop Narisure</a><a class="btn btn--ghost" href="${p.amazonUrl}" rel="sponsored">Buy on Amazon</a></p>
  </div>
</aside>`;
}

function postRow(p, img) {
  const cat = cfg.categories[p.category] || cfg.categories['nose-care'];
  return `<article class="row">
  <a class="row-media" href="/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${img.src}" alt="" loading="lazy" width="600" height="315"></a>
  <div class="row-text">
    <p class="meta"><a class="cat" style="--c:${cat.color}" href="/topics/${p.category}/">${cat.label}</a><time datetime="${p.date}">${fmtDate(p.date)}</time></p>
    <h2><a href="/${p.slug}/">${esc(p.title)}</a></h2>
    <p class="dek">${esc(p.description)}</p>
  </div>
</article>`;
}

const orgLd = { '@type': 'Organization', name: cfg.publisher, url: cfg.url };

// ---------- build ----------
async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  // static files
  const pub = path.join(ROOT, 'public');
  if (fs.existsSync(pub)) fs.cpSync(pub, OUT, { recursive: true });

  const posts = loadPosts();
  const imgs = {};
  for (const p of posts) imgs[p.slug] = await imagesFor(p);

  // post pages
  for (const [i, p] of posts.entries()) {
    const url = `${cfg.url}/${p.slug}/`;
    const cat = cfg.categories[p.category] || cfg.categories['nose-care'];
    const img = imgs[p.slug];
    const related = posts.filter((q) => q.slug !== p.slug && q.category === p.category).slice(0, 3)
      .concat(posts.filter((q) => q.slug !== p.slug && q.category !== p.category)).slice(0, 3);
    const html = marked.parse(p.body);
    const takeaways = (p.takeaways || []).length
      ? `<section class="takeaways" aria-label="Key takeaways"><h2>The short version</h2><ul>${p.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>` : '';
    const faq = (p.faq || []).length
      ? `<section class="faq"><h2>Common questions</h2>${p.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>` : '';
    const sources = (p.sources || []).length
      ? `<section class="sources"><h2>Sources</h2><ol>${p.sources.map((s) => `<li><a href="${esc(s.url)}" rel="nofollow noopener">${esc(s.title)}</a>${s.publisher ? `. <span>${esc(s.publisher)}${s.year ? `, ${esc(s.year)}` : ''}</span>` : ''}</li>`).join('')}</ol></section>` : '';
    const jsonld = [
      {
        '@context': 'https://schema.org', '@type': p.category === 'research' ? 'ScholarlyArticle' : 'MedicalWebPage',
        headline: p.title, description: p.description, image: [img.og], datePublished: iso(p.date), dateModified: iso(p.updated),
        mainEntityOfPage: url, inLanguage: cfg.language, keywords: (p.keywords || []).join(', '),
        author: orgLd, publisher: orgLd, about: p.keywords?.[0],
        citation: (p.sources || []).map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })),
      },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: cfg.name, item: cfg.url + '/' },
        { '@type': 'ListItem', position: 2, name: cat.label, item: `${cfg.url}/topics/${p.category}/` },
        { '@type': 'ListItem', position: 3, name: p.title, item: url } ] },
    ];
    if ((p.faq || []).length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });

    const body = `<article class="post">
  <header class="post-head">
    <p class="meta"><a class="cat" style="--c:${cat.color}" href="/topics/${p.category}/">${cat.label}</a><time datetime="${p.date}">${fmtDate(p.date)}</time><span>${p.minutes} min read</span></p>
    <h1>${esc(p.title)}</h1>
    <p class="lede">${esc(p.description)}</p>
  </header>
  <figure class="post-figure"><img src="${img.src}" alt="${esc(img.alt)}" width="1200" height="630" fetchpriority="high">${img.credit ? `<figcaption>Photo: ${img.creditUrl ? `<a href="${esc(img.creditUrl)}" rel="nofollow noopener">${esc(img.credit)}</a>` : esc(img.credit)}</figcaption>` : ''}</figure>
  <div class="post-body">
    ${takeaways}
    <div class="prose">${html}</div>
    ${p.type === 'product' ? productBox(p.slug, 'post-end') : productBox(p.slug, 'post-end', true)}
    ${faq}
    ${sources}
    <p class="disclosure">${esc(cfg.disclosure)} Last updated ${fmtDate(p.updated)}.</p>
  </div>
</article>
${related.length ? `<section class="more" aria-label="More articles"><h2>Keep reading</h2>${related.map((q) => postRow(q, imgs[q.slug])).join('')}</section>` : ''}`;

    write(`${p.slug}/index.html`, layout({ title: `${p.title} | ${cfg.name}`, description: p.description, canonical: url, og: img.og, ogType: 'article', jsonld, body,
      extraHead: `<meta property="article:published_time" content="${iso(p.date)}"><meta property="article:modified_time" content="${iso(p.updated)}">` }));
  }

  // home
  const [lead, ...rest] = posts;
  const home = `<section class="hero">
  <div class="hero-text">
    <h1>Breathe easier, understand more.</h1>
    <p>${esc(cfg.tagline)} Every article links to the studies behind it.</p>
  </div>
  <svg class="hero-air" viewBox="0 0 600 360" aria-hidden="true">${Array.from({ length: 11 }, (_, i) => {
      const y = 40 + i * 28; const pull = (180 - y) * 0.5;
      return `<path d="M0 ${y} C 160 ${y}, 220 ${y + pull}, 300 ${y + pull} S 440 ${y}, 600 ${y}" fill="none" stroke="${i % 3 === 0 ? '#1FA5A0' : i === 7 ? '#C7607D' : '#12302E'}" stroke-opacity="${i % 3 === 0 || i === 7 ? 0.95 : 0.2}" stroke-width="${i % 3 === 0 || i === 7 ? 3 : 1.5}" stroke-linecap="round" style="--d:${i * 90}ms"/>`;
    }).join('')}</svg>
</section>
<section class="topics" aria-label="Browse by topic">
  ${Object.entries(cfg.categories).map(([k, c]) => `<a class="topic-tile" href="/topics/${k}/" style="--c:${c.color}">
    <img src="${c.image}" alt="" loading="lazy" width="800" height="1000">
    <span class="topic-tile-label">${c.label}</span>
    <span class="topic-tile-blurb">${esc(c.blurb)}</span>
  </a>`).join('')}
</section>
${lead ? `<section class="lead" aria-label="Latest article">
  <a class="lead-media" href="/${lead.slug}/" tabindex="-1" aria-hidden="true"><img src="${imgs[lead.slug].src}" alt="" width="1200" height="630"></a>
  <div class="lead-text">
    <p class="meta"><a class="cat" style="--c:${(cfg.categories[lead.category] || {}).color}" href="/topics/${lead.category}/">${(cfg.categories[lead.category] || {}).label}</a><time datetime="${lead.date}">${fmtDate(lead.date)}</time></p>
    <h2><a href="/${lead.slug}/">${esc(lead.title)}</a></h2>
    <p class="dek">${esc(lead.description)}</p>
  </div>
</section>` : '<p class="empty">The first article publishes soon.</p>'}
<div class="home-grid">
  <section class="list" aria-label="Recent articles">${rest.map((p) => postRow(p, imgs[p.slug])).join('')}</section>
  <div class="rail">${productBox('home', 'home-rail', true)}</div>
</div>`;
  write('index.html', layout({ title: `${cfg.name}: dry nose, nosebleeds and sinus health explained`, description: cfg.description, canonical: cfg.url + '/', og: lead ? imgs[lead.slug].og : null,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: cfg.name, url: cfg.url, description: cfg.description, publisher: orgLd }], body: home }));

  // topic pages
  for (const [k, c] of Object.entries(cfg.categories)) {
    const list = posts.filter((p) => p.category === k);
    write(`topics/${k}/index.html`, layout({ title: `${c.label} | ${cfg.name}`, description: `${c.label} articles from ${cfg.name}.`, canonical: `${cfg.url}/topics/${k}/`,
      body: `<header class="topic-head topic-head--photo" style="--c:${c.color}"><div><h1>${c.label}</h1><p class="topic-blurb">${esc(c.blurb)}</p><p>${list.length} article${list.length === 1 ? '' : 's'}</p></div><img src="${c.image}" alt="" width="800" height="1000"></header><section class="list list--wide">${list.length ? list.map((p) => postRow(p, imgs[p.slug])).join('') : '<p class="empty">Nothing here yet. New articles publish every other day.</p>'}</section>` }));
  }

  // about
  write('about/index.html', layout({ title: `About ${cfg.name}`, description: `Who publishes ${cfg.name} and how articles are made.`, canonical: `${cfg.url}/about/`, body: `<article class="post"><header class="post-head"><h1>About Healthy Noses</h1></header><div class="post-body prose">
<p>Healthy Noses is a plain-language library about the nose: dry nasal passages, nosebleeds, sinuses, allergies, smell, and the air we breathe at home.</p>
<h2>Our sponsor</h2><p>Healthy Noses is sponsored by <a href="${utm(cfg.product.url, 'about', 'about')}">Narisure</a>, a nasal moisturizing oil created by Johns Hopkins–trained sinus specialists. Articles that discuss nasal dryness may mention Narisure, and product boxes are always labeled.</p>
<h2>How articles are made</h2><p>New articles are drafted with AI assistance from peer-reviewed studies indexed in PubMed and from public-health agencies. Each article lists its sources so you can read them yourself. We do not describe any product as a cure or treatment for disease.</p>
<h2>Not medical advice</h2><p>Nothing here replaces a visit to a clinician. Get care promptly for a nosebleed that will not stop after 20 minutes of firm pressure, bleeding after an injury, a sudden loss of smell, or symptoms on only one side that keep getting worse.</p>
</div></article>` }));

  // 404
  write('404.html', layout({ title: `Page not found | ${cfg.name}`, description: 'Page not found', canonical: cfg.url + '/', body: '<section class="topic-head"><h1>That page isn’t here.</h1><p><a href="/">Go to the latest articles</a></p></section>' }));

  // sitemap
  const urls = [{ loc: cfg.url + '/', mod: posts[0]?.updated }, { loc: cfg.url + '/about/' },
    ...Object.keys(cfg.categories).map((k) => ({ loc: `${cfg.url}/topics/${k}/` })),
    ...posts.map((p) => ({ loc: `${cfg.url}/${p.slug}/`, mod: p.updated }))];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${u.loc}</loc>${u.mod ? `<lastmod>${u.mod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`);

  // rss
  write('rss.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(cfg.name)}</title><link>${cfg.url}/</link><description>${esc(cfg.description)}</description><language>en-us</language><atom:link href="${cfg.url}/rss.xml" rel="self" type="application/rss+xml"/>\n${posts.slice(0, 30).map((p) => `<item><title>${esc(p.title)}</title><link>${cfg.url}/${p.slug}/</link><guid>${cfg.url}/${p.slug}/</guid><pubDate>${new Date(iso(p.date)).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('\n')}\n</channel></rss>`);

  // robots: welcome search engines and AI crawlers explicitly
  const bots = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'meta-externalagent', 'CCBot'];
  write('robots.txt', `${bots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}\n\nUser-agent: *\nAllow: /\n\nSitemap: ${cfg.url}/sitemap.xml\n`);

  // llms.txt (index for AI assistants) and llms-full.txt (full text)
  write('llms.txt', `# ${cfg.name}\n\n> ${cfg.description}\n\n${cfg.disclosure}\n\nProduct: [${cfg.product.name}](${cfg.product.url}): ${cfg.product.pitch}\n\n${Object.entries(cfg.categories).map(([k, c]) => {
    const list = posts.filter((p) => p.category === k);
    return list.length ? `## ${c.label}\n\n${list.map((p) => `- [${p.title}](${cfg.url}/${p.slug}/): ${p.description}`).join('\n')}\n` : '';
  }).join('\n')}\n## Optional\n\n- [Full text of all articles](${cfg.url}/llms-full.txt)\n- [About and editorial policy](${cfg.url}/about/)\n`);
  write('llms-full.txt', posts.map((p) => `# ${p.title}\n\nURL: ${cfg.url}/${p.slug}/\nPublished: ${p.date}\n\n${p.description}\n\n${(p.takeaways || []).map((t) => `- ${t}`).join('\n')}\n\n${p.body}\n\nSources:\n${(p.sources || []).map((s) => `- ${s.title}: ${s.url}`).join('\n')}`).join('\n\n---\n\n'));

  write(`${cfg.indexNowKey}.txt`, cfg.indexNowKey);
  write('CNAME', cfg.domain);
  write('.nojekyll', '');
  console.log(`Built ${posts.length} posts into dist/`);
}

build().catch((e) => { console.error(e); process.exit(1); });
