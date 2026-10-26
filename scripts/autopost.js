#!/usr/bin/env node
// Writes one new article into posts/ using:
//   1. the topic rotation in scripts/topics.js
//   2. real studies pulled from PubMed for that topic
//   3. Claude (Anthropic API) to write the article from those studies
//   4. a free photo from Pexels or Unsplash (falls back to generated cover art)
// Then a claims check rejects risky medical wording before anything is saved.
//
// Env: ANTHROPIC_API_KEY (required), ANTHROPIC_MODEL (optional),
//      PEXELS_API_KEY or UNSPLASH_ACCESS_KEY (optional), DRY_RUN=1 to print without saving.
const fs = require('fs');
const path = require('path');
const cfg = require('../site.config');
const bank = require('./topics');

const ROOT = path.join(__dirname, '..');
const POSTS = path.join(ROOT, 'posts');
const STATE_FILE = path.join(ROOT, 'data', 'state.json');
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

const log = (...a) => console.log('[autopost]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return { slot: 0, usedTopics: [], usedPhotos: [] }; }
}
function saveState(s) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2) + '\n');
}
function existingPosts() {
  return fs.readdirSync(POSTS).filter((f) => f.endsWith('.md')).map((f) => {
    const raw = fs.readFileSync(path.join(POSTS, f), 'utf8');
    const title = (raw.match(/^title:\s*"?(.+?)"?\s*$/m) || [])[1] || '';
    return { file: f, slug: f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''), title };
  });
}

// ---------- PubMed ----------
async function pubmed(term, max = 5) {
  const q = encodeURIComponent(`${term} AND hasabstract AND english[lang]`);
  const s = await (await fetch(`${EUTILS}/esearch.fcgi?db=pubmed&term=${q}&retmax=${max}&sort=relevance&datetype=pdat&mindate=2010&maxdate=3000&retmode=json`)).json();
  const ids = s.esearchresult?.idlist || [];
  if (!ids.length) return [];
  await sleep(400);
  const sum = await (await fetch(`${EUTILS}/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`)).json();
  await sleep(400);
  const abs = await (await fetch(`${EUTILS}/efetch.fcgi?db=pubmed&id=${ids.join(',')}&rettype=abstract&retmode=text`)).text();
  const chunks = abs.split(/\n\n\d+\. /); // one per article, in order
  return ids.map((id, i) => {
    const d = sum.result[id];
    return {
      pmid: id,
      title: d.title.replace(/\.$/, ''),
      journal: (d.fulljournalname || d.source).split(' : ')[0].split(' = ')[0].replace(/^./, (c) => c.toUpperCase()),
      year: (d.pubdate || '').slice(0, 4),
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      abstract: (chunks[i] || '').slice(0, 3500),
    };
  });
}

// ---------- Claude ----------
async function claude(system, user) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 8000, system, messages: [{ role: 'user', content: user }] }),
    });
    if (res.ok) {
      const j = await res.json();
      return j.content.filter((c) => c.type === 'text').map((c) => c.text).join('');
    }
    const err = await res.text();
    if (res.status >= 500 || res.status === 429) { log(`API ${res.status}, retrying`); await sleep(5000 * attempt); continue; }
    throw new Error(`Anthropic API ${res.status}: ${err}`);
  }
  throw new Error('Anthropic API failed after retries');
}

function parseJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('No JSON in model output');
  return JSON.parse(text.slice(start, end + 1));
}

