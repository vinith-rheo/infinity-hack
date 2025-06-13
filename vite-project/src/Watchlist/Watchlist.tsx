import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import movieData from "../data.json";
import "./watchlist.css";
import searchLogo from '../Landing/searchIcon.svg'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getWatchlistMovies, type Movie } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import emptyLogo from './watchlistEmptyLogo.svg';
const WatchList = () => {
    const {  getToken } = useAuth();

    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [watchListMovies, setWatchlistMovies] = useState<Movie[]>([]);
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
        const token = await getToken();

        // Only pass if it's not "all"
        const year = selectedYear !== "all" ? selectedYear : undefined;
        const genre = selectedGenre !== "all" ? selectedGenre : undefined;

        const data = await getWatchlistMovies(1, token ?? undefined, undefined, year, genre);
        setWatchlistMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [selectedYear, selectedGenre]);


    const years = Array.from(new Set(movieData.map(movie =>
        new Date(movie.release_date).getFullYear()
    ))).sort((a, b) => b - a);


//     const genres = Array.from(
//   new Set(
//     movieData.flatMap((movie) =>
//       movie.genres.map((genre) => genre.name)
//     )
//   )
// ).sort();
//     return (
// //         <div className="trending-section">
// //   <div className="section-header">
// //     <h2 className="section-title">My Watchlist</h2>
// //     <p className="link-text">
// //       See More
// //     </p>
// //   </div>
  
// //   <div className="trending-movies-grid">
// //     {/* First row */}

// //     <div className="trending-movies-row flex-wrap">
// //       {movieData.map((movie) => (
// //         <Card key={movie.id} className="trending-movie-card">
// //           {/* ${movie ? "active" : ''} */}
          
// //             <img 
// //               src={""} 
// //               alt="Add to Watchlist" />
// //           <img 
// //             src={movie.poster_url}
// //             alt={movie.title}
// //             className="trending-movie-poster"
// //             onError={(e) => {
// //               e.currentTarget.src = 'https://via.placeholder.com/175x250/333/cccccc?text=No+Poster';
// //             }}
// //           />
// //           <div className="trending-movie-info">
// //             <CardTitle className="trending-movie-title">{movie.title}</CardTitle>
// //             <CardDescription className="trending-movie-meta">
// //               <span className="release-date">
// //                 {new Date(movie.release_date).toLocaleDateString()}
// //               </span>
// //               <span className="duration">{movie.runtime} min</span>
// //             </CardDescription>
// //           </div>
// //         </Card>
// //       ))}
// //     </div>
// //   </div>
// // </div>

// <div className="watchlist-section">
//   <div className="watchlist-header">
//     <h2 className="watchlist-title">My Watchlist</h2>
//     <div className="watchlist-controls">
//       <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="search-input"
//           />
//           <img
//             src={searchLogo}
//             width={20}
//             height={20}
//             alt="Search"
//             className="search-icon"
//           />
//         </div>
//      <Select onValueChange={(val) => setSelectedYear(val)} defaultValue="all" >
//             <SelectTrigger aria-label="Select year" className="your-trigger-styles ">
//               <SelectValue placeholder="All years" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Year</SelectItem>
//               {/* Ideally you'd generate this dynamically*/}
//               {years.map(year => (
//                 <SelectItem key={year} value={year.toString()}>
//                   {year}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Genre picker */}
//           <Select onValueChange={(val) => setSelectedGenre(val)} defaultValue="all">
//             <SelectTrigger aria-label="Select genre" className="your-trigger-styles ">
//               <SelectValue placeholder="All genres" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Genre</SelectItem>
//               {genres.map((genre) => (
//                 <SelectItem key={genre.id} value={genre.name.toLowerCase()}>
//                     {genre.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//     </div>
//   </div>
  
//   <div className="watchlist-grid">
//     {watchListMovies.length > 0 ? (
//       <div className="watchlist-row">
//         {watchListMovies.map((movie) => (
//           <Card key={movie.id} className="watchlist-card">
//             <img 
//               src={movie.poster_url}
//               alt={movie.title}
//               className="watchlist-poster"
//               onError={(e) => {
//                 e.currentTarget.src = 'https://via.placeholder.com/175x250/333/cccccc?text=No+Poster';
//               }}
//             />
//             <div className="watchlist-info">
//               <CardTitle className="watchlist-movie-title">{movie.title}</CardTitle>
//               <CardDescription className="watchlist-movie-meta">
//                 <span className="release-date">
//                   {new Date(movie.release_date).toLocaleDateString()}
//                 </span>
//                 <span className="duration">{movie.runtime} min</span>
//               </CardDescription>
//             </div>
//           </Card>
//         ))}
//       </div>
//     ) : (
//       <div className="watchlist-empty">
//         <div className="watchlist-empty-icon">
//           <i className="far fa-bookmark"></i>
//         </div>
//         <p className="watchlist-empty-text">
//           Your watchlist is empty. Start adding movies and TV shows to keep track of what you want to watch!
//         </p>
//       </div>
//     )}
//   </div>
// </div>
//     );
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
  
  <div className="watchlist-grid">
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
        <p className="watchlist-empty-text1">A real boo-mer of a list...</p>
        <p className="watchlist-empty-text">
Your watchlist is ghost town-level quiet. Add some movies before this little guy starts binge-watching alone!        </p>
      </div>
    )}
  </div>
</div>
);

}
export default WatchList;