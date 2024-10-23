import React, { FC } from "react";
import "./FilmNode.css";
import { Film } from "../../../types/types";
import { Handle, Position } from "reactflow";

interface FilmNodeProps {
  data: Film;
}

const FilmNode: FC<FilmNodeProps> = ({ data }) => {
  return (
    <>
      <div className="film-node">
        <div className="film-node__title">{data.title}</div>
        <div className="film-node__general">{data.director}</div>
        <div className="film-node__general">{data.producer}</div>
        <div className="film-node__divider" />
        <div className="film-node__crawl">
          <span>{data.opening_crawl}</span>
        </div>

        <div className="film-node__dates">
          <div>
            <span>released:</span>
            {new Date(data.release_date).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default FilmNode;
