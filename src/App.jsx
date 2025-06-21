import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import RecipeResultPage from './pages/RecipeResultPage';
import RecipePage from './pages/RecipePage';
import AllRecipes from './pages/AllRecipes';
import AboutPage from './pages/AboutPage';
import AISearchPage from './pages/AISearchPage';
import CreateAccountPopup from './pages/CreateAccountPopup';
import LoginPopup from './components/LoginPopup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/recipe/:recipeName" element={<RecipePage />} />
        <Route path="/results" element={<RecipeResultPage />} />
        <Route path="/ai-search" element={<AISearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create-account" element={<CreateAccountPopup />} />
        <Route path="/login" element={<LoginPopup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

