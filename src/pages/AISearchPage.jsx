import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./AISearchPage.module.css";

const AISearchPage = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [aiMessage, setAiMessage] = useState(""); // ✅ Add state for AI message
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
      console.log("✅ Received response:", data);

      setAiResults(data.response || []);
      setAiMessage(data.aiMessage || ""); // ✅ Save AI message
    } catch (error) {
      console.error("❌ Error fetching AI results:", error);
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
          Your smart kitchen companion that finds recipes based on the ingredients you already have...
        </p>
      </div>

      <hr />

      <div className={styles.sectionSearchBar}>
        <input
          className={styles.searchBar}
          placeholder="Ask AI a cooking question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleAISearch}>
          {loading ? "Searching..." : "AI Search"}
        </button>
      </div>


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
