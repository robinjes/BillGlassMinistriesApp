import type { PositionOpportunity, PositionsResponse } from '../types/positions';
import { POSITIONS_JSON_RAW_URL } from '../config/positionsConfig';
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

/**
 * Loads position opportunities: tries GitHub raw JSON first,
 * then bundled `assets/positions.json`.
 */
export async function fetchPositionsResponse(): Promise<PositionsResponse> {
  try {
    const res = await fetch(`${POSITIONS_JSON_RAW_URL}?t=${Date.now()}`, {
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

  const parsed = normalizeResponse(bundledPositions as unknown);
  if (parsed) return parsed;

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
