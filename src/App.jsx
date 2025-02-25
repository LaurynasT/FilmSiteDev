import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage.jsx";
import MovieDetail from "./components/Pages/MovieDetail.jsx";
import TvSeriesDetais from "./components/Pages/TvSeriesDetail.jsx";
import { NavBar } from "./components/NavBar/NavBar.jsx";

function App() {
  return (
    <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/MovieDetail/:id" element={<MovieDetail />} />
      <Route path="/TvSeriesDetail/:id" element={<TvSeriesDetais/>} />
    </Routes>
    </div>
  );
}

export default App;