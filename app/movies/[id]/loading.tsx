export default function MovieLoading() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading movie details…
      </p>

      <main
        aria-busy="true"
        aria-labelledby="movie-loading-heading"
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10"
      >
        <h1
          id="movie-loading-heading"
          className="text-2xl font-semibold text-foreground"
        >
          Loading movie details…
        </h1>

        <div aria-hidden="true" className="flex flex-col gap-6 md:flex-row">
          <div className="aspect-[2/3] w-full max-w-64 animate-pulse rounded-lg bg-surface motion-reduce:animate-none" />

          <div className="flex flex-1 flex-col gap-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-surface motion-reduce:animate-none" />

            <div className="h-5 w-full animate-pulse rounded bg-surface motion-reduce:animate-none" />

            <div className="h-5 w-5/6 animate-pulse rounded bg-surface motion-reduce:animate-none" />
          </div>
        </div>
      </main>
    </>
  );
}
