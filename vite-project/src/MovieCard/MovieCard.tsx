import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

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

  const [fullOverview,setFullOverview]=useState<string>(movie.overview);
  const [toggleOverview,setToggleOverview]=useState<boolean>(false);
  const navigate =useNavigate();

  const shortOverview= fullOverview.substring(0,40);



  return (
    <Card className="relative max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg flex flex-col sm:flex-row">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        
      />
      
      <div className="relative z-20 flex-1 p-4 flex flex-col justify-between" >
        <div className="cursor-pointer" onClick={() => navigate(`movie/${movie.id}`)}>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold text-[bisque]">{movie.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{movie.tagline}</p>
        </CardHeader>

        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
        </div>

        <CardContent onClick={(e)=>{
          setToggleOverview(!toggleOverview)
        }} className="p-0 text-sm text-muted-foreground mb-4 line-clamp-4 cursor-pointer">
          {toggleOverview?fullOverview:shortOverview}
        </CardContent>

        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>🗓 {new Date(movie.release_date).toLocaleDateString()}</span>
          <span>⏱ {movie.runtime} mins</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <Button asChild variant="outline">
          <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
            Visit Homepage
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default MovieCard;