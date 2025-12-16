import { useContext, useState, createContext } from "react";

const MoviesContext = createContext();

export function MoviesProvider ({children}) {
    
    const [selectedGenre, setSelectedGenre] = useState(null);

  function handleGenreSelect(id) {
    setSelectedGenre(id);
}

  return (
    <MoviesContext.Provider
      value={{  
        selectedGenre, 
        handleGenreSelect }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);

