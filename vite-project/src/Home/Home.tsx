import { Button } from "@/components/ui/button";
import type { Movie } from "@/services";
import { use, useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import movieData from "../data.json";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import MovieCarousel from "@/Landing/MovieCarousel";
import { useNavigate } from "react-router";
import { getMovies, removeWatchList, setWatchList, type Movie } from "@/services";
import "../styles/landing.css";
import watchListIcon1 from './watchListIconNoFill.svg';
import watchListIcon2 from './watchListIconWithFill.svg';
import { Skeleton } from "@/components/ui/skeleton"

interface props{
    activeTab?: string;
}

const Home = ({activeTab}:props) => {
    const navigate = useNavigate();
    const { isSignedIn, getToken } = useAuth();

    const [hoveringMap, setHoveringMap] = useState<{ [colIndex: number]: boolean }>({});
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [animate, setAnimate] = useState(false);
    const [onMouseOverId, setOnMouseOverId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    
      if (activeTab === 'home') {
        setAnimate(true);
      } else {
        setAnimate(false);
      } 

  },[])

    useEffect(() => {

    fetchTrendingMovies();
  }, []);

      const fetchTrendingMovies = async () => {
        setLoading(true);
      const token =  await getToken();
      const data = await getMovies(1, 12, "popularity", token ?? undefined);
      setTrendingMovies(data);
      setLoading(false);
    };

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

  const handleAddToWatchlist = async(movie: Movie, movieId: number) => {
          const token =  await getToken();
    if(movie.is_watchlisted) {
        const response = await removeWatchList(movieId, token??undefined)
        if(response) {
            fetchTrendingMovies();
        }
    }else{
                if(movieId){
            const response = await setWatchList(movieId, token ?? undefined);
            if (response) {
            // notify.success("Movie added to watchlist");
            fetchTrendingMovies();
      } else {
        console.error("Failed to add movie to watchlist");
      }
        }
    
    }

}    

      
    return (
    <div className="landing-container">
      
      
      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
        <section className="hero-section">
          <div className={`hero-text ${animate ? "animate-up" : ''}`}>
            <div className="hero-title">
              Discover films<br />
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
          
          
          <div className="movie-columns">
            {[0, 1, 2, 3].map((colIndex) => {
              const startIndex = colIndex * 5;
              const endIndex = startIndex + 5;
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
{!loading ? <div className="trending-section">
  <div className="section-header">
    <h2 className="section-title">Trending</h2>
    <p className="link-text">
      See More
    </p>
  </div>
  
  <div className="trending-movies-grid">
    {/* First row */}
    <div className="trending-movies-row flex-wrap">
      {trendingMovies.map((movie) => (
        <Card 
            key={movie.id} 
            className="trending-movie-card"
            onMouseEnter={() => setOnMouseOverId(movie.id)}
            onMouseLeave={() => setOnMouseOverId(null)}
        >
          {(onMouseOverId === movie.id) && <img 
            src={movie.is_watchlisted ? watchListIcon2 : watchListIcon1} // Your watchlist icon source goes here
            alt="Add to Watchlist" 
            className=" absolute top-2 right-2 z-10 cursor-pointer"
            onClick={() => {
                console.log(movie)
              handleAddToWatchlist(movie, movie.id);
            }}
          />}
          
          <img 
            src={movie.poster_url}
            alt={movie.title}
            className="trending-movie-poster trending-image"
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
</div> : 
<div className="trending-section">
    <div className="section-header">
      <Skeleton className="h-8 w-32 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
    </div>
    
    <div className="trending-movies-grid">
      <div className="trending-movies-row flex-wrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="trending-movie-card">
            <Skeleton className="h-[250px] w-[175px] rounded-lg" />
            <div className="trending-movie-info mt-2">
              <Skeleton className="h-4 w-24 rounded mb-1" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
}

{/* You may aslo like Section */}
<div className="trending-section trending-sec2">
  <div className="section-header">
    <h2 className="section-title">You may also like</h2>
    <p className="link-text">
      See More
    </p>
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

export default Home;


