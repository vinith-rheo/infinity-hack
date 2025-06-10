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
      {movies.map((movie) => {
        return (
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
          >
            <CarouselContent>
              <CarouselItem key={movie.id} className="pt-1 md:basis-1/2">
                <img src={movie.image} className="w-full h-full object-cover" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        );
      })}
    </>
  );
}
