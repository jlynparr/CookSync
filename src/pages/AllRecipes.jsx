import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import Footer from "../components/Footer";
import styles from "./AllRecipes.module.css";
import waffleImage from "../assets/images/waffles.jpg";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const letterRanges = {
  'A-F': ['A', 'B', 'C', 'D', 'E', 'F'],
  'G-L': ['G', 'H', 'I', 'J', 'K', 'L'],
  'M-Q': ['M', 'N', 'O', 'P', 'Q'],
  'R-Z': ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
};


const AllRecipes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || ''; 

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchTerm = params.get('search') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase.from('recipes').select('*');
      if (!error) {
        setRecipes(data);
        const filtered = initialSearch
          ? data.filter(recipe =>
              recipe.name.toLowerCase().includes(initialSearch.toLowerCase())
            )
          : data;
        setFilteredRecipes(filtered);
      } else {
        console.error("Error fetching recipes:", error);
      }
    }
    fetchRecipes();
  }, [initialSearch]);

    useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      try {
        // Find ingredients matching the search term
        const { data: ingredients, error: ingredientError } = await supabase
          .from('ingredients')
          .select('id')
          .ilike('name', `%${searchTerm}%`);

        if (ingredientError) throw ingredientError;
        if (!ingredients.length) {
          setRecipes([]);
          setLoading(false);
          return;
        }

        const ingredientIds = ingredients.map((ing) => ing.id);

        // Find recipe IDs linked to those ingredient IDs
        const { data: joinRows, error: joinError } = await supabase
          .from('recipe_ingredients')
          .select('recipe_id')
          .in('ingredient_id', ingredientIds);

        if (joinError) throw joinError;
        if (!joinRows.length) {
          setRecipes([]);
          setLoading(false);
          return;
        }

        const recipeIds = joinRows.map((row) => row.recipe_id);

        // Fetch recipes by those IDs
        const { data: recipesData, error: recipeError } = await supabase
          .from('recipes')
          .select('*')
          .in('id', recipeIds);

        if (recipeError) throw recipeError;

        setRecipes(recipesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm) {
      fetchRecipes();
    } else {
      setRecipes([]);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
  setCurrentPage(1);
    }, [searchQuery, selectedRange]); 

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error}</div>;
  if (!recipes.length) return <div>No recipes found for "{searchTerm}".</div>;

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const handleRangeFilter = (rangeKey) => {
    setSelectedRange(rangeKey);
    const allowedLetters = letterRanges[rangeKey];
    console.log("Clicked:", rangeKey); 
    const filtered = recipes.filter(recipe => {
      const firstChar = recipe.name.charAt(0).toUpperCase();
      console.log("Allowed Letters:", allowedLetters);
      return allowedLetters.includes(firstChar);
    });
    const sorted = filtered.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  setFilteredRecipes(sorted);
  };

  const resetFilters = () => {
    setSelectedRange(null);
    setSearchQuery('');
    setFilteredRecipes(recipes);
  }

  const recipesPerPage = 3;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  


  return (
    <>
      <Navbar />
      <HeroImage image={waffleImage} title="Recipes A-Z" />

      <div style={{ backgroundColor: '#FDF8E1', height: 'auto' }}>
        
            <div>
              <h1 className={styles.mainTitle}>Recipes {selectedRange || "A-Z"}</h1>
            </div>
            <div className={styles.letterRange}>
              {Object.keys(letterRanges).map(range => (
              <button key={range} onClick={() => handleRangeFilter(range)} className={styles.rangeButtons}>{range}</button>
              ))}
            </div>

            <div className={styles.allRecipesContainer}>  
              <button className={styles.allRecipes} onClick={() => resetFilters()}>Show All Recipes</button>
            </div>

            {/* 🔍 Search Input */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>

            {/* 📋 Render Filtered Recipes */}
      <div>
        {searchTerm && (
          <h2 className={styles.recipeShown}>Recipes with "{searchTerm}"</h2>
        )}
        <div className={styles.recipeList}>
          {currentRecipes.map((recipe) => ( 
            <div key={recipe.id} className={styles.recipeCard}>
              <Link to={`/recipe/${encodeURIComponent(recipe.name)}`}> 
              <h3 className={styles.recipeTitle}>{recipe.name}</h3>
              <p className={styles.recipeDescription}>{recipe.description}</p>
              <div className={styles.goToRecipe}>Go to recipe →</div>
              </Link>
            </div>
          ))}
        </div>
      </div>


            <div className={styles.pageChange}>
              <div onClick={goToPrevPage} style={{ cursor: 'pointer' }}>Prev Page</div>
              <div>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    style={{
                      margin: '0 4px',
                      fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div onClick={goToNextPage} style={{ cursor: 'pointer' }}>Next Page</div>
            </div>



            <Footer />

      </div>      
    </>
  );
};

export default AllRecipes;
