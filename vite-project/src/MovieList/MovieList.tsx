import MovieCard from "@/MovieCard/MovieCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getMovies, type Movie } from "@/services";
import { UserButton } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
export default function MovieList() {
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    setMoviesLoading(true);
    const data = await getMovies();
    setMovies(data);
    setMoviesLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      {moviesLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-[#000000]">
          <div className="flex justify-between w-full pt-2 bg-[#000000]">
            <Input
              className="w-1/2 mb-3 h-12 bg-[#B6B09F]"
              placeholder="Search for movies"
            />
            <span className="p-2">
              <UserButton afterSignOutUrl={"/"} />
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={{
                    genres: [],
                    title: movie.title,
                    tagline: movie.tagline,
                    overview: movie.overview,
                    poster_url: movie.poster_url,
                    release_date: String(movie.release_date),
                    vote_average: movie.vote_average,
                    runtime: movie.runtime,
                    homepage: movie.homepage,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
