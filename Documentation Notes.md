# Movie Search — Technical Implementation and Decision Notes

## 1. Project Overview

This project is part of the DEPT Full-Stack Coding Challenge. The frontend is developed using Next.js 16 (App Router), React, TypeScript, and Tailwind CSS.

The objective was to implement a movie search application without relying on the actual backend during development. I used Next.js Route Handlers to create a mock API that follows the given movie API contract.

I focused on maintaining the original project structure, reusing existing components, implementing the required features, and improving accessibility and error handling.

After completing the core requirements, I also worked on movie details, YouTube trailers, and TV-series search.

## 2. TypeScript Absolute Import Paths

I configured TypeScript path aliases in `tsconfig.json` to make imports more readable and easier to maintain.

Instead of using long relative paths such as `../../../components/SearchBar`, the application can use aliases such as:

`@components/SearchBar`

`@lib/api`

`@mock/fixtures`

`@globaltypes/movie`

The project uses aliases including:

- `~/*` — Project root
- `@/*` — Project root
- `@app/*` — Application directory
- `@components/*` — Shared components
- `@lib/*` — Utility functions and API logic
- `@mock/*` — Mock API fixtures and helpers
- `@constants` — Shared constants
- `@globaltypes/*` — TypeScript interfaces and types

I chose this approach because it reduces relative import complexity and makes files easier to move or refactor.

## 3. Mock API Implementation and Testing

I implemented the mock API using Next.js App Router Route Handlers under:

`app/api/mock/v1/`

I chose this approach because the project already uses Next.js 16, so no additional mock server, dependency, or separate runtime is required.

The mock API returns fixed JSON data rather than calling TMDB.

The movie endpoints include:

| Endpoint                  | Purpose                                |
| ------------------------- | -------------------------------------- |
| `GET /movies/trending`    | Return trending movies                 |
| `GET /movies/search`      | Search movies with pagination          |
| `GET /movies/{id}`        | Retrieve an individual movie's details |
| `GET /movies/{id}/videos` | Retrieve available movie videos        |

The implementation follows the provided API contract, including camelCase property names, pagination metadata, HTTP status codes, nullable fields, and error responses using `application/problem+json`.

I kept the mock data separate from the application components. The frontend communicates with the backend through the centralized API client in `lib/api.ts`.

## 4. API Base URL Configuration

The mock API base URL is configured in `.env.local`:

`NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/mock/v1`

When the real backend is available, the base URL can be changed to:

`NEXT_PUBLIC_API_BASE_URL=http://localhost:5080/api/v1`

Because the original movie endpoints follow the same API contract, the frontend movie functionality should continue working without changes to the API consumption logic, assuming the real backend implements the contract correctly.

The optional TV-series search uses an additional endpoint that was not included in the supplied contract. A real backend would need to support that endpoint separately.

## 5. Mock API Test Scenarios

I created predictable mock scenarios to test how the application behaves under different conditions.

| Scenario        | Test URL or input                                  | Expected result                                  |
| --------------- | -------------------------------------------------- | ------------------------------------------------ |
| Trending movies | `/`                                                | Displays trending movies                         |
| Movie search    | `/?query=batman&page=1`                            | Displays Batman search results                   |
| Pagination      | `/?query=batman&page=3`                            | Displays the third page                          |
| Empty results   | `/?query=noresults&page=1`                         | Displays a no-results message                    |
| Slow response   | `/?query=slow&page=1`                              | Simulates a delay of approximately three seconds |
| Server error    | `/?query=error&page=1`                             | Simulates HTTP 503                               |
| Invalid query   | `/api/mock/v1/movies/search?query=`                | Returns HTTP 400                                 |
| Invalid page    | `/api/mock/v1/movies/search?query=batman&page=501` | Returns HTTP 400                                 |

These scenarios make it easier to demonstrate loading, empty, error, and pagination behavior without depending on an external API.

## 6. Server-Side and Client-Side Rendering Decisions

I used a combination of Server Components and Client Components.

### Server Components

The main page (`app/page.tsx`) and movie detail page (`app/movies/[id]/page.tsx`) are Server Components.

