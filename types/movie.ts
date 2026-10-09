export interface Movie {
  id: number;
  title: string;
  overview: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
  releaseDate: string | null;
}

export interface MovieSearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}

export interface MovieDetail extends Movie {
  runtime: number | null;
  tagline: string | null;
  genres: string[];
}

export interface MovieVideo {
  key: string;
  name: string;
  site: string;
  type: string;
}

export type SearchParams = Promise<{
  query?: string | string[];
  page?: string | string[];
  media?: string | string[];
}>;
export interface PaginationProps {
  query: string;
  page: number;
  totalPages: number;
  totalResults: number;
  media?: "movie" | "tv";
}
