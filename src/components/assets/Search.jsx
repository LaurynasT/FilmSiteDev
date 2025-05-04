import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMulti } from '../Api/Api';
import "../styles/Search.css";

function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const searchResults = await searchMulti(query);
    navigate('/SearchResults', { state: { results: searchResults, searchType: 'all' } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="search-bar-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a movie, TV show, or person..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Search;
