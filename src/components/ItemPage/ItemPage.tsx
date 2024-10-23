import React, { useRef, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
  Node,
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
import { DnDProvider, useDnD } from "../DnDContext.tsx";
import { Hero } from "../../types/types.ts";
import { useHeroes } from "../HeroesContext.tsx";

const nodeTypes = {
  heroNode: HeroNode,
};

const DndFlow = () => {
  const { id } = useParams<{ id: string }>();
  const { heroes } = useHeroes();
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
    if (hero) {
      const initialNodes: Node<any>[] = [
        {
          id: String(hero.id),
          type: "heroNode",
          data: hero,
          position: { x: 50, y: 50 },
        },
      ];
      setNodes(initialNodes);
    }
  }, [hero, setNodes]);

  let content;

  if (loading) {
    content = <div className="loader">Loading...</div>; // Loader component or message
  } else if (!hero) {
    content = <div>Hero not found!</div>; // Handle case when hero is not found
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
