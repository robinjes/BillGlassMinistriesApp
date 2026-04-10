/**
 * Low-frequency scraper (intended to run ~daily via GitHub Actions).
 * Used with permission from Bill Glass Behind the Walls to mirror public event listings.
 *
 * Output: assets/events.json (EventsResponse shape; see src/types/events.ts)
 *
 * Run: node scripts/scrape-events.mjs
 */
import { load } from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'assets', 'events.json');

const BASE = 'https://www.behindthewalls.com';
const LIST_PATH = '/evangelism-events';
const AFRICA_PATH = '/africaevents';
const UA =
  'Mozilla/5.0 (compatible; BillGlassMinistriesApp/1.0; +https://github.com/robinjes/BillGlassMinistriesApp)';

/** @typedef {'OPEN'|'FULL'|'CLOSED'|'UNKNOWN'} EventStatus */

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

/** @param {string} blob */
function statusFromText(blob) {
  const u = blob.toUpperCase();
  if (u.includes('REGISTRATION IS FULL')) return 'FULL';
  if (u.includes('REGISTRATION IS CLOSED')) return 'CLOSED';
  if (u.includes('REGISTRATION IS OPEN')) return 'OPEN';
  return 'UNKNOWN';
}

/**
 * @param {EventStatus} fromList
 * @param {string} detailText
 * @param {boolean} hasRegisterCta
 */
function mergeStatus(fromList, detailText, hasRegisterCta) {
  const fromDetail = statusFromText(detailText);
  if (fromDetail === 'FULL' || fromDetail === 'CLOSED') return fromDetail;
  if (fromList === 'FULL' || fromList === 'CLOSED') return fromList;
  if (hasRegisterCta) return 'OPEN';
  const openHint = /we have spots|register for event|spots for \d+/i.test(detailText);
  if (openHint && fromDetail === 'UNKNOWN' && fromList === 'UNKNOWN') return 'OPEN';
  if (fromDetail === 'UNKNOWN' && fromList !== 'UNKNOWN') return fromList;
  return fromDetail;
}

/** @param {string} href */
function slugFromEventHref(href) {
  if (!href || typeof href !== 'string') return null;
  const pathPart = href.split('?')[0].split('#')[0];
  if (!pathPart.startsWith('/e/')) return null;
  const rest = pathPart.slice(3).replace(/\/$/, '');
  if (!rest || rest.includes('/')) return null;
  try {
    const slug = decodeURIComponent(rest);
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return null;
    return slug;
  } catch {
    return null;
  }
}

/**
 * All evangelism table links: a[href^="/e/"], excluding header/nav/footer.
 * @param {ReturnType<typeof load>} $
 */
function discoverListRows($) {
  /** @type {Map<string, { title: string, startDateText?: string, deadlineText?: string, summary?: string, listStatus: EventStatus }>} */
  const map = new Map();

  const excludeRoot =
    '#dmNav, #hcontainer, .dmHeaderContainer, .dmFooterContainer, nav[role="navigation"], header, footer';

  $('a[href^="/e/"]').each((_, el) => {
    const $a = $(el);
    if ($a.closest(excludeRoot).length) return;

    const href = $a.attr('href');
    const slug = slugFromEventHref(href || '');
    if (!slug) return;

    const title = $a.text().replace(/\s+/g, ' ').trim();
    if (!title) return;

    const row = $a.closest('.dmRespRow');
    let cols = row.find('> .dmRespColsWrapper > .dmRespCol');
    if (cols.length < 2) {
      cols = row.find('.dmRespCol');
    }

    const startDateText = cols.length > 1 ? $(cols[1]).text().replace(/\s+/g, ' ').trim() || undefined : undefined;
    const deadlineText = cols.length > 2 ? $(cols[2]).text().replace(/\s+/g, ' ').trim() || undefined : undefined;
    const summary =
      cols.length > 3 ? $(cols[3]).text().replace(/\s+/g, ' ').trim() || undefined : undefined;
    const listStatus = statusFromText(summary || '');

    if (!map.has(slug)) {
      map.set(slug, { title, startDateText, deadlineText, summary, listStatus });
    }
  });

  return map;
}

/**
 * Lines like "Zambia - February 13-14" from /africaevents main content.
 * @param {ReturnType<typeof load>} $
 */
function extractAfricaEventLines($) {
  const lines = [];
  const body = $('#dmFirstContainer').length ? $('#dmFirstContainer') : $('.dmBody').first();
  const skip = (t) =>
    !t ||
    /below is the list of africa|please note:|^note:\s*in country|support the ministry|our mission|useful links|contact info|complete this form/i.test(
      t,
    );

  body.find('p').each((_, el) => {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (skip(t)) return;
    if (!/\s-\s/.test(t) || !/\d{1,2}-\d{1,2}/.test(t)) return;
    lines.push(t);
  });

  return lines;
}

/** @param {ReturnType<typeof load>} $ */
function stripDangerous($) {
  $('script').remove();
  $('style').remove();
}

