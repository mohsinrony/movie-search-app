import React, {useEffect} from 'react';
import MovieItem from './MovieItem';
//import { Movie } from '../types';
import axios from 'axios';
import '../styles/MovieList.css';

const MovieList: React.FC = () => {
  const [movies, setMovies] = React.useState<any[]>([]);
  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            let url = `https://api.themoviedb.org/3/discover/movie?page=1&sort_by=vote_average.desc`;

            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
              }
            };

            const response = await axios.get(url, options);
            const dataArray = response.data.results;
            setMovies(dataArray);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    fetchData();
}, []);

  return (
    <div>
      {/* <h1>Hero Banner Can Be Here!</h1> */}

      <div className="movie-list">
        {movies.length === 0 ? (
          <h2>No Movies Found</h2>
        ) : (
        
          movies && movies.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))
        
        )}
      </div>
    </div>
  );
};

export default MovieList;
