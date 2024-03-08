import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Image, Movie } from '../types';
import '../styles/SinglePage.css';
import axios from 'axios'; // Import axios for HTTP requests
//import VideoCarousel from '../components/VideoCarousel';



const SingleMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieImages, setMovieImages] = useState<any>(null);
  //const [movieVideos, setMovieVideos] = useState<any>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
    }
  };
  useEffect(() => {
    const fetchMovieData = async () => {
      
      try {
        // Fetch movie details
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
        const movieDetails = response.data; // The response contains single movie details
        setMovie(movieDetails);

        // Fetch movie images
        const movieImagesRef = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, options);
        setMovieImages(movieImagesRef.data.backdrops);
        //console.log(movieImagesRef.data.backdrops);

        // Fetch movie videos
        // const movieVideosRef = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
        // setMovieVideos(movieVideosRef.data.results);
        //console.log(movieVideosRef.data.results);

        // Fetch related movies
        const relatedMoviesRef = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, options);
        const relatedMoviesData = relatedMoviesRef.data.results; // The response contains an array of similar movies
        setRelatedMovies(relatedMoviesData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieData();
  }, [id]); // Fetch data whenever ID changes


  if (!movie) {
    return <div>Loading...</div>;
  }

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';
  //const vidURL = movieVideos && movieVideos.length > 0 ? `https://www.youtube.com/embed/${movieVideos[0].key}` : '';
  //console.log(vidURL);

  //const imgsURL = movieImages && movieImages.length > 0 ? `https://image.tmdb.org/t/p/original/${movieImages[0].file_path}` : '';
  //console.log(imgsURL);


  return (
    <div className='container'>
      <div className="singleContainer">
      {movie.poster_path && (
          <img src={baseImgUrl + movie.poster_path} alt={movie.title} />
      )}

        <div className="movieDetails">
          <h1 className='movieTitle'>{movie.title}</h1>
          <p className='movie-info'>Released: {movie.release_date ? movie.release_date.split('-')[0] : 'Release date not available'}</p>
          <div className='movie-info'>Rating: 
          <div className="progress-bar">
              <div className="progress" style={{ width: `${movie.vote_average * 10}%` }}>
                  &#9733; {movie.vote_average.toFixed(1)}/10
              </div>
          </div>
          </div>
          <p className='movie-info'>{movie.vote_average.toFixed(1)}/10 ({movie.vote_count} Votes)</p>
          <p className='movie-info'>Genre: {movie.genres && movie.genres.map((genre) => genre.name).join(', ')}</p>
          <p className='movie-info'>Runtime: {movie.runtime} minutes</p>
          <p className='movie-info'>Language: {movie.original_language}</p>
          <p className='movie-info'>Description: {movie.overview}</p>
        </div>
      </div>

      <br />
      <hr />

      {relatedMovies.length > 0? (
        <div className='singlePageRelated'>
          <h2>Similar Movies</h2>
          <div className='relatedMovies'>
          {relatedMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?`} alt={movie.title} style={{width:"200px"}}/>
              <h6 className='movie-title'>{movie.title}</h6>
            </Link>
          ))}
          </div>
        </div>
      ) : ''}
    
    </div>
  );
};

export default SingleMovie;