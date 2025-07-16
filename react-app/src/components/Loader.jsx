import React from 'react';
import './Loader.css';

const Loader = ({ isVisible, text = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <p className="loader-text">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
