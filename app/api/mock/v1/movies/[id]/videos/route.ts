import { NextResponse } from "next/server";

import { getMockMovie, getMockVideos } from "@mock/details";
import { problem } from "@mock/problem";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id: rawId } = await params;

  if (!/^[1-9]\d*$/.test(rawId)) {
    return problem(
      400,
      "Invalid request",
      "The movie ID must be a positive integer.",
    );
  }

  const id = Number(rawId);

  if (!Number.isSafeInteger(id)) {
    return problem(400, "Invalid request", "The movie ID is invalid.");
  }

  if (!getMockMovie(id)) {
    return problem(404, "Not Found", "The requested movie was not found.");
  }

  return NextResponse.json(getMockVideos(id));
}
