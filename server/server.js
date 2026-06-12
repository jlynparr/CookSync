import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { supabase } from "./supabaseClient.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const ingredientKeywords = [
  // Chicken
  "chicken", "chicken breast", "rotisserie chicken", "poultry",

  // Garlic
  "garlic", "garlic cloves", "minced garlic",

  // Butter
  "butter", "unsalted butter", "salted butter",

  // Salt
  "salt", "sea salt", "kosher salt",

  // Black Pepper / Bell Pepper
  "black pepper", "pepper", "peppers", "bell pepper", "bell peppers",

  // Spaghetti / Pasta
  "spaghetti", "pasta", "noodles", "linguine", "fettuccine", "penne",

  // Eggs
  "egg", "eggs",

  // Pancetta
  "pancetta", "bacon",

  // Parmesan
  "parmesan", "parmesan cheese", "parmigiano",

  // Beef
  "beef", "beef strips", "ground beef", "steak", "meat",

  // Soy Sauce
  "soy sauce", "soy",

  // Olive Oil / Vegetable Oil / Oil
  "olive oil", "oil", "vegetable oil", "cooking oil",

  // Potatoes
  "potato", "potatoes",

  // Carrots
  "carrot", "carrots",

  // Green Peas
  "green peas", "peas",

  // Coconut Milk
  "coconut milk", "coconut",

  // Curry Powder
  "curry powder", "curry",

  // Cucumber
  "cucumber", "cucumbers",

  // Tomatoes
  "tomato", "tomatoes",

  // Feta Cheese / Cheddar Cheese / Parmesan / Cheese
  "feta", "feta cheese", "cheddar", "cheddar cheese", "cheese",

  // Olives
  "olives", "olive",

  // Oregano
  "oregano",

  // Shrimp
  "shrimp", "prawns", "seafood",

  // Tortillas
  "tortilla", "tortillas", "wrap", "wraps",

  // Cabbage
  "cabbage",

  // Lime
  "lime", "limes",

  // Sour Cream
  "sour cream",

  // Onion
  "onion", "onions", "red onion", "white onion", "yellow onion",

  // Vegetable Broth
  "broth", "vegetable broth", "stock", "vegetable stock",

  // Basil
  "basil", "basil leaves", "fresh basil",

  // Salmon
  "salmon", "salmon fillet", "fish",

  // Lemon
  "lemon", "lemons",

  // Taco Seasoning
  "taco seasoning", "taco spice", "taco mix",

  // Lettuce
  "lettuce", "greens", "salad greens",

  // Heavy Cream
  "heavy cream", "cream", "whipping cream",

  // Rice
  "rice", "cooked rice", "white rice", "brown rice",

  // Flour
  "flour", "all purpose flour",

  // Milk
  "milk", "whole milk",

  // Chocolate Chips
  "chocolate chips", "chocolate", "chips",

  // Baking Powder
  "baking powder",

  // Red Pepper Flakes
  "red pepper flakes", "chili flakes", "chilli flakes", "red pepper",

  // Parsley
  "parsley", "fresh parsley",

  // Green Onions
  "green onions", "scallions", "spring onions",

  // Soy Sauce (already covered but adding variation)
  "soy",

  // Taco related
  "tacos", "taco"
];

app.post("/api/ai-search", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const lowerPrompt = prompt.toLowerCase();

  const detectedIngredients = ingredientKeywords.filter(keyword =>
    lowerPrompt.includes(keyword)
  );
  console.log("Detected ingredients:", detectedIngredients);

  try {
    const { data: recipeData, error } = await supabase
      .from("recipe_ingredients")
      .select(`
        recipe_id,
        recipes (
          id,
          name,
          description,
          time_mins,
          servings,
          difficulty,
          recipe_image
        ),
        ingredients (name)
      `);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const recipeMap = new Map();
    recipeData.forEach(entry => {
      if (!entry.recipes || !entry.ingredients) return;
      const recipe = entry.recipes;
      const ingredientName = entry.ingredients.name?.toLowerCase();
      if (!ingredientName) return;

      if (!recipeMap.has(recipe.id)) {
        recipeMap.set(recipe.id, { ...recipe, ingredients: [] });
      }

      const currentRecipe = recipeMap.get(recipe.id);
      if (!currentRecipe.ingredients.includes(ingredientName)) {
        currentRecipe.ingredients.push(ingredientName);
      }
    });

    const matches = detectedIngredients.length === 0
      ? []
      : Array.from(recipeMap.values()).filter(recipe =>
          detectedIngredients.every(ing =>
            recipe.ingredients.some(ri => ri.includes(ing))
          )
        );

    const cleanIngredients = detectedIngredients.filter(i => i && i.trim() !== "");

    let aiMessage;

    if (detectedIngredients.length === 0) {
      aiMessage = `I didn't recognize any ingredients in your search. Try typing something like "chicken" or "garlic"!`;
    } else if (matches.length === 0) {
      if (cleanIngredients.length > 2) {
        aiMessage = `Hmm, I couldn't find any recipes with ${cleanIngredients.join(", ")}. Maybe try fewer ingredients or check your spelling?`;
      } else if (cleanIngredients.length === 2) {
        aiMessage = `I couldn't find any recipes with ${cleanIngredients.join(" and ")}. Try adding more ingredients or check your spelling!`;
      } else if (cleanIngredients.length === 1) {
        aiMessage = `I couldn't find any recipes with ${cleanIngredients[0]}. Try adding more ingredients or check your spelling!`;
      } else {
        aiMessage = `I couldn't find any recipes with those ingredients. Try adding more or checking spelling!`;
      }
    } else if (matches.length === 1) {
      aiMessage = `Here is 1 recipe you can make with ${cleanIngredients.join(", ")}!`;
    } else {
      aiMessage = `Here are ${matches.length} recipes you can make with ${cleanIngredients.join(", ")}!`;
    }

    res.json({ response: matches, aiMessage });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
