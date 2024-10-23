import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      Hero not found! :(
      <span className="back-link">
        <Link to="/">back to list</Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
