import React, { FC } from "react";
import "./List.css";
import ListItem from "../ListItem/ListItem.tsx";
import { useHeroes } from "../../context/HeroesContext.tsx";

const List: FC = () => {
  const { heroes, lastElementRef } = useHeroes();
  return (
    <div className="list-container">
      <div className="list-header">
        {window.innerWidth < 768 ? null : <div>name</div>}
        <div className="list-header__info">
          <div>birth</div>
          <div className="list-header__look">look</div>
          <div>home</div>
          <div>films</div>
          <div>ships</div>
        </div>
      </div>

      <ul className="list">
        {Array.from(heroes.values()).map((hero, index) => {
          const isLastItem = index === heroes.size - 1;
          return (
            <ListItem
              hero={hero}
              key={hero.id}
              ref={isLastItem ? lastElementRef : null}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;
