import React from "react";
import { render, screen } from "@testing-library/react";
import ShipNode from "./ShipNode";
import { ReactFlowProvider } from "reactflow"; 

const mockShip = {
  name: "Millennium Falcon",
  model: "YT-1300 light freighter",
  manufacturer: "Corellian Engineering Corporation",
  passengers: "6",
  crew: "4",
  max_atmosphering_speed: "1050",
};

describe("ShipNode Component", () => {
  it("renders the ship node with correct information", () => {
    render(<ReactFlowProvider><ShipNode data={mockShip} /></ReactFlowProvider>);
    expect(screen.getByText(mockShip.name)).toBeInTheDocument();
    expect(screen.getByText(/model:/i)).toBeInTheDocument();
    expect(screen.getByText(mockShip.model)).toBeInTheDocument();
    expect(screen.getByText(/manufacturer:/i)).toBeInTheDocument();
    expect(screen.getByText(mockShip.manufacturer)).toBeInTheDocument();
    expect(screen.getByText(/passengers:/i)).toBeInTheDocument();
    expect(screen.getByText(mockShip.passengers)).toBeInTheDocument();
    expect(screen.getByText(/crew:/i)).toBeInTheDocument();
    expect(screen.getByText(mockShip.crew)).toBeInTheDocument();
    expect(screen.getByText(/max speeed:/i)).toBeInTheDocument();
    expect(screen.getByText(mockShip.max_atmosphering_speed)).toBeInTheDocument();
 
  });
});
