import React, { useState, useEffect } from 'react';
import { fetchDiscoverTV, fetchGenres } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import '../styles/DiscoverTv.css';


const DiscoverTVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      const tvData = await fetchDiscoverTV({
        page,
        sortBy,
        genres: selectedGenres.join(','),
        releaseYear,
      });
      setShows(tvData);
      setLoading(false);
    };
    loadShows();
  }, [page, selectedGenres, releaseYear, sortBy]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/TvSeriesDetail/${id}`);
  };

  return (
    <div className="discover-movies-page">
      <h2>Discover TV Shows</h2>

      <div className="content-container">
        <div className="sidebar">
          <input
            type="number"
            placeholder="First Air Year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="first_air_date.desc">Newest</option>
          </select>

          <div className="genre-filter">
            <h3>Genres</h3>
            <div className="genre-options">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`genre-button ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {selectedGenres.length > 0 && (
            <div className="selected-genres-box">
              <h3>Selected Genres:</h3>
              <ul>
                {selectedGenres.map((genreId) => {
                  const genre = genres.find((g) => g.id === genreId);
                  return genre ? <li key={genre.id}>{genre.name}</li> : null;
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="main-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="movies-list">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="movie-card"
                  onClick={() => handleNavigateToDetail(show.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                    alt={show.name}
                  />
                  <div className="movie-info">
                    <h3>{show.name}</h3>
                    <p>{show.overview?.substring(0, 150)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
              Previous
            </button>
            <span >Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverTVShowsPage;