They retrieve data through the centralized API client before rendering their content.

This keeps the API-fetching logic on the server and avoids introducing another client-side data-fetching library.

### Client Components

The SearchBar is a Client Component because it requires state and event handling.

It uses React state to manage the search query and selected media type.

When the user submits the form, Next.js navigation updates the URL with the query, page number, and media type.

The Server Component reads these values and retrieves the corresponding results.

This separation keeps interactive behavior on the client while preserving server-side data fetching.

## 7. Search and Pagination

The original SearchBar component was extended to support search submissions without changing the existing visual design.

Search queries are stored in the URL, making them shareable and allowing users to navigate directly to a particular results page.

Pagination is driven by the API response fields:

`page`, `totalPages`, and `totalResults`.

The pagination component provides Previous, Next, and numbered page links.

For TV-series search, the selected media type is preserved in the URL so that pagination does not unexpectedly switch back to movies.

## 8. Loading State — Accessibility and UX Decision

I retained the existing Next.js `loading.tsx` skeleton component to preserve the starter application's layout, visual consistency, and Tailwind CSS conventions.

Accessibility enhancements were introduced to provide meaningful loading feedback for both visual users and users of assistive technologies.

The implementation includes:

- `aria-busy="true"` to indicate that the main content is being updated.
- `aria-labelledby` to associate the main region with its loading heading.
- A semantic `<h1>` to identify the loading page.
- `role="status"` to provide a non-urgent screen-reader status message.
- `aria-hidden="true"` to prevent decorative skeleton placeholders from being announced.
- `motion-reduce:animate-none` to respect reduced-motion preferences.

The skeleton design was preserved because it provides a visual indication that content is loading without requiring a completely new interface.

The slow mock response can be demonstrated using:

`http://localhost:3000/?query=slow&page=1`

## 9. Error Recovery — Accessibility and UX Decision

I used Next.js error boundaries to handle unexpected failures during server-side data fetching and rendering.

The error interface displays a meaningful error message instead of leaving the page blank.

It provides two recovery actions:

**Try again:** Attempts to recover from the failed operation.

**Back to trending:** Provides a way to navigate back to the main movie listing if the error continues.

I used a button for retrying because it performs an action, and a link for navigation because it moves the user to another page.

Both controls include visible keyboard focus indicators.

The additional navigation option is a user-experience enhancement rather than an explicit WCAG requirement.

The mock error scenario can be demonstrated using:

`http://localhost:3000/?query=error&page=1`

The `error` query intentionally returns HTTP 503 every time. Therefore, retrying this scenario may display the same error again even when the retry mechanism is working.

The behavior of retry and navigation still needs to be verified in the browser.

## 10. Accessibility Considerations

I considered keyboard navigation and screen-reader support throughout the application.

The search field and media selector use native form controls. The search input has an associated label, and the media selector should also have its own accessible label.

Interactive elements use visible focus outlines.

Movie cards use semantic links to navigate to individual movie pages. This removes the need to add `tabIndex={0}` to non-interactive containers or implement custom keyboard handlers.

The pagination component uses navigation semantics, accessible labels, and `aria-current="page"` to identify the selected page.

The loading components support reduced motion and distinguish decorative content from meaningful status messages.

These decisions improve accessibility, but full WCAG 2.2 AA conformance requires additional keyboard, screen-reader, zoom, contrast, and browser testing.

## 11. Movie Details Page — P2 Implementation

I implemented an individual movie details page using the dynamic route:

`app/movies/[id]/page.tsx`

For example:

`http://localhost:3000/movies/268`

The movie detail page retrieves information from:

`GET /movies/{id}`

It displays the movie title, poster, overview, release year, rating, runtime, tagline, and genres when these fields are available.

I reused the existing API client rather than directly importing mock fixtures into the page.

This allows the movie details page to work with a compatible real backend.

### Movie Detail Mock Data

Additional mock metadata is stored in:

`lib/mock/details.ts`

The file extends the existing movie fixtures with runtime, tagline, and genre information.

Some movie records are fictional and are included specifically for testing pagination and detail-page rendering.

### Missing Movie Handling

If a requested movie does not exist, the mock API returns HTTP 404.

