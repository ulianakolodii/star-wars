// utils/createNode.ts
import { Node } from "reactflow";
import { Hero, Film, Ships } from "../types/types";

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
    const filmData = films.get(filmId);
    const matchedShipsIds =
      filmData?.starships.filter((shipId) => hero.starships.includes(shipId)) ||
      [];

    const shipNodes = matchedShipsIds
      .map((shipId, idx) => {
        const shipData = ships.get(shipId);
        return shipData
          ? {
              id: `ship-${shipId}`,
              type: "shipNode",
              data: shipData,
              position: { x: idx * 300, y: 800 },
            }
          : null;
      })
      .filter((node) => node !== null);

    const filmNode = {
      id: `film-${filmId}`,
      type: "filmNode",
      data: filmData,
      position: { x: (index - hero.films.length / 3) * 300, y: 400 },
    };

    nodes.push(filmNode, ...shipNodes);
  });

  return nodes;
};
