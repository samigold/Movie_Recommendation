import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking watchlist button
    onAddToWatchlist(movie);
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <div className="movie-poster">
        <img 
          src={movie.poster_url || '/placeholder-movie.jpg'} 
          alt={movie.title || movie.original_title}
          onError={(e) => {
            e.target.src = '/placeholder-movie.jpg';
          }}
        />
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title || movie.original_title}</h3>
        <div className="movie-meta">
          {movie.release_date && (
            <span className="release-year">
              {new Date(movie.release_date).getFullYear()}
            </span>
          )}
          {movie.vote_average && (
            <span className="rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <p className="movie-overview">
          {movie.overview?.length > 120 
            ? `${movie.overview.substring(0, 120)}...` 
            : movie.overview
          }
        </p>
      </div>
      
      <div className="movie-actions">
        <button 
          className="watchlist-btn"
          onClick={handleWatchlistClick}
          aria-label="Add to watchlist"
        >
          <i className="fas fa-plus"></i>
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
