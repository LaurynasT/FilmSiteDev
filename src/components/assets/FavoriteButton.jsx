import React, { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, checkFavorite } from '../Api/Api';
import '../styles/FavoriteButton.css';
import { useAuth } from '../assets/AuthContext'; 

const FavoriteButton = ({ mediaId, mediaType, title, posterPath, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }
      
      try {
        const status = await checkFavorite(mediaId, mediaType);
        setIsFavorite(status);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking favorite status:", error);
        setIsLoading(false);
      }
    };
    
    checkFavoriteStatus();
  }, [mediaId, mediaType, isAuthenticated]); 

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    
    if (!isAuthenticated) {
      if (onToggle) onToggle(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (isFavorite) {
        await removeFavorite(mediaId, mediaType);
        setIsFavorite(false);
        if (onToggle) onToggle(false);
      } else {
        await addFavorite(mediaId, mediaType, title, posterPath);
        setIsFavorite(true);
        if (onToggle) onToggle(true);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`compact-favorite-button ${isFavorite ? 'favorite' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;