The application uses a custom `not-found.tsx` page to display a user-friendly message and a link back to the movie listing.

Example:

`http://localhost:3000/movies/999999`

## 12. YouTube Trailer Implementation

I added a mock videos endpoint:

`GET /movies/{id}/videos`

The movie details page uses this endpoint to retrieve videos associated with the selected movie.

Only videos with `site` equal to `YouTube` and `type` equal to `Trailer` are selected for embedding.

The selected trailer is displayed using a YouTube iframe.

The iframe includes a descriptive title for accessibility.

### Movie with a Trailer

`http://localhost:3000/movies/268`

This movie has a sample YouTube trailer entry in the mock data.

### Movie Without a Trailer

`http://localhost:3000/movies/10001`

When the API returns an empty videos array, the page displays:

_No trailer available for this movie._

I chose a text fallback rather than creating a fake video thumbnail or empty iframe.

This keeps the interface simple and gives users a clear explanation of the missing content.

A browser playback check is still needed to verify the sample YouTube key and embedding permissions.

## 13. TV-Series Search — P3 Extension

I extended the search interface with a Movies / TV Shows selector.

The selected media type is included in the URL.

The home page uses the media parameter to decide whether to call `searchMovies()` or `searchTvShows()`.

I created separate TV mock fixtures and a search endpoint under:

`app/api/mock/v1/tv/search/`

TV search results are displayed using a dedicated `TvGrid` component.

I kept movie and TV data types separate because they have different fields, such as `title` for movies and `name` for TV shows.

The TV search endpoint is an additional stretch feature. It is not part of the original movie API contract and should not be assumed to exist on the supplied real backend.

## 14. Search Performance and Caching

The application uses explicit form submission instead of fetching results on every keystroke.

I did not introduce debouncing because it would provide limited benefit with the current interaction model.

The movie detail API uses a five-minute revalidation option.

The existing movie and TV search functions use `cache: "no-store"`, meaning search-specific caching is not yet implemented in the reviewed code.

A short time-based caching policy for repeated searches is a possible P3 improvement, but it should only be documented as implemented once it has been added and verified.

I chose to prioritize reliable API behavior and clear mock demonstrations before adding further optimization complexity.

## 15. Testing Strategy

I added automated tests covering the movie search contract, pagination metadata, invalid requests, server errors, slow responses, movie details, missing movie IDs, trailer responses, and movie-card links.

I used the existing Vitest and React Testing Library setup instead of introducing a new testing framework.

The required validation commands are:

`pnpm lint && pnpm typecheck && pnpm test`

I also plan to run:

`pnpm build`

These checks should pass before final submission. I have not recorded passing results here because the commands have not been verified as part of this documentation review.

## 16. Implementation Trade-offs

I avoided introducing Redux, Zustand, or another global state-management library because the application's shared state requirements are limited.

I retained the existing Tailwind CSS setup and component structure.

I reused the existing movie components for trending and search results rather than creating unnecessary duplicates.

I kept the mock API separate from the frontend so the original movie backend contract remains unchanged.

I treated TV search as an optional extension because the README does not define a TV-specific backend contract.

I also avoided unnecessary debouncing because the search form is already submitted explicitly.

## 17. Conclusion

The project demonstrates how a frontend application can be developed independently of its backend while respecting an agreed API contract.

I completed the core movie search and pagination implementation, added loading and error handling, introduced movie details and trailer support, and extended the interface with TV-series search.

The main priorities were code readability, reusable components, predictable mock API behavior, accessibility improvements, and maintaining the original project architecture.

Further verification is needed for full accessibility conformance, browser behavior, production builds, and performance improvements.

## References

Next.js Documentation. https://nextjs.org/docs

Next.js App Router — Route Handlers. https://nextjs.org/docs/app/getting-started/route-handlers

Next.js App Router — Loading UI. https://nextjs.org/docs/app/api-reference/file-conventions/loading

Next.js App Router — Error Handling. https://nextjs.org/docs/app/getting-started/error-handling

React Documentation. https://react.dev

Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/

The Movie Database API Documentation. https://developer.themoviedb.org/reference/intro/getting-started
