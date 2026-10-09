import type { MovieDetail, MovieVideo } from "@globaltypes/movie";
import { MOCK_MOVIES } from "@mock/fixtures";

type MovieMetadata = Pick<MovieDetail, "runtime" | "tagline" | "genres">;

const MOVIE_METADATA: Record<number, MovieMetadata> = {
  268: {
    runtime: 126,
    tagline: "Have you ever danced with the devil in the pale moonlight?",
    genres: ["Fantasy", "Action", "Crime"],
  },

  10001: {
    runtime: 126,
    tagline: "The Bat. The Cat. The Penguin.",
    genres: ["Action", "Fantasy"],
  },

  10002: {
    runtime: 84,
    tagline: "What are you capable of?",
    genres: ["Science Fiction", "Drama"],
  },

  11: {
    runtime: 121,
    tagline: "A long time ago in a galaxy far, far away...",
    genres: ["Adventure", "Science Fiction", "Action"],
  },

  10003: {
    runtime: 125,
    tagline: "Gotham faces a chilling new threat.",
    genres: ["Action", "Adventure", "Fantasy"],
  },

  10004: {
    runtime: 140,
    tagline: "Every legend has a beginning.",
    genres: ["Action", "Crime", "Drama"],
  },

  10005: {
    runtime: 152,
    tagline: "Welcome to a world without rules.",
    genres: ["Action", "Crime", "Drama"],
  },

  10006: {
    runtime: 164,
    tagline: "The legend ends.",
    genres: ["Action", "Crime", "Drama"],
  },

  10007: {
    runtime: 176,
    tagline: "Unmask the truth.",
    genres: ["Crime", "Mystery", "Thriller"],
  },

  10008: {
    runtime: 76,
    tagline: "The dark knight faces his past.",
    genres: ["Animation", "Action", "Crime"],
  },

  10009: {
    runtime: 104,
    tagline: "Always be yourself. Unless you can be Batman.",
    genres: ["Animation", "Comedy", "Family"],
  },
};

const MOCK_GENRES = [
  ["Action", "Adventure"],
  ["Crime", "Mystery"],
  ["Action", "Thriller"],
  ["Animation", "Adventure"],
  ["Science Fiction", "Action"],
];

const MOCK_TAGLINES = [
  "A new adventure begins in Gotham City.",
  "Every hero has a story.",
  "The city needs its protector.",
  "A mystery threatens Gotham.",
  "The next chapter of the legend begins.",
];

export const MOCK_MOVIE_DETAILS: MovieDetail[] = MOCK_MOVIES.map(
  (movie, index) => {
    const metadata = MOVIE_METADATA[movie.id];

    if (metadata) {
      return {
        ...movie,
        ...metadata,
      };
    }

    return {
      ...movie,
      runtime: 90 + (index % 8) * 7,
      tagline:
        MOCK_TAGLINES[index % MOCK_TAGLINES.length] ??
        "A new adventure begins.",
      genres: MOCK_GENRES[index % MOCK_GENRES.length] ?? ["Adventure"],
    };
  },
);

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

const movieDetailsById = new Map(
  MOCK_MOVIE_DETAILS.map((movie) => [movie.id, movie]),
);

export function getMockVideos(id: number): MovieVideo[] {
  return MOCK_MOVIE_VIDEOS[id] ?? [];
}

export function getMockMovie(id: number): MovieDetail | undefined {
  return movieDetailsById.get(id);
}
