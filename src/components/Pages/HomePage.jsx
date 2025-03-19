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

            <a href="https://ainera.com" target="_blank">
            <video loop autoPlay={true} muted >
                <source src="Baneris 1 dekstop.mp4" type="video/mp4" />
            </video>
            </a>
            <video loop autoPlay={true} muted>
                <source src="Baneris 2 dekstop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video loop autoPlay={true} muted>
                <source src="Baneris 3 dekstop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video loop autoPlay={true} muted>
                <source src="Baneris 1 mobile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video loop autoPlay={true} muted>
                <source src="Baneris 2 mobile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video loop autoPlay={true} muted>
                <source src="baneris 3 mobile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default HomePage;