/** @param {ReturnType<typeof load>} $detail */
function extractLocation($detail) {
  const body = $detail('#dmFirstContainer').length ? $detail('#dmFirstContainer') : $detail('.dmBody').first();
  const mapsLinks = body.find('a[href*="maps.app.goo.gl"], a[href*="google.com/maps"]').toArray();
  const googleMapsUrl = mapsLinks[0] ? absolutize($detail(mapsLinks[0]).attr('href')) : undefined;

  let venueName;
  const ei = body.find('.inline-data-binding-markup').first();
  if (ei.length) {
    const ps = ei.find('p.rteBlock');
    if (ps.length >= 2) {
      venueName = $detail(ps[1]).text().replace(/\s+/g, ' ').trim();
    }
  }

  let addressLine1;
  let cityLine;
  if (ei.length) {
    ei.find('a[href*="maps.app"]').each((_, a) => {
      const t = $detail(a).text().trim();
      if (!addressLine1 && /\d/.test(t)) addressLine1 = t;
      else if (addressLine1 && /[A-Z]{2}\s+\d{5}/.test(t)) cityLine = t;
    });
  }

  return {
    location: {
      venueName: venueName || undefined,
      googleMapsUrl,
      addressLine1,
      city: cityLine,
    },
  };
}

/** @param {ReturnType<typeof load>} $ */
function extractHeroImage($) {
  const img = $('#dmFirstContainer img[src], .dmBody img[src]').first();
  const src = img.attr('src');
  if (src && !src.includes('favicon')) {
    if (src.startsWith('//')) return `https:${src}`;
    if (src.startsWith('/')) return `${BASE}${src}`;
    return src;
  }
  return undefined;
}

/** @param {string} html */
function extractDetailsHtml(html) {
  const $d = load(html);
  stripDangerous($d);
  if (!$d('#dmFirstContainer').length) return undefined;
  stripDangerous($d);
  return $d('#dmFirstContainer').html()?.trim() || undefined;
}

/** @param {string} nHtml */
function extractRegisterUrl(nHtml) {
  const $n = load(nHtml);
  const btn = $n('a.dmButtonLink span.text').filter((_, el) =>
    /continue to registration/i.test($n(el).text())
  );
  if (btn.length) {
    const href = btn.first().closest('a').attr('href');
    const abs = absolutize(href);
    if (abs && (abs.includes('dvforms.net') || abs.includes('donorview'))) return abs;
  }
  const direct = $n('a[href*="dvforms.net"], a[href*="app.donorview.com"]');
  for (const el of direct.toArray()) {
    const abs = absolutize($n(el).attr('href'));
    if (abs && !abs.includes('/19MLz')) return abs;
  }
  return undefined;
}

/** Detail /e/ page: Register link can be /n/<slug> or direct donorview form. */
/** @param {ReturnType<typeof load>} $d */
function extractRegisterUrlFromDetailPage($d) {
  const body = $d('#dmFirstContainer');
  if (!body.length) return undefined;
  const links = body.find('a[href*="/n/"], a[href*="dvforms.net"], a[href*="donorview"]');
  for (const el of links.toArray()) {
    const abs = absolutize($d(el).attr('href'));
    const label = $d(el).text().trim().toLowerCase();
    if (abs && (/register/.test(label) || abs.includes('/n/') || abs.includes('dvforms.net'))) return abs;
  }
  return undefined;
}

/** Detail /e/ page: support link can be /g/<slug> or donorview iframe/link. */
/** @param {ReturnType<typeof load>} $d */
function extractSupportUrlFromDetailPage($d) {
  const body = $d('#dmFirstContainer');
  if (!body.length) return undefined;
  const links = body.find('a[href*="/g/"], a[href*="dvforms.net"], a[href*="donorview"]');
  for (const el of links.toArray()) {
    const abs = absolutize($d(el).attr('href'));
    const label = $d(el).text().trim().toLowerCase();
    if (abs && (/support/.test(label) || abs.includes('/g/'))) return abs;
  }
  const ifr = body.find('iframe[src*="dvforms.net"], iframe[src*="donorview.com"]').first().attr('src');
  return ifr ? absolutize(ifr) : undefined;
}

/** @param {string} gHtml */
function extractSupportUrl(gHtml) {
  const $g = load(gHtml);
  const ifr = $g('iframe[src*="dvforms.net"]').first().attr('src');
  if (ifr) return absolutize(ifr);
  const dvi = $g('iframe[src*="app.donorview.com"]').filter((_, el) => {
    const s = $g(el).attr('src') || '';
    return !s.includes('/19MLz');
  });
  const src = dvi.first().attr('src');
  return src ? absolutize(src) : undefined;
}

/** @param {string} detailHtml */
function extractDetailDates(detailHtml) {
  const $d = load(detailHtml);
  const startDateText =
    $d('.u_1185422835 .inline-data-binding').first().text().trim() ||
    $d('[data-inline-binding="dynamic_page_collection.Event Date"]').first().text().trim() ||
    undefined;
  let deadlineText;
  $d('p').each((_, el) => {
    if (/Registration Deadline/i.test($d(el).text())) {
      const cand = $d(el).next('p').find('span.inline-data-binding').first().text().trim();
      if (cand) deadlineText = cand;
    }
  });
  if (!deadlineText) {
    deadlineText =
      $d('[data-inline-binding-encoded="ZHluYW1pY19wYWdlX2NvbGxlY3Rpb24uRGVhZGxpbmU="]')
        .first()
        .text()
        .trim() || undefined;
  }
  return { startDateText: startDateText || undefined, deadlineText: deadlineText || undefined };
}

