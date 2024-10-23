import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader" data-testid="loader" />
    </div>
  );
};

export default Loader;
