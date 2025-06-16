import type { Genre, MovieDetails } from "./lib/types";

export interface Movie {
  _id: string;
  adult: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
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
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: string;
  status: string;
  tagline: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
  is_watchlisted?:boolean
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function getAuthHeaders(token?: string): Record<string, string> {
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

async function fetchWithAuth(url: string, options: RequestInit = {}, token?: string): Promise<Response | undefined> {
  const baseHeaders = getAuthHeaders(token);
  const headers = {
    ...(options.headers || {}),
    ...baseHeaders
  };
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    window.location.href = "/login";
    return;
  }
  return response;
}

export async function getMovies(page: number, limit: number, sort?: string, token?: string): Promise<Movie[]> {
  const sortQuery = sort ? `&sort_by=${sort}` : "";
  const response = await fetchWithAuth(
    `${BACKEND_URL}/movies/list?page=${page}&limit=${limit}${sortQuery}`,
    {},
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data.movies;
}


export async function getMovieDetails(id: string, token?: string): Promise<MovieDetails> {
  const response = await fetch(`${BACKEND_URL}/movies/movie/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export async function getWatchlistMovies(page: number,token?: string, search?: string, year?: string, genre?: string,): Promise<Movie[]> {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", page.toString());
  if (search) queryParams.append("search", search);
  if (year) queryParams.append("year", year);
  if (genre) queryParams.append("genre", genre);

  const response = await fetchWithAuth(
    `${BACKEND_URL}/watchlist/get?${queryParams.toString()}`,
    {},
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data.movies;
}

export async function setWatchList(id: number,token?: string): Promise<Movie[]> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/watchlist/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id: id })
    },
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data;
}

export async function removeWatchList(id: number,token?: string): Promise<Movie[]> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/watchlist/remove?movie_id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data;
}



export async function likeActor(actorId: number, token?: string): Promise<boolean> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/user/add_liked_actor`,
    {
      method: "POST",
      body: JSON.stringify({ actor_id: actorId }),
    },
    token
  );
  return Boolean(response?.ok);
}

export async function removeLikedActor(actorId: number, token?: string): Promise<boolean> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/user/remove_liked_actor?actor_id=${actorId}`,
    {
      method: "DELETE",
    },
    token
  );
  return Boolean(response?.ok);
}

export async function likeMovie(movieId: string, preference: "Like" | "Dislike", token?: string): Promise<boolean> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/user/add_liked_movie`,
    {
      method: "POST",
      body: JSON.stringify({ movie_id: movieId, preference }),
    },
    token
  );
  return Boolean(response?.ok);
}

export async function removeLikedMovie(movieId: string, token?: string): Promise<boolean> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/user/remove_liked_movie?movie_id=${movieId}`,
    {
      method: "DELETE",
    },
    token
  );
  return Boolean(response?.ok);
}

export async function getMoreLikeThis(movieId: string, token?: string): Promise<Movie[]> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/movies/get-similar-movies/${movieId}`,
    {},
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data;
}

export async function smartSearch(query: string, token?: string): Promise<Movie[]> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/movies/semantic-search`,
    {method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query: query})},
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data.results;
}

export async function getRecommendations(mood: string, token?: string): Promise<Movie[]> {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/movies/recommendations`,
    {
      method: "POST",
      body: JSON.stringify({mood: mood}),
    }
    ,
    token
  );
  if (!response) return [];
  const data = await response.json();
  return data;
}