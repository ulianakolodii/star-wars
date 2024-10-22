import React, { forwardRef } from "react";
import "./ListItem.css";
import { Hero } from "../../types/types";

const ListItem = forwardRef<HTMLLIElement, { hero: Hero }>(({ hero }, ref) => {
  return (
    <li className="list-item" ref={ref}>
      <span className="hero-more">click to see more information</span>
      <div className="hero-name">{hero.name}</div>
      <div className="hero-info">
        <div>{hero.birth_year}</div>
        <div className="hero-appearance">
          <div>{hero.height}cm</div>
          <div>
            <span>eyes:</span> {hero.eye_color}
          </div>
          <div>
            <span>hair:</span> {hero.hair_color}
          </div>
        </div>
        <div>{hero.homeworld}</div>
        <div>{hero.films.length}</div>
        <div>{hero.starships.length}</div>
      </div>
    </li>
  );
});

export default ListItem;
