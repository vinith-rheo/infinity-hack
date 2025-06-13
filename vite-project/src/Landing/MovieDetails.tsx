import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';

// Sample movie data (using your Toy Story example)
const sampleMovie = {
  "adult": false,
  "belongs_to_collection": {
    "id": 10194,
    "name": "Toy Story Collection",
    "poster_path": "/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg",
    "backdrop_path": "/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg"
  },
  "budget": 30000000,
  "genres": [
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 10751,
      "name": "Family"
    }
  ],
  "homepage": "http://toystory.disney.com/toy-story",
  "id": 862,
  "imdb_id": "tt0114709",
  "original_language": "en",
  "original_title": "Toy Story",
  "overview": "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
  "popularity": 21.946943,
  "poster_path": "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg",
  "production_companies": [
    {
      "name": "Pixar Animation Studios",
      "id": 3
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1995-10-30",
  "revenue": 373554033,
  "runtime": 81,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Toy Story",
  "title": "Toy Story",
  "video": false,
  "vote_average": 7.7,
  "vote_count": 5415
};

type MovieDetailsCardProps = {
  movie?: typeof sampleMovie;
  onClose: () => void;
  details?: boolean;
  setSelectedMovie?: (movie: typeof sampleMovie | null) => void;
};

const MovieDetailsCard: React.FC<MovieDetailsCardProps> = ({ movie = sampleMovie, onClose }) => {
  const [userRating, setUserRating] = useState(0);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    if (rating >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  type StarRatingProps = {
    rating: number;
    onRate: (rating: number) => void;
    interactive?: boolean;
  };

  const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, interactive = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate(star)}
            className={`text-2xl transition-colors ${
              interactive ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'
            } ${
              star <= rating ? 'text-yellow-400' : 'text-gray-600'
            }`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80  flex items-center justify-start p-6">
      <div className="relative w-full max-w-2xl h-full max-h-[70vh] overflow-hidden">
        <Card className="h-full bg-gray-900/95 border-gray-700 shadow-2xl backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-full overflow-y-auto">
            {/* Movie Poster and Basic Info */}
            <div className="relative">
              <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
                  }}
                />
              </div>
              
              {/* Overlay with title and rating */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getRatingColor(movie.vote_average)}`}>
                      {Number(movie.vote_average).toFixed(1)}
                    </span>
                    <span className="text-gray-400">/ 10</span>
                  </div>
                  <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* User Rating Section */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Your Rating</h3>
                <div className="flex items-center justify-between">
                  <StarRating rating={userRating} onRate={setUserRating} interactive={true} />
                  <button
                    onClick={() => setIsWatchlisted(!isWatchlisted)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isWatchlisted 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {isWatchlisted ? '✓ In Watchlist' : '+ Add to Watchlist'}
                  </button>
                </div>
              </div>

              {/* Movie Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>

                {movie.tagline && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Tagline</h3>
                    <p className="text-gray-300 italic">"{movie.tagline}"</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Release Date</h4>
                    <p className="text-gray-300">{formatDate(movie.release_date)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Runtime</h4>
                    <p className="text-gray-300">{movie.runtime} minutes</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Budget</h4>
                    <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Revenue</h4>
                    <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Production Companies</h4>
                  <div className="space-y-1">
                    {movie.production_companies.map((company) => (
                      <p key={company.id} className="text-gray-300">{company.name}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Production Countries</h4>
                  <div className="space-y-1">
                    {movie.production_countries.map((country) => (
                      <p key={country.iso_3166_1} className="text-gray-300">{country.name}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Languages</h4>
                  <div className="space-y-1">
                    {movie.spoken_languages.map((language) => (
                      <p key={language.iso_639_1} className="text-gray-300">{language.name}</p>
                    ))}
                  </div>
                </div>

                {movie.belongs_to_collection && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Part of Collection</h4>
                    <p className="text-gray-300">{movie.belongs_to_collection.name}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Status</h4>
                    <p className="text-gray-300">{movie.status}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Original Language</h4>
                    <p className="text-gray-300">{movie.original_language.toUpperCase()}</p>
                  </div>
                </div>

                {movie.homepage && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Official Website</h4>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {movie.imdb_id && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">IMDb</h4>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                      View on IMDb
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Demo component to show how it would work
const MovieDetailsDemo: React.FC<{ details?: boolean, setSelectedMovie: (movie: typeof sampleMovie | null) => void; }> = ({ details, movie, setSelectedMovie }) => {
  const [showDetails, setShowDetails] = useState(details ? true : false);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">

        {showDetails&&(
          <MovieDetailsCard 
            movie={movie}
            onClose={() => {
              setShowDetails(false);
              setSelectedMovie(null); 
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetailsDemo;