import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
//import moviesList from './dummy_data/aqua_movies.json';

import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import SingleMovie from './pages/SinglePage';
import MovieList2 from './components/MovieList2';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
      </>
  );
}


const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Oops! Something Wrong!!';
  }, []);

  return (
    <div>
      <main>
        <div>
          <h1>Looks like you've found the doorway to the great nothing</h1>
          <p>Sorry about that! Please visit our homepage to get where you need to go.</p>
          <Link to="/" type="button">Take me there!</Link>
        </div>
      </main>
    </div>
  );
}


interface Movie {
  id: number; 
  name: string; 
  poster: string | null;
  rating: number;
  year: number;
}

interface MovieListProps {
  data: Movie[];
}

const App: React.FC<MovieListProps> = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://unelmamovie.com/api/v1/titles?page=1&perPage=18&type=movie&language=en&onlyStreamable=true&includeAdult=true');
        const dataArray = response.data.pagination.data;
        setData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Movies Loading...</div>;
  }



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieList movies={data}/>} />
          <Route path="/movies" element={<MovieList2 movies={data}/>} />
          <Route path="/movies/:id" element={<SingleMovie movieData={data} relatedMovies={data}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;