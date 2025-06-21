import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./AISearchPage.module.css";

import broccoliIcon from "../assets/images/broccoli.png";
import chickenIcon from "../assets/images/chicken.png";
import garlicIcon from "../assets/images/garlic.png";
import stirFryImage from "../assets/images/stirFry.jpg";
import chickenBroccoliImage from "../assets/images/chickenBroccoliPasta.jpg";
import broccoliCasseroleImage from "../assets/images/broccoliChickenCasserole.jpg";
import timeIcon from "../assets/images/timeIcon.png";
import diffIcon from "../assets/images/diffIcon.png";

const AISearchPage = () => {
    return (
        <>
        <div className={styles.mainBody}>
            <div className={styles.navBar}>
                <Navbar />
            </div>
            <div className={styles.introSection}>
                <h1 className={styles.sectionTitle}>AI Cooking Assistant</h1>
                <p className={styles.introParagraph}>Your smart kitchen companion that finds recipes based on the ingredients you already have. Easily filter results by cooking time, difficulty, number of servings, and even exclude ingredients you don’t want to use — making mealtime simple, flexible, and stress-free!</p>
            </div>
            <hr />
            <div>
                <h1 className={styles.sectionTitle}>Recipe Suggestions</h1>
                <p className={styles.suggestParagraph}>Here are a few recipes you can make with what you have.</p>
                <p className={styles.suggestParagraph2}>You Entered:</p>
                <div className={styles.ingredientButtons}>
                    <button><img src={broccoliIcon} height="25" />Broccoli</button>
                    <button><img src={chickenIcon} height="25" />Chicken</button>
                    <button><img src={garlicIcon} height="25" />Garlic</button>
                </div>
                <hr className={styles.breakLine}/>
                <div className={styles.shownRecipeImages}>
                    <img src={stirFryImage}></img>
                    <img src={broccoliCasseroleImage}></img>
                    <img src={chickenBroccoliImage}></img>
                </div>
                <div className={styles.shownRecipeTitles}>
                    <h4>Garlic Chicken Stir-Fry</h4>
                    <h4>Broccoli Chicken Casserole</h4>
                    <h4>Chicken and Broccoli Pasta</h4>
                </div>
                <div className={styles.shownRecipeTimes}>
                    <h5><img src={timeIcon} />25 min</h5>
                    <h5><img src={timeIcon} />45 min</h5>
                    <h5><img src={timeIcon} />30 min</h5>
                </div>
                <div className={styles.shownRecipeDiff}>
                    <h5><img src={diffIcon} />Easy</h5>
                    <h5><img src={diffIcon} />Easy</h5>
                    <h5><img src={diffIcon} />Easy</h5>
                </div>
                <div className={styles.shownRecipeServings}>
                    <h5><img src={timeIcon} />4-5 Servings</h5>
                    <h5><img src={timeIcon} />4-5 Servings</h5>
                    <h5><img src={timeIcon} />2-3 Servings</h5>
                </div>
                <hr className={styles.breakLine}/>
            </div>
            <div>
                <p className={styles.introParagraph2}>Type the ingredients you have — like ‘chicken, rice, broccoli’ — and we’ll find recipes you can make. You can also ask to filter by cooking time, level of difficulty, number of servings or even have certain ingredients excluded from the recommendations!</p>
                <div className={styles.sectionSearchBar}>
                    <input className={styles.searchBar}placeholder="Ask AI a cooking question..."></input>
                    <button className={styles.searchButton}>AI Search</button>
                </div>
            </div>
            <Footer />
         </div>   
        </>
    );
};

export default AISearchPage;