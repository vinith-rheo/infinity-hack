import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import movieData from "../data.json";
import MovieCarousel from "./MovieCarousel";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Button className="ml-3 mt-2" onClick={() => navigate("/signup")}>
      Sign Up
    </Button>
      <div className="flex items-center justify-between p-5 gap-2">
        <section className="flex flex-col items-start w-md gap-2">
          <h1 className="text-5xl">Discover films you'll love</h1>
          <h2 className="text-2xl">
            Your personal movie journal — rate, review, and never lose track of
            what to watch next.
          </h2>

          <Button className="mt-3" onClick={() => navigate("/movies")}>
            Explore
          </Button>
        </section>
        <section>
          <MovieCarousel movies={movieData.map((movie) => ({ ...movie, image: `/assets/${movie.id}.jpg` }))} />
        </section>
      </div>
    </>
  );
}
