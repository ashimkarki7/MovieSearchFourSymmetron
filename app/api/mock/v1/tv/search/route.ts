import { NextRequest, NextResponse } from "next/server";

import { MOCK_TV_SHOWS } from "@mock/tv";
import { PAGE_SIZE, VALID_PAGE } from "@constants";
import { problem } from "@mock/problem";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const query = params.get("query")?.trim();
  const rawPage = params.get("page") ?? "1";

  if (!query) {
    return problem(
      400,
      "Invalid request",
      "The 'query' parameter is required.",
    );
  }

  if (!VALID_PAGE.test(rawPage) || Number(rawPage) > 500) {
    return problem(
      400,
      "Invalid request",
      "The 'page' parameter must be between 1 and 500.",
    );
  }

  const page = Number(rawPage);

  if (query.toLowerCase() === "error") {
    return problem(
      503,
      "Service Unavailable",
      "The TV service is temporarily unavailable.",
    );
  }

  if (query.toLowerCase() === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  const matches =
    query.toLowerCase() === "noresults"
      ? []
      : MOCK_TV_SHOWS.filter((show) =>
          show.name.toLowerCase().includes(query.toLowerCase()),
        );

  const totalResults = matches.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  if (page > Math.max(1, totalPages)) {
    return problem(
      400,
      "Invalid request",
      "The requested page is out of range.",
    );
  }

  return NextResponse.json({
    page,
    totalPages,
    totalResults,
    results: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  });
}
