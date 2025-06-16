import { Route, Routes } from "react-router";
import MovieList from "./MovieList/MovieList";
import Landing from "./Landing/Landing";
import LoginPage from "./components/ui/LoginPage";
import SignUpPage from "./components/ui/SignUpPage";
import MovieOverview from "./MovieOverview/MovieOverview";
import Header from "./Landing/Header";
import Explore from "@/Explore/Explore";
import Watchlist from "@/Watchlist/Watchlist";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header isSignedIn={isSignedIn ?? false} />

      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="movies" element={<MovieList />} />
        <Route path="/" element={<Landing />} />
        <Route path="recommendations" element={<Explore />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="movies/movie/:id" element={<MovieOverview />} />
        <Route path="abc" element={<MovieOverview />} />
      </Routes>
    </div>
  );
}

export default App