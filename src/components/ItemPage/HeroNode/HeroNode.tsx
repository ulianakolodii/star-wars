import React, { FC } from "react";
import "./HeroNode.css";
import { Hero } from "../../../types/types";

interface HeroNodeProps {
  data: Hero; // Define the expected shape of the data
}

const HeroNode: FC<HeroNodeProps> = ({ data }) => {
  return (
    <div className="hero-node">
      <div className="hero-node__title">{data.name}</div>
      <div>{data.gender}</div>
      <div>{data.birth_year}</div>
      <div className="hero-node__divider" />
      <div>{data.homeworld}</div>
      <div>
        <div>{data.mass}kg</div>
        <div>{data.height}cm</div>
      </div>
      <div>
        <div>{data.hair_color}</div>
        <div>{data.eye_color}</div>
        <div>{data.skin_color}</div>
      </div>
      <div>{data.species}</div>
      <div>
        <div>{data.created}</div>
        <div>{data.edited}</div>
      </div>
    </div>
  );
};

export default HeroNode;
