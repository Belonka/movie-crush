
import Header from './components/header/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import Favorites from './pages/Favorites.jsx';
import GenreMoviesPage from './pages/GenreMoviesPage.jsx'
import {  Routes, Route } from "react-router-dom";
import MovieDetails from './pages/MovieDetails.jsx'



  
    export default function App() {
      return (
       <>
          <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/genre/:genreName" element={<GenreMoviesPage  />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
          {/* <Footer /> */}
        </>
      );
    }
