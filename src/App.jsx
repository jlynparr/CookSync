import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import RecipeResultPage from './pages/RecipeResultPage';
import RecipePage from './pages/RecipePage';
import AllRecipes from './pages/AllRecipes';
import AboutPage from './pages/AboutPage';
import AISearchPage from './pages/AISearchPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/recipe/:recipeName" element={<RecipePage />} />
        <Route path="/results/:ingredientName" element={<RecipeResultPage />} />
        <Route path="/ai-search" element={<AISearchPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

