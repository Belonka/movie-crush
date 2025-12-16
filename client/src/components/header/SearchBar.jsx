import { useState, useEffect, useRef } from "react";
import {
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";



    const DesktopSearch = styled("div")(({ theme }) => ({
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.18),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.32),
      },
      marginLeft: theme.spacing(1),
      width: "300px",
    }));

    const MobileSearch = styled("div")(({ theme }) => ({
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.primary.main, 0.42),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.60),
      },
      color: "white",
      width: "100%",
      height: "36px",
      top: "50px"
    }));


    const SearchIconWrapper = styled("div")(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase, {
      shouldForwardProp: (prop) => prop !== "variant",
    })(({ theme, variant }) => ({
      color: "inherit",
      width: "100%",

      "& .MuiInputBase-input": {
        padding: theme.spacing(1.2),
        paddingLeft:
          variant === "desktop"
            ? `calc(1em + ${theme.spacing(4)})`
            : theme.spacing(1.2),
        fontSize: "1.3rem",
      },
    }));


export default function SearchBar({variant = "desktop", onClose}) {
    const Container = variant === "mobile"
      ? MobileSearch
      : DesktopSearch;
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);

    
    const searchMovies = (text) => {
      setQuery(text);

      clearTimeout(debounceRef.current);

      if (text.trim().length < 2) {
        setResults([]);
        setNoResults(false);
        return;
      }

    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}`
      );

      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setResults([]);
        setNoResults(true);
      } else {
        setResults(data.results);
        setNoResults(false);
      }
    }, 300);
  };

  
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
        setNoResults(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Container ref={wrapperRef}>
    
      {variant === "desktop" && (
        <SearchIconWrapper>
          <SearchIcon sx={{fontSize: {
                xs: "3rem",   
                sm: "3rem",   
                md: "2.5rem",
              },}}/>
        </SearchIconWrapper>
      )}
        <StyledInputBase 
            sx={{fontSize: "1.3rem",
              "& .MuiInputAdornment-root": {
    marginRight: "4px",
  },
            }}
          variant={variant}
          placeholder="Search movies…"
          value={query}
          onChange={(e) => searchMovies(e.target.value)}
          endAdornment={
            query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    setNoResults(false);
                  }}
                  sx={{
                    color: variant === "mobile" ? "white" : "inherit",
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }
        />
       

      {(results.length > 0 || noResults) && (
        <Paper
          sx={{
            position: "absolute",
            top: "45px",
           
            width: "100%",
            zIndex: 1000,
            background: "rgb(38, 67, 78)",
            color: "white",
            maxHeight: "350px",
            overflowY: "auto",
            borderRadius: "4px",
          }}
        >
          <List>
            
            {noResults && (
              <ListItem>
                <ListItemText
                  primary="No results found"
                  primaryTypographyProps={{ style: { color: "#aaa" } }}
                />
              </ListItem>
            )}

            
            {results.map((movie) => (
              <ListItem
                key={movie.id}
                
                component={Link}
                to={`/movie/${movie.id}`}
                onClick={() => {
                  setResults([]);
                  setNoResults(false);
                }}
                sx={{
                  "&:hover": { backgroundColor: "rgb(16, 35, 44)" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    sx={{ width: 50, height: 70 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography fontWeight="bold" fontSize="1.5rem" color="#fff" >
                      {movie.title}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                        fontSize="1.3rem" 
                        color="#bbbbbb"   
                        mt={0.5}
                        >
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "—"}
                      </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    
    </Container>
  );
}