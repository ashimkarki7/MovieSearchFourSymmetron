export interface HomePageProps {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
    media?: string | string[];
  }>;
}
