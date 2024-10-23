// App.tsx
import "./App.css";
import React from "react";
import List from "./components/List/List.tsx"; 
import ItemPage from "./components/ItemPage/ItemPage.tsx"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroesProvider } from "./context/HeroesContext.tsx"; 
import { FilmsProvider } from "./context/FilmsContext.tsx";


const AppProviders = ({ children }) => (
  <HeroesProvider>
    <FilmsProvider>
      {children}
    </FilmsProvider>
  </HeroesProvider>
);

const App = () => {
  return (
    <AppProviders>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/:id" element={<ItemPage />} />
          </Routes>
        </div>
      </Router>
    </AppProviders>
  );
};

export default App;
