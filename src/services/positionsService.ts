import type { PositionOpportunity, PositionsResponse } from '../types/positions';
import { POSITIONS_JSON_RAW_URL } from '../config/positionsConfig';
import { pickScrapedFeed } from '../utils/feedPicker';
import bundledPositions from '../../assets/positions.json';

function isPositionsResponse(data: unknown): data is PositionsResponse {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return (
    o.source === 'behindthewalls.com' &&
    typeof o.jobOpportunitiesUrl === 'string' &&
    typeof o.updatedAt === 'string' &&
    Array.isArray(o.positions)
  );
}

function normalizeResponse(data: unknown): PositionsResponse | null {
  if (isPositionsResponse(data)) return data;
  return null;
}

function pickPositionsResponse(
  remote: PositionsResponse | null,
  bundled: PositionsResponse | null,
): PositionsResponse | null {
  const picked = pickScrapedFeed(
    remote ? { updatedAt: remote.updatedAt, items: remote.positions } : null,
    bundled ? { updatedAt: bundled.updatedAt, items: bundled.positions } : null,
  );
  if (!picked) return null;
  const source = bundled && picked.items === bundled.positions ? bundled : remote!;
  return { ...source, positions: picked.items };
}

/**
 * Loads position opportunities: compares GitHub raw JSON with bundled `assets/positions.json`.
 */
export async function fetchPositionsResponse(): Promise<PositionsResponse> {
  const bundled = normalizeResponse(bundledPositions as unknown);
  let remote: PositionsResponse | null = null;

  try {
    const res = await fetch(`${POSITIONS_JSON_RAW_URL}?t=${Date.now()}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json: unknown = await res.json();
      remote = normalizeResponse(json);
    }
  } catch {
    // fall through to bundled
  }

  const picked = pickPositionsResponse(remote, bundled);
  if (picked) return picked;

  return {
    source: 'behindthewalls.com',
    jobOpportunitiesUrl: 'https://www.behindthewalls.com/job-opportunities',
    updatedAt: new Date().toISOString(),
    positions: [],
  };
}

export async function fetchPositions(): Promise<PositionOpportunity[]> {
  const r = await fetchPositionsResponse();
  return r.positions;
}
