
import { useNavigate } from "react-router";
import { getYearFromDate } from "@/lib/utils";

export type Movie = {
  id:number;
  title: string;
  tagline: string;
  genres: { id: number; name: string }[];
  overview: string;
  poster_url: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  homepage: string;
};

const MovieCard = ({ movie }: { movie: Movie }) => {

  const navigate= useNavigate();
const{poster_url,title,release_date,runtime}=movie
  return (
    <div
      className={`w-50 flex-wrap mr-4 rounded-lg`}
      onClick={(e)=>{
        navigate(`/movies/movie/${movie.id}`)
      }}
    >
      <img
        src={poster_url}
        alt={title}
        className="w-full h-60 object-cover rounded-md"
      />

      <div className="p-2">
        <h3 className="text-white text-sm mt-2 truncate">{title}</h3>

      <div className="text-gray-400 text-xs mt-1 flex justify-between items-center gap-1">
        <span>{getYearFromDate(release_date)}</span>
        <span>
          <span className="text-red-500">•</span>
        <span>{runtime}</span>
        </span>
      </div>
      </div>
    </div>
  );
};

export default MovieCard;
