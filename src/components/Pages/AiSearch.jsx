import React, { useState, useEffect } from 'react';
import { RecommendationService } from '../Api/RecommendationApi.jsx';
import { useNavigate } from 'react-router-dom'; 
import '../styles/RecomendationPage.css';

const AiSearch = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textPrompt, setTextPrompt] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [lastRecommendationType, setLastRecommendationType] = useState(null);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await RecommendationService.getUserFavorites();
        setFavorites(data);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };

    fetchFavorites();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (lastRecommendationType) {
      handleGetRecommendations(tab);
    }
  };

  const handleGetRecommendations = async (mediaType = activeTab) => {
    if (mediaType === 'all') {
      mediaType = null; 
    }

    setLoading(true);
    setError(null);
    setLastRecommendationType('favorites');
    
    try {
      const data = await RecommendationService.getRecommendationsFromFavorites(mediaType);
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Get recommendations based on text prompt
  const handleTextRecommendations = async (e) => {
    e.preventDefault();
    if (!textPrompt.trim()) return;
    
    let mediaType = activeTab;
    if (mediaType === 'all') {
      mediaType = null; // API expects null for all media types
    }

    setLoading(true);
    setError(null);
    setLastRecommendationType('text');
    
    try {
      const data = await RecommendationService.getRecommendationsFromText(textPrompt, mediaType);
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Handle click on a recommendation to navigate to details page
  const handleRecommendationClick = (recommendation) => {
    if (!recommendation.id) {
      console.warn('No ID available for this recommendation');
      return;
    }
  
    let mediaType = recommendation.mediaType?.toLowerCase();
  
    if (mediaType === 'tv show' || mediaType === 'tvseries') {
      mediaType = 'tv';
    }
  
    if (mediaType === 'movie') {
      navigate(`/MovieDetail/${recommendation.id}`);
    } else if (mediaType === 'tv') {
      navigate(`/TvSeriesDetail/${recommendation.id}`);
    } else {
      console.warn('Unsupported media type:', mediaType);
    }
  };
  
  

  return (
    <div className="recommendations-page container">
      <header>
        <h1>AI Recommendations</h1>
        <p className="lead">Discover new content based on your favorites or specific requests</p>
      </header>

      <div className="media-type-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'movie' ? 'active' : ''}`}
          onClick={() => handleTabChange('movie')}
        >
          Movies
        </button>
        <button 
          className={`tab-button ${activeTab === 'tv' ? 'active' : ''}`}
          onClick={() => handleTabChange('tv')}
        >
          TV Shows
        </button>
      </div>

      <div className="recommendation-options">
        <div className="recommendation-method">
          <h3>Get Recommendations</h3>
          <div className="recommendation-buttons">
            <button 
              onClick={() => handleGetRecommendations()}
              disabled={loading}
              className="primary-button"
            >
              {loading && lastRecommendationType === 'favorites' ? 'Loading...' : `Based on My Favorites`}
            </button>
            
            <button 
              onClick={() => setShowTextInput(!showTextInput)}
              className="secondary-button"
            >
              {showTextInput ? 'Hide Custom Request' : 'Custom Recommendation Request'}
            </button>
          </div>
          
          {showTextInput && (
            <form onSubmit={handleTextRecommendations} className="text-recommendation-form">
              <div className="input-group">
                <input
                  type="text"
                  className="text-input"
                  placeholder="E.g., Science fiction with strong female leads"
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="primary-button"
                  disabled={loading}
                >
                  {loading && lastRecommendationType === 'text' ? 'Loading...' : 'Get Custom Recommendations'}
                </button>
              </div>
              <p className="hint">Describe what you're in the mood for or specific themes you'd like to explore</p>
            </form>
          )}
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="content-container">
        <div className="favorites-section">
          <h2>Your Favorites</h2>
          {favorites.length === 0 ? (
            <p className="empty-state">You haven't added any favorites yet.</p>
          ) : (
            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="favorite-card">
                  {favorite.posterPath ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${favorite.posterPath}`} 
                      alt={favorite.title} 
                      className="poster"
                    />
                  ) : (
                    <div className="poster-placeholder">{favorite.title.charAt(0)}</div>
                  )}
                  <div className="favorite-info">
                    <h4>{favorite.title}</h4>
                    <span className="media-type">{favorite.mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="recommendations-section">
          <h2>Recommendations</h2>
          {recommendations.length === 0 ? (
            <div className="empty-recommendations">
              <p>No recommendations yet. Get started by clicking one of the buttons above!</p>
              {favorites.length === 0 && (
                <p>Add some favorites first to get personalized recommendations.</p>
              )}
            </div>
          ) : (
            <div className="recommendations-list">
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`recommendation-card ${rec.id ? 'clickable' : ''}`}
                  onClick={() => rec.id && handleRecommendationClick(rec)}
                >
                  <div className="recommendation-header">
                    <h3>{rec.title}</h3>
                    <div className="score">{rec.score}/10</div>
                  </div>
                  <p className="description">{rec.description}</p>
                  <div className="recommendation-reason">
                    <h4>Why you might like it:</h4>
                    <p>{rec.reasonForRecommendation}</p>
                  </div>
                  {rec.id && (
                    <div className="view-details">
                      <span className="details-link">View Details</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiSearch;