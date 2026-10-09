import { SearchBar } from "@components/SearchBar";
import { TrendingGrid } from "@components/TrendingGrid";
import { Pagination } from "@components/Pagination";
import { getTrendingMovies, searchMovies, searchTvShows } from "@lib/api";
import type { HomePageProps } from "@globaltypes/homepage";
import { TvGrid } from "@components/TvGrid";

// export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const rawQuery = Array.isArray(params.query) ? params.query[0] : params.query;

  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;

  const rawMedia = Array.isArray(params.media) ? params.media[0] : params.media;

  const media = rawMedia === "tv" ? "tv" : "movie";

  const validPage = rawPage && /^[1-9]\d*$/.test(rawPage) ? Number(rawPage) : 1;

  const page =
    Number.isInteger(validPage) && validPage >= 1 && validPage <= 500
      ? validPage
      : 1;

  const query = rawQuery?.trim() ?? "";

  const isSearching = Boolean(query);

  const movieResult =
    isSearching && media === "movie" ? await searchMovies(query, page) : null;

  const tvResult =
    isSearching && media === "tv" ? await searchTvShows(query, page) : null;

  const movies = !isSearching
    ? await getTrendingMovies()
    : (movieResult?.results ?? []);

  const tvShows = tvResult?.results ?? [];

  const searchResult = media === "tv" ? tvResult : movieResult;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Movie Search Case
        </h1>

        <SearchBar query={query} media={media} />
      </header>

      <section aria-labelledby="movies-heading" className="flex flex-col gap-4">
        <h2 id="movies-heading" className="text-lg font-medium text-foreground">
          {isSearching ? `Search results for "${query}"` : "Trending this week"}
        </h2>

        {searchResult && (
          <p role="status" className="text-sm text-muted">
            {searchResult.totalResults === 0
              ? `No ${media?.charAt(0)?.toUpperCase() + media?.slice(1)} shows found. Try another search.`
              : `${searchResult.totalResults} ${
                  media === "tv" ? "TV shows" : "movies"
                } found`}
          </p>
        )}

        {media === "tv" && isSearching ? (
          <TvGrid shows={tvShows} />
        ) : (
          movies.length > 0 && <TrendingGrid movies={movies} />
        )}

        {searchResult && (
          <Pagination
            query={query}
            page={searchResult.page}
            totalPages={searchResult.totalPages}
            totalResults={searchResult.totalResults}
            media={media}
          />
        )}
      </section>
    </main>
  );
}
