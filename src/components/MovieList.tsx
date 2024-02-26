import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import '../styles/MovieList.css';


// Define the Movie interface
interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';
  }, []);
  
{/*
#SORTING: BY NAME, YEAR, RATING, POPULARITY
#FILTER: BY GENRE, YEAR, RATING (1-10), POPULARITY, LANGUAGE, COUNTRY
#GRID/LIST VIEW
*/}

  return (
    <div>
      <h1>Hero Banner Can Be Here!</h1>

      <div className="movie-list">
        {movies.length === 0 ? (
          <h2>No Movies Found</h2>
        ) : (
          movies.map(movie => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movies/${movie.id}`}>
                {movie.poster && <img src={movie.poster} alt={movie.name} />}
                <h2>{movie.name}</h2>
                <p>{movie.year}</p>
                <p>{movie.rating}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
