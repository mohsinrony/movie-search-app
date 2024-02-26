import React, { useState } from 'react';
import imageUrl from "../assets/logo.png";
import { Link } from 'react-router-dom';



const Header: React.FC = () => {

  const [search, setSearch] = useState("");
  //const [movies, setMovies] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <header>
      <div>
        <Link to={"/"}>
        <img src={imageUrl} height="60px" alt="T3MDB" />
        </Link>
      </div>

              

      <input
            type="text"
            className='searchBar'
            placeholder="Search movies..."
            value={search}
            onChange={handleSearchChange}
      />

      <nav className='mainNav'>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/movies"}>Movies</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
