import React, { useState } from 'react';
import imageUrl from "../assets/react.svg";
import { Link } from 'react-router-dom';



const Header: React.FC = () => {

  const [search, setSearch] = useState("");
  //const [movies, setMovies] = useState([]);

  return (
    <header>
      <div>
        <Link to={"/"}>
        <img src={imageUrl} height="60px;" width="60px;" alt="Logo" />
        </Link>
        

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
