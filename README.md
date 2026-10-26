# healthynoses.com

Auto-publishing health blog that sends readers to [Narisure](https://www.narisure.com/).

A new article goes up **every other day**, rotating:
nose care (mentions Narisure) → research digest → nose care → ears, hearing, sinus or sleep.

Every article is written from real PubMed studies, gets a photo (Pexels or Unsplash) or generated cover art,
and passes a claims check that blocks "cures", "clinically proven", "FDA approved" and medical claims about Narisure.

## What's built in for Google and AI search

- `llms.txt` and `llms-full.txt` so ChatGPT, Claude, Perplexity and others can read the whole library
- `robots.txt` that explicitly welcomes GPTBot, ClaudeBot, PerplexityBot, Google-Extended and more
- JSON-LD on every page: MedicalWebPage / ScholarlyArticle, FAQPage, BreadcrumbList, citations
- Question-style headings with direct answers, key takeaways, FAQs, cited sources
- `sitemap.xml`, `rss.xml`, and an IndexNow ping to Bing (which feeds ChatGPT search) after each post
- Every Narisure link carries `utm_source=healthynoses` so you can see blog sales in your analytics

## One-time setup

1. **GitHub secrets** (repo → Settings → Secrets and variables → Actions → New repository secret)
   - `ANTHROPIC_API_KEY` — from console.anthropic.com (required, about 5–10 cents per article)
   - `PEXELS_API_KEY` — free at pexels.com/api (recommended, real photos)
   - `UNSPLASH_ACCESS_KEY` — optional backup photo source
2. **GitHub Pages**: Settings → Pages → Source: **GitHub Actions**. Custom domain: `healthynoses.com`, then tick **Enforce HTTPS** once it's available.
3. **GoDaddy DNS** for healthynoses.com (remove the parked/forwarding A record first):

   | Type  | Name | Value                   |
   |-------|------|-------------------------|
   | A     | @    | 185.199.108.153         |
   | A     | @    | 185.199.109.153         |
   | A     | @    | 185.199.110.153         |
   | A     | @    | 185.199.111.153         |
   | CNAME | www  | YOUR-GITHUB-USERNAME.github.io |

4. **Google Search Console** and **Bing Webmaster Tools**: add healthynoses.com and submit `https://healthynoses.com/sitemap.xml`.

## Everyday use

- **Post now:** Actions → Publish site → Run workflow
- **Edit or delete a post:** change the file in `posts/` and commit; the site rebuilds automatically
- **Add topics:** edit `scripts/topics.js`. When a list runs out, the writer invents new topics on its own
- **Change product copy or links:** `site.config.js`
- **Local preview:** `npm install && npm run build`, then open `dist/index.html` through any static server
