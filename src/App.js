// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

// OMDb API URL with your key
const API_URL = 'https://www.omdbapi.com?apikey=d21157a8';

const App = () => {
  // State variables
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to search for movies
  const searchMovies = async (title) => {
    if (!title) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Perform an initial search when the component loads
  useEffect(() => {
    searchMovies('Batman');
  }, []);

  // Handle search on pressing Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>CineVerse</h1>

      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="empty"><h2>{error}</h2></div>}

      {movies.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
