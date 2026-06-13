/** Pick the better of a remote GitHub scrape vs bundled JSON for offline resilience. */

export type ScrapedFeed<TItem> = {
  updatedAt: string;
  items: TItem[];
};

export type FeedPickerOptions = {
  /** When true, bundled wins if remote lacks this (e.g. listing-table fields). */
  bundledHasExtraData?: boolean;
  remoteHasExtraData?: boolean;
};

export function pickScrapedFeed<TItem>(
  remote: ScrapedFeed<TItem> | null,
  bundled: ScrapedFeed<TItem> | null,
  options: FeedPickerOptions = {},
): ScrapedFeed<TItem> | null {
  if (!remote) return bundled;
  if (!bundled) return remote;

  if (bundled.items.length > 0 && remote.items.length === 0) return bundled;
  if (remote.items.length > 0 && bundled.items.length === 0) return remote;

  if (options.bundledHasExtraData && !options.remoteHasExtraData) return bundled;

  const remoteUpdated = Date.parse(remote.updatedAt);
  const bundledUpdated = Date.parse(bundled.updatedAt);
  if (Number.isFinite(bundledUpdated) && Number.isFinite(remoteUpdated) && bundledUpdated > remoteUpdated) {
    return bundled;
  }

  return remote;
}
