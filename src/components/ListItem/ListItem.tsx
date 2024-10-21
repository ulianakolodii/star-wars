import React, { FC } from "react";
import "./ListItem.css";
import { Hero } from "../../types/types";

const ListItem: FC<{ hero: Hero }> = ({ hero }) => {
  return (
    <li className="list-item">
      <div className="hero-name">{hero.name}</div>
      <div>{hero.birth_year}</div>
      <div className="hero-appearance">
        <div>{hero.height}cm</div>
        <div>{hero.eye_color}</div>
        <div>{hero.hair_color}</div>
      </div>
      <div>{hero.homeworld}</div>
      <div>{hero.films.length}</div>
      <div>{hero.starships.length}</div>
    </li>
  );
};

export default ListItem;
