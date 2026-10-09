export type SearchMedia = "movie" | "tv";

export interface SearchBarProps {
  query?: string;
  media?: SearchMedia;
}
