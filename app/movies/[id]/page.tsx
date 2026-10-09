import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApiError, getMovieDetails, getMovieVideos } from "~/lib/api";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id: rawId } = await params;

  if (!/^[1-9]\d*$/.test(rawId)) {
    notFound();
  }

  const id = Number(rawId);

  if (!Number.isSafeInteger(id)) {
    notFound();
  }

  let movie;

  try {
    movie = await getMovieDetails(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const videos = await getMovieVideos(id);

  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const year = movie.releaseDate?.slice(0, 4);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <nav aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-sm text-brand-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Back to movies
        </Link>
      </nav>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-foreground">
          {movie.title}
        </h1>

        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {year && <span>{year}</span>}

          {movie.runtime !== null && <span>{movie.runtime} minutes</span>}

          <span>Rating: {movie.voteAverage.toFixed(1)} out of 10</span>
        </div>

        {movie.tagline && (
          <p className="text-sm text-muted italic">{movie.tagline}</p>
        )}
      </header>

      <section
        aria-labelledby="overview-heading"
        className="flex flex-col gap-6 md:flex-row"
      >
        <div className="relative aspect-[2/3] w-full max-w-64 shrink-0 overflow-hidden rounded-lg bg-surface">
          {movie.posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={`${movie.title} movie poster`}
              fill
              sizes="256px"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`No poster available for ${movie.title}`}
              className="flex h-full items-center justify-center text-center text-sm text-muted"
            >
              No poster available
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2
            id="overview-heading"
            className="text-xl font-semibold text-foreground"
          >
            Overview
          </h2>

          <p className="text-sm leading-7 text-muted">
            {movie.overview ?? "No overview available."}
          </p>

          {movie.genres.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-foreground">Genres</h3>

              <p className="text-sm text-muted">{movie.genres.join(", ")}</p>
            </div>
          )}
        </div>
      </section>

      <section
        aria-labelledby="trailer-heading"
        className="flex flex-col gap-4"
      >
        <h2
          id="trailer-heading"
          className="text-xl font-semibold text-foreground"
        >
          Trailer
        </h2>

        {trailer ? (
          <iframe
            title={`${movie.title} — ${trailer.name}`}
            src={`https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}`}
            className="aspect-video w-full rounded-lg border border-border"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <p className="text-sm text-muted">
            No trailer available for this movie.
          </p>
        )}
      </section>
    </main>
  );
}
