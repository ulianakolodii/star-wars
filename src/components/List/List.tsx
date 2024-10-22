import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import "./List.css";
import { Heroes, Hero } from "../../types/types";
import ListItem from "../ListItem/ListItem.tsx";

const List: FC = () => {
  const [heroes, setHeroes] = useState<Heroes>(new Map());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchHeroes = useCallback(async (page: number) => {
    try {
      const response = await fetch(
        `https://sw-api.starnavi.io/people?page=${page}`
      );
      const data = await response.json();
      const newHeroes = new Map<string, Hero>(
        data.results.map((hero: Hero) => [hero.id, hero])
      );
      setHeroes((prevHeroes) => new Map([...prevHeroes, ...newHeroes]));
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
