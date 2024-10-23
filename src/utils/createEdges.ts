// utils/createEdges.ts
import { Edge } from "reactflow";
import { Hero, Film, Ships } from "../types/types"; // Adjust import based on your types

export const createEdges = (
  hero: Hero,
  films: Map<number, Film>,
  ships: Ships
): Edge<any>[] => {
  const heroNodeId = `hero-${hero.id}`;

  const filmEdges: Edge<any>[] = hero.films.map((filmId) => {
    const filmNodeId = `film-${filmId}`;
    return {
      id: `edge-${heroNodeId}-${filmNodeId}`,
      source: heroNodeId,
      target: filmNodeId,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#000" },
    };
  });

  const shipEdges: Edge<any>[] = hero.films.flatMap((filmId) => {
    const filmData = films.get(filmId);
    const matchedShipsIds =
      filmData?.starships.filter((shipId) => hero.starships.includes(shipId)) ||
      [];

    return matchedShipsIds.map((shipId) => {
      const filmNodeId = `film-${filmId}`;
      return {
        id: `edge-${filmNodeId}-ship-${shipId}`,
        source: filmNodeId,
        target: `ship-${shipId}`,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#000" },
      };
    });
  });

  return [...filmEdges, ...shipEdges];
};
