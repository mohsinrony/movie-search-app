import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import movieData from '../dummy_data/aqua_movies.json'; 
import '../styles/SinglePage.css';



interface Movie {
  id: number; 
  name: string; 
  poster: string;
  rating: number;
  year: number;
}

interface Props {
  movieData: Movie[]; // Declare movieData as an array of Movie objects
}


const SingleMovie: React.FC<Props> = ({movieData}) => {
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
    
    </div>
  );
};

export default SingleMovie;

