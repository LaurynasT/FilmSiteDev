import axios from "axios";

const TMDB_API_KEY=import.meta.env.VITE_APP_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

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
    try{
        const response = await axios.get(`${BASE_URL}/tv/popular`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data.results;
    } catch (error){
        console.error("Failed to fetch popular Tv Series",error)
        throw error;
    }
} 

export const fetchPopularMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data.results;
    } catch (error){
        console.error("Failed to fetch popular Tv Series",error)
        throw error;
    }
} 
export const fetchUpcomingMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data.results;
    } catch (error){
        console.error("Failed to fetch popular Tv Series",error)
        throw error;
    }
}

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
        console.error("Failed to fetch movie credits:", error);
        throw error;
    }
};

export const fetchTvSeasons = async (id, seasonNumber) => {
    try{
        const response = await axios.get(`${BASE_URL}/tv/${id}/season/${seasonNumber}`, {
            params: { api_key: TMDB_API_KEY, language: "en-US"},

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
    try{
        const response = await axios.get(`${BASE_URL}/company/${companyId}`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data;
    } catch (error){
        console.error("Failed to fetch company details",error)
        throw error;
    }
} 

export const fetchSimilar = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data.results;
    } catch (error){
        console.error("Failed to fetch similar movies",error)
        throw error;
    }
}

export const fetchMovieReviews = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
            params: {api_key: TMDB_API_KEY, language: "en-US"},
        });
        return response.data.results;
    } catch (error){
        console.error("Failed to fetch similar movies",error)
        throw error;
    }
}


export { IMAGE_BASE_URL };

