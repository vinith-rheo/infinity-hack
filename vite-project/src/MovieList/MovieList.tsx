import MovieCard from "@/MovieCard/MovieCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getMovies, type Movie } from "@/services";
import { UserButton } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackIcon from '../../public/Icons/BackIcon.svg'
export default function MovieList() {
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const fetchMovies = async () => {
    setMoviesLoading(true);
    const data = await getMovies(page, limit, sort);
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
        <div className="w-full min-h-screen bg-[var(--color-mono-black)]">
          
          <div className="flex justify-between w-full pt-2 bg-[var(--color-mono-black)]">
            
            <div className="flex w-full">
              <Button className="w-[99px] h-10 gap-1 rounded-sm border p-[8px_12px] mr-4 flex justify-start"><img className="h-3/4" src={BackIcon}/>Back</Button>
              <Input
              className="w-1/2 mb-3 h-10 bg-[#222C38]"
              placeholder="Search for movies"
            />

            </div>
            <span className="p-2">
              <UserButton afterSignOutUrl={"/"} />
            </span>
          </div>
         <div className="">
           <div className="flex flex-wrap justify-center m-2 gap-8">
            {movies.map((movie) => {
              return (
                <MovieCard
    
                  key={movie.id}
                  movie={{
                    id:movie.id,
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
        </div>
      )}
    </>
  );
}
