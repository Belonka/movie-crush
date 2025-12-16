import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, CardMedia, Grid } from "@mui/material";
import { CircularProgress, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../hooks/useFavorites";

export default function MovieDetails() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [cast, setCast] = useState([]);


  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
   
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const data = await res.json();
      setMovie(data);

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      const creditsData = await creditsRes.json();
      setCast(creditsData.cast);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const background = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;


  return (
      <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>   
      <Box
        sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px)",
        transform: "scale(1.1)",
        zIndex: -1,
        "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
        }
        }}
  />
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          margin: "0 auto",
          px: { xs: 2, sm: 5 },
          pt: { xs: 12, sm: 12, md: 13 },
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 7 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
        <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: { xs: "90%", sm: "370px" },
              borderRadius: 3,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          />

          <Box sx={{ 
            color: "white", 
            maxWidth: {
                xs: "90%",   
                sm: "600px", 
                md: "70%", 
                lg: "70%"  
              } }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize:  "5rem",
               
              }}
            >
              {movie.title}
            </Typography>

            

            <Typography variant="h3" sx={{ opacity: 0.9, mt: 3 }}>
              ({movie.release_date?.slice(0, 4)} •{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m)
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <CircularProgress
                variant="determinate"
                value={movie.vote_average * 10}
                size={60}
                thickness={5}
                sx={{ color: "#0000FF", backgroundColor: "white", borderRadius: "50%", padding: "3px" }}
            />
            <Typography sx={{ ml: 2, fontSize: "3rem" }}>
                {movie.vote_average.toFixed(1)}/10
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: 4 }}>
            <IconButton onClick={() => toggleFavorite(movie)} sx={{ color: "white" }}> 
                {isFavorite(movie) ? (
                <FavoriteIcon sx={{ color: "#0000FF", fontSize: 52 }} />
                ) : (
                <FavoriteBorderIcon sx={{ fontSize: 42 }} />
                )}
            </IconButton>
            </Box>
            </Box>

            <Typography
              variant="h3"
              sx={{ mt: 3, fontSize: { xs: "2rem", md: "2.5rem" } }}
            >
              {movie.genres?.map((g) => g.name).join(" • ")}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 3, 
                opacity: 0.85, 
                lineHeight: 1.6, 
                fontSize: { xs: "1.5rem", md: "2rem"},
                overflowWrap: "break-word",
                wordBreak: "break-word",
            }}
            >
              {movie.overview}
            </Typography>
            <Box sx={{ mt: 3 }}>
    <Typography variant="h4" sx={{ color: "white", mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
      Cast
    </Typography>
  
    <Box sx={{ display: "flex", overflowX: "auto", gap: 3, pb: 2 }}>
      {cast.slice(0, 15).map((actor) => (
        <Box
          key={actor.cast_id}
          sx={{
            minWidth: 120,
            textAlign: "center",
            color: "white",
          }}
        >
          <Box
            component="img"
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://placehold.co/200x300?text=No+Image"
            }
            sx={{
              width: "120px",
              height: "160px",
              borderRadius: 2,
              objectFit: "cover",
              mb: 1,
            }}
          />
          <Typography sx={{ fontSize: "1.7rem" }}>{actor.name}</Typography>
          <Typography sx={{ fontSize: "1.5rem", opacity: 0.7 }}>
            {actor.character}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
  </Box>
  </Box>
        
          </Box>
      
          
  
    </Box>
    
    );
}
 
       