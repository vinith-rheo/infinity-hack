import MovieCard from "@/MovieCard/MovieCard";
import movieData from "../data.json";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { getMovies } from "@/services";
import { UserButton } from "@clerk/clerk-react";
export default function MovieList() {
  useEffect(() => {
    getMovies().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className='w-full min-h-screen bg-[#000000]'>
  <div className="flex justify-between w-full pt-2 bg-[#000000]">
      <Input className="w-1/2 mb-3 h-12 bg-[#B6B09F]" placeholder="Search for movies" />
      <span className="p-2">
         <UserButton afterSignOutUrl={'/'}/>
      </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {movieData.map((movie) => {
          return (
            <MovieCard
            id={movie.id}
              key={movie.id}
              movie={movie}
            />
          );
        })}
      </div>
    </div>
  );
}
