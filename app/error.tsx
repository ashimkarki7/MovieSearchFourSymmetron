"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  const router = useRouter();
  const isUnavailable = error.status === 503;

  useEffect(() => {
    console.error("Movie search request failed", error);
  }, [error]);

  const handleBackToTrending = () => {
    reset();
    router.replace("/");
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">
        {isUnavailable
          ? "Movie service temporarily unavailable"
          : "Unable to load movies"}
      </h1>
      <p role="alert" className="text-sm text-muted">
        {isUnavailable
          ? "The movie service isn't responding right now. Please try again."
          : "We couldn't load the movies. Check your connection or try again."}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Try again
        </button>

        <Link
          href="/"
          onNavigate={(event) => {
            event.preventDefault();
            handleBackToTrending();
          }}
          className="rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Back to trending
        </Link>
      </div>
    </main>
  );
}
