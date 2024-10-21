import React, { FC, useState, useEffect } from "react";
import "./List.css";
import { Heroes, Hero } from "../../types/types";
import ListItem from "../ListItem/ListItem.tsx";

const List: FC = () => {
  const [heroes, setHeroes] = useState<Heroes>();

  useEffect(() => {
    fetch("https://sw-api.starnavi.io/people")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.results.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {} as Record<string, Hero>);
        setHeroes(transformedData);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <ul className="list">
      {heroes &&
        Object.keys(heroes).map((key) => {
          const hero = heroes[key];
          return <ListItem hero={hero} key={hero.id} />;
        })}
    </ul>
  );
};

export default List;
