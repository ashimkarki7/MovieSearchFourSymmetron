export interface TvShow {
  id: number;
  name: string;
  overview: string | null;
  posterPath: string | null;
  voteAverage: number;
  firstAirDate: string | null;
}
export interface TvSearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: TvShow[];
}
