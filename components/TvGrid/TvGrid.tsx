import type { TvShow } from "@globaltypes/tv";

interface TvGridProps {
  shows: TvShow[];
}

export function TvGrid({ shows }: TvGridProps) {
  if (shows.length === 0) {
    return <p className="text-sm text-muted">No TV shows found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {shows.map((show) => (
        <article
          key={show.id}
          className="overflow-hidden rounded-lg border border-border bg-surface"
        >
          <div className="flex aspect-[2/3] items-center justify-center bg-surface text-xs text-muted">
            No poster
          </div>

          <div className="flex flex-col gap-1 p-3">
            <h3 className="line-clamp-1 text-sm font-medium text-foreground">
              {show.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-muted">
              {show.firstAirDate && (
                <span>{show.firstAirDate.slice(0, 4)}</span>
              )}

              <span>★ {show.voteAverage.toFixed(1)}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
