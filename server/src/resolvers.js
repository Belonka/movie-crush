import FavoriteMovie  from './models/FavoriteMovie.js';


export const resolvers = {
    Query: {
        favorites: async () => {
            return await FavoriteMovie.find();
        },
        genres: async () => {
            const apiKey = process.env.TMDB_API_KEY;
            const res = await fetch(
              `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
            );
            const data = await res.json();
            return data.genres; 
          },
          getMovies: async (_, { page }) => {  
            const apiKey = process.env.TMDB_API_KEY;
      
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
            );
      
            const data = await res.json();
            return data.results;
          },
          getMoviesByGenre: async (_, { genreId, page }) => {
            const apiKey = process.env.TMDB_API_KEY;
        
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
            );
        
            const data = await res.json();
        
            return data.results;
        }
    },
    
    Mutation: {
        addMovie: async(_,{ movieId, title, poster_path, release_date }) => {
            const movie = new FavoriteMovie({movieId, title, poster_path, release_date});
            await movie.save();
            return movie;
        },
        deleteMovie: async(_, {movieId }) => {
            await FavoriteMovie.deleteOne({ movieId });
            return "Deleted";
        }
        
    }
}
