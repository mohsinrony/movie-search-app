import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    sourceData: Movie[];
    title: string;
  }
  
  const Carousel: React.FC<Props> = ({ title, sourceData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        // Update currentIndex to move to the next set of movies
        setCurrentIndex((prevIndex) => (prevIndex + 5) % sourceData.length);
      }, 5000); // Change every 5 seconds, adjust as needed
  
      return () => clearInterval(interval);
    }, [sourceData.length]);

    const baseimageurl = "https://image.tmdb.org/t/p/original";
  
    return (
      <div className="carousel">
        <h2 className='carouselTitle'>{title}</h2>
        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
          {sourceData.map((movie, index) => (
            <div className="carousel-item" key={index}>
                <Link to={`/movie/${movie.id}`}>
                    <img src={baseimageurl+movie.poster_path} alt={movie.title} />
                    <h3>{movie.title}</h3>
                </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Carousel;