import React, {useEffect} from 'react';
//import MovieItem from './MovieItem';
//import { Movie } from '../types';
import axios from 'axios';
import '../styles/MovieList.css';
//import { Movie } from '../types';
import Carousel from './Carousel';
import HeroBanner from './HeroBanner';

const Home: React.FC = () => {
  //const [movies, setMovies] = React.useState<any[]>([]);
  const [nowPlayingCarousel, setNowPlayingCarousel] = React.useState<any[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [trendingCarousel, setTrendingCarousel] = React.useState<any[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [popularCarousel, setPopularCarousel] = React.useState<any[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [upcomingCarousel, setUpcomingCarousel] = React.useState<any[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [topratedCarousel, setTopratedCarousel] = React.useState<any[]>([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const url = `https://api.themoviedb.org/3`;
            const nowPlayingCarouseUrl = `${url}/movie/now_playing?language=en-US&page=1`;
            const trendingCarouselUrl = `${url}/trending/movie/week`;
            const popularCarouselUrl = `${url}/movie/popular?language=en-US&page=1`;
            const upcomingCarouselUrl = `${url}/movie/upcoming?language=en-US&page=1`;
            const topratedCarouselUrl = `${url}/movie/top_rated?language=en-US&page=1`;

            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
              }
            };

            //const response = await axios.get(url, options);
            //const dataArray = response.data.results;
            //setMovies(dataArray);

            // Fetch now playing movies
            const nowPlayingResponse = await axios.get(nowPlayingCarouseUrl, options);
            const nowPlayingData = nowPlayingResponse.data.results;
            setNowPlayingCarousel(nowPlayingData);
            //console.log(nowPlayingData);

            // Fetch trending movies
            const trendingResponse = await axios.get(trendingCarouselUrl, options);
            const trendingData = trendingResponse.data.results;
            setTrendingCarousel(trendingData);

            // Fetch popular movies
            const popularResponse = await axios.get(popularCarouselUrl, options);
            const popularData = popularResponse.data.results;
            setPopularCarousel(popularData);

            // Fetch upcoming movies
            const upcomingResponse = await axios.get(upcomingCarouselUrl, options);
            const upcomingData = upcomingResponse.data.results;
            setUpcomingCarousel(upcomingData);

            // Fetch top rated movies
            const topratedResponse = await axios.get(topratedCarouselUrl, options);
            const topratedData = topratedResponse.data.results;
            setTopratedCarousel(topratedData);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    fetchData();
}, []);

  return (
    <div className='container'>
      <HeroBanner /* title="Now Playing" */ sourceData={nowPlayingCarousel} />
      <Carousel title="Trending" sourceData={trendingCarousel} />
      <Carousel title="Popular" sourceData={popularCarousel} />
      <Carousel title="Upcoming" sourceData={upcomingCarousel} />
      <Carousel title="Top Rated" sourceData={topratedCarousel} />
    </div>
  );
};

export default Home;
