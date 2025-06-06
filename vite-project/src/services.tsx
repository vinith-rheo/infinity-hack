export async function getMovies() {
  const response = await fetch("/movies/list");
  const data = await response.json();
  return data.results;
}