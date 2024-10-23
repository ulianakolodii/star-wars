import { Edge } from "reactflow";
import { Hero, Film, Ships } from "../types/types";

// Helper function to create edges from hero to films
const createFilmEdge = (heroNodeId: string, filmId: number): Edge<any> => ({
  id: `edge-${heroNodeId}-film-${filmId}`,
  source: heroNodeId,
  target: `film-${filmId}`,
  type: "smoothstep",
  animated: true,
  style: { stroke: "#000" },
});

// Helper function to create edges from films to ships
const createShipEdge = (filmNodeId: string, shipId: string): Edge<any> => ({
  id: `edge-${filmNodeId}-ship-${shipId}`,
  source: filmNodeId,
  target: `ship-${shipId}`,
  type: "smoothstep",
  animated: true,
  style: { stroke: "#000" },
});

export const createEdges = (
  hero: Hero,
  films: Map<number, Film>,
  ships: Ships
): Edge<any>[] => {
  const heroNodeId = `hero-${hero.id}`;

  const filmEdges = hero.films.map((filmId) =>
    createFilmEdge(heroNodeId, filmId)
  );

  const shipEdges = hero.films.flatMap((filmId) => {
    const filmData = films.get(filmId);
    // Find hero's starships among the starships in the films
    const matchedShipsIds =
      filmData?.starships.filter((shipId) => hero.starships.includes(shipId)) ||
      [];

    return matchedShipsIds.map((shipId) =>
      createShipEdge(`film-${filmId}`, String(shipId))
    );
  });

  return [...filmEdges, ...shipEdges];
};
