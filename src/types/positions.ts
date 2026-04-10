export interface PositionOpportunity {
  id: string;
  title: string;
  description: string;
  jobDescriptionUrl?: string;
  lastScrapedAt: string;
}

export interface PositionsResponse {
  source: 'behindthewalls.com';
  jobOpportunitiesUrl: string;
  updatedAt: string;
  positions: PositionOpportunity[];
}
