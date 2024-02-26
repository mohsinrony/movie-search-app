import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import '../styles/MovieList.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList2: React.FC<MovieListProps> = ({ movies }) => {
  const [viewMode, setViewMode] = useState<string>(() => {
    // Initialize viewMode from localStorage, or default to 'grid'
    return localStorage.getItem('viewMode') || 'grid';
  });

  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';

    // Save viewMode to localStorage
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  // Toggle view mode function
  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className='container'>
      <div className="topBar">
        <h1>Browse Movies</h1>
        
        {/* Sorting and filtering controls */}
        {/* You can add sorting and filtering controls here */}

        {/* View mode toggle */}
        
        <span className={'material-symbols-outlined viewBtn'} onClick={toggleViewMode}>
          {`${viewMode === 'grid' ? 'view_list' : 'grid_view'}`}
        </span>
        
      </div>
      {/* Movies */}
      <div className={`${viewMode === 'grid' ? 'movie-list' : 'list'}`}>
        {movies.length === 0 ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} viewMode={viewMode} />
          ))
        )}
      </div>
    </div>
  );
};

interface MovieItemProps {
  movie: Movie;
  viewMode: string;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, viewMode }) => (
  <div className={`${viewMode === 'list' ? 'list-item' : 'movie-item'}`}>
    <Link to={`/movies/${movie.id}`}>
      {/* Fallback image if no movie poster */}
      {movie.poster? <img className='moviePoster' src={movie.poster} alt={movie.name} /> : <img className='moviePoster' src="../src/assets/PosterFallback.PNG" alt={movie.name} />}
    </Link>
    <div className="movie-details">
      <Link to={`/movies/${movie.id}`}>
        <h2>{movie.name}</h2>
      </Link>
      <p>{movie.year}</p>
      <p>&#9733;{movie.rating}/10</p>
      {viewMode === 'list' && <p>{movie.description}</p>}
    </div>
  </div>
);

export default MovieList2;
