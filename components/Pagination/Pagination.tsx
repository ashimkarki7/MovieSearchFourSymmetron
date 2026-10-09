import type { PaginationProps } from "@globaltypes/movie";

export function Pagination({
  query,
  page,
  totalPages,
  totalResults,
  media = "movie",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const href = (target: number) =>
    `/?${new URLSearchParams({ query, page: String(target), media })}`;
  const linkClass =
    "rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400";
  return (
    <nav
      aria-label="Search results pagination"
      className="flex flex-col items-center gap-3"
    >
      <p className="text-sm text-muted">
        Page {page} of {totalPages} · {totalResults} results
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <a href={href(page - 1)} className={linkClass} rel="prev">
            Previous
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="rounded-md border border-border px-3 py-2 text-sm text-muted opacity-60"
          >
            Previous
          </span>
        )}
        {pages.map((target) => (
          <a
            key={target}
            href={href(target)}
            aria-label={`Go to page ${target}`}
            aria-current={target === page ? "page" : undefined}
            className={`${linkClass} ${target === page ? "border-brand-400 bg-surface-hover font-semibold" : ""}`}
          >
            {target}
          </a>
        ))}
        {page < totalPages ? (
          <a href={href(page + 1)} className={linkClass} rel="next">
            Next
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="rounded-md border border-border px-3 py-2 text-sm text-muted opacity-60"
          >
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
