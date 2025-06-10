export async function getMovies() {
  const response = await fetch("/api/movies/list");
  const data = await response.json();
  return data.movies;
}