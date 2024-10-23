import { Node } from "reactflow";
import { Hero, Film, Ships } from "../types/types";

// Helper function to create a ship node
const createShipNode = (
  shipId: string,
  shipData: any,
  idx: number
): Node<any> => ({
  id: `ship-${shipId}`,
  type: "shipNode",
  data: shipData,
  position: { x: idx * 300, y: 800 },
});

// Helper function to create a film node
const createFilmNode = (
  filmsAmount: number,
  filmId: number,
  filmData: Film,
  index: number
): Node<any> => ({
  id: `film-${filmId}`,
  type: "filmNode",
  data: filmData,
  position: { x: (index - filmsAmount / 3) * 300, y: 400 }, // Adjusted for dynamic position
});

export const createNodes = (
  hero: Hero,
  films: Map<number, Film>,
  ships: Ships
): Node<any>[] => {
  const heroNodeId = `hero-${hero.id}`;
  const nodes: Node<any>[] = [
    {
      id: heroNodeId,
      type: "heroNode",
      data: hero,
      position: { x: 50, y: 50 },
    },
  ];

  hero.films.forEach((filmId, index) => {
    const filmData = films.get(filmId) as Film;
    // Find hero's starships among the starships in the films
    const matchedShipsIds =
      filmData?.starships.filter((shipId) => hero.starships.includes(shipId)) ||
      [];

    const shipNodes = matchedShipsIds
      .map((shipId, idx) => {
        const shipData = ships.get(shipId);
        return shipData ? createShipNode(String(shipId), shipData, idx) : null;
      })
      .filter((node) => node !== null);

    const filmNode = createFilmNode(hero.films.length, filmId, filmData, index);
    nodes.push(filmNode, ...shipNodes);
  });

  return nodes;
};
