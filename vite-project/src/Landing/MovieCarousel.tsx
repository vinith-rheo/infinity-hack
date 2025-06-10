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
};

export default function MovieCarousel({ movies }: MovieCarouselProps) {
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
      className="w-full max-w-xs"
      style={{ cursor: "pointer", zIndex: "1" }}      
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="pt-1 basis-full">
            <div className="p-1" style={{ backgroundColor: "var(--color-mono-black)" }}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img 
                    src={movie.image} 
                    className="w-full h-full object-cover rounded-lg"
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
