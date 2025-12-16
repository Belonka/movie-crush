
import { Box } from "@mui/material";
import Sidebar from './Sidebar.jsx'; 
import { useGenres } from "../context/GenresContext";
import { useMovies } from "../context/MoviesContext";

export default function Layout({ children }) {
    const { genres, loading } = useGenres();
    const {selectedGenre, handleGenreSelect}  = useMovies();

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      
      <Sidebar
        genres={genres }
        onSelectGenre={handleGenreSelect}
        selectedGenre={selectedGenre}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: "6.7rem",
          ml: { sm: "5rem" },
        //   margin: "0 auto"
        }}
      >
        {children} 
      </Box>
    </Box>
  );
}