async function scrape() {
  mkdirSync(dirname(OUT), { recursive: true });

  console.log(`Fetching list: ${BASE}${LIST_PATH}`);
  const listHtml = await fetchText(BASE + LIST_PATH);
  const $list = load(listHtml);
  const fromList = discoverListRows($list);
  const slugs = [...fromList.keys()].sort();
  console.log(`Discovered ${slugs.length} unique /e/ event slug(s) from list page (nav/footer excluded).`);

  let africaEvangelismLines = [];
  try {
    console.log(`Fetching Africa list: ${BASE}${AFRICA_PATH}`);
    const africaHtml = await fetchText(BASE + AFRICA_PATH);
    const $africa = load(africaHtml);
    stripDangerous($africa);
    africaEvangelismLines = extractAfricaEventLines($africa);
    console.log(`  ${africaEvangelismLines.length} Africa event line(s).`);
  } catch (e) {
    console.warn('Africa page scrape failed:', e.message);
  }

  const nowIso = new Date().toISOString();
  const events = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const listRow = fromList.get(slug);
    console.log(`[${i + 1}/${slugs.length}] ${slug} — ${listRow.title}`);

    const detailUrl = `${BASE}/e/${slug}`;
    let detailHtml = '';
    try {
      detailHtml = await fetchText(detailUrl);
    } catch (e) {
      console.warn('  detail fetch failed:', e.message);
      events.push({
        id: slug,
        slug,
        title: listRow.title,
        startDateText: listRow.startDateText,
        endDateText: undefined,
        deadlineText: listRow.deadlineText,
        status: listRow.listStatus === 'UNKNOWN' ? 'UNKNOWN' : listRow.listStatus,
        summary: listRow.summary,
        detailUrl,
        lastScrapedAt: nowIso,
      });
      continue;
    }

    const $detail = load(detailHtml);
    const title =
      $detail('.u_1853424654 .rteBlock').first().text().trim() ||
      $detail('#dmFirstContainer .rteBlock').first().text().trim() ||
      listRow.title;

    const detailDates = extractDetailDates(detailHtml);
    const startDateText = detailDates.startDateText || listRow.startDateText;
    const deadlineText = detailDates.deadlineText || listRow.deadlineText;

    const { location } = extractLocation($detail);
    const heroImageUrl = extractHeroImage($detail);
    const detailsHtml = extractDetailsHtml(detailHtml);

    let registerUrl = extractRegisterUrlFromDetailPage($detail);
    try {
      const nHtml = await fetchText(`${BASE}/n/${slug}`);
      const fromN = extractRegisterUrl(nHtml);
      if (fromN) registerUrl = fromN;
    } catch {
      /* ignore */
    }

    let supportUrl = extractSupportUrlFromDetailPage($detail);
    try {
      const gHtml = await fetchText(`${BASE}/g/${slug}`);
      supportUrl = extractSupportUrl(gHtml);
    } catch {
      /* ignore */
    }

    if (!supportUrl) {
      const iframe = $detail('#dmFirstContainer iframe[src*="donorview.com"]').first().attr('src');
      const abs = iframe ? absolutize(iframe) : undefined;
      if (abs && !abs.includes('/19MLz')) supportUrl = abs;
    }

    const detailBlob = $detail('#dmFirstContainer').text();
    const hasRegisterCta =
      /continue to registration|register for event/i.test(detailBlob) || Boolean(registerUrl);
    const status = mergeStatus(listRow.listStatus, detailBlob + (listRow.summary || ''), hasRegisterCta);

    const loc = location;
    const hasLoc = Boolean(loc.googleMapsUrl || loc.venueName || loc.addressLine1 || loc.city);

    events.push({
      id: slug,
      slug,
      title,
      startDateText,
      endDateText: undefined,
      deadlineText,
      status,
      summary: listRow.summary,
      heroImageUrl,
      detailUrl,
      location: hasLoc ? loc : undefined,
      registration:
        registerUrl || supportUrl
          ? {
              registerUrl,
              supportUrl,
              moreInfoUrl: detailUrl,
            }
          : { moreInfoUrl: detailUrl },
      detailsHtml,
      lastScrapedAt: nowIso,
    });

    await new Promise((r) => setTimeout(r, 350));
  }

  const out = {
    source: 'behindthewalls.com',
    evangelismEventsUrl: BASE + LIST_PATH,
    africaEvangelismEventsUrl: BASE + AFRICA_PATH,
    updatedAt: nowIso,
    events,
    africaEvangelismLines,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Done. Wrote ${events.length} events + ${africaEvangelismLines.length} Africa lines → ${OUT}`);
}

scrape().catch((err) => {
  console.error(err);
  process.exit(1);
});
