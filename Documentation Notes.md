Absolute imports paths in TsConfig

"paths": {
"~/_": ["./_"],
"@/_": ["./_"],
"@app/_": ["./app/_"],

      "@components": ["./components/index.ts"],
      "@components/*": ["./components/*"],
      "@components-types/*": ["./components/*/types"],

      "@lib/*": ["./lib/*"],
      "@mock/*": ["./lib/mock/*"],
     .....

Mock API Implementation and Testing

I implemented the Mock API using Next.js App Router Route Handlers under app/api/mock/v1/movies/.
I chose this approach because the project already uses Next.js 16, so no additional mock server or dependencies are required.

The implementation follows the provided API contract, including response structures, camelCase properties, pagination metadata, HTTP status codes, and error responses using application/problem+json.

The frontend communicates with the API through a centralized API client in lib/api.ts.

The Mock API base URL is configured as:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/mock/v1

When the real backend becomes available, the base URL can be replaced with:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5080/api/v1

No changes to frontend API-consumption logic should be necessary because both implementations follow the same contract.

reference :https://developer.themoviedb.org/reference/collection-details

Error Recovery and AccessibilitLoading State — Accessibility and UX Decision

Implementation approach

The existing Next.js loading.tsx skeleton component was retained to preserve the starter application's layout, visual consistency, and Tailwind CSS conventions.

Accessibility enhancements were introduced to provide meaningful loading feedback for both visual users and users of assistive technologies.

Accessibility considerations

aria-busy="true" identifies the main content as being updated during loading.

aria-labelledby associates the main region with its visible loading heading.

A semantic <h1> provides a meaningful page heading while content is loading.

role="status" identifies the screen-reader loading message as a non-urgent status update.

aria-hidden="true" prevents decorative skeleton placeholders from being announced by screen readers.

motion-reduce:animate-none respects operating-system reduced-motion preferences.y Decision

The existing Next.js error boundary was retained, using the framework-provided reset() function to retry rendering after an unsuccessful API request.

An optional "Back to trending" navigation link was introduced to give users an alternative recovery path when repeated retries fail.

Semantic HTML elements were selected according to their purpose: a button for retrying an operation and a link for navigation. Visible keyboard focus indicators were added to improve accessibility.

The additional navigation option is a user-experience enhancement rather than a WCAG requirement. The implementation does not depend on custom routing workarounds or changes to the API contract.

Loading State — Accessibility and UX Decision

Implementation approach

The existing Next.js loading.tsx skeleton component was retained to preserve the starter application's layout, visual consistency, and Tailwind CSS conventions.

Accessibility enhancements were introduced to provide meaningful loading feedback for both visual users and users of assistive technologies.

Accessibility considerations

aria-busy="true" identifies the main content as being updated during loading.

aria-labelledby associates the main region with its visible loading heading.

A semantic <h1> provides a meaningful page heading while content is loading.

role="status" identifies the screen-reader loading message as a non-urgent status update.

aria-hidden="true" prevents decorative skeleton placeholders from being announced by screen readers.

motion-reduce:animate-none respects operating-system reduced-motion preferences.
http://localhost:3000/?query=slow&page=1 mock api for loading
