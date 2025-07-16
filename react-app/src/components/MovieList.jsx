import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, loading, onAddToWatchlist, searchTerm }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="no-results">
        <h3>No movies found</h3>
        <p>Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {searchTerm && (
        <div className="results-header">
          <h2>Search results for "{searchTerm}"</h2>
          <p>{movies.length} movies found</p>
        </div>
      )}
      
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToWatchlist={onAddToWatchlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
