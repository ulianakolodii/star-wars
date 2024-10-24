import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Film, Films } from "../types/types";

interface FilmsContextType {
  films: Films;
}

export const FilmsContext = createContext<FilmsContextType | null>(null);

export const FilmsProvider = ({ children }) => {
  const [films, setFilms] = useState<Films>(new Map());

  const fetchFilms = useCallback(async () => {
    try {
      const response = await fetch(`https://sw-api.starnavi.io/films/`);
      const data = await response.json();
      const newFilms = new Map<number, Film>(
        data.results.map((film: Film) => [film.episode_id, film])
      );
      setFilms(newFilms);
    } catch (error) {
      console.error("Failed to fetch films:", error);
    }
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return (
    <FilmsContext.Provider value={{ films }}>{children}</FilmsContext.Provider>
  );
};

export const useFilms = () => {
  const context = useContext(FilmsContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};
