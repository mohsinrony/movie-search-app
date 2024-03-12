import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const HeroBanner: React.FC<{ sourceData: Movie[] }> = ({ sourceData }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setIndex((prevIndex) => (prevIndex + 1) % sourceData.length);
      }
    }, 5000); // Adjust autoplay interval as needed

    return () => clearInterval(interval);
  }, [paused, sourceData.length]);

  const handleHover = (isHovering: boolean) => {
    setPaused(isHovering);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? sourceData.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % sourceData.length);
  };

  const baseimageurl = "https://image.tmdb.org/t/p/original";

  return (
    <Carousel>
        {sourceData.map((movie, index) => (
          <Carousel.Item key={index} interval={2500} >
            <Image src={baseimageurl+movie.backdrop_path} />
            <Carousel.Caption>
              <h2 className='title'>{movie.title}</h2>
              <p>{movie.release_date.split("-")[0]}</p>
              <p className='description'>{movie.overview}</p>
              <button className="heroBtn">
              <PlayArrowIcon />
              Watch Trailer
            </button>
            <Link to={`/movie/${movie.id}`}>
              <button className="heroBtn">
                 View Movie
                  <NavigateNextIcon />
              </button>
            </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
  );
};

export default HeroBanner;
