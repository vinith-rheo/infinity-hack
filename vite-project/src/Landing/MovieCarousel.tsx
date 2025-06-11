import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import '../styles/movieCarousal.css';

type Movie = {
  id: number;
  image: string;
  title: string;
  release_date: string;
  genres: { name: string }[];
};

type MovieCarouselProps = {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
};

export default function MovieCarousel({ movies, onMovieClick }: MovieCarouselProps) {
  console.log(movies);
  
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        duration: 40,
      }}
      orientation="vertical"
      className="carousel-container"
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="carousel-item">
            <div className="carousel-card-wrapper">
              <Card 
                className="carousel-movie-card"
                onClick={() => onMovieClick && onMovieClick(movie)}
              >
                <img 
                  src={movie.image} 
                  className="carousel-movie-poster"
                  alt={movie.title || `Movie ${movie.id}`}
                />
                {/* <div className="carousel-movie-info-overlay">
                  <CardTitle className="carousel-movie-title">
                    {movie.title}
                  </CardTitle>
                  <CardDescription className="carousel-movie-meta">
                    {movie.release_date && new Date(movie.release_date).getFullYear()} 
                    {movie.genres && movie.genres.length > 0 && (
                      <> • {movie.genres.slice(0, 2).map(g => g.name).join(', ')}</>
                    )}
                  </CardDescription>
                </div> */}
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}