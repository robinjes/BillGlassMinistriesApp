import type { Event, EventsResponse } from '../types/events';
import { EVENTS_JSON_RAW_URL } from '../config/eventsConfig';
import { pickScrapedFeed } from '../utils/feedPicker';
import bundledEvents from '../../assets/events.json';

function isEventsResponse(data: unknown): data is EventsResponse {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return (
    o.source === 'behindthewalls.com' &&
    typeof o.evangelismEventsUrl === 'string' &&
    typeof o.updatedAt === 'string' &&
    Array.isArray(o.events)
  );
}

function normalizeResponse(data: unknown): EventsResponse | null {
  if (isEventsResponse(data)) return data;
  return null;
}

function pickEventsResponse(remote: EventsResponse | null, bundled: EventsResponse | null): EventsResponse | null {
  const picked = pickScrapedFeed(
    remote ? { updatedAt: remote.updatedAt, items: remote.events } : null,
    bundled ? { updatedAt: bundled.updatedAt, items: bundled.events } : null,
    {
      bundledHasExtraData: Boolean(bundled?.events.some((e) => e.teammatesNeeded)),
      remoteHasExtraData: Boolean(remote?.events.some((e) => e.teammatesNeeded)),
    },
  );
  if (!picked) return null;
  const source = bundled && picked.items === bundled.events ? bundled : remote!;
  return { ...source, events: picked.items };
}

/**
 * Loads evangelism events: compares GitHub raw JSON with bundled `assets/events.json`
 * and uses whichever feed is newer, populated, or includes listing-table fields.
 */
export async function fetchEventsResponse(): Promise<EventsResponse> {
  const bundled = normalizeResponse(bundledEvents as unknown);
  let remote: EventsResponse | null = null;

  try {
    const res = await fetch(`${EVENTS_JSON_RAW_URL}?t=${Date.now()}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json: unknown = await res.json();
      remote = normalizeResponse(json);
    }
  } catch {
    // fall through to bundled
  }

  const picked = pickEventsResponse(remote, bundled);
  if (picked) return picked;

  const now = new Date().toISOString();
  return {
    source: 'behindthewalls.com',
    evangelismEventsUrl: 'https://www.behindthewalls.com/evangelism-events',
    africaEvangelismEventsUrl: 'https://www.behindthewalls.com/africaevents',
    updatedAt: now,
    events: [],
    africaEvangelismLines: [],
  };
}

export async function fetchEventById(eventId: string): Promise<Event | null> {
  const { events } = await fetchEventsResponse();
  return events.find((e) => e.id === eventId || e.slug === eventId) ?? null;
}
