import axios from 'axios';

// Create axios instance for your backend API
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// API utility functions
export const movieAPI = {
  // Search movies by query
  searchMovies: async (query) => {
    try {
      const response = await api.get(`/movies/${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get(`/movies/details/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Clear cache functions (admin)
  clearSearchCache: async (term) => {
    try {
      const response = await api.delete(`/movies/cache/search/${term}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing search cache:', error);
      throw error;
    }
  },

  clearMovieCache: async (id) => {
    try {
      const response = await api.delete(`/movies/cache/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing movie cache:', error);
      throw error;
    }
  },

  clearAllCache: async () => {
    try {
      const response = await api.delete('/movies/cache/all');
      return response.data;
    } catch (error) {
      console.error('Error clearing all cache:', error);
      throw error;
    }
  }
};

// Helper function to construct poster URLs
export const getFullPosterUrl = (posterPath, size = 'w500') => {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

export default api;
