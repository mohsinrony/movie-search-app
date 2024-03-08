import React, { useState } from 'react';
import imageUrl from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';



const Header: React.FC = () => {

  //const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);

  // Function to handle search input change
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Redirect to the search results page with the search query as a parameter
  //   navigate(`/search/${searchQuery}`);
  // };

  // Function to handle search form submission
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect to the search results page with the search query as a query parameter
    navigate(`/search?page=${pageNum}&query=${searchQuery}`);
  };

  return (
    <header>
      <div>
        <Link to={"/"}>
        <img src={imageUrl} height="60px" alt="T3MDB" />
        </Link>
      </div>

              

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies..."
          className='searchBar'
        />
        {/* <button type="submit">
          <span className="material-symbols-outlined">
          video_search
          </span>
        </button> */}
      </form>

      <nav className='mainNav'>
        <ul>
          <li>
            <a href={"/"}>Home</a>
          </li>
          <li>
            <a href='/movies/1'>Movies</a>
          </li>

          <li>
            <a href={"/about"}>About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
