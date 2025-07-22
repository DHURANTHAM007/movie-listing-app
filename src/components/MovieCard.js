import React from 'react';
import './MovieCard.css'; // We'll create this file next

const MovieCard = ({ movie }) => {
  // Use a placeholder image if the poster is not available
  const poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/400' : movie.Poster;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={poster} alt={movie.Title} />
      </div>
      <div className="movie-details">
        <span className="movie-type">{movie.Type}</span>
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
