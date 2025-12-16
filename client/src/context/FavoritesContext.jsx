import { createContext, useContext, useState,  useEffect} from "react";
import { useQuery, useMutation, gql } from "@apollo/client/react";

const FavoritesContext = createContext();

const GET_FAVORITES = gql`
    query{
        favorites{
            movieId
            title
            poster_path
            release_date
        }
    }
`;

const ADD_FAVORITE = gql`
 mutation ($movieId: Int!, $title: String!, $poster_path: String!, $release_date: String) {
    addFavorite(movieId: $movieId, title: $title, poster_path: $poster_path, release_date: $release_date) {
      movieId
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation ($movieId: Int!) {
    removeFavorite(movieId: $movieId)
  }
`;

export function FavoritesProvider({children}){
    const {data, loading, error } = useQuery(GET_FAVORITES);
    if (loading) return <div>Loading favorites...</div>;
    if (error) console.error(error);
    const [addFavorite] = useMutation(ADD_FAVORITE, {
        update(cache, { data: { addFavorite } }) {
          const existing = cache.readQuery({ query: GET_FAVORITES });
          cache.writeQuery({
            query: GET_FAVORITES,
            data: { favorites: [...existing.favorites, addFavorite] },
          });
        }
        })
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [{ query: GET_FAVORITES }],
      });

    const favorites = data?.favorites || [];

    const toggleFavorite = (movie) => {
        const isFav = favorites.some((m) => m.movieId === movie.id)

        if(isFav) {
            removeFavorite({variables: {movieId: movie.id}})
        } else {
            addFavorite({
                variables: {
                    movieId: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date
                },
                optimisticResponse: {
                addFavorite: {
                    __typename: "FavoriteMovie",
                    movieId: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                     }
             },
                update(cache, { data: { addFavorite } }) {
                    const existing = cache.readQuery({ query: GET_FAVORITES });
                    cache.writeQuery({
                      query: GET_FAVORITES,
                      data: {
                        favorites: [...existing.favorites, addFavorite],
                      },
                    });
                },
            })
        }
        }

    return(
        <FavoritesContext.Provider value ={{favorites, toggleFavorite}}>
        {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(useFavorites)
}