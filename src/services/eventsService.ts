import type { Event, EventsResponse } from '../types/events';
import { EVENTS_JSON_RAW_URL } from '../config/eventsConfig';
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

/**
 * Loads evangelism events: tries GitHub raw JSON first, then bundled `assets/events.json`.
 */
export async function fetchEventsResponse(): Promise<EventsResponse> {
  try {
    const res = await fetch(`${EVENTS_JSON_RAW_URL}?t=${Date.now()}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json: unknown = await res.json();
      const parsed = normalizeResponse(json);
      if (parsed) return parsed;
    }
  } catch {
    // fall through to bundled
  }

  const parsed = normalizeResponse(bundledEvents as unknown);
  if (parsed) return parsed;

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

export async function fetchEvents(): Promise<Event[]> {
  const r = await fetchEventsResponse();
  return r.events;
}

export async function fetchEventById(eventId: string): Promise<Event | null> {
  const events = await fetchEvents();
  return events.find((e) => e.id === eventId || e.slug === eventId) ?? null;
}
