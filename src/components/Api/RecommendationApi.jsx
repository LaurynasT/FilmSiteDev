import axios from 'axios';

const API_BASE_URL = "http://localhost:5135/api";

export const getRecommendationsFromFavorites = async (mediaType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations`, {
      params: { mediaType },
      withCredentials: true,
    });

    if (response.data.recommendations && response.data.recommendations.length > 0) {
      const hasIds = response.data.recommendations.some(rec => rec.id);
      if (!hasIds) {
        console.warn('Recommendations do not have IDs. Details navigation may not work.');
      }
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error.response?.data || error.message || 'Failed to get recommendations';
  }
};

export const getUserFavorites = async (mediaType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`, {
      params: { mediaType },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error.response?.data || error.message || 'Failed to get favorites';
  }
};

export const getRecommendationsFromText = async (prompt, mediaType) => {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt is required");
    }

    const payload = {
      prompt,
      mediaType: mediaType || null,
    };

    console.log("Sending payload:", payload);

    const response = await axios.post(`${API_BASE_URL}/recommendations/text`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.data.recommendations && response.data.recommendations.length > 0) {
      const hasIds = response.data.recommendations.some(rec => rec.id);
      if (!hasIds) {
        console.warn('Recommendations do not have IDs. Details navigation may not work.');
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching text recommendations:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Validation Errors:", error.response.data.errors);
      console.error("Response status:", error.response.status);
    }

    throw error.response?.data || error.message || 'Failed to get recommendations';
  }
};


export const getMediaDetailsUrl = (mediaId, mediaType) => {
  if (!mediaId) return null;

  if (mediaType === 'movie') {
    return `/movie/${mediaId}`;
  } else if (mediaType === 'tv') {
    return `/tv/${mediaId}`;
  } else {
    return `/media/${mediaId}`;
  }
};

export const RecommendationService = {
  getRecommendationsFromFavorites,
  getUserFavorites,
  getRecommendationsFromText,
  getMediaDetailsUrl
};

export default RecommendationService;
