import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleRandomMovie = () => {
    const randomQueries = [
      'action movies',
      'comedy movies', 
      'drama movies',
      'sci-fi movies',
      'horror movies',
      'romance movies'
    ];
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
    setQuery(randomQuery);
    onSearch(randomQuery);
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie genre... eg Love movies"
            disabled={isLoading}
            required
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={isLoading}
            aria-label="Search movies"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        
        <button 
          type="button"
          className="random-btn" 
          onClick={handleRandomMovie}
          disabled={isLoading}
          aria-label="Get random movie"
        >
          <i className="fas fa-shuffle"></i>
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
