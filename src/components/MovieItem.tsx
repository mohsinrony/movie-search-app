import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieItemProps {
    movie: Movie;
    viewMode?: string;
  }
  
  const MovieItem: React.FC<MovieItemProps> = ({ movie, viewMode }) => (
    <div className={`${viewMode === 'list' ? 'list-item' : 'grid-item'}`}>
      <Link to={`/movie/${movie.id}`}>
        
        {movie.poster_path? <img className='moviePoster' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} /> 
        : <img className='moviePoster' src="../src/assets/PosterFallback.png" alt={movie.title} />} {/* Fallback image if no movie poster */}
      </Link>
      <div className="movie-details">
        <Link to={`/movie/${movie.id}`}>
          <h2>{movie.title}</h2>
        </Link>
        <p>{movie.release_date ? movie.release_date.split('-')[0] : ''}</p>
        {/* <p>{movie.vote_average.toFixed(1)}/10</p> */}
        <div className="progress-bar">
        {movie.vote_average ? 
            <div className="progress" style={{ width: `${(movie.vote_average / 10) * 100}%` }}>
                &#9733; {Number(movie.vote_average).toFixed(1)}/10
            </div>
         : 
        
          <div className="progress0" style={{ width: '0%' }}>
              &#9733; No rating yet
          </div>
      }
      </div>
        {viewMode === 'list' && <p>{movie.overview}</p>}
      </div>
    </div>
  );

export default MovieItem;
