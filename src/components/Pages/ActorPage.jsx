import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchActorData, fetchActorMovieCredits, fetchActorTvCredits } from "../Api/Api";
import "../styles/ActorPage.css";

const ActorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [actor, setActor] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [showMovies, setShowMovies] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [actorData, tvData, movieData] = await Promise.all([
          fetchActorData(id),
          fetchActorMovieCredits(id),
          fetchActorTvCredits(id),
        ]);

        setActor(actorData);
        setMovieCredits(movieData);
        setTvCredits(tvData);
      } catch (error) {
        console.error("Error fetching actor data:", error);
      }
    };

    loadData();
  }, [id]);

  if (!actor) return <div className="actor-page">Loading actor data...</div>;

  const handleCardClick = (item) => {
    const mediaType = item.title ? "MovieDetail" : "TvSeriesDetail"; 
    navigate(`/${mediaType}/${item.id}`); 
  };

  return (
    <div className="actor-page">
      <div className="actor-card">
        <img
          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          alt={actor.name}
          className="actor-image"
        />
        <div className="actor-details">
          <h1>{actor.name}</h1>
          <p>{actor.biography || "No biography available."}</p>
          <p>
            <strong>Born:</strong> {actor.birthday}{" "}
            {actor.place_of_birth && `in ${actor.place_of_birth}`}
          </p>
          {actor.deathday && (
            <p>
              <strong>Died:</strong> {actor.deathday}
            </p>
          )}
        </div>
      </div>

      <div className="toggle-buttons">
        <button
          onClick={() => setShowMovies(true)}
          className={showMovies ? "active-button" : ""}
        >
          Tv Roles
        </button>
        <button
          onClick={() => setShowMovies(false)}
          className={!showMovies ? "active-button" : ""}
        >
          Movie Roles
        </button>
      </div>

      <h2 className="section-title">
        Known For {showMovies ? "Tv Shows" : "Movies"}
      </h2>
      <div className="known-for-grid">
        {(showMovies ? movieCredits : tvCredits).slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="movie-card"
            onClick={() => handleCardClick(item)} 
            style={{ cursor: "pointer" }} 
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{item.title || item.name}</h3>
              <p>{item.release_date || item.first_air_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorPage;
