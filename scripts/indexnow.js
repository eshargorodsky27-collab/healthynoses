// Tells Bing (which powers ChatGPT search and Copilot), Yandex and others about new URLs right away.
const fs = require('fs');
const path = require('path');
const cfg = require('../site.config');

const urls = [`${cfg.url}/`, `${cfg.url}/sitemap.xml`, `${cfg.url}/llms.txt`];
const last = path.join(__dirname, '..', 'data', 'last-url.txt');
if (fs.existsSync(last)) urls.unshift(fs.readFileSync(last, 'utf8').trim());

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: cfg.domain, key: cfg.indexNowKey, keyLocation: `${cfg.url}/${cfg.indexNowKey}.txt`, urlList: urls }),
}).then((r) => console.log('[indexnow]', r.status, urls.join(' '))).catch((e) => console.log('[indexnow] skipped:', e.message));
