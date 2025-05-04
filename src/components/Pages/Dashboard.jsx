
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData, getFavorites, removeFavorite, getWatchList, removeFromWatchList, IMAGE_BASE_URL } from "../Api/Api";
import { useAuth } from "../assets/AuthContext"; 
import "../styles/Favorite.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); 
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeCollection, setActiveCollection] = useState("favorites");



  useEffect(() => {
    const loadCollection = async () => {
      try {
        setCollectionLoading(true);
        const mediaType = activeTab !== "all" ? activeTab : null;
        
        if (activeCollection === "favorites") {
          const favoritesData = await getFavorites(mediaType);
          setFavorites(favoritesData);
        } else {
          const watchListData = await getWatchList(mediaType);
          setWatchList(watchListData);
        }
        
        setCollectionLoading(false);
      } catch (err) {
        console.error(`Failed to fetch ${activeCollection}:`, err);
        setCollectionLoading(false);
        
        // Handle unauthorized errors
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate("/login");
        }
      }
    };

    if (isAuthenticated) {
      loadCollection();
    }
  }, [activeTab, activeCollection, isAuthenticated, navigate]);

  const handleChangeUsername = () => {
    navigate("/change-username");
  };

  const handleRemoveFavorite = async (mediaId, mediaType) => {
    try {
      await removeFavorite(mediaId, mediaType);
      setFavorites(favorites.filter(
        fav => !(fav.mediaId === mediaId && fav.mediaType === mediaType)
      ));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const handleRemoveWatchList = async (mediaId, mediaType) => {
    try {
      await removeFromWatchList(mediaId, mediaType);
      setWatchList(watchList.filter(
        item => !(item.mediaId === mediaId && item.mediaType === mediaType)
      ));
    } catch (err) {
      console.error("Failed to remove from watch list:", err);
    }
  };

  const handleNavigateToDetail = (mediaId, mediaType) => {
    if (mediaType === "movie") {
      navigate(`/MovieDetail/${mediaId}`);
    } else if (mediaType === "tv") {
      navigate(`/TvSeriesDetail/${mediaId}`);
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const currentCollection = activeCollection === "favorites" ? favorites : watchList;
  const handleRemoveItem = activeCollection === "favorites" ? handleRemoveFavorite : handleRemoveWatchList;
  const collectionTitle = activeCollection === "favorites" ? "My Favorites" : "My Watch List";

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name || user.userName}!</h2>
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <button
          onClick={handleChangeUsername}
          className="btn change-username"
        >
          Change Name
        </button>
      </div>

      <div className="collections-toggle">
        <button 
          className={`collection-btn ${activeCollection === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveCollection('favorites')}
        >
          Favorites
        </button>
        <button 
          className={`collection-btn ${activeCollection === 'watchlist' ? 'active' : ''}`}
          onClick={() => setActiveCollection('watchlist')}
        >
          Watch List
        </button>
      </div>

      <div className="collection-section">
        <h2>{collectionTitle}</h2>

        <div className="media-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`tab-btn ${activeTab === 'movie' ? 'active' : ''}`}
            onClick={() => setActiveTab('movie')}
          >
            Movies
          </button>
          <button
            className={`tab-btn ${activeTab === 'tv' ? 'active' : ''}`}
            onClick={() => setActiveTab('tv')}
          >
            TV Shows
          </button>
        </div>

        {collectionLoading ? (
          <div>Loading {activeCollection}...</div>
        ) : currentCollection.length === 0 ? (
          <div className="no-items">
            <p>No {activeCollection} found. Start adding your {activeCollection === "favorites" ? "favorite" : "watch list"} movies and TV shows!</p>
          </div>
        ) : (
          <div className="media-grid">
            {currentCollection.map((item) => (
              <div key={`${item.mediaType}-${item.mediaId}`} className="media-card">
                <div className="media-poster" onClick={() => handleNavigateToDetail(item.mediaId, item.mediaType)}>
                  {item.posterPath ? (
                    <img
                      src={`${IMAGE_BASE_URL}${item.posterPath}`}
                      alt={item.title}
                    />
                  ) : (
                    <div className="no-poster">No Image</div>
                  )}
                </div>
                <div className="media-details">
                  <h3>{item.title}</h3>
                  <p className="media-type">{item.mediaType === 'movie' ? 'Movie' : 'TV Series'}</p>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.mediaId, item.mediaType)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;