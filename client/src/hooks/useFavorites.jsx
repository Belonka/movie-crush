import { useMutation, useQuery } from "@apollo/client";
import { ADD_MOVIE, DELETE_MOVIE } from '../queries/getMovies.js';
import { GET_FAVORITES } from "../queries/favorites.js";

export function useFavorites() {
  const { data } = useQuery(GET_FAVORITES);
  const favorites = data?.favorites || [];

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  const toggleFavorite = async (movie) => {
    const realId = movie.id || movie.movieId;
    const isFavorite = favorites?.some(f => String(f.movieId) === String(realId));

    if (isFavorite) {
      await deleteMovie({ variables: { movieId: realId } });
    } else {
      await addMovie({
        variables: {
          movieId: realId,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date
        }
      });
    }
  };

  const isFavorite = (movie) => {
    const realId = movie.id || movie.movieId;
    return favorites?.some(f => String(f.movieId) === String(realId));
  };

  return { favorites, toggleFavorite, isFavorite };
}