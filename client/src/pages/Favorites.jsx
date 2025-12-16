import { useQuery, useMutation  } from '@apollo/client';
import { GET_FAVORITES } from '../queries/favorites.js';
import {DELETE_MOVIE} from '../queries/getMovies.js'
import Layout from '../components/Layout.jsx';
import MoviesGrid from '../components/MoviesGrid.jsx';


export default function FavoritesPage({ genres, selectedGenre, handleGenreSelect }) {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITES);
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => refetch(), 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggleFavorite = (movieId) => {
    deleteMovie({ variables: { movieId } });
  };

  return (
    <Layout
      genres={genres}
      selectedGenre={selectedGenre}
      onSelectGenre={handleGenreSelect}
    >
      <MoviesGrid 
        movies={data.favorites}
        title="My Favorites"
        favorites={data.favorites} 
        onToggleFavorite={handleToggleFavorite}
        // onRemove={handleToggleFavorite}
        forceFavorite={true} 
      />
    </Layout>
  );
}