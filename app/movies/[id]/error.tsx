"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MovieError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Movie details failed", error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">
        Unable to load movie details
      </h1>

      <p role="alert" className="text-sm text-muted">
        Something went wrong while loading this movie. Please try again.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={unstable_retry}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Back to movies
        </Link>
      </div>
    </main>
  );
}
