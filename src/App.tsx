import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import SingleMovie from './pages/SinglePage';
import movieData from './dummy_data/aqua_movies.json'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList movies={movieData.results} />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
