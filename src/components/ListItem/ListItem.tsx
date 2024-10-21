import React, { FC } from "react";
import "./ListItem.css";
import { Hero } from "../../types/types";

const ListItem: FC<{ hero: Hero }> = ({ hero }) => {
  return (
    <li className="list-item">
      <div className="hero-name">{hero.name}</div>
      <div className="hero-appearance">
        <div>{hero.birth_year}</div>
        <div>{hero.height}</div>
        <div>{hero.eye_color}</div>
      </div>
      <div>{hero.homeworld}</div>
      <div>films: {hero.films.length}</div>
      <div>ssh: {hero.starships.length}</div>
    </li>
  );
};

export default ListItem;
