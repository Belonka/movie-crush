import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";

import MoviesGrid from "../components/MoviesGrid";
import {
   GET_MOVIES,
   GET_MOVIES_BY_GENRE
} from "../queries/getMovies";

import { useMovies } from "../context/MoviesContext";


export default function MoviesListPage({ title }) {

    const { selectedGenre } = useMovies();

    const query = selectedGenre 
        ? GET_MOVIES_BY_GENRE 
        : GET_MOVIES;

    const { data, loading, fetchMore } = useQuery(query, {
        variables: {
           page: 1,
           genreId: selectedGenre
        },
        notifyOnNetworkStatusChange: true
    });

    const movies = data
        ? (data.getMovies ?? data.getMoviesByGenre ?? [])
        : [];

    const loaderRef = useRef(null);
    const loadingMore = useRef(false);

    // infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading) {
                loadMore();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();

    }, [loading]);


    async function loadMore() {

        if (loadingMore.current) return;

        loadingMore.current = true;

        try {
            await fetchMore({
                variables: {
                    page: Math.floor(movies.length / 20) + 1,
                    genreId: selectedGenre
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    const key = selectedGenre
                        ? "getMoviesByGenre"
                        : "getMovies";

                    return {
                        [key]: [
                            ...(prev[key] || []),
                            ...fetchMoreResult[key]
                        ]
                    };
                }
            });
        } finally {
            loadingMore.current = false;
        }
    }


    return (
      <>
        <MoviesGrid movies={movies} title={title} />
        <div ref={loaderRef} style={{height:40}} />
        {loading && <h3>Loading...</h3>}
      </>
    );
}






