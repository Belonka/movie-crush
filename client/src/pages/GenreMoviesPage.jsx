import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoviesGrid from '../components/MoviesGrid';

export default function GenreMoviesPage() {
    const {genreId } = useParams();
    
    const [movies, setMovies] = useState([]);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
              const url = genreId
                ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=${genreId}`
                : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
      
              const res = await fetch(url);
              const data = await res.json();
              setMovies(data.results || []);
            } catch (err) {
              console.error("Error fetching movies:", err);
            }
          };
      
          fetchMovies();
      }, [genreId]);
    
      return <MoviesGrid movies={movies} title={`Genre: ${genreId}`} />
    
}