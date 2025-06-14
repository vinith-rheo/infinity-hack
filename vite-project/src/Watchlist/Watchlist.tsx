import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import movieData from "../data.json";
import "./watchlist.css";
import searchLogo from '../Landing/searchIcon.svg'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getWatchlistMovies, type Movie } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import emptyLogo from './watchlistEmptyLogo.svg';
import { Skeleton } from "@/components/ui/skeleton";

const WatchList = () => {
    const {  getToken } = useAuth();

    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [watchListMovies, setWatchlistMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const genres = [
        { id: 1, name: "Action" },
        { id: 2, name: "Comedy" },
        { id: 3, name: "Drama" },
        { id: 4, name: "Horror" },
        { id: 5, name: "Sci-Fi" },
        { id: 6, name: "Romance" },
        { id: 7, name: "Thriller" },
        { id: 8, name: "Fantasy" },
        { id: 9, name: "Documentary" },
        { id: 10, name: "Animation" },
        { id: 11, name: "Adventure" },
        { id: 12, name: "Mystery" },
        { id: 13, name: "Western" },
        { id: 14, name: "Musical" },
        { id: 15, name: "Crime" },
        { id: 16, name: "Family" },
        { id: 17, name: "History" },]

useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      // Only pass if it's not "all"
      const year = selectedYear !== "all" ? selectedYear : undefined;
      const genre = selectedGenre !== "all" ? selectedGenre : undefined;
      const search = searchQuery ? searchQuery : undefined

      const data = await getWatchlistMovies(10, token ?? undefined, search, year, genre);
      setWatchlistMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchMovies();
}, [selectedYear, selectedGenre, searchQuery]);



    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => currentYear - i);

return (
<div className="watchlist-section">
  <div className="watchlist-header">
    <h2 className="watchlist-title">My Watchlist</h2>
    <div className="watchlist-controls">
      <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={searchLogo}
            width={20}
            height={20}
            alt="Search"
            className="search-icon"
          />
        </div>
     <Select onValueChange={(val) => setSelectedYear(val)} defaultValue="all" >
            <SelectTrigger aria-label="Select year" className="your-trigger-styles ">
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Year</SelectItem>
              {/* Ideally you'd generate this dynamically*/}
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Genre picker */}
          <Select onValueChange={(val) => setSelectedGenre(val)} defaultValue="all">
            <SelectTrigger aria-label="Select genre" className="your-trigger-styles ">
              <SelectValue placeholder="All genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Genre</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.name.toLowerCase()}>
                    {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
    </div>
  </div>
  {loading && (
      // Display a full-page skeleton
      <div className="p-6 space-y-4">
        {/* Large header skeleton */}
        <Skeleton className="h-12 w-1/4 rounded-md" />

        {/* Some content skeleton lines */}
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-1/2 rounded-md" />

        {/* Cards grid representation */}
      </div> )}
  
    {!loading && <div className="watchlist-grid">
        {watchListMovies.length > 0 ? (
        <div className="watchlist-row">
            {watchListMovies.map((movie) => (
            <Card key={movie.id} className="watchlist-card">
                <img 
                src={movie.poster_url}
                alt={movie.title}
                className="watchlist-poster"
                onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/175x250/333/cccccc?text=No+Poster';
                }}
                />
                <div className="watchlist-info">
                <CardTitle className="watchlist-movie-title">{movie.title}</CardTitle>
                <CardDescription className="watchlist-movie-meta">
                    <span className="release-date">
                    {new Date(movie.release_date).toLocaleDateString()}
                    </span>
                    <span className="duration">{movie.runtime} min</span>
                </CardDescription>
                </div>
            </Card>
            ))}
        </div>
        ) : (
        <div className="watchlist-empty">
            <div className="watchlist-empty-icon">
            <img src={emptyLogo} alt="Empty Watchlist" className="empty-watchlist-icon" />
            </div>
            <p className="watchlist-empty-text1">Nothing to boo-inge yet!</p>
            <p className="watchlist-empty-text">
    Your watchlist is ghost town-level quiet. Add some movies before this little guy starts binge-watching alone!        </p>
        </div>
        )}
    </div>}
</div>
);

}
export default WatchList;