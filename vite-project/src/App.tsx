import { Route, Routes } from "react-router";
import MovieList from "./MovieList/MovieList";
import Landing from "./Landing/Landing";
import LoginPage from "./components/ui/LoginPage";
import SignUpPage from "./components/ui/SignUpPage";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
    <Routes>
      <Route path='signup' element={<SignUpPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/" element={<Landing />} />
    </Routes>
      {/* <h1 className="text-3xl text-center font-bold">Cine Hub</h1>
      <div className="flex min-h-svh flex-col items-center justify-start p-3">
        <MovieList />
      </div> */}
    </div>
  )
}

export default App