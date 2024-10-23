import React, { FC, useState, useCallback, useEffect } from "react";
import "./HeroNode.css";
import { Hero } from "../../../types/types";
import { Handle, Position } from "reactflow";

interface HeroNodeProps {
  data: Hero;
}

const HeroNode: FC<HeroNodeProps> = ({ data }) => {
  const [homeworld, setHomeworld] = useState("");
  const [species, setSpecies] = useState("");

  const fetchHomeWorld = useCallback(async () => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/planets/${data.homeworld}`
      );
      const responseData = await response.json();
      setHomeworld(responseData.name);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  }, []);

  const fetchSpecies = useCallback(async () => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/species/${data.species}`
      );
      const responseData = await response.json();
      setSpecies(responseData.name);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  }, []);

  useEffect(() => {
    fetchHomeWorld();
    fetchSpecies();
  }, []);

  return (
    <>
      <div className="hero-node">
        <div className="hero-node__title">{data.name}</div>
        <div className="hero-node__general">{data.gender}</div>
        <div className="hero-node__general">{data.birth_year}</div>
        <div className="hero-node__divider" />
        <div>
          <span>home:</span>
          {homeworld}
        </div>
        <div className="hero-node__block">
          <div>
            <span>mass:</span>
            {data.mass}kg
          </div>
          <div>
            <span>height:</span>
            {data.height}cm
          </div>
        </div>
        <div className="hero-node__block">
          <div>
            <span>hair:</span>
            {data.hair_color}
          </div>
          <div>
            <span>eyes:</span>
            {data.eye_color}
          </div>
          <div>
            <span>skin:</span>
            {data.skin_color}
          </div>
        </div>
        <div>
          <span>species:</span>
          {species}
        </div>
        <div className="hero-node__block hero-node__block-dates">
          <div>
            <span>created:</span>
            {new Date(data.created).toLocaleString("uk-UK", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <div>
            <span>edited:</span>
            {new Date(data.edited).toLocaleString("uk-UK", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default HeroNode;
