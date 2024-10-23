import React, { useRef, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./ItemPage.css";
import HeroNode from "./HeroNode/HeroNode.tsx";
import Loader from "../Loader/Loader.tsx";
import { DnDProvider, useDnD } from "../../context/DnDContext.tsx";
import { Hero } from "../../types/types.ts";
import { useHeroes } from "../../context/HeroesContext.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import { useFilms } from "../../context/FilmsContext.tsx";

const nodeTypes = {
  heroNode: HeroNode,
};

const DndFlow = () => {
  const { id } = useParams<{ id: string }>();
  const { heroes } = useHeroes();
  const { films } = useFilms();
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
    if (hero && films.size > 0) {
      const heroNodeId = `hero-${hero.id}`;
      const initialNodes: Node<any>[] = [
        {
          id: heroNodeId,
          type: "heroNode",
          data: hero,
          position: { x: 50, y: 50 },
        },
        ...hero.films.map((filmId, index) => {
          const filmData = films.get(filmId);
          return {
            id: `film-${filmId}`,
            type: "default",
            data: { label: filmData?.title },
            position: { x: (index - hero.films.length / 3) * 200, y: 400 },
          };
        }),
      ];

      const initialEdges: Edge<any>[] = hero.films.map((filmId) => ({
        id: `edge-${heroNodeId}-film-${filmId}`,
        source: heroNodeId,
        sourceHandle: heroNodeId,
        target: `film-${filmId}`,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#000" },
      }));

      console.log("log edges", initialEdges);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [hero, films, setNodes, setEdges]);

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
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
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
