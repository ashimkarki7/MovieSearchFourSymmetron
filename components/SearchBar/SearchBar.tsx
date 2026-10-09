"use client";

import type { SearchBarProps } from "@globaltypes/searchbar";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function SearchBar({ query = "" }: SearchBarProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(query);

  // Sync the input when the URL changes
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // TODO(candidate): wire this up to lib/api.ts's searchMovies() and render results
  // (with pagination) instead of just logging. See lib/api.ts and app/page.tsx.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      router.push("/");
      return;
    }

    const params = new URLSearchParams({
      query: trimmedQuery,
      page: "1",
    });

    router.push(`/?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full max-w-md gap-2"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search for a movie
      </label>

      <input
        id="movie-search"
        type="search"
        name="query"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search for a movie…"
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      />

      <button
        type="submit"
        className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Search
      </button>
    </form>
  );
}
