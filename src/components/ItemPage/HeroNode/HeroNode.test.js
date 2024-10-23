import React from "react";
import { render, screen } from "@testing-library/react";
import HeroNode from "./HeroNode"; 
import { ReactFlowProvider } from "reactflow";

const mockHero = {
  name: "Luke Skywalker",
  gender: "male",
  birth_year: "19BBY",
  mass: "77",
  height: "172",
  hair_color: "blond",
  eye_color: "blue",
  skin_color: "fair",
  homeworld: "1",
  species: "1",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
};

describe("HeroNode Component", () => {
  it("renders the hero node with correct information", () => {
    render(<ReactFlowProvider><HeroNode data={mockHero} /></ReactFlowProvider>);
    expect(screen.getByText(mockHero.gender)).toBeInTheDocument();
    expect(screen.getByText(mockHero.birth_year)).toBeInTheDocument();
    expect(screen.getByText(`${mockHero.mass}kg`)).toBeInTheDocument();
    expect(screen.getByText(`${mockHero.height}cm`)).toBeInTheDocument();
    expect(screen.getByText(mockHero.hair_color)).toBeInTheDocument();
    expect(screen.getByText(mockHero.eye_color)).toBeInTheDocument();
    expect(screen.getByText(mockHero.skin_color)).toBeInTheDocument();
    expect(screen.getByText(/species:/i)).toBeInTheDocument();
    expect(screen.getByText(/home:/i)).toBeInTheDocument();
    expect(screen.getByText(/created:/i)).toBeInTheDocument();
    expect(screen.getByText(/edited:/i)).toBeInTheDocument();
  });

  it("renders the hero node without homeworld and species initially", () => {
    render(<ReactFlowProvider><HeroNode data={mockHero} /></ReactFlowProvider>);
    expect(screen.getByText(/home:/i)).toHaveTextContent("home:");
    expect(screen.getByText(/species:/i)).toHaveTextContent("species:");
  });
});
