import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type Movie = {
  title: string;
  tagline: string;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  homepage: string;
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card className="max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg flex flex-col sm:flex-row">
      <img
        src={`/assets/326.jpg`}
        alt={movie.title}
        className="w-full sm:w-1/3 h-auto object-cover"
      />
      <div className="flex-1 p-4 flex flex-col justify-between">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold">{movie.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{movie.tagline}</p>
        </CardHeader>

        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>

        <CardContent className="p-0 text-sm text-muted-foreground mb-4 line-clamp-4">
          {movie.overview}
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