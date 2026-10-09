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

export type SearchParams = Promise<{
  query?: string | string[];
  page?: string | string[];
}>;

export interface PaginationProps {
  query: string;
  page: number;
  totalPages: number;
  totalResults: number;
}
