import { NextResponse } from "next/server";

import { getMockMovie } from "@mock/details";
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

  const movie = getMockMovie(id);

  if (!movie) {
    return problem(404, "Not Found", "The requested movie was not found.");
  }

  if (id === 1002 && process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  return NextResponse.json(movie);
}
