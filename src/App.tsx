import React, { ReactNode, useEffect, /* useState */ } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './pages/Home.tsx';
import SingleMovie from './pages/SinglePage';
import MovieList2 from './pages/MoviesPage';
import SearchResults from './pages/SearchResults';
import About from './pages/About.tsx';
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard';


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
      <div className="container">
        <div className='notFound'>
          <h1>Looks like you've found the doorway to the great nothing</h1>
          <p>Sorry about that! Please visit our homepage to get where you need to go.</p>
          <Link to="/" type="button">Take me there!</Link>
        </div>
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



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieList/>} />
          <Route path="/movies/:pageNumber" element={<MovieList2/>} />
          <Route path="/movie/:id" element={<SingleMovie/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About title="About Movie Search App" />} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;