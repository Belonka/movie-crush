import { createContext, useContext} from "react";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries/getGenres.js";

export const GenresContext = createContext([]);

export function GenresProvider({ children }) {
  const { data, loading, error  } = useQuery(GET_GENRES);
  return (
    <GenresContext.Provider value={{
      genres: data?.genres || [],
      loading,
      error
    }}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
  