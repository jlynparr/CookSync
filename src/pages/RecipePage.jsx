import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import Footer from "../components/Footer";
import styles from "./RecipePage.module.css";
import { supabase } from '../supabaseClient';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import hummusImage from "../assets/images/hummus.jpg";
import timeIcon from "../assets/images/timeIcon.png";
import diffIcon from "../assets/images/diffIcon.png";
import servingIcon from "../assets/images/servingIcon.png";
import calorieIcon from "../assets/images/calorieIcon.png";

const RecipePage = () => {

    const [recipe, setRecipe] = useState(null);
    const { recipeName } = useParams();


useEffect(() => {
  async function fetchRecipe() {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        description,
        time_mins,
        difficulty,
        servings,
        calories,
        instructions,
        recipe_ingredients (
          quantity,
          unit,
          ingredients ( name )
        )
      `)
      .eq('name', decodeURIComponent(recipeName))
      .single();

    if (error) {
      console.error("Error fetching recipe:", error);
    } else {
      console.log("Fetched recipe with ingredients:", data);
      setRecipe(data);
      console.log("Fetched recipe with ingredients:", data);
    }
  }

  fetchRecipe();
}, [recipeName]);

if (!recipe) return <p>Loading...</p>;

    return (
        <>
            {/*NavBar*/}
            <div>
                <Navbar/>
                <HeroImage image={hummusImage} title={recipe.name || "Recipe"}/>
            </div>
            <div className={styles.recipeDescription}>{recipe.description}</div>
            <div className={styles.mainBody}>
                <div className={styles.infoGroup}>
                    <img src={timeIcon} style={{ height: 50, width: 50 }} />
                    <div className={styles.time}>Time: {recipe.time_mins} min</div>
                </div>

                <div className={styles.infoGroup}>
                    <img src={diffIcon} style={{ height: 50, width: 50 }} />
                    <div className={styles.difficulty}>Difficulty: {recipe.difficulty}</div>
                </div>

                <div className={styles.infoGroup}>
                    <img src={servingIcon} style={{ height: 50, width: 50 }} />
                    <div className={styles.servings}>Servings: {recipe.servings}</div>
                </div>

                <div className={styles.infoGroup}>
                    <img src={calorieIcon} style={{ height: 50, width: 50 }} />
                    <div className={styles.servings}>Calories: {recipe.calories}</div>
                </div>
            </div>

                <div className={styles.breakLines}>
                    <hr className={styles.line1}></hr>
                    <hr className={styles.line2}></hr>
                </div>

                <div className={styles.groupTitles}>
                    <h3 className={styles.ingredientTitle}>Ingredients:</h3>
                    <h3 className={styles.stepsTitle}>Steps:</h3>
                </div>

                <div className={styles.lists}>
                    <div className={styles.ingredientList}>
                        <ul>
                            {(recipe.recipe_ingredients || []).map((item, index) => (
                                <li key={index}>
                                {item.quantity} {item.unit} {item.ingredients?.name || "Unknown"}
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className={styles.stepsList}>
                        <ol style={{ listStyleType: 'decimal', paddingLeft: '2em' }}>
                            {recipe.instructions.split('\n').map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            <div>
                <Footer/>
            </div>
        </>
    );

};

export default RecipePage;