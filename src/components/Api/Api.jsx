import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKEND_BASE_URL = "http://localhost:5135/api";

export const fetchMovieDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

export const fetchMovieTrailer = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    const videos = response.data.results;
    const officialTrailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : null;
  } catch (error) {
    console.error("Failed to fetch trailer:", error);
    throw error;
  }
};

export const fetchMovieCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie credits:", error);
    throw error;
  }
};

export const fetchPopularTvSeries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular Tv Series", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular movies", error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch upcoming movies", error);
    throw error;
  }
};

export const fetchTvSeriesDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Tv Series details:", error);
    throw error;
  }
};

export const fetchTvSeriesCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/credits`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TV credits:", error);
    throw error;
  }
};

export const fetchTvSeasons = async (id, seasonNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/season/${seasonNumber}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Seasons", error);
    throw error;
  }
};

export const fetchTvTrailer = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    const videos = response.data.results;
    const officialTrailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : null;
  } catch (error) {
    console.error("Failed to fetch trailer:", error);
    throw error;
  }
};

export const fetchCompanyDetail = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/company/${companyId}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company details", error);
    throw error;
  }
};

export const fetchSimilar = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch similar movies", error);
    throw error;
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movie reviews", error);
    throw error;
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/auth/login`,
      {
        Username: username,
        Password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${BACKEND_BASE_URL}/auth/token/revoke`, null, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const updateUsername = async (newName) => {
  try {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/auth/updatename`,
      { NewName: newName },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/auth/getuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getFavorites = async (mediaType = null) => {
  try {
    let url = `${BACKEND_BASE_URL}/favorites`;
    if (mediaType) {
      url += `?mediaType=${mediaType}`;
    }
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addFavorite = async (mediaId, mediaType, title, posterPath) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/favorites/add`,
      { mediaId, mediaType, title, posterPath },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (mediaId, mediaType) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/favorites/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const checkFavorite = async (mediaId, mediaType) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/favorites/check?mediaId=${mediaId}&mediaType=${mediaType}`,
      { withCredentials: true }
    );
    return response.data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

export const checkWatchList = async (mediaId, mediaType) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/WatchList/check?mediaId=${mediaId}&mediaType=${mediaType}`,
      { withCredentials: true }
    );
    return response.data.isInWatchList;
  } catch (error) {
    console.error("Error checking watch list status:", error);
    return false;
  }
};

export const addToWatchList = async (mediaId, mediaType, title, posterPath) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/WatchList/add`,
      { mediaId, mediaType, title, posterPath },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to watch list:", error);
    throw error;
  }
};

export const removeFromWatchList = async (mediaId, mediaType) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/WatchList/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing from watch list:", error);
    throw error;
  }
};

export const getWatchList = async (mediaType = null) => {
  try {
    const url = mediaType
      ? `${BACKEND_BASE_URL}/WatchList?mediaType=${mediaType}`
      : `${BACKEND_BASE_URL}/WatchList`;
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching watch list:", error);
    throw error;
  }
};

export const fetchActorData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${id}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch actor data:", error);
    throw error;
  }
};

export const fetchActorMovieCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${id}/movie_credits`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.cast;
  } catch (error) {
    console.error("Failed to fetch movie credits:", error);
    throw error;
  }
};

export const fetchActorTvCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${id}/tv_credits`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.cast;
  } catch (error) {
    console.error("Failed to fetch TV credits:", error);
    throw error;
  }
};

export const fetchSimilarTvSeries = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/similar`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch similar tv series", error);
    throw error;
  }
};

export const searchMulti = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        language: 'en-US',
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const fetchTrending = async (timeWindow) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/all/${timeWindow}`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' },
    });
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch trending media:', error);
    throw error;
  }
};

export const fetchDiscoverMovie = async ({
  page = 1,
  sortBy = 'popularity.desc',
  genres = '',
  releaseYear = '',
} = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        sort_by: sortBy,
        include_adult: false,
        include_video: false,
        page,
        with_genres: genres,
        primary_release_year: releaseYear,
        with_watch_monetization_types: 'flatrate',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch discover movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
};

export const fetchGenresTv = async () => {
  const response = await axios.get(`${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=en-US`);
  return response.data.genres;
};

export const fetchDiscoverTV = async ({ page = 1, sortBy = 'popularity.desc', genres = '', releaseYear = '' }) => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      sort_by: sortBy,
      page,
      with_genres: genres,
      first_air_date_year: releaseYear,
    },
  });
  return response.data.results;
};



export { IMAGE_BASE_URL };