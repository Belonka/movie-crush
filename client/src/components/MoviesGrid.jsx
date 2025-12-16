import { Grid} from "@mui/material";
import MovieCard from "./MovieCard";
import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../queries/favorites.js";
import { useNavigate } from "react-router-dom";

export default function MoviesGrid ({movies, forceFavorite}) {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITES);
  const favorites = data?.favorites || [];
  
  const navigate = useNavigate();

    return(

      <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch">
      {movies?.map((movie) => {
        const realId = movie.id || movie.movieId;

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={realId}>
            <MovieCard
              onCardClick={() => navigate(`/movie/${realId}`)}
              movie={movie}
              favorites={favorites}
              forceFavorite={forceFavorite}
            />
          </Grid>
        );
      })}
    </Grid>
        
    )
}