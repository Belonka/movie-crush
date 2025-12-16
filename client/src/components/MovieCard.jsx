import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation} from '@apollo/client';
import { ADD_MOVIE, DELETE_MOVIE } from '../queries/getMovies.js';
import { GET_FAVORITES } from "../queries/favorites.js";
import { Menu, MenuItem } from "@mui/material";

export default function MovieCard({movie, favorites, forceFavorite, onCardClick }) {
    const realId = movie.id || movie.movieId;
    const isFavorite = forceFavorite || favorites?.some(f => String(f.movieId) === String(realId));
    const navigate = useNavigate();
   

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries:[{query: GET_FAVORITES}]
  })

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries:[{query: GET_FAVORITES}]
  })

  const handleToggleFavorite = async() => {
    if (isFavorite) {
       
        await deleteMovie({
          variables: { movieId: realId }
        });
      } else {
        
        await addMovie({
          variables: {
            movieId: realId,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
          }
        });
      }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    };

  const handleRemove = () => {
    deleteMovie({ variables: { movieId: realId } });
    setMenuOpen(false);
    };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: {
            xs: "87%",   
            sm: 200,     
            md: 200,    
          },
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {forceFavorite ? (
        <div style={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            transition: "0.2s",
            zIndex: 20
          }}
          onClick={handleMenuToggle}
        >
          <MoreVertIcon sx={{ fontSize: "2.5rem", color: "white" }} />
        </IconButton>
      
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: "27%",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(8px)" : "translateX(0px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              background: "rgba(139, 28, 26, 0.7)",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              padding: "8px",
              zIndex: 999,
              cursor: "pointer",
              width: "130px",
              display: "flex",
    alignItems: "center",
    gap: "4px"
            }}
            onClick={handleRemove}
          >
            <DeleteIcon sx={{ color: "red", fontSize: "2rem"  }} />
            <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "white", textAlign: "center" }}>Remove from Favorites</span>
          </div>
        )}
      </div>
      ) : (
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
            transition: "0.2s",
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ fontSize: "2.5rem", color: "blue" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: "2.5rem", color: "white" }} />
          )}
        </IconButton>
      )}
  
      
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={onCardClick}
        // onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{
          width: "100%",
          aspectRatio: "2 / 3",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />
  
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            whiteSpace: "normal",
            overflow: "hidden",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {movie.title}
        </Typography>
  
        <Typography variant="h5" color="text.secondary">
          {movie.release_date}
        </Typography>
      </CardContent>
    </Card>
  );
}

