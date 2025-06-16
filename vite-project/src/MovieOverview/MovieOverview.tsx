import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getMoreLikeThis,
  getMovieDetails,
  type Movie,
} from "@/services";
import type { MovieDetails } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import CastCard from "./CastCard";
import MoviePosterCard from "@/components/MoviePosterCard";

const MovieOverview = () => {
  const { id: movieId } = useParams();
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(false);
  const { getToken } = useAuth();
  const [youMayLikeListLoading, setYouMayLikeListLoading] =
    useState<boolean>(false);
  const [youMayLike, setYouMayLike] = useState<Movie[] | null>(null);
  const [showAllCast, setShowAllCast] = useState<boolean>(false);

  const [movie, setMovie] = useState<MovieDetails>({
    castdata: {
      cast: [],
      crew: [],
    },
    movie: {
      _id: "",
      adult: "",
      belongs_to_collection: "",
      budget: 0,
      genres: [],
      homepage: "",
      id: 0,
      imdb_id: "",
      original_language: "",
      original_title: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      poster_url: "",
      production_companies: "",
      production_countries: "",
      release_date: "",
      revenue: 0,
      runtime: 0,
      spoken_languages: "",
      status: "",
      tagline: "",
      title: "",
      video: "",
      vote_average: 0,
      vote_count: 0,
    },
    rating: null,
  });

  const fetchMovies = async () => {
    if (movieId) {
      setIsLoadingMovie(true);
      const token = await getToken();
      const movie = await getMovieDetails(movieId, token ?? "");
      setMovie(movie);
    }
    setIsLoadingMovie(false);
  };

  const fetchYouMayLike = async () => {
    if (movieId) {
      setYouMayLikeListLoading(true);
      const token = await getToken();
      const youMayLike = await getMoreLikeThis(movieId, token ?? "");
      setYouMayLike(youMayLike);
    }
    setYouMayLikeListLoading(false);
  };

  useEffect(() => {
    fetchMovies();
    fetchYouMayLike();
  }, [movieId]);

  const { title, poster_url, genres, overview } = movie.movie;

  const cast = movie?.castdata?.cast?.map((c) => {
    return {
      name: c.name,
      role: c.character,
      image: c.profile_url,
    };
  });

  const visibleCast = showAllCast ? cast : cast?.slice(0, 10);

  return isLoadingMovie ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <div className="min-h-screen overflow-auto bg-black">
      <div className="relative w-full min-h-[70vh]">
        <div 
          className="absolute inset-0 h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), url(${poster_url})`,
            zIndex: 0
          }}
        />
        <div className="absolute inset-0 w-full h-[70vh] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
        <div className="absolute top-1/2 left-0 max-w-4xl transform -translate-y-1/2 z-20 px-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight font-inter text-white">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light font-inter text-white/90">
            {overview}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {genres.map((genre) => (
              <Badge key={genre.id} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                {genre.name}
              </Badge>
            ))}
          </div>
          <span className="flex flex-wrap mt-2">
            <p className="ml-2 font-medium text-[20px] leading-[100%] tracking-[0] font-inter text-white">
              Directed by:
            </p>
          </span>
        </div>
      </div>
      <div className="relative bg-black min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <p className="text-3xl md:text-4xl font-semibold font-inter text-white mb-6">
            Cast
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {visibleCast?.map((member) => (
              <CastCard
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
          {cast && cast.length > 10 && (
            <div className="mt-6 text-center">
              <button
                className="text-white/80 hover:text-white underline"
                onClick={() => setShowAllCast((prev) => !prev)}
              >
                {showAllCast ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
        {/* You May Also Like Section */}
        {!youMayLikeListLoading ? (
          <div className="container mx-auto px-4 py-10">
            <div className="section-header flex justify-between items-center mb-6">
              <h2 className="section-title text-2xl font-medium text-white">You may also like</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {youMayLike?.map((movie) => (
                <MoviePosterCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-8 py-6">
            <div className="section-header flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-32 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            <div className="trending-movies-grid">
              <div className="trending-movies-row flex flex-wrap gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-[175px]">
                    <Skeleton className="h-[250px] w-full rounded-lg" />
                    <div className="trending-movie-info mt-2">
                      <Skeleton className="h-4 w-24 rounded mb-1" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
