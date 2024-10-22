import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import "./List.css";
import { Heroes, Hero } from "../../types/types";
import ListItem from "../ListItem/ListItem.tsx";

const List: FC = () => {
  const [heroes, setHeroes] = useState<Heroes>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchHeroes = useCallback(async (page: number) => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/people?page=${page}`
      );
      const data = await response.json();

      const newHeroes = data.results.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, Hero>);

      setHeroes((prevHeroes) => ({ ...prevHeroes, ...newHeroes }));
      setHasMore(!!data.next);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  }, []);

  useEffect(() => {
    fetchHeroes(page);
  }, [page, fetchHeroes]);

  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <div>name</div>
        <div>birth</div>
        <div>look</div>
        <div>home</div>
        <div>films</div>
        <div>starships</div>
      </div>
      <ul className="list">
        {Object.keys(heroes).map((key, index) => {
          const hero = heroes[key];
          const isLastItem = index === Object.keys(heroes).length - 1;

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
