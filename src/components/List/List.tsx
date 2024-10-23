import React, { FC } from "react";
import "./List.css";
import ListHeader from "../ListHeader/ListHeader.tsx";
import ListItem from "../ListItem/ListItem.tsx";
import { useHeroes } from "../../context/HeroesContext.tsx";

const List: FC = () => {
  const { heroes, lastElementRef } = useHeroes();
  return (
    <div className="list-container">
      <ListHeader />
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
