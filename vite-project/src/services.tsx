export interface Movie {
  _id: string;
  adult: string;
  belongs_to_collection: string;
  budget: number;
  genres: string;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  poster_url: string;
  production_companies: string;
  production_countries: string;
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: string;
  status: string;
  tagline: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
}
export async function getMovies(): Promise<Movie[]> {
  const response = await fetch("/api/movies/list");
  const data = await response.json();
  return data.movies;
}
