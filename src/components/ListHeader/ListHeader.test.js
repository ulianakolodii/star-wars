import React from "react";
import { render, screen } from "@testing-library/react";
import ListHeader from "./ListHeader"; // Adjust import path based on your structure

describe("ListHeader Component", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));
  });

  afterAll(() => {
    delete window.innerWidth;
  });

  test("renders ListHeader with name for desktop view", () => {
    render(<ListHeader />);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("birth")).toBeInTheDocument();
    expect(screen.getByText("look")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("films")).toBeInTheDocument();
    expect(screen.getByText("ships")).toBeInTheDocument();
  });

  test("does not render name for mobile view", () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));
    
    render(<ListHeader />);
    expect(screen.queryByText("name")).not.toBeInTheDocument();
    expect(screen.getByText("birth")).toBeInTheDocument();
    expect(screen.getByText("look")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("films")).toBeInTheDocument();
    expect(screen.getByText("ships")).toBeInTheDocument();
  });
});
