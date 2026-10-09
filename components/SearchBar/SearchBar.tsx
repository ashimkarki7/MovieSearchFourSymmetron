"use client";

import type { SearchBarProps } from "@globaltypes/searchbar";

export function SearchBar({ query = "" }: SearchBarProps) {
  return (
    <form
      action="/"
      method="get"
      role="search"
      className="flex w-full max-w-md gap-2"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search for a movie
      </label>
      <input
        key={query}
        id="movie-search"
        type="search"
        name="query"
        defaultValue={query}
        placeholder="Search for a movie…"
        className="w-full min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:border-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
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
