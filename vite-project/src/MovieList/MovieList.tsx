import MovieCard from "@/MovieCard/MovieCard";
import movieData from "../data.json";
import { UserButton } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import  Logo from '../assets/logo- clapboard.svg'
export default function MovieList() {
  return (
    <>
     <header className=" display flex items-center justify-between p-4 bg-gray-800 text-white">

<img src={Logo as string} alt="logo" className="size-10 w-24 justify-content-start" />

      <UserButton/>
     
    </header>
      <Input className="w-100 mb-3 h-12 mt-3" placeholder="Search for movies" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {movieData.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              title={movie.title}
              image={`${movie.id}.jpg`}
              overview={movie.overview}
              genre={movie.genres}
            />
          );
        })}
      </div>
    </>
  );
}
