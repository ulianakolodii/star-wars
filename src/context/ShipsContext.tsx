import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Ship, Ships } from "../types/types";

interface ShipsContextType {
  ships: Ships;
}

const ShipsContext = createContext<ShipsContextType | null>(null);

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState<Map<number, Ship>>(new Map());

  const fetchShips = useCallback(async () => {
    try {
      let nextPageUrl = `https://sw-api.starnavi.io/starships/?page=1`;
      const newShips = new Map<number, Ship>();

      while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        data.results.forEach((ship: Ship) => {
          newShips.set(ship.id, ship);
        });
        nextPageUrl = data.next;
      }
      setShips(newShips);
    } catch (error) {
      console.error("Failed to fetch ships:", error);
    }
  }, []);

  useEffect(() => {
    fetchShips();
  }, [fetchShips]);

  return (
    <ShipsContext.Provider value={{ ships }}>{children}</ShipsContext.Provider>
  );
};

export const useShips = () => {
  const context = useContext(ShipsContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};
