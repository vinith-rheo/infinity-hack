import { Card, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  setWatchList,
  removeWatchList,
  likeMovie,
  removeLikedMovie,
  type Movie,
} from "@/services";
import watchListIconEmpty from "@/Home/watchListIconNoFill.svg";
import watchListIconFilled from "@/Home/watchListIconWithFill.svg";
import {ThumbsDown, ThumbsUp } from "lucide-react";
import dot from "@/Home/dot.svg";

interface MoviePosterCardProps {
  movie: Movie;
  /** Show metadata (year • runtime) under the poster */
  showMeta?: boolean;
  /** Show like button */
  showLike?: boolean;
  /** Visual variant for different layout needs */
  variant?: "default" | "trending";
}

const formatDate = (dateString: string | number | Date) =>
  new Date(dateString).toLocaleDateString("en-US", { year: "numeric" });

const MoviePosterCard: React.FC<MoviePosterCardProps> = ({
  movie,
  showMeta = true,
  showLike = true,
  variant = "default",
}) => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(
    movie.is_watchlisted ?? false
  );
  const [isLiked, setIsLiked] = useState<boolean| null>(null);
  const [isDisliked, setIsDisliked] = useState<boolean| null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleWatchlistToggle = async (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    e.stopPropagation();
    const token = await getToken();

    try {
      if (!isWatchlisted) {
        await setWatchList(movie.id, token ?? undefined);
        toast.success("Movie added to watchlist");
      } else {
        await removeWatchList(movie.id, token ?? undefined);
        toast.success("Movie removed from watchlist");
      }
      setIsWatchlisted(!isWatchlisted);
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleLikeMovie = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const token = await getToken();

    try {
      if (isLiked === null) {
        await likeMovie(movie.id, "Like", token ?? undefined);
        setIsLiked(true);
      } 
      else{
        await removeLikedMovie(movie.id,token ?? undefined)
        setIsLiked(false)
      }
      
    } catch {
      toast.error("Failed to update like");
    }
  };
   const handleDislikeMovie = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const token = await getToken();
    try {
     if(isDisliked === null){
       await removeLikedMovie(movie.id, token ?? undefined);
        await likeMovie(movie.id, "Dislike", token ?? undefined);
        setIsLiked(null);
        setIsDisliked(true)
      
     }
     else{
      setIsDisliked(false);
     }
    } catch {
      toast.error("Failed to update preference");
    }
  };

  return (
    <div
      className="cursor-pointer group relative overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate(`/movies/movie/${movie.id}`)}
    >
      <Card
        className={
          variant === "trending"
            ? "trending-movie-card group-hover:scale-105 transition-transform duration-200"
            : "aspect-[2/3] w-full h-full bg-gray-900/20 group-hover:scale-105 transition-transform duration-200"
        }
      >
        {isHovering && (
          <img
            src={isWatchlisted ? watchListIconFilled : watchListIconEmpty}
            alt="Watchlist Toggle"
            className="absolute top-4 right-4 z-10 cursor-pointer w-6 h-6"
            onClick={handleWatchlistToggle}
          />
        )}

 {showLike && isHovering && (
         

  <div className="absolute w-full flex space-x-2">
    <button type="button" className="absolute top-4 left-4 z-10 cursor-pointer w-6 h-6" onClick={handleLikeMovie}>
      <ThumbsUp fill={isLiked?'black':'transparent'} />
    </button>
    <button type="button" className="absolute top-4 left-10 z-10 cursor-pointer w-6 h-6" onClick={handleDislikeMovie}>
      <ThumbsDown fill={isDisliked?'black':'transparent'} />
    </button>
  </div>
) 
            
        }

        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/175x250/333/cccccc?text=No+Poster";
          }}
        />
      </Card>
      {showMeta && (
        <div className="mt-3 ">
          <CardDescription
            className={
              variant === "trending"
                ? "trending-movie-meta"
                : "text-white/80 text-sm flex items-center justify-center gap-2"
            }
          >
            <span>{formatDate(movie.release_date)}</span>
            <img src={dot} className="w-2 h-2 space-between" />
            <span>{movie.runtime} min</span>
          </CardDescription>
        </div>
      )}
    </div>
  );
};

export default MoviePosterCard; 