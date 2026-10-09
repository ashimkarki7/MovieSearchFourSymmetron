// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { GET } from "./route";

const request = (query: string) =>
  new NextRequest(`http://localhost:3000/api/mock/v1/movies/search${query}`);

describe("GET /movies/search contract", () => {
  it("returns three distinct pages with consistent metadata and at most 20 movies", async () => {
    const responses = await Promise.all(
      [1, 2, 3].map((page) => GET(request(`?query=batman&page=${page}`))),
    );
    const pages = await Promise.all(
      responses.map((response) => response.json()),
    );

    expect(responses.every((response) => response.status === 200)).toBe(true);
    expect(pages.map((result) => result.page)).toEqual([1, 2, 3]);
    expect(pages.every((result) => result.totalPages >= 3)).toBe(true);
    expect(
      pages.every((result) => result.totalResults === pages[0].totalResults),
    ).toBe(true);
    expect(pages.every((result) => result.results.length <= 20)).toBe(true);
    expect(pages[0].results[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      voteAverage: expect.any(Number),
    });
    const ids = pages.flatMap((result) =>
      result.results.map((movie: { id: number }) => movie.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("defaults to page one when page is omitted", async () => {
    const response = await GET(request("?query=batman"));
    expect((await response.json()).page).toBe(1);
  });

  it("returns HTTP 200 and an empty collection when no movies match", async () => {
    const response = await GET(request("?query=noresults"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      page: 1,
      totalPages: 0,
      totalResults: 0,
      results: [],
    });
  });

  it.each([
    "",
    "?query=",
    "?query=%20%20",
    "?query=batman&page=0",
    "?query=batman&page=501",
    "?query=batman&page=1.5",
    "?query=batman&page=abc",
  ])(
    "returns application/problem+json for invalid request %s",
    async (params) => {
      const response = await GET(request(params));
      const payload = await response.json();
      expect(response.status).toBe(400);
      expect(response.headers.get("content-type")).toContain(
        "application/problem+json",
      );
      expect(payload).toMatchObject({
        type: "about:blank",
        title: "Invalid request",
        status: 400,
        detail: expect.any(String),
      });
    },
  );

  it("returns a structured 503 error", async () => {
    const response = await GET(request("?query=error"));
    expect(response.status).toBe(503);
    expect(response.headers.get("content-type")).toContain(
      "application/problem+json",
    );
    expect(await response.json()).toMatchObject({
      type: "about:blank",
      status: 503,
    });
  });

  it("delays the slow response by about three seconds", async () => {
    const before = performance.now();
    const response = await GET(request("?query=slow"));
    const duration = performance.now() - before;
    expect(response.status).toBe(200);
    expect(duration).toBeGreaterThanOrEqual(2900);
    expect(duration).toBeLessThan(5000);
    expect((await response.json()).results.length).toBeGreaterThan(0);
  }, 7000);
});
