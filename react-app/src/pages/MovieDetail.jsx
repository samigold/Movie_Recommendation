import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI } from '../api/tmdb';
import Loader from '../components/Loader';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await movieAPI.getMovieById(id);
        
        if (response.success && response.data) {
          setMovie(response.data);
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleAddToWatchlist = () => {
    // TODO: Implement watchlist functionality
    alert(`"${movie.title || movie.original_title}" added to watchlist!`);
  };

  if (loading) {
    return <Loader isVisible={true} text="Loading movie details..." />;
  }

  if (error) {
    return (
      <div className="movie-detail-error">
        <div className="error-content">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleClose} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail-modal">
        <button className="close-btn" onClick={handleClose} aria-label="Close">
          &times;
        </button>
        
        <div className="movie-detail-content">
          <div className="movie-poster-section">
            <img 
              src={movie.poster_url || '/placeholder-movie.jpg'} 
              alt={movie.title || movie.original_title}
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg';
              }}
            />
          </div>
          
          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title || movie.original_title}</h1>
            
            <div className="movie-meta">
              {movie.release_date && (
                <span className="meta-item">
                  📅 {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {movie.vote_average && (
                <span className="meta-item">
                  ⭐ {movie.vote_average}/10
                </span>
              )}
              {movie.original_language && (
                <span className="meta-item">
                  🌍 {movie.original_language.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            
            <div className="movie-additional-info">
              {movie.vote_count && (
                <p><strong>Vote Count:</strong> {movie.vote_count.toLocaleString()}</p>
              )}
              {movie.popularity && (
                <p><strong>Popularity:</strong> {movie.popularity.toFixed(1)}</p>
              )}
              <p><strong>Adult Content:</strong> {movie.adult ? 'Yes' : 'No'}</p>
              
              {movie.genre_ids && movie.genre_ids.length > 0 && (
                <div className="genres">
                  <strong>Genre IDs:</strong>
                  <div className="genre-tags">
                    {movie.genre_ids.map(genreId => (
                      <span key={genreId} className="genre-tag">
                        Genre {genreId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="movie-actions">
              <button 
                className="watchlist-btn" 
                onClick={handleAddToWatchlist}
              >
                <i className="fas fa-plus"></i>
                Add to Watchlist
              </button>
              <button className="back-btn" onClick={handleClose}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
