import { NextResponse } from "next/server";

export function problem(
  status: 400 | 404 | 500 | 503,
  title: string,
  detail: string,
) {
  return NextResponse.json(
    { type: "about:blank", title, status, detail },
    { status, headers: { "Content-Type": "application/problem+json" } },
  );
}
