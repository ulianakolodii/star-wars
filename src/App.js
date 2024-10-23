// App.tsx
import "./App.css";
import React from "react";
import List from "./components/List/List.tsx"; // Ensure this is the correct extension
import ItemPage from "./components/ItemPage/ItemPage.tsx"; // Ensure this is the correct extension
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroesProvider } from "./components/HeroesContext.tsx"; // Import the provider

const App = () => {
  return (
    <HeroesProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/:id" element={<ItemPage />} />
          </Routes>
        </div>
      </Router>
    </HeroesProvider>
  );
};

export default App;
