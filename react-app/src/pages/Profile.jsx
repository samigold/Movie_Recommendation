import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Mock watchlist data - in a real app, this would come from an API
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      title: "The Passion of the Christ",
      poster_url: "https://image.tmdb.org/t/p/w500/v9f9MMrq2nGQrN7cHnQRmEq9lSE.jpg",
      release_date: "2004-02-25",
      vote_average: 7.5
    }
    // Add more mock data as needed
  ]);

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  return (
    <div className="profile-page">
      <div className="container">
        <header className="profile-header">
          <h1>My Watchlist</h1>
          <p className="subtitle">Movies you want to watch</p>
        </header>

        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <h3>Your watchlist is empty</h3>
            <p>Add movies to your watchlist to see them here!</p>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div key={movie.id} className="watchlist-item">
                <div className="movie-poster">
                  <img 
                    src={movie.poster_url || '/placeholder-movie.jpg'} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-movie.jpg';
                    }}
                  />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    {movie.release_date && (
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    )}
                    {movie.vote_average && (
                      <span>⭐ {movie.vote_average}</span>
                    )}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    <i className="fas fa-trash"></i>
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

export default Profile;
