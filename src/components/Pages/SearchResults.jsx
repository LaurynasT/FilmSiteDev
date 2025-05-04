// src/pages/SearchResults.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/SearchResults.css';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function SearchResults() {
  const location = useLocation();
  const { results = [], searchType = 'all' } = location.state || {};

  const filterResults = (type) => {
    if (type === 'movie') return results.filter((r) => r.media_type === 'movie');
    if (type === 'tv') return results.filter((r) => r.media_type === 'tv');
    if (type === 'person') return results.filter((r) => r.media_type === 'person');
    return results;
  };

  const filtered = filterResults(searchType);

  const getLinkPath = (item) => {
    if (item.media_type === 'movie') return `/MovieDetail/${item.id}`;
    if (item.media_type === 'tv') return `/TvSeriesDetail/${item.id}`;
    if (item.media_type === 'person') return `/ActorDetail/${item.id}`;
    return '#';
  };

  return (
    <div className="results-container">
      <h1>Search Results</h1>
      {filtered.length > 0 ? (
        <div className="card-grid">
          {filtered.map((item) => (
            <Link to={getLinkPath(item)} key={item.id} className="result-card">
              <img
                src={
                  item.poster_path || item.profile_path
                    ? `${IMAGE_BASE_URL}${item.poster_path || item.profile_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={item.title || item.name}
              />
              <div className="result-info">
                <h3>{item.title || item.name}</h3>
                <p>
                  {item.overview
                    ? item.overview.slice(0, 100) + '...'
                    : item.known_for_department
                    ? `Known for: ${item.known_for_department}`
                    : 'No overview available.'}
                </p>
                <span className="badge">
                  {item.media_type === 'movie'
                    ? 'Movie'
                    : item.media_type === 'tv'
                    ? 'TV Show'
                    : 'Actor'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
