import { Route, Routes } from "react-router";
import MovieList from "./MovieList/MovieList";
import Landing from "./Landing/Landing";

function App() {
  return (
    <>
    <Routes>
      <Route path="/movies" element={<MovieList />} />
      <Route path="/" element={<Landing />} />
    </Routes>
      {/* <h1 className="text-3xl text-center font-bold">Cine Hub</h1>
      <div className="flex min-h-svh flex-col items-center justify-start p-3">
        <MovieList />
      </div> */}
    </>
  )
}

export default App