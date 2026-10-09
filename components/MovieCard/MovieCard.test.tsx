import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MovieCard } from "./MovieCard";

const mockMovie = {
  id: 1,
  title: "A Trending Movie",
  overview: null,
  posterPath: null,
  backdropPath: null,
  voteAverage: 8.1,
  releaseDate: "2024-05-01",
};

describe("MovieCard", () => {
  it("renders the movie title and rating", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("A Trending Movie")).toBeInTheDocument();
    expect(screen.getByText("★ 8.1")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("provides an accessible link to movie details", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link", {
      name: "View details for A Trending Movie",
    });

    expect(link).toHaveAttribute("href", "/movies/1");
    expect(link).not.toHaveAttribute("tabindex", "-1");
  });

  it("supports movies without posters", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("No poster")).toBeInTheDocument();
  });
});
