import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import { movieAPI } from '../api/tmdb';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Function to handle search
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchTerm(query);
    
    try {
      const response = await movieAPI.searchMovies(query);
      
      if (response.success && response.data) {
        setMovies(response.data);
      } else {
        setMovies([]);
        setError('No movies found for this search.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding to watchlist
  const handleAddToWatchlist = (movie) => {
    // TODO: Implement watchlist functionality
    console.log('Adding to watchlist:', movie.title);
    
    // For now, just show an alert
    alert(`"${movie.title}" added to watchlist!`);
    
    // In a real app, you would:
    // 1. Check if user is logged in
    // 2. Send request to backend to add to user's watchlist
    // 3. Update local state or refetch user data
  };

  // Load popular movies on component mount (optional)
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        // You could modify your backend to have a "popular" or "trending" endpoint
        // For now, we'll search for a general term
        await handleSearch('popular movies');
      } catch (err) {
        console.error('Error loading popular movies:', err);
      }
    };

    // Uncomment to load popular movies on page load
    // loadPopularMovies();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <header className="home-header">
          <h1>Movie Recommendation</h1>
          <p className="subtitle">Discover your next favorite movie with AI-powered recommendations</p>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          isLoading={loading}
        />

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <MovieList
          movies={movies}
          loading={loading}
          onAddToWatchlist={handleAddToWatchlist}
          searchTerm={searchTerm}
        />
        
        <Loader 
          isVisible={loading} 
          text={`Searching for "${searchTerm}"...`}
        />
      </div>
    </div>
  );
};

export default Home;
