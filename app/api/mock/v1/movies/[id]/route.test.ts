// @vitest-environment node

import { describe, expect, it } from "vitest";
import { GET } from "./route";

function getMovie(id: string) {
  return GET(new Request(`http://localhost:3000/api/mock/v1/movies/${id}`), {
    params: Promise.resolve({ id }),
  });
}

describe("GET /movies/{id}", () => {
  it("returns movie details for a known ID", async () => {
    const response = await getMovie("268");
    const movie = await response.json();

    expect(response.status).toBe(200);

    expect(movie).toMatchObject({
      id: 268,
      title: "Batman",
      runtime: expect.any(Number),
      genres: expect.any(Array),
    });

    expect(movie).toHaveProperty("tagline");
  });

  it("returns 404 for an unknown movie", async () => {
    const response = await getMovie("999999");

    expect(response.status).toBe(404);

    expect(response.headers.get("content-type")).toContain(
      "application/problem+json",
    );
  });

  it("rejects invalid IDs", async () => {
    const response = await getMovie("invalid");

    expect(response.status).toBe(400);
  });
});
