import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieItem from './MovieItem';
import PageNavigation from './PageNavigation';
import TopBar from './TopBar';

const Movies: React.FC = () => {
  const navigate = useNavigate();
  const { pageNumber }  = useParams();
  const pageNumberValue = Number(pageNumber) || 1;
  const pageNum = Number(pageNumberValue);

  const [movies, setMovies] = useState<any>(null);


  // Define filter state variables
  const [publishYear, setPublishYear] = useState<number>(0);
  const [selectedGenreId, setSelectedGenreId] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');
  const [viewMode, setViewMode] = useState<string>(() => {
    // Initialize viewMode from localStorage, or default to 'grid'
    return localStorage.getItem('viewMode') || 'grid';
  });

  useEffect(() => {
    document.title = 'Movies | T3 MovieDB App';
    navigate(`/movies/${pageNumber}`);
  }, [pageNumber]);



  useEffect(() => {
    const fetchData = async () => {
        try {
            let url = `https://api.themoviedb.org/3/discover/movie?page=${pageNum}`;

            // Append language parameter to the URL if language is specified
            if (selectedLang.length > 0) {
                url += `&with_original_language=${selectedLang}`;
            }

            // Append genre parameter to the URL if genre is specified
            const specificValue = 50005;
            if (selectedGenreId.length > 1) {
                // Remove 50005 from the selectedGenreId array if it exists
                const updatedGenres = selectedGenreId.filter(item => item !== specificValue.toString())
                url += `&with_genres=${updatedGenres.join(',')}`;
            }

            // Append year parameter to the URL if year is specified
            if (publishYear >= 1900) {
                url += `&primary_release_year=${publishYear}`;
            }

            // Append sort parameter to the URL if sort value is specified
            if (sortValue.length > 0) {
                url += `&sort_by=${sortValue}`;
            }

            //console.log('url: ' + url);
            setUrl(url);

            const options = {
              method: 'GET',
              headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
              }
            };

            const response = await axios.get(url, options);
            const dataArray = response.data.results;
            setMovies(dataArray);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //console.log('url data: ' + url);

    fetchData();
}, [url, pageNum, selectedLang, selectedGenreId, publishYear, sortValue]);

const toggleViewMode = () => {
  setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
}

  

  if (!movies) {
    return <div className='container'>Movies Loading...</div>;
  }

  

  // Define the handleGenreSelection function to manage selected genres
  const handleGenreSelection = (genre: { id: string | number; name: string }, checked: boolean) => {
    setSelectedGenreId(prevGenres => {
   const isSelected = prevGenres.includes(genre.id.toString());
      if (checked && !isSelected) {
        return [...prevGenres, genre.id.toString()];
      } else {
        return prevGenres.filter(item => item !== genre.id.toString());
      }
    });
  };


  const handleLanguageChange = (event : any) => {
    setSelectedLang(event.target.value); // Set the selected language code
  };

  const currentYear = new Date().getFullYear();


  return (
    <div className='container'>
      <TopBar
        selectedGenreId={selectedGenreId}
        selectedLang={selectedLang}
        handleGenreSelection={handleGenreSelection}
        handleLanguageChange={handleLanguageChange}
        setPublishYear={setPublishYear}
        setSortValue={setSortValue}
        currentYear={currentYear}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
      />

      <PageNavigation apiUrl={url} />

      {/* Browse Movies */}
      <div className={`${viewMode === 'grid' ? 'movie-list' : 'list'}`}>
        {movies && movies.map((movie: any) => (
          <MovieItem key={movie.id} movie={movie} viewMode={viewMode} />
        ))}
      </div>
      <PageNavigation apiUrl={url} />
    </div>
  );
};

export default Movies;
