import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./AISearchPage.module.css";

const AISearchPage = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [aiMessage, setAiMessage] = useState(""); // Add state for AI message
  const [loading, setLoading] = useState(false);

  const handleAISearch = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Received response:", data);

      setAiResults(data.response || []);
      setAiMessage(data.aiMessage || ""); // Save AI message
    } catch (error) {
      console.error("Error fetching AI results:", error);
      setAiResults([]);
      setAiMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainBody}>
      <Navbar />

      <div className={styles.introSection}>
        <h1 className={styles.sectionTitle}>AI Cooking Assistant</h1>
        <p className={styles.introParagraph}>
          Your smart kitchen companion that finds recipes based on the ingredients you already have. 
          Easily filter results by cooking time, difficulty, number of servings, and even exclude 
          ingredients you don’t want to use — making mealtime simple, flexible, and stress-free!
        </p>
      </div>

      <hr className={styles.breakLine}/>

      <h1 className={styles.sectionTitle}>Recipe Suggestions</h1>
      <p className={styles.introParagraph2}>
        Type the ingredients you have — like ‘chicken, rice, broccoli’ — and we’ll find recipes you can make. 
        You can also ask to filter by cooking time, level of difficulty, number of servings or even have 
        certain ingredients excluded from the recommendations!
      </p>
      <div className={styles.sectionSearchBar}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchBar}
            placeholder="Ask AI a cooking question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button className={styles.searchButton} onClick={handleAISearch}>
            {loading ? "Searching..." : (
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L12 20" stroke="white" strokeWidth="3" strokeLinecap="square" />
                <path d="M12 2L3 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M12 2L21 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <hr className={styles.breakLine}/>      

      {aiMessage && <p className={styles.aiMessage}>{aiMessage}</p>}
      
      <div className={styles.resultsSection}>

        {aiResults && aiResults.length > 0 ? (
          aiResults.map((recipe, index) => (
            <div key={index} className={styles.recipeCard}>
              <img src={recipe.recipe_image} alt={recipe.name} />
              <h4>{recipe.name}</h4>
              <p>{recipe.description}</p>
              <p className={styles.recipeDetails}>
                <span className={styles.icon}>⏱</span>
                <span className={styles.icon2}>🍽</span>
                <span className={styles.icon3}>💪</span> 
                <span> {recipe.time_mins} min </span>
                <span> {recipe.servings} servings </span>
                <span> {recipe.difficulty}</span>
              </p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No recipes found yet!</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AISearchPage;
