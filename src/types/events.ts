export type EventStatus = 'OPEN' | 'FULL' | 'CLOSED' | 'UNKNOWN';

export interface EventLocation {
  venueName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  googleMapsUrl?: string;
}

export interface EventRegistrationLinks {
  registerUrl?: string;
  supportUrl?: string;
  moreInfoUrl?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  startDateText?: string;
  endDateText?: string;
  deadlineText?: string;
  status: EventStatus;
  summary?: string;
  heroImageUrl?: string;
  detailUrl: string;
  location?: EventLocation;
  registration?: EventRegistrationLinks;
  detailsHtml?: string;
  lastScrapedAt: string;
}

export interface EventsResponse {
  source: 'behindthewalls.com';
  evangelismEventsUrl: string;
  /** Public page listing 2026 Africa evangelism dates (scraped from behindthewalls.com/africaevents). */
  africaEvangelismEventsUrl?: string;
  updatedAt: string;
  events: Event[];
  /** One line per row, e.g. "Zambia - February 13-14" — order matches the website. */
  africaEvangelismLines?: string[];
}
