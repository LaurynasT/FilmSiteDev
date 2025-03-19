import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage.jsx";
import MovieDetail from "../Pages/MovieDetail.jsx";
import TvSeriesDetais from "../Pages/TvSeriesDetail.jsx";
import CompanyDetail from "../Pages/CompanyDetail.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import ScrollUp from "../assets/Scroll.jsx";

function App() {
  return (
    <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/MovieDetail/:id" element={<MovieDetail />} />
      <Route path="/TvSeriesDetail/:id" element={<TvSeriesDetais />} />
      <Route path="/CompanyDetail/:companyId" element={<CompanyDetail />}/>
    </Routes>
    <ScrollUp />
    </div>
  );
}

export default App;