import React from "react";
import { render, screen } from "@testing-library/react";
import { ReactFlowProvider } from "reactflow"; 
import FilmNode from "./FilmNode"; 

describe("FilmNode Component", () => {
  const mockFilm = {
    title: "A New Hope",
    director: "George Lucas",
    producer: "Gary Kurtz",
    opening_crawl: "It is a period of civil war...",
    release_date: "1977-05-25",
  };

  test("renders FilmNode with correct data", () => {
    render(
      <ReactFlowProvider>
        <FilmNode data={mockFilm} />
      </ReactFlowProvider>
    );

    expect(screen.getByText(mockFilm.title)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.producer)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.opening_crawl)).toBeInTheDocument();

    const formattedDate = new Date(mockFilm.release_date).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    expect(screen.getByText(/released:/i)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
