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
import { Heart, HeartOff } from "lucide-react";
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
  const [isLiked, setIsLiked] = useState<boolean>(false);
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

  const handleLikeToggle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const token = await getToken();

    try {
      if (!isLiked) {
        await likeMovie(String(movie.id), "Like", token ?? undefined);
      } else {
        await removeLikedMovie(String(movie.id), token ?? undefined);
      }
      setIsLiked(!isLiked);
    } catch {
      toast.error("Failed to update like");
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
            className="absolute top-2 right-2 z-10 cursor-pointer w-6 h-6"
            onClick={handleWatchlistToggle}
          />
        )}

        {showLike && isHovering && (
          <button
            className="absolute top-2 left-2 z-10 text-white"
            onClick={handleLikeToggle}
          >
            {isLiked ? (
              <HeartOff className="w-6 h-6 text-red-500" />
            ) : (
              <Heart className="w-6 h-6" />
            )}
          </button>
        )}

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
        <div className="mt-3">
          <CardDescription
            className={
              variant === "trending"
                ? "trending-movie-meta"
                : "text-white/80 text-sm flex items-center justify-center gap-2"
            }
          >
            <span>{formatDate(movie.release_date)}</span>
            <img src={dot} className="w-1 h-1" />
            <span>{movie.runtime} min</span>
          </CardDescription>
        </div>
      )}
    </div>
  );
};

export default MoviePosterCard; 