import React, { forwardRef } from "react";
import "./ListItem.css";
import { Hero } from "../../types/types";
import { Link } from "react-router-dom";

const ListItem = forwardRef<HTMLLIElement, { hero: Hero }>(({ hero }, ref) => {
  return (
    <Link to={`/${hero.id}`} state={{ hero }}>
      <li className="list-item" ref={ref}>
        {window.innerWidth < 768 ? null : (
          <span className="hero-more">click to see more information</span>
        )}
        <div className="hero-name">{hero.name}</div>
        <div className="hero-info">
          <div>{hero.birth_year}</div>
          <div className="hero-appearance">
            <div>{hero.height}cm</div>
            <div>{hero.mass}kg</div>
            <div>
              <span>eyes:</span> {hero.eye_color}
            </div>
          </div>
          <div>{hero.homeworld}</div>
          <div>{hero.films.length}</div>
          <div>{hero.starships.length}</div>
        </div>
      </li>
    </Link>
  );
});

export default ListItem;
