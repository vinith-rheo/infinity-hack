import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Movie = {
  id: number;
  image: string;
};

type MovieCarouselProps = {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void
};

export default function MovieCarousel({ movies, onMovieClick }: MovieCarouselProps) {
  console.log(movies);
  return (
    <>
    <Carousel
      opts={{
        align: "start",
        loop: true,
        duration: 40,
      }}
      orientation="vertical"
      className="w-full max-w-xs gap-6"
      style={{zIndex: "1"}}      
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="pt- basis-full">
            <div className="p-1" style={{ backgroundColor: "var(--color-mono-black)"}}>
              <Card className="border-2 rounded-lg overflow-hidden">
                <CardContent className="flex aspect-square items-center justify-center p-0" onClick={() => onMovieClick && onMovieClick(movie)}>
                  <img 
                    src={movie.image} 
                    className="w-full h-full object-cover rounded-lg"
                    style={{ height: "280px" }}
                    alt={`Movie ${movie.id}`}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    </>
  );
}
