import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Heroes, Hero } from "../types/types";

interface HeroesContextType {
  heroes: Heroes;
  lastElementRef: (node: HTMLLIElement | null) => void;
}

export const HeroesContext = createContext<HeroesContextType | null>(null);

export const HeroesProvider = ({ children }) => {
  const [heroes, setHeroes] = useState<Heroes>(new Map());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const fetchHeroes = useCallback(async (page) => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/people?page=${page}`
      );
      const data = await response.json();
      const newHeroes = new Map<number, Hero>(
        data.results.map((hero: Hero) => [hero.id, hero])
      );
      setHeroes((prevHeroes) => new Map([...prevHeroes, ...newHeroes]));
      setHasMore(!!data.next);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  }, []);

  useEffect(() => {
    fetchHeroes(page);
  }, [page, fetchHeroes]);

  const lastElementRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  return (
    <HeroesContext.Provider value={{ heroes, lastElementRef }}>
      {children}
    </HeroesContext.Provider>
  );
};

export const useHeroes = () => {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};
