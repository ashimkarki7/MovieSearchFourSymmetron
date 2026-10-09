import { SearchBar } from "~/components/SearchBar";
import { TrendingGrid } from "~/components/TrendingGrid";
import { Pagination } from "~/components/Pagination";
import { getTrendingMovies, searchMovies } from "~/lib/api";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { query: rawQuery, page: rawPage } = await searchParams;

  const query = rawQuery?.trim() ?? "";
  const page = rawPage ? Number(rawPage) : 1;

  const isSearching = Boolean(query);

  const searchResult = isSearching ? await searchMovies(query, page) : null;

  const movies = searchResult
    ? searchResult.results
    : await getTrendingMovies();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Movie Search Case
        </h1>

        <SearchBar key={query} query={query} />
      </header>

      <section aria-labelledby="movies-heading" className="flex flex-col gap-4">
        <h2 id="movies-heading" className="text-lg font-medium text-foreground">
          {isSearching ? `Search results for "${query}"` : "Trending this week"}
        </h2>

        {searchResult && (
          <p role="status" className="text-sm text-muted">
            {searchResult.totalResults === 0
              ? "No movies found. Try another search."
              : `${searchResult.totalResults} movies found`}
          </p>
        )}

        {movies.length > 0 && <TrendingGrid movies={movies} />}

        {searchResult && (
          <Pagination
            query={query}
            page={searchResult.page}
            totalPages={searchResult.totalPages}
            totalResults={searchResult.totalResults}
          />
        )}
      </section>
    </main>
  );
}
