import React, { useState, useEffect } from 'react';
import { checkWatchList, addToWatchList, removeFromWatchList } from '../Api/Api';
import '../styles/WatchListButton.css';

const WatchListButton = ({ mediaId, mediaType, title, posterPath, onToggle }) => {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWatchListStatus = async () => {
      try {
        const status = await checkWatchList(mediaId, mediaType);
        setIsInWatchList(status);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking watch list status:", error);
        setIsLoading(false);
      }
    };

    checkWatchListStatus();
  }, [mediaId, mediaType]);

  const handleToggleWatchList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsLoading(true);
      
      if (isInWatchList) {
        await removeFromWatchList(mediaId, mediaType);
        setIsInWatchList(false);
        if (onToggle) onToggle(false);
      } else {
        await addToWatchList(mediaId, mediaType, title, posterPath);
        setIsInWatchList(true);
        if (onToggle) onToggle(true);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error toggling watch list status:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`compact-watchlist-button ${isInWatchList ? 'in-watchlist' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={handleToggleWatchList}
      disabled={isLoading}
      aria-label={isInWatchList ? "Remove from watch list" : "Add to watch list"}
      title={isInWatchList ? "Remove from watch list" : "Add to watch list"}
    >
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <svg viewBox="0 0 24 24" fill={isInWatchList ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </button>
  );
};

export default WatchListButton;