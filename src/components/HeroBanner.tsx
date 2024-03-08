import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';

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
    <div className="hero-banner" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <div className={`hero-carousel ${paused ? 'paused' : ''}`} ref={carouselRef} style={{ transform: `translateX(-${index * 100}%)` }}>
      {sourceData.map((item, idx) => (
        <div className="hero-carousel-item" key={idx}>
            {/* Render your movie content here */}
            <Link to={`/movie/${item.id}`}>
                <img src={baseimageurl+item.backdrop_path} alt={item.title} />
                <h3>{item.title} ({item.release_date.split("-")[0]})</h3>
                {/* <p>{item.overview}</p> */}
            </Link>
        </div>
      ))}
      </div>
      <div className="heroBtns">
      <button className="hero-prev" onClick={prevSlide}>Previous</button>
      <button className="hero-next" onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default HeroBanner;
