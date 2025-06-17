import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMovies, smartSearch, type Movie } from "@/services";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import BackIcon from "../../public/Icons/BackIcon.svg";
import { useNavigate } from "react-router";
import searchIcon from "../Landing/searchIcon.svg";
import { motion, useAnimation } from "framer-motion";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MoviePosterCard from "@/components/MoviePosterCard";

export default function MovieList() {
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const[currentPage,setCurrentPage]=useState(1);
  const limit = 60;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [searchText, setSearchText] = useState<string>("");
  const [aiResults, setAiResults] = useState<Movie[] | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const [loadMore, setLoadMore] = useState(true);
  const loadMoreMovies = useCallback(async () => {
    const token = await getToken();

    const newMovies = await getMovies(
      currentPage,
      limit,
      undefined,
      token ?? undefined
    );

    if (newMovies.length === 0) {
      setLoadMore(false);
    } else {
      setMovies((prev) => [...prev, ...newMovies]);
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage]);
 

const loaderRef = useInfiniteScroll(loadMoreMovies, loadMore);

  const searchIconControls = useAnimation();

  useEffect(() => {
    if (searchText) {
      const term = searchText.toLowerCase();
      const filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(term)
      );
      setFilteredMovies(filtered);
      setAiResults(null); // reset AI results when using text search
    } else {
      setFilteredMovies(movies);
    }
  }, [searchText, movies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchText(value);
    }, 600);
  };
  const fetchMovies = async () => {
    setMoviesLoading(true);
    const token = await getToken();
    const data = await getMovies(currentPage, limit, undefined, token ?? undefined);
    setMovies(data);
    setFilteredMovies(data);
    setMoviesLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAISearch = async (term?: string) => {
    const query = (term ?? searchText).trim();
    if (!query) return;
    setAiLoading(true);
    const token = await getToken();
    const data = await smartSearch(query, token ?? undefined);
    setAiResults(data);
    setAiLoading(false);
  };

  // Animate search icon on focus
  useEffect(() => {
    if (inputFocused) {
      searchIconControls.start({ y: -4, scale: 1.15, transition: { type: "spring", stiffness: 400, damping: 10 } });
    } else {
      searchIconControls.start({ y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } });
    }
  }, [inputFocused, searchIconControls]);

  return (
    <>
      {moviesLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-[var(--color-mono-black)]">
          <div className="flex justify-center w-full pt-8 px-4 bg-[var(--color-mono-black)]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-3xl flex items-center gap-3 p-4 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20"
              style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)", background: "linear-gradient(120deg, rgba(34,44,56,0.7) 60%, rgba(103,58,183,0.15) 100%)" }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, boxShadow: "0 0 8px 2px rgba(103,58,183,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="h-10 px-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                onClick={() => {
                  navigate("/");
                }}
                aria-label="Back"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <img className="h-5 w-5" src={BackIcon} alt="Back" />
                <span className="hidden sm:inline">Back</span>
              </motion.button>
              <div className="relative flex-1">
                <label htmlFor="movie-search" className="sr-only">Search for movies</label>
                <motion.span
                  animate={searchIconControls}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
                >
                  <img src={searchIcon} className="w-5 h-5" alt="Search" />
                </motion.span>
                <Input
                  id="movie-search"
                  className={`pl-10 pr-4 h-10 w-full bg-[#222C38]/80 text-white placeholder-white/60 rounded-lg border border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 shadow-sm ${inputFocused ? "ring-2 ring-indigo-400/40 border-indigo-500 shadow-lg" : ""}`}
                  placeholder="Search for movies"
                  onChange={handleChange}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.currentTarget as HTMLInputElement).value;
                      handleAISearch(value);
                    }
                  }}
                  autoComplete="off"
                  style={{ transition: "box-shadow 0.3s, border-color 0.3s" }}
                />
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, boxShadow: "0 0 12px 2px rgba(103,58,183,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="h-10 px-5 rounded-lg flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md hover:opacity-90 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 text-white font-semibold"
                onClick={() => handleAISearch()}
                aria-label="AI Search"
                style={{ background: "linear-gradient(90deg, #7c3aed 60%, #6366f1 100%)" }}
              >
                <img src={searchIcon} className="w-5 h-5" alt="AI Search" />
                <span className="hidden sm:inline">AI Search</span>
              </motion.button>
            </motion.div>
            <span className="p-2">
              <UserButton afterSignOutUrl={"/"} />
            </span>
          </div>
          <div id="movie-list-container" className="max-w-full mx-auto">
            <div className="flex flex-wrap justify-center m-4 gap-6">
              {(aiLoading ? [] : aiResults ?? filteredMovies).map((movie) => {
                return (
                  <div  className="w-60">
                    <MoviePosterCard movie={movie} />
                  </div>
                );
              })}
            </div>
          </div>
          {aiLoading && (
            <div className="flex justify-center py-10">
              <Loader2 className="w-10 h-10 animate-spin text-white" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
