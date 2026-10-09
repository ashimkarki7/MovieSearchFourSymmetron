import { SearchBar } from "@components/SearchBar";
import { TrendingGrid } from "@components/TrendingGrid";
import { getTrendingMovies, searchMovies } from "@lib/api";
import type { SearchParams } from "@globaltypes/movie";
import { Pagination } from "@components/Pagination";

// Renders per-request rather than being statically generated at build time,
// since this page depends on the .NET API being reachable — which it isn't
// during `next build` in CI.
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.query) ? params.query[0] : params.query;
  const query = rawQuery?.trim() ?? "";
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;

  if (!query) {
    const trendingMovies = await getTrendingMovies();
    return (
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Movie Search Case
          </h1>
          <SearchBar />
        </header>
        <section
          aria-labelledby="trending-heading"
          className="flex flex-col gap-4"
        >
          <h2
            id="trending-heading"
            className="text-lg font-medium text-foreground"
          >
            Trending this week
          </h2>
          <TrendingGrid movies={trendingMovies} />
        </section>
      </main>
    );
  }

  const page = rawPage === undefined ? 1 : Number(rawPage);
  const search = await searchMovies(query, page);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Movie Search Case
        </h1>
        <SearchBar />
      </header>

      <section aria-labelledby="search-heading" className="flex flex-col gap-4">
        <h2 id="search-heading" className="text-lg font-medium text-foreground">
          Search results for “{query}”
        </h2>
        <p role="status" className="text-sm text-muted">
          {search.totalResults === 0
            ? "No movies found. Try another search term."
            : `${search.totalResults} movies found`}
        </p>
        {search.results.length > 0 && <TrendingGrid movies={search.results} />}
        <Pagination
          query={query}
          page={search.page}
          totalPages={search.totalPages}
          totalResults={search.totalResults}
        />
      </section>
    </main>
  );
}
