/**
 * Daily-friendly scraper for position opportunities.
 *
 * Output: assets/positions.json
 * Run: node scripts/scrape-positions.mjs
 */
import { load } from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'assets', 'positions.json');

const BASE = 'https://www.behindthewalls.com';
const PATH = '/job-opportunities';
const UA =
  'Mozilla/5.0 (compatible; BillGlassMinistriesApp/1.0; +https://github.com/robinjes/BillGlassMinistriesApp)';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function absolutize(href) {
  if (!href || typeof href !== 'string') return undefined;
  const h = href.trim();
  if (h.startsWith('https://') || h.startsWith('http://')) return h;
  if (h.startsWith('//')) return `https:${h}`;
  if (h.startsWith('/')) return `${BASE}${h}`;
  return h;
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

function getMainBody($) {
  if ($('#dmFirstContainer').length) return $('#dmFirstContainer');
  if ($('.dmBody').length) return $('.dmBody').first();
  return $('body');
}

function scrapePositionsFromBody($, body) {
  /** @type {Array<{ id: string, title: string, description: string, jobDescriptionUrl?: string, lastScrapedAt: string }>} */
  const positions = [];
  const nowIso = new Date().toISOString();

  // Primary strategy: each active position has a "View Full Job Description" link.
  const ctaLinks = body.find('a[href]').filter((_, a) => {
    const label = $(a).text().replace(/\s+/g, ' ').trim();
    return /full job description|view full job description/i.test(label);
  });

  ctaLinks.each((_, linkEl) => {
    const link = $(linkEl);
    const jobDescriptionUrl = absolutize(link.attr('href'));
    const row = link.closest('.dmRespRow');
    const container = row.length ? row : link.parent();

    const headingTexts = container
      .find('h1, h2, h3, h4, h5, h6')
      .toArray()
      .map((el) => $(el).text().replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .filter((t) => !/position opportunities|to show interest in a position|our mission|useful links|contact info/i.test(t));

    const title = headingTexts[0];
    if (!title) return;

    let description = container.text().replace(/\s+/g, ' ').trim();
    description = description.replace(title, '').replace(/view full job description/i, '').trim();
    if (!description || description.length < 30) return;

    positions.push({
      id: slugify(title),
      title,
      description,
      jobDescriptionUrl,
      lastScrapedAt: nowIso,
    });
  });

  return positions;
}

async function scrape() {
  mkdirSync(dirname(OUT), { recursive: true });
  const url = `${BASE}${PATH}`;
  console.log(`Fetching ${url}`);
  const html = await fetchText(url);
  const $ = load(html);
  const body = getMainBody($);
  const positions = scrapePositionsFromBody($, body);

  const output = {
    source: 'behindthewalls.com',
    jobOpportunitiesUrl: url,
    updatedAt: new Date().toISOString(),
    positions,
  };

  writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Done. Wrote ${positions.length} position(s) -> ${OUT}`);
}

scrape().catch((err) => {
  console.error(err);
  process.exit(1);
});
