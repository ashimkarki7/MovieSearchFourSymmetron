import type { MovieDetail, MovieVideo } from "@globaltypes/movie";
import { MOCK_MOVIES } from "@mock/fixtures";

export const MOCK_MOVIE_DETAILS: MovieDetail[] = MOCK_MOVIES.map((movie) => ({
  ...movie,
  runtime: movie.id === 268 ? 126 : null,
  tagline:
    movie.id === 268
      ? "Have you ever danced with the devil in the pale moonlight?"
      : null,
  genres: movie.id === 268 ? ["Fantasy", "Action", "Crime"] : [],
}));

export const MOCK_MOVIE_VIDEOS: Record<number, MovieVideo[]> = {
  268: [
    {
      key: "dgC9Q0uhX70",
      name: "Official Trailer",
      site: "YouTube",
      type: "Trailer",
    },
  ],
};

export function getMockVideos(id: number): MovieVideo[] {
  return MOCK_MOVIE_VIDEOS[id] ?? [];
}

export function getMockMovie(id: number): MovieDetail | undefined {
  return MOCK_MOVIE_DETAILS.find((movie) => movie.id === id);
}
