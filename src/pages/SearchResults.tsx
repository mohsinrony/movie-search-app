import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../types';
import MovieItem from '../components/MovieItem';
//import PageNavigation from '../components/PageNavigation';
import PaginationSearch from '../components/PaginationSearch';

const SearchResults: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSearchResults = async (query: string, page: number) => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
        }
      };
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?page=${page}&query=${query}`, options);
      setSearchResults(response.data.results);
      setTotalResults(response.data.total_results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;
  
    setSearchQuery(query);
    setPageNumber(page);
  
    fetchSearchResults(query, page);
  }, [searchParams]);
  

  const [viewMode, setViewMode] = useState<string>(() => {
    // Initialize viewMode from localStorage, or default to 'grid'
    return localStorage.getItem('viewMode') || 'grid';
  });

  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';
    // Save viewMode to localStorage
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  // Toggle view mode function
  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const apiURL = `https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${searchQuery}&sort_by=popularity.desc&api_key=f9e370c3bee2326d72ef0a4ef15ad820`;

  return (
    <div className='container'>
      <div className="topBar">
        <h1>{totalResults} {(totalResults === 1)? <>result</>:<>results</>} found for "{searchQuery}"</h1>
        {/* Sorting and filtering controls */}
        {/* You can add sorting and filtering controls here */}
        {/* View mode toggle */}
        {totalResults > 0 ? (
        <div className='topBar-btn' onClick={toggleViewMode}>
        <span className={'material-symbols-outlined'}>
          {`${viewMode === 'grid' ? 'lists' : 'grid_view'}`}
        </span>
        <span>View</span>
      </div>
        ) : ''}
        
      </div>

      {totalResults > 0 ? (<PaginationSearch apiUrl={apiURL} searchQuery={searchQuery} />) : ''}
      
      {/* Browse Movies */}
      <div className={`${viewMode === 'grid' ? 'movie-list' : 'list'}`}>
        {searchResults.map((movie: Movie) => (
          <MovieItem key={movie.id} movie={movie} viewMode={viewMode} />
        ))}
      </div>

      {totalResults > 0 ? (<PaginationSearch apiUrl={apiURL} searchQuery={searchQuery} />) : ''}
      
      
    </div>
  );
};



export default SearchResults;
