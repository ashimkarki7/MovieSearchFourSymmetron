import { TRENDING_MOVIES } from "@mock/fixtures";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(TRENDING_MOVIES);
}