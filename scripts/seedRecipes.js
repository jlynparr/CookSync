// scripts/seedRecipes.js
import { supabase } from '../src/supabaseClient.js'

const recipes = []


async function insertRecipes() {
  for (const recipe of recipes) {
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert({
        name: recipe.name,
        difficulty: recipe.difficulty,
        time_mins: recipe.time_mins,
        servings: recipe.servings,
        calories: recipe.calories
      })
      .select()

    if (recipeError) {
      console.error('Error inserting recipe:', recipe.title, recipeError)
      continue
    }

    const recipeId = recipeData[0].id

    for (const ingredient of recipe.ingredients) {
      // Check if ingredient already exists
      const { data: ingredientData } = await supabase
        .from('ingredients')
        .select('id')
        .eq('name', ingredient.name)

      let ingredientId
      if (ingredientData.length > 0) {
        ingredientId = ingredientData[0].id
      } else {
        const { data: newIngredient, error: ingredientError } = await supabase
          .from('ingredients')
          .insert({ name: ingredient.name })
          .select()

        if (ingredientError) {
          console.error('Error inserting ingredient:', ingredient.name, ingredientError)
          continue
        }

        ingredientId = newIngredient[0].id
      }

      // Insert into recipe_ingredients join table
      await supabase
        .from('recipe_ingredients')
        .insert({
          recipe_id: recipeId,
          ingredient_id: ingredientId,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        })
    }

    console.log('Inserted recipe:', recipe.title)
  }
}

insertRecipes()
