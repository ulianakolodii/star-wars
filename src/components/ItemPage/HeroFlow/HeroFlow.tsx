import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, { Controls, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import HeroNode from "../HeroNode/HeroNode.tsx";
import FilmNode from "../FilmNode/FilmNode.tsx";
import ShipNode from "../ShipNode/ShipNode.tsx";
import { Hero } from "../../../types/types.ts";
import { useHeroes } from "../../../context/HeroesContext.tsx";
import { useFilms } from "../../../context/FilmsContext.tsx";
import { useShips } from "../../../context/ShipsContext.tsx";
import { createNodes } from "../../../utils/createNodes.ts";
import { createEdges } from "../../../utils/createEdges.ts";
import NotFoundPage from "../../NotFoundPage/NotFoundPage.tsx";

const nodeTypes = {
  heroNode: HeroNode,
  filmNode: FilmNode,
  shipNode: ShipNode,
};

const HeroFlow = () => {
  const { id } = useParams<{ id: string }>();
  const { heroes } = useHeroes();
  const { films } = useFilms();
  const { ships } = useShips();
  const [hero, setHero] = useState<Hero>();

  const fetchHero = useCallback(async () => {
    try {
      const response = await fetch(`https://sw-api.starnavi.io/people/${id}`);
      const data = await response.json();
      setHero(data);
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    }
  }, [id]);

  useEffect(() => {
    if (!heroes.get(Number(id))) {
      fetchHero();
    } else {
      const fetchedHero = heroes.get(Number(id));
      if (fetchedHero) {
        setHero(fetchedHero);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (films.size === 0) return;
  }, [films]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  useEffect(() => {
    if (hero && films.size > 0 && ships.size > 0) {
      const initialNodes = createNodes(hero, films, ships);
      const initialEdges = createEdges(hero, films, ships);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [hero, films, ships, setNodes, setEdges]);

  return (
    <>
      {hero?.detail !== "Not found." ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
        </ReactFlow>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default HeroFlow;
