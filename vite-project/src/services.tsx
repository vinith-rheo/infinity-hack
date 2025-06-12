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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMovies(page: number, limit: number, sort?: string): Promise<Movie[]> {
  const sortQuery = sort ? `&sort_by=${sort}` : "";
  const response = await fetch(
    `${BACKEND_URL}/api/movies/list?page=${page}&limit=${limit}${sortQuery}`
  );
  const data = await response.json();
  return data.movies;
}
