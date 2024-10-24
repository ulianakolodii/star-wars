import React, { useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import "./ItemPage.css";
import Loader from "../Loader/Loader.tsx";

const HeroFlowComponent = React.lazy(() => {
  return import("./HeroFlow/HeroFlow.tsx");
});

const DndFlow = () => {
  const reactFlowWrapper = useRef(null);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <Link to="/" className="flow-back-link">
          ← back to list
        </Link>
        <Suspense fallback={<Loader />}>
          <HeroFlowComponent />
        </Suspense>
      </div>
    </div>
  );
};

const ItemPage = () => (
  <ReactFlowProvider>
    <DndFlow />
  </ReactFlowProvider>
);

export default ItemPage;
