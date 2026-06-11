import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { supabase } from "./supabaseClient.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Example keywords for ingredient detection
const ingredientKeywords = [
  "chicken", "garlic", "butter", "salt", "black pepper", "spaghetti", "egg", "pancetta",
  "parmesan cheese", "beef", "soy sauce", "bell pepper", "oil", "potato", "carrots",
  "green peas", "coconut milk", "curry powder", "cucumber", "tomato", "feta cheese", "olives",
  "oregano", "shrimp", "tortilla", "cabbage", "lime", "sour cream", "onion", "broth", "basil",
  "salmon", "lemon", "taco seasoning", "lettuce", "pasta", "heavy cream", "rice", "flour", "milk",
  "chocolate", "baking powder", "red pepper flakes", "parsley"
];

app.post("/api/ai-search", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const lowerPrompt = prompt.toLowerCase();

  // Detect ingredients mentioned in prompt
  const detectedIngredients = ingredientKeywords.filter(keyword =>
    lowerPrompt.includes(keyword)
  );
  console.log("Detected ingredients:", detectedIngredients);

  try {
    // Get all recipes with ingredients
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

    // Aggregate recipe ingredients
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

    // Match recipes based on detected ingredients (partial match)
    const matches = Array.from(recipeMap.values()).filter(recipe =>
      detectedIngredients.every(ing =>
        recipe.ingredients.some(ri => ri.includes(ing))
      )
    );

    // Craft AI-style response
    const cleanIngredients = detectedIngredients.filter(i => i && i.trim() !== "");

    let aiMessage;

    if (matches.length === 0) {

      if (cleanIngredients.length > 5) {
        aiMessage = `Hmm, I couldn't find any recipes with ${cleanIngredients.join(", ")}. Maybe try adding more ingredients or check your spelling?`;
      }

      else if (cleanIngredients.length === 2) {
        aiMessage = `I couldn't find any recipes with ${cleanIngredients.join(" and ")}. Try adding more ingredients or check your spelling!`;
      }

      else if (cleanIngredients.length === 1) {
        aiMessage = `I couldn't find any recipes with ${cleanIngredients[0]}. Try adding more ingredients or check your spelling!`;
      }

      else {
        aiMessage = `I couldn't find any recipes with those ingredients. Try adding more or checking spelling!`;
      }

    } else if (matches.length === 1) {
      aiMessage = `Here is 1 recipe you can make with ${cleanIngredients[0]}!`;
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
