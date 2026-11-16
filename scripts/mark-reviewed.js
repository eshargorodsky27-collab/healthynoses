// Marks an article as medically reviewed by the editor, or lists articles still waiting for review.
// Usage: SITE=healthynoses|njsinusallergy|coastalsinus SLUG=<article-slug or URL> [DATE=YYYY-MM-DD] node scripts/mark-reviewed.js
const fs = require('fs');
const path = require('path');

const SITES = { healthynoses: 'posts', njsinusallergy: 'sites/njsinusallergy/posts', coastalsinus: 'sites/coastalsinus/posts' };
const DOMAIN = { healthynoses: 'healthynoses.com', njsinusallergy: 'njsinusallergy.com', coastalsinus: 'coastalsinus.com' };
const site = (process.env.SITE || '').trim();
const slug = (process.env.SLUG || '').trim().replace(/^https?:\/\/[^/]+/, '').replace(/^\/|\/$/g, '');
const date = (process.env.DATE || '').trim() || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
const summary = process.env.GITHUB_STEP_SUMMARY;
const out = (s) => { console.log(s); if (summary) fs.appendFileSync(summary, s + '\n'); };

const files = (s) => fs.existsSync(SITES[s]) ? fs.readdirSync(SITES[s]).filter((f) => f.endsWith('.md')).map((f) => path.join(SITES[s], f)) : [];
const slugOf = (file, txt) => ((txt.match(/^slug:\s*["']?([^"'\n]+)/m) || [])[1] || path.basename(file).replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')).trim();

if (!slug) {
  out('## Articles waiting for medical review\n');
  for (const s of Object.keys(SITES)) {
    const waiting = files(s).map((f) => [f, fs.readFileSync(f, 'utf8')]).filter(([, t]) => !/^reviewed:/m.test(t.split(/^---$/m)[1] || ''));
    out(`### ${DOMAIN[s]} (${waiting.length})`);
    for (const [f, t] of waiting.sort().reverse()) out(`- ${(t.match(/^title:\s*["']?(.+?)["']?$/m) || [])[1] || f}: https://${DOMAIN[s]}/${slugOf(f, t)}/  (slug: \`${slugOf(f, t)}\`)`);
    out('');
  }
  process.exit(0);
}
if (!SITES[site]) { console.error(`Unknown site "${site}"`); process.exit(1); }
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.error(`Bad date "${date}"`); process.exit(1); }
const hit = files(site).find((f) => slugOf(f, fs.readFileSync(f, 'utf8')) === slug);
if (!hit) { console.error(`No article with slug "${slug}" on ${DOMAIN[site]}`); process.exit(1); }
let txt = fs.readFileSync(hit, 'utf8');
const end = txt.indexOf('\n---', 3);
let fm = txt.slice(0, end);
fm = /^reviewed:/m.test(fm) ? fm.replace(/^reviewed:.*$/m, `reviewed: ${date}`) : `${fm}\nreviewed: ${date}`;
fs.writeFileSync(hit, fm + txt.slice(end));
out(`Marked https://${DOMAIN[site]}/${slug}/ as medically reviewed on ${date}.`);
