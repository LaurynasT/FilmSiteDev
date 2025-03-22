import React, { useState } from "react";
import "../styles/Homepage.css";
import PopularTvSeries from "../PopularTvSeries";
import Upcoming from "../Upcoming";
import PopularMovies from "../PopularMovies";

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("movies");

    return (
        <div className="homepage">
            <div className="category">
                <div className="category-buttons">
                    <button onClick={() => setSelectedCategory("movies")} className={selectedCategory === "movies" ? "active" : ""}>
                        Popular Movies
                    </button>
                    <button onClick={() => setSelectedCategory("tvSeries")} className={selectedCategory === "tvSeries" ? "active" : ""}>
                        Popular TV Series
                    </button>
                    <button onClick={() => setSelectedCategory("upcoming")} className={selectedCategory === "upcoming" ? "active" : ""}>
                        Upcoming
                    </button>
                </div>
            </div>
            <div className="homepage-body">
                {selectedCategory === "movies" && <PopularMovies />}
                {selectedCategory === "tvSeries" && <PopularTvSeries />}
                {selectedCategory === "upcoming" && <Upcoming />}
            </div>
        </div>
    );
};

export default HomePage;
