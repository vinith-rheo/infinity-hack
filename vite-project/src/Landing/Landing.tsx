import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import movieData from "../data.json";
import MovieCarousel from "./MovieCarousel";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import "../styles/landing.css";
import { getMovies, type Movie } from "@/services";

export default function Landing() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [hoveringMap, setHoveringMap] = useState<{ [colIndex: number]: boolean }>({});
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const data = await getMovies(1, 12, "popularity");
      setTrendingMovies(data);
    };
    fetchTrendingMovies();
  }, []);
  const handleMovieClick = (clickedMovie: any) => {
    const originalMovie = movieData.find(movie => movie.id === clickedMovie.id);
    console.log("Selected movie:", originalMovie);
    if (originalMovie) {
      setSelectedMovie(originalMovie);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleTop10MovieClick = (movie: any) => {
    console.log("Top 10 movie clicked:", movie);
    console.log("Movie ID:", movie.id);
    // TODO: Navigate to details page when implemented
    // navigate(`/movie/${movie.id}`);
  };

  const handleExploreClick = () => {
    navigate("/movies");
  };

  return (
    <div className="landing-container">
      {!isSignedIn && (
        <div className="header-wrapper">
          <Header />
        </div>
      )}
      
      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {!selectedMovie && (
            <section className="hero-section">
              <div className="hero-text">
                <div className="hero-title">
                  Discover films <br />
                  <span className="hero-gradient-text">You will love...</span>
                </div>
                <h2 className="hero-subtitle">
                  Your personal movie journal — rate, review, and never lose track of
                  what to watch next.
                </h2>
                <Button className="hero-button" onClick={handleExploreClick}>
                  Explore
                </Button>
              </div>
            </section>
          )}
          
          <div className="movie-columns">
            {[0, 1, 2, 3].map((colIndex) => {
              const startIndex = colIndex * 4;
              const endIndex = startIndex + 4;
              const columnMovies = movieData.slice(startIndex, endIndex);
              
              return (
                <div 
                  key={colIndex}
                  className={`movie-column ${colIndex % 2 === 0 ? 'float-up' : 'float-down'}`}
                  style={{
                    animationPlayState: hoveringMap[colIndex] ? 'paused' : 'running'
                  }}
                  onMouseEnter={() => setHoveringMap((prev) => ({ ...prev, [colIndex]: true }))}
                  onMouseLeave={() => setHoveringMap((prev) => ({ ...prev, [colIndex]: false }))}
                >
                  <MovieCarousel 
                    movies={columnMovies.map((movie) => ({ 
                      ...movie, 
                      image: `/assets/${movie.id}.jpg` 
                    }))}
                    // onMovieClick={handleMovieClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero-Footer with Glass Effect */}
      <div className="hero-footer-wrapper">
        <div className="gradient-overlay" />
        
        <div className="hero-footer">
          <div className="footer-content">
            <div className="footer-inner">
              <span className="footer-title">
                Browse new, popular and upcoming movies &amp; TV shows
              </span>

              <div className="top10-section">
                <div className="movies-scroll-container">
                  <div className="movies-list">
                    <div className="top10-intro-card">
                      <Card className="intro-card">
                        <div className="intro-card-content">
                          <span className="intro-card-title">
                            Top 10 movies this week
                          </span>
                          <span className="intro-card-subtitle">
                            Check out this week's most popular movies and find out what people say about them
                          </span>
                        </div>
                      </Card>
                    </div>

                    {movieData.slice(0, 10).map((movie, index) => (
                      <div key={movie.id} className="movie-card-wrapper">
                        <div className="movie-number">
                          {index + 1}
                        </div>
                        
                        <Card 
                          className="movie-card"
                          onClick={() => handleTop10MovieClick(movie)}
                        >
                          <img 
                            src={`/assets/${movie.id}.jpg`}
                            alt={movie.title}
                            className="movie-poster"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/175x250/333/cccccc?text=No+Poster';
                            }}
                          />
                          <div className="movie-info-overlay">
                            <CardTitle className="movie-title">
                              {movie.title}
                            </CardTitle>
                            <CardDescription className="movie-meta">
                              {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0, 2).map(g => g.name).join(', ')}
                            </CardDescription>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


{/* Trending Section */}
<div className="trending-section">
  <div className="section-header">
    <h2 className="section-title">Trending</h2>
  </div>
  
  <div className="trending-movies-grid">
    {/* First row */}
    <div className="trending-movies-row flex-wrap">
      {trendingMovies.map((movie) => (
        <Card key={movie.id} className="trending-movie-card">
          <img 
            src={movie.poster_url}
            alt={movie.title}
            className="trending-movie-poster"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/175x250/333/cccccc?text=No+Poster';
            }}
          />
          <div className="trending-movie-info">
            <CardTitle className="trending-movie-title">{movie.title}</CardTitle>
            <CardDescription className="trending-movie-meta">
              <span className="release-date">
                {new Date(movie.release_date).toLocaleDateString()}
              </span>
              <span className="duration">{movie.runtime} min</span>
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  </div>
</div>

      {/* Regular Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-flex">
            <div className="copyright">
              <span>&copy; {new Date().getFullYear()} Moviesda. All rights reserved.</span>
            </div>
          </div>
          <div className="footer-disclaimer">
            <p>
              Movie data and images courtesy of various sources. Used with permission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}