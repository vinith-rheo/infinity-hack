import MovieCard from "@/MovieCard/MovieCard";
import movieData from "../data.json";
import { Input } from "@/components/ui/input";
export default function MovieList() {
  return (
    <>
      <Input className="w-1/2 mb-3 h-12" placeholder="Search for movies" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {movieData.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          );
        })}
      </div>
    </>
  );
}
