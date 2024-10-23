import React, { useRef, useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./ItemPage.css";
import Loader from "../Loader/Loader.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import HeroNode from "./HeroNode/HeroNode.tsx";
import FilmNode from "./FilmNode/FilmNode.tsx";
import ShipNode from "./ShipNode/ShipNode.tsx";
import { Hero } from "../../types/types.ts";
import { DnDProvider, useDnD } from "../../context/DnDContext.tsx";
import { useHeroes } from "../../context/HeroesContext.tsx";
import { useFilms } from "../../context/FilmsContext.tsx";
import { useShips } from "../../context/ShipsContext.tsx";
import { createNodes } from "../../utils/createNodes.ts";
import { createEdges } from "../../utils/createEdges.ts";

const nodeTypes = {
  heroNode: HeroNode,
  filmNode: FilmNode,
  shipNode: ShipNode,
};

const DndFlow = () => {
  const { id } = useParams<{ id: string }>();
  const { heroes } = useHeroes();
  const { films } = useFilms();
  const { ships } = useShips();
  const [hero, setHero] = useState<Hero | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHero = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://sw-api.starnavi.io/people/${id}`);
      const data = await response.json();
      setHero(data);
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    } finally {
      setLoading(false);
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

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  let nodeId = Number(id);
  const getId = useCallback(() => `dndnode_${nodeId++}`, [nodeId]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: any = {
        id: getId(),
        type,
        position,
        data: hero,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, getId, hero, setNodes]
  );

  useEffect(() => {
    if (hero && films.size > 0 && ships.size > 0) {
      const initialNodes = createNodes(hero, films, ships);
      const initialEdges = createEdges(hero, films, ships);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [hero, films, ships, setNodes, setEdges]);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (!hero) {
    content = <NotFoundPage />;
  } else {
    content = (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
      </ReactFlow>
    );
  }

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        {hero && <Link to="/">← back to list</Link>}
        {content}
      </div>
    </div>
  );
};

const ItemPage = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DndFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export default ItemPage;
