import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import movieData from "../data.json";
import MovieCarousel from "./MovieCarousel";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import Header from "./Header";

export default function Landing() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
const [hoveringMap, setHoveringMap] = useState<{ [colIndex: number]: boolean }>({});

  return (
    <>
      {!isSignedIn && 
      <div style={{ background: "var(--color-mono-black)", position: "relative", zIndex: 1000}}>
          <Header />
      </div>}
      <div className="flex items-center justify-between p-5 gap-2" style={{ position: "relative", zIndex: 1 }}>
        <section className="flex flex-col items-start w-md gap-2">
          <h1 className="text-5xl" style={{ color: "#F0F0F0" }}>Discover films you'll love</h1>
          <h2 className="text-2xl" style={{ color: "#F0F0F0" }}>
            Your personal movie journal — rate, review, and never lose track of
            what to watch next.
          </h2>

          <Button className="mt-3" style={{ color: "#F0F0F0" }} onClick={() => navigate("/movies")}>
            Explore
          </Button>
        </section>
        <div className="flex flex-row gap-12">
          {[0, 1, 2, 3].map((colIndex) => (
            <div 
              key={colIndex}
              className="flex flex-col gap-6 hover:[animation-play-state:paused]"
              style={{
                animation: `float-${colIndex % 2 === 0 ? 'up' : 'down'} 20s infinite alternate ease-in-out`,
                animationPlayState: hoveringMap[colIndex] ? 'paused' : 'running',
                cursor: "pointer"
              }}
            onMouseEnter={() =>
        setHoveringMap((prev) => ({ ...prev, [colIndex]: true }))
      }
      onMouseLeave={() =>
        setHoveringMap((prev) => ({ ...prev, [colIndex]: false }))
      }
            >
              <MovieCarousel 
                movies={movieData.map((movie) => ({ 
                  ...movie, 
                  image: `/assets/${movie.id}.jpg` 
                }))} 
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20%); }
        }
        
        @keyframes float-down {
          0% { transform: translateY(0); }
          100% { transform: translateY(20%); }
        }
      `}</style>
    </>
  );
}