const SYSTEM = `You write for Healthy Noses (${cfg.url}), a plain-language health library about the nose only: nasal dryness, nosebleeds, sinuses, nasal allergies, smell, nasal breathing and indoor air. Never write about ears, hearing, throat or other body parts except where they directly affect the nose. It is published by the maker of Narisure, a nasal moisturizing oil (${cfg.product.pitch}).

Your articles must be accurate, specific and genuinely useful, the kind a reader bookmarks and an AI assistant would quote. Write for a smart 14-year-old: short sentences, concrete numbers, no fluff.

Hard rules:
- Use ONLY the studies provided for any research claim. Describe them accurately: design, size, population, main result, limits. Never invent studies, numbers, quotes, doctors or statistics.
- General well-established guidance (e.g. how to stop a nosebleed, when to see a doctor) is fine without a citation.
- Never say any product cures, treats, heals, prevents or eliminates a disease or condition. Never say "clinically proven", "FDA approved", "guaranteed" or "miracle". Narisure may only be described as a nasal moisturizer that soothes and moisturizes dry nasal passages.
- Do not mention Narisure in the article body unless the brief says you may; the site adds a clearly labeled product box automatically.
- Include a clear "when to see a doctor" section when symptoms are discussed.
- No first person, no "in this article", no "let's dive in", no emojis.
- Structure for search and AI answers: question-style H2 headings people actually search, a direct 1-2 sentence answer right under each heading, then detail. Use a markdown table where comparing things.

Return ONLY a JSON object, no prose before or after.`;

function userPrompt(slotType, item, studies, existingTitles) {
  const mention = slotType === 'nose'
    ? 'You may mention Narisure by name at most once in the body, only where an oil-based nasal moisturizer is genuinely relevant, and only with the allowed wording.'
    : 'Do not mention Narisure in the body.';
  const kind = slotType === 'research'
    ? 'This is a RESEARCH DIGEST: center it on 1-3 of the studies below, explain how each was done and what it found, then what it means for readers and what it cannot tell us.'
    : 'This is a practical GUIDE: answer the questions people really have, grounded in the studies below where relevant.';
  return `Topic: ${item.topic}
${kind}
${mention}
Avoid duplicating these existing articles: ${existingTitles.join(' | ') || '(none)'}

Studies (cite only these, by pmid):
${studies.map((s) => `--- pmid ${s.pmid} | ${s.title} | ${s.journal} ${s.year}\n${s.abstract}`).join('\n')}

Return JSON with exactly these keys:
{
  "title": "Specific, search-friendly title, max 70 characters",
  "slug": "lowercase-hyphenated-url-slug, max 7 words",
  "description": "Meta description, 140-160 characters, states the answer",
  "keywords": ["5-7 real search phrases"],
  "takeaways": ["3-4 one-sentence key points with concrete facts"],
  "body": "Markdown article, 900-1400 words, starts with a 2-3 sentence intro paragraph (no H1), uses ## and ### headings",
  "faq": [{"q": "Real question people search", "a": "40-70 word direct answer"}],
  "pmids_cited": ["pmids you actually relied on"],
  "image_query": "2-4 word stock photo search for the cover (people, home, nature; no medical gore, no text, no brand logos)",
  "image_query_2": "a different 2-4 word stock photo search for a photo inside the article",
  "image_caption_2": "one-sentence caption for that second photo that ties it to the article",
  "image_alt": "Describe the kind of photo for alt text"
}
Give 3-4 FAQ items.`;
}

// ---------- claims check ----------
const BANNED = [/\bcures?\b/i, /\bcured\b/i, /\bclinically proven\b/i, /\bfda[- ]approved\b/i, /\bguarantee[sd]?\b/i, /\bmiracle\b/i, /\bin this article\b/i, /\blet'?s dive\b/i];
function claimsProblems(a, slotType) {
  const text = [a.title, a.description, a.body, ...(a.takeaways || []), ...(a.faq || []).flatMap((f) => [f.q, f.a])].join('\n');
  const probs = BANNED.filter((r) => r.test(text)).map((r) => `banned wording ${r}`);
  const mentions = (a.body.match(/narisure/gi) || []).length;
  if (mentions > (slotType === 'nose' ? 1 : 0)) probs.push(`Narisure mentioned ${mentions} times in body`);
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if (/narisure/i.test(sentence) && /\b(treat|treats|heal|heals|prevent|prevents|stops?|eliminat\w*)\b/i.test(sentence)) probs.push(`medical claim about Narisure: "${sentence.slice(0, 120)}"`);
  }
  if (a.body.split(/\s+/).length < 600) probs.push('article too short');
  if (/\b(hearing|earbuds?|headphones|tinnitus|earwax|decibels?|ear canal|eardrum)\b/i.test(text)) probs.push('off-topic: this site is about noses only, remove ear and hearing content');
  return probs;
}

