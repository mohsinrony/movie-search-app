import React, { useEffect, useState } from 'react';
import imageUrl from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { signOut, User } from 'firebase/auth';
import { auth } from '../firebase';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Header: React.FC = () => {

  //const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  

  // Function to handle search input change
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  // Function to handle search form submission
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect to the search results page with the search query as a query parameter
    navigate(`/search?page=${pageNum}&query=${searchQuery}`);
  };


  //Sign-out function is called with onClick={handleLogout} inside a HTML element
  const handleLogout = async () => {
    
    if (user) {
        try {
        await signOut(auth);
        //console.log('User logged out');
        navigate('/');
        } catch (error : any) {
        console.error('Logout error:', error.message);
        }
    }
    };

  return (
    <header>
      <div>
        <Link to={"/"}>
          {/*   <img src={imageUrl} height="60px" alt="T3MDB" /> */}
          <h1>T3 Movies</h1>
        </Link>
      </div>

              

      <form onSubmit={handleSearchSubmit}>
        <div className="searchBar">
          <SearchOutlinedIcon />
          {/* <span className='searchIcon'>&#128269;</span> */}
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
          />
        </div>
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
      <div>
      {user?<div className="user-auth">
          <a className='authLink' href={"/dashboard"}>
              <AccountCircleOutlinedIcon />
          </a>
          <a className='authLink-btn' href={"/auth"} onClick={handleLogout}>Logout</a>
        </div>:
          <div className="user-auth">
            <a className='authLink' href={"/auth"}>
            <AccountCircleOutlinedIcon />
            </a>
            <a className='authLink-btn' href={"/auth"}>Login</a>
          </div>
          
         }
      </div>
    </header>
  );
};

export default Header;