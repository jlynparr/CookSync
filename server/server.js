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
  "chicken", "beef", "pasta", "rice", "egg", "garlic", "onion",
  "tomato", "cheese", "butter", "milk", "flour"
];

app.post("/api/ai-search", async (req, res) => {
  const { prompt } = req.body;
  console.log("📥 Received prompt:", prompt);

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const lowerPrompt = prompt.toLowerCase();

  // Detect ingredients mentioned in prompt
  const detectedIngredients = ingredientKeywords.filter(keyword =>
    lowerPrompt.includes(keyword)
  );
  console.log("🧂 Detected ingredients:", detectedIngredients);

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
      console.error("❌ Supabase error:", error);
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
    let aiMessage;
    if (matches.length === 0) {
      aiMessage = `Hmm, I couldn't find any recipes with ${detectedIngredients.join(", ")}. Maybe try adding more ingredients or check your spelling?`;
    } else {
      aiMessage = `I found ${matches.length} recipe(s) you can make with ${detectedIngredients.join(", ")}!`;
    }

    res.json({ response: matches, aiMessage });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