// ---------- images ----------
async function findPhoto(query, used) {
  if (process.env.PEXELS_API_KEY) {
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`, { headers: { Authorization: process.env.PEXELS_API_KEY } });
    if (r.ok) {
      const photo = (await r.json()).photos?.find((p) => !used.includes(`pexels:${p.id}`));
      if (photo) return { id: `pexels:${photo.id}`, download: photo.src.landscape, credit: `${photo.photographer} on Pexels`, creditUrl: photo.url };
    } else log('Pexels error', r.status);
  }
  if (process.env.UNSPLASH_ACCESS_KEY) {
    const h = { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` };
    const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&content_filter=high`, { headers: h });
    if (r.ok) {
      const photo = (await r.json()).results?.find((p) => !used.includes(`unsplash:${p.id}`));
      if (photo) {
        fetch(photo.links.download_location, { headers: h }).catch(() => {}); // required by Unsplash API terms
        return { id: `unsplash:${photo.id}`, download: `${photo.urls.raw}&w=1200&h=630&fit=crop&fm=jpg&q=80`, credit: `${photo.user.name} on Unsplash`, creditUrl: `${photo.links.html}?utm_source=healthynoses&utm_medium=referral` };
      }
    } else log('Unsplash error', r.status);
  }
  return null;
}

const yq = (s) => JSON.stringify(String(s));

// ---------- main ----------
async function main() {
  const state = loadState();
  const slotType = bank.rotation[state.slot % bank.rotation.length];
  const posts = existingPosts();
  const titles = posts.map((p) => p.title);

  let item = bank[slotType].find((t) => !state.usedTopics.includes(t.topic));
  if (!item) {
    log(`Topic bank "${slotType}" used up, asking the writer for a fresh topic`);
    const fresh = parseJson(await claude('You plan articles for a nose-only health site (nasal dryness, nosebleeds, sinuses, nasal allergies, smell, nasal breathing). Never propose ear, hearing or throat topics. Return only JSON.',
      `Existing titles: ${titles.join(' | ')}\nUsed topics: ${state.usedTopics.join(' | ')}\nPropose ONE new ${slotType === 'nose' ? 'nasal dryness / nose care' : slotType === 'research' ? 'research digest on nose, sinus, smell or nasal breathing science' : 'sinus, nasal allergy, smell or nasal breathing during sleep'} topic people actively search for, not overlapping the above. JSON: {"topic": "...", "pubmed": "3-5 word PubMed search", "category": one of ${JSON.stringify(Object.keys(cfg.categories))}}`));
    item = fresh;
  }
  log(`Slot "${slotType}", topic: ${item.topic}`);

  let studies = await pubmed(item.pubmed, 5);
  if (studies.length < 2) studies = studies.concat(await pubmed(item.pubmed.split(' ').slice(0, 2).join(' '), 4));
  log(`Found ${studies.length} PubMed studies`);

  let article, problems = [];
  const prompt = userPrompt(slotType, item, studies, titles);
  for (let attempt = 1; attempt <= 3; attempt++) {
    const extra = problems.length ? `\n\nYour previous draft was rejected for: ${problems.join('; ')}. Fix every issue.` : '';
    try { article = parseJson(await claude(SYSTEM, prompt + extra)); } catch (e) { problems = [String(e.message)]; continue; }
    problems = claimsProblems(article, slotType);
    if (!problems.length) break;
    log(`Draft ${attempt} rejected:`, problems.join('; '));
  }
  if (problems.length) throw new Error(`Could not produce a compliant article: ${problems.join('; ')}`);

  const date = today();
  let slug = String(article.slug || article.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
  if (posts.some((p) => p.slug === slug)) slug += `-${date.slice(0, 7)}`;

  const cited = studies.filter((s) => (article.pmids_cited || []).map(String).includes(s.pmid));
  const sources = (cited.length ? cited : studies.slice(0, 3)).map((s) => ({ title: s.title, url: s.url, publisher: s.journal, year: s.year }));

  // photo
  let imageLines = '';
  const photo = await findPhoto(article.image_query || item.topic, state.usedPhotos || []).catch((e) => { log('photo lookup failed', e.message); return null; });
  if (photo && !process.env.DRY_RUN) {
    const buf = Buffer.from(await (await fetch(photo.download)).arrayBuffer());
    const file = `images/${slug}.jpg`;
    fs.mkdirSync(path.join(ROOT, 'public', 'images'), { recursive: true });
    fs.writeFileSync(path.join(ROOT, 'public', file), buf);
    imageLines = `image: ${yq('/' + file)}\nimageAlt: ${yq(article.image_alt || article.title)}\nimageCredit: ${yq(photo.credit)}\nimageCreditUrl: ${yq(photo.creditUrl)}\n`;
    state.usedPhotos = [...(state.usedPhotos || []), photo.id];
    log('Photo:', photo.credit);
    // second photo, placed inside the article before the third section
    const photo2 = await findPhoto(article.image_query_2 || item.topic, state.usedPhotos).catch(() => null);
    if (photo2) {
      const buf2 = Buffer.from(await (await fetch(photo2.download)).arrayBuffer());
      fs.writeFileSync(path.join(ROOT, 'public', 'images', `${slug}-2.jpg`), buf2);
      state.usedPhotos.push(photo2.id);
      const figure = `\n<figure><img src="/images/${slug}-2.jpg" alt="${String(article.image_query_2 || '').replace(/"/g, '')}" loading="lazy"><figcaption>${String(article.image_caption_2 || '').replace(/</g, '')} <span class="credit">Photo: <a href="${photo2.creditUrl}" rel="nofollow noopener">${photo2.credit}</a></span></figcaption></figure>\n\n`;
      const heads = [...article.body.matchAll(/^## /gm)];
      const at = heads[2] ? heads[2].index : heads[1] ? heads[1].index : -1;
      if (at > 0) article.body = article.body.slice(0, at) + figure + article.body.slice(at);
      log('Second photo:', photo2.credit);
    }
  } else log('No photo API key or match; the build will generate cover art');

  const category = cfg.categories[item.category] ? item.category : (slotType === 'research' ? 'research' : 'nose-care');
  const md = `---
title: ${yq(article.title)}
description: ${yq(article.description)}
date: ${date}
category: ${category}
type: ${slotType === 'nose' ? 'product' : slotType === 'research' ? 'research' : 'general'}
keywords: ${JSON.stringify(article.keywords || [])}
${imageLines}takeaways:
${(article.takeaways || []).map((t) => `  - ${yq(t)}`).join('\n')}
faq:
${(article.faq || []).map((f) => `  - q: ${yq(f.q)}\n    a: ${yq(f.a)}`).join('\n')}
sources:
${sources.map((s) => `  - title: ${yq(s.title)}\n    url: ${yq(s.url)}\n    publisher: ${yq(s.publisher)}\n    year: ${yq(s.year)}`).join('\n')}
---

${article.body.trim()}
`;

  if (process.env.DRY_RUN) { console.log(md); return; }
  const file = path.join(POSTS, `${date}-${slug}.md`);
  fs.writeFileSync(file, md);
  state.slot = (state.slot + 1) % bank.rotation.length;
  state.usedTopics.push(item.topic);
  state.lastPost = { date, slug, topic: item.topic };
  saveState(state);
  fs.writeFileSync(path.join(ROOT, 'data', 'last-url.txt'), `${cfg.url}/${slug}/\n`);
  log(`Saved posts/${date}-${slug}.md`);
}

main().catch((e) => { console.error('[autopost] FAILED:', e.message); process.exit(1); });
