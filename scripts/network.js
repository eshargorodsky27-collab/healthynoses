// Shared between all sites: the sister-site network and vetted outside resources.
// Sister articles are read live from each sister site's RSS feed at build time.
const NETWORK = [
  { name: 'Healthy Noses', url: 'https://healthynoses.com', about: 'dry nose, nosebleeds and everyday nose care' },
  { name: 'NJ Sinus & Allergy', url: 'https://njsinusallergy.com', about: 'New Jersey pollen seasons, allergies and sinus pressure' },
  { name: 'Coastal Sinus', url: 'https://coastalsinus.com', about: 'sinus infections, polyps and sinus procedures at the Jersey Shore' },
];

// Every URL below was checked live. The writer may only pick from this list, so no link is ever invented.
const TRUSTED = [
  { id: 'mlp-hayfever', name: 'MedlinePlus (NIH): Hay fever', url: 'https://medlineplus.gov/hayfever.html' },
  { id: 'mlp-allergy', name: 'MedlinePlus (NIH): Allergy', url: 'https://medlineplus.gov/allergy.html' },
  { id: 'mlp-sinusitis', name: 'MedlinePlus (NIH): Sinusitis', url: 'https://medlineplus.gov/sinusitis.html' },
  { id: 'mlp-nose', name: 'MedlinePlus (NIH): Nose injuries and disorders', url: 'https://medlineplus.gov/noseinjuriesanddisorders.html' },
  { id: 'mlp-nosebleed', name: 'MedlinePlus (NIH): Nosebleed', url: 'https://medlineplus.gov/ency/article/003106.htm' },
  { id: 'mlp-smell', name: 'MedlinePlus (NIH): Taste and smell disorders', url: 'https://medlineplus.gov/tasteandsmelldisorders.html' },
  { id: 'nidcd-smell', name: 'NIDCD (NIH): Smell disorders', url: 'https://www.nidcd.nih.gov/health/smell-disorders' },
  { id: 'ent-sinusitis', name: 'ENT Health (American Academy of Otolaryngology): Sinusitis', url: 'https://www.enthealth.org/conditions/sinusitis/' },
  { id: 'ent-nosebleeds', name: 'ENT Health (American Academy of Otolaryngology): Nosebleeds', url: 'https://www.enthealth.org/conditions/nosebleeds/' },
  { id: 'ent-septum', name: 'ENT Health (American Academy of Otolaryngology): Deviated septum', url: 'https://www.enthealth.org/conditions/deviated-septum/' },
  { id: 'aaaai-sinusitis', name: 'AAAAI: Sinusitis', url: 'https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/sinusitis' },
  { id: 'fda-neti', name: 'FDA: Is rinsing your sinuses with neti pots safe?', url: 'https://www.fda.gov/consumers/consumer-updates/rinsing-your-sinuses-neti-pots-safe' },
  { id: 'epa-mold', name: 'EPA: Mold', url: 'https://www.epa.gov/mold' },
  { id: 'cdc-sinus', name: 'CDC: Sinus infection basics', url: 'https://www.cdc.gov/sinus-infection/about/index.html' },
  { id: 'cdc-mold', name: 'CDC: Mold', url: 'https://www.cdc.gov/mold-health/about/index.html' },
];

const sisters = (selfUrl) => NETWORK.filter((s) => s.url !== selfUrl);

function parseRss(xml, site) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
    const get = (t) => ((m[1].match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)) || [])[1] || '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').trim();
    return { site: site.name, siteUrl: site.url, title: get('title'), url: get('link'), description: get('description') };
  }).filter((a) => a.title && a.url.startsWith(site.url));
}

// Latest articles from the sister sites. Never fails the build: a site that is down or not live yet is skipped.
async function sisterArticles(selfUrl, perSite = 15) {
  const out = [];
  for (const s of sisters(selfUrl)) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const r = await fetch(`${s.url}/rss.xml`, { signal: ctrl.signal });
      clearTimeout(t);
      if (r.ok) out.push(...parseRss(await r.text(), s).slice(0, perSite));
    } catch { /* skip */ }
  }
  return out;
}

// Pick the sister articles most related to a post by shared words.
const STOP = new Set('the and for with your you how what why when does from that this are can into its out about after more less than have has not but all one two get use'.split(' '));
const words = (s) => new Set(String(s).toLowerCase().match(/[a-z]{3,}/g)?.filter((w) => !STOP.has(w)) || []);
function related(post, pool, n = 2) {
  const mine = words([post.title, post.description, ...(post.keywords || [])].join(' '));
  const scored = pool.map((a) => {
    let score = 0;
    for (const w of words(`${a.title} ${a.description}`)) if (mine.has(w)) score++;
    return { a, score };
  }).sort((x, y) => y.score - x.score);
  const picked = [];
  for (const { a } of scored) {
    if (picked.length >= n) break;
    if (!picked.some((p) => p.site === a.site)) picked.push(a); // one per sister site
  }
  return picked;
}

module.exports = { NETWORK, TRUSTED, sisters, sisterArticles, related };
