import {Routes, Route} from "react-router-dom";
import { AuthProvider } from "../assets/AuthContext";
import PrivateRoute from "../assets/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../assets/Logout";
import HomePage from "../pages/HomePage";
import AiSearch from "../Pages/AiSearch";
import MovieDetail from "../Pages/MovieDetail";
import TvSeriesDetais from "../pages/TvSeriesDetail";
import Actors from "../Pages/ActorPage";
import ChangeUsername from "../Pages/UpdateUsername";
import CompanyDetail from "../pages/CompanyDetail";
import SearchResults from "../Pages/SearchResults";
import DiscoverMoviesPage from "../Pages/DiscoverMovie";
import DiscoverTvSeries from "../pages/DiscoverTvSeries";
import About from "../Pages/About";
import { NavBar } from "../NavBar/NavBar";
import Footer from "../assets/Footer";


function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/update-username" 
              element={
                <PrivateRoute>
                  <ChangeUsername />
                </PrivateRoute>
              } 
            />
            <Route path="/MovieDetail/:id" element={<MovieDetail />} />
            <Route path="/TvSeriesDetail/:id" element={<TvSeriesDetais />} />
            <Route path="/CompanyDetail/:companyId" element={<CompanyDetail />} />
            <Route path="/Login/" element={<Login />} />
            <Route path="/SignUp/" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/change-username" element={<ChangeUsername/>} /> 
            <Route path="/ActorDetail/:id" element={<Actors/>} /> 
            <Route path="/AiSearch/" element={<AiSearch/>} /> 
            <Route path="/SearchResults" element={<SearchResults/>} /> 
            <Route path="/DiscoverMovie" element={<DiscoverMoviesPage/>} /> 
            <Route path="/DiscoverTv" element={<DiscoverTvSeries/>} />
            <Route path="/About" element={<About/>} />  
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
