import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types';
import '../styles/SinglePage.css';
import { Link } from 'react-router-dom';

// Define the props for the SingleMovie component
interface Props {
  movieData: Movie[]; // Declare movieData as an array of Movie objects
  relatedMovies: Movie[]; // Declare relatedMovies as an array of Movie objects
}


const SingleMovie: React.FC<Props> = ({movieData, relatedMovies}) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
   
    const selectedMovie = movieData.find(movie => movie.id.toString() === id);
    if (selectedMovie) {
      const { id, name, poster, rating, year } = selectedMovie;
 
  setMovie({ id, name, poster: poster || 'default-poster.jpg', rating, year });
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='single-page-container'>
      <img src={movie.poster} alt={movie.name} className='movie-poster' />
      <h1 className='movie-title'>{movie.name}</h1>
      <p className='movie-info'>{movie.year}</p>
      <p className='movie-info'>{movie.rating}</p>
      <hr />
      {/* RELATED MOVIES 
      https://unelmamovie.com/api/v1/titles/{id}/related */}
      {relatedMovies.length && (
        <div className='singlePageRelated'>
          <h2>Similar Movies</h2>
          <div style={{ display: "flex", gridGap:"1rem", flexDirection: "row" }}>
          {relatedMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <img className='movie-poster' src={movie.poster} alt={movie.name} style={{width:"200px"}}/>
              <h6 className='movie-title'>{movie.name}</h6>
              <p className='movie-info'>{movie.year}</p>
              <p className='movie-info'>{movie.rating}</p>
            </Link>
          ))}
          </div>
        </div>
      )}
    
    </div>
  );
};

export default SingleMovie;

