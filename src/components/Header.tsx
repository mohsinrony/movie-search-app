import React, { useState } from "react";
import imageUrl from "./assets/6.png";
const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  return (
    <header>
      <div>
        <img src={imageUrl} height="60px;" width="60px;" alt="Logo" />

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
