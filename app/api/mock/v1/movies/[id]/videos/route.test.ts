// @vitest-environment node

import { describe, expect, it } from "vitest";
import { GET } from "./route";

function getVideos(id: string) {
  return GET(
    new Request(`http://localhost:3000/api/mock/v1/movies/${id}/videos`),
    {
      params: Promise.resolve({ id }),
    },
  );
}

describe("GET /movies/{id}/videos", () => {
  it("returns a YouTube trailer for Batman", async () => {
    const response = await getVideos("268");
    const videos = await response.json();

    expect(response.status).toBe(200);
    expect(videos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          site: "YouTube",
          type: "Trailer",
          key: expect.any(String),
        }),
      ]),
    );
  });

  it("returns an empty array when videos are unavailable", async () => {
    const response = await getVideos("10001");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
  });

  it("returns 404 for an unknown movie", async () => {
    const response = await getVideos("999999");

    expect(response.status).toBe(404);
  });
});
