import { useEffect, useState } from 'react';
import styles from "./HomePage.module.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import mainImage from "../assets/images/MainFoodImage.png";
import pepperImage from "../assets/images/blackPepper.jpg";
import oliveOilImage from "../assets/images/oliveOil.jpg";
import saltImage from "../assets/images/salt.jpg";
import onionImage from "../assets/images/onion.jpg";
import garlicImage from "../assets/images/garlic.jpg";
import spaghettiImage from "../assets/images/spaghetti.jpg";
import garlicButterImage from "../assets/images/garlicButterChicken.jpg";
import tomatoSoupImage from "../assets/images/tomatoSoup.jpg";
import fancyBackground from "../assets/images/fancyBackground.png";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useRef} from 'react';


const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={styles.searchIcon} 
    fill="#FC7217"
  >
    <title>Search Icon</title>
    <path d="M256,64C150.13,64,64,150.13,64,256s86.13,192,192,192,192-86.13,192-192S361.87,64,256,64Zm80,294.63-54.15-54.15a88.08,88.08,0,1,1,22.63-22.63L358.63,336Z" />
    <circle cx="232" cy="232" r="56" />
  </svg>
);

const ingredientList = {
  'Ingredients': [
    "Chicken breast", "Butter", "Spaghetti", "Eggs", "Pancetta",
    "Parmesan cheese", "Beef strips", "Soy sauce", "Bell pepper",
    "Potatoes", "Carrots", "Green peas", "Coconut milk", "Curry powder",
    "Cucumber", "Tomatoes", "Feta cheese", "Olives", "Oregano"
  ]
};



const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIngredients, setShowIngredients] = useState(false);
  const navigate = useNavigate();
  const [recipes] = useState([]);
  const ingredientRef = useRef(null);


  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleIngredientClick = (ingredientName) => {
    navigate(`/results/${encodeURIComponent(ingredientName)}`);
  };

  const handleRecipeClick = (recipeName) => {
    navigate(`/recipe/:recipeName${encodeURIComponent(recipeName)}`);
  };

  const toggleList = () => {
    setShowIngredients(true);
  };

  const handleOpenList = () => {
    setShowIngredients(true);
  };

  const handleCloseList = () => {
    setShowIngredients(false);
    ingredientRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      {/* NavBar Image */}
      <div className={styles.navBar}>
        <Navbar />
      </div>

      {/* Background Image */}
      <div
        className={styles.foodMain}
        style={{ backgroundImage: `url(${mainImage})` }}
      ></div>

      <div className={styles.textBackground}>
        <div className={styles.titleText1}>Turn Ingredients</div>
        <br></br>
        <div className={styles.titleText2}>Into Inspiration</div>
        <br></br>
        <div className={styles.titleText3}>Got a few things in your fridge? Let 
          our smart recipe finder whip up delicious meal ideas in seconds. No 
          stress, no waste — just good food made easy.</div> 
      </div> 

      <div ref={ingredientRef} className={styles.container}>
        <div className={styles.ingredientSearch}>
          <div className={styles.searchTitleText}>Search Your Ingredient:</div>
          <br></br>
          <form className={styles.searchForm} onSubmit={handleSearch}>
          <input className={styles.searchBar} type="text"value={searchTerm} placeholder="Type your ingredients..." onChange={(e) => setSearchTerm(e.target.value)}></input>
          <button className={styles.searchButton} type="submit">Search</button>
          </form>
          <div className={styles.middleText}>Or</div>
          <div className={styles.ingredientChoiceTitle}>Choose a Common Ingredient:</div>
        </div>
        <div className={styles.recipeImages}>
        </div>

        {/* Ingredient Images */}
        <div className={styles.ingredientImages}>
          <button className={styles.ingredient} onClick={() => handleIngredientClick('Garlic')}>
            <img src={garlicImage} alt="Garlic" className={styles.ingredientImage} />
            <p className={styles.ingredientLabel}>Garlic</p>
          </button>
          <button className={styles.ingredient} onClick={() => handleIngredientClick('Olive oil')}>
            <img src={oliveOilImage} alt="Olive Oil" className={styles.ingredientImage} />
            <p className={styles.ingredientLabel}>Olive Oil</p>
          </button>
          <button className={styles.ingredient} onClick={() => handleIngredientClick('Salt')}>
            <img src={saltImage} alt="Salt" className={styles.ingredientImage} />
            <p className={styles.ingredientLabel}>Salt</p>
          </button>
          <button className={styles.ingredient} onClick={() => handleIngredientClick('Black pepper')}>
            <img src={pepperImage} alt="Pepper" className={styles.ingredientImage} />
            <p className={styles.ingredientLabel}>Pepper</p>
          </button>
          <button className={styles.ingredient} onClick={() => handleIngredientClick('Onion')}>
            <img src={onionImage} alt="Onion" className={styles.ingredientImage} />
            <p className={styles.ingredientLabel}>Onion</p>
          </button>
        </div>

        {/* More Ingredients Button and Dropdown */}
        {!showIngredients && (
          <div className={styles.moreIngredientButtonArrow}>
            <div className={styles.moreIngredientTab}>
              <button className={styles.moreIngredientsButton} onClick={toggleList}>More Ingredients</button>
            </div>
            <div className={styles.dropdownContainer}>
              <button onClick={handleOpenList} className={styles.dropdownButton}>
                <svg width="70" height="30" viewBox="0 0 81 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0.35" y1="0.65" x2="40.4" y2="40.7" stroke="black" />
                  <line x1="39.7" y1="40.7" x2="79.7" y2="0.67" stroke="black" />
                </svg>
              </button>
            </div>
          </div>
        )}



          {showIngredients && (
            <ul className={styles.ingredientList}>
              {ingredientList['Ingredients'].map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleIngredientClick(item)}
                  className={styles.ingredientItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        
           
            {showIngredients && (
              <div className={styles.dropdownContainer2}> 
              <button onClick={handleCloseList} className={styles.dropdownButton2}>
                {/* Up arrow */}
                <svg width="70" height="30" viewBox="0 0 81 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="40" y1="0.35" x2="0" y2="40" stroke="black"/>
                  <line x1="40" y1="0.6" x2="80" y2="40" stroke="black"/>
                </svg>
              </button>
            </div>
          )}
       

        {/* AI Cooking Assistant */}
        <div className={styles.aiCookingAssistant}>
          <div className={styles.aiTitle}>AI Cooking Assistant</div>
          <div className={styles.aiDescription}>
            Tell us what ingredients you have on hand and we’ll cook up recipe
            ideas just for you.
          </div>
          <input className={styles.searchBar2}placeholder="Ask AI a cooking question..."></input>
          <button className={styles.searchButton2}>AI Search</button>
        </div>
        

        {/* Recipe Text Section */}
        <div className={styles.popularRecipes} 
            style={{ backgroundImage: `url(${fancyBackground})` }}>
          <div className={styles.popularRecipeText}>Popular Recipes</div>     
          <div className={styles.recipeContainer}>
            <Link to={`/recipe/${encodeURIComponent("Spaghetti Aglio e Olio")}`} className={styles.recipeImage}
              style={{ backgroundImage: `url(${spaghettiImage})`}}
            ></Link>     
            <Link to={`/recipe/${encodeURIComponent("Spaghetti Aglio e Olio")}`} className={styles.recipeTitle}>Spaghetti Aglio e Olio</Link>
            <div className={styles.recipeDescription}>
              A simple yet flavorful Italian classic made with garlic, olive oil, and
              spaghetti. It's quick, satisfying, and perfect for those nights when
              your pantry’s running low but you still want something delicious.
            </div>
            <Link to={`/recipe/${encodeURIComponent("Spaghetti Aglio e Olio")}`} className={styles.goToRecipe}>Go to recipe
            <svg className={styles.flippedArrow} fill="none" viewBox="0 0 151 84"
            xmlns="http://www.w3.org/2000/svg"><path d="M82.7399 41.3499C100.736 41.2042 118.732 41.0874 136.728 40.8905C140.315 40.8505 143.907 40.5689 147.48 40.2178C148.071 40.1535 148.629 39.9124 149.08 39.5259C149.532 39.1395 149.857 38.6258 150.012 38.0518C150.305 37.133 149.285 35.8295 148.067 35.6378C146.886 35.4521 145.71 35.1639 144.523 35.0924C136.94 34.6329 129.358 33.9826 121.768 33.8454C106.175 33.5651 90.5773 33.4943 74.9807 33.4765C60.1836 33.4595 45.3858 33.6439 30.5886 33.6787C28.2127 33.6846 25.8354 33.3853 23.4634 33.1733C23.306 33.1345 23.1609 33.0567 23.0414 32.9472C22.9219 32.8377 22.8318 32.6999 22.7795 32.5465C22.7368 32.1803 22.8452 31.562 23.0887 31.4307C27.6358 28.9589 32.1271 26.3585 36.8029 24.1526C47.6803 19.0207 57.8844 12.7277 68.0813 6.41374C69.7569 5.37607 71.5132 4.322 72.1893 2.26307C72.312 1.8883 72.5037 1.24641 72.3475 1.12105C71.788 0.599524 71.1082 0.224493 70.3686 0.029504C69.581 -0.0633942 68.783 0.064092 68.0635 0.397733C65.5156 1.55223 62.9861 2.75664 60.5071 4.05094C42.786 13.3014 25.101 22.6069 7.37069 31.8324C0.682603 35.311 -2.49542 38.6846 5.53291 46.3329C7.84584 48.5375 10.1857 50.7389 12.7008 52.6993C24.3652 61.8006 36.0723 70.8462 47.8221 79.8362C49.4375 80.9957 51.1411 82.0271 52.9173 82.9211C54.0757 83.5499 55.2354 83.1764 56.2356 82.4229C57.3363 81.5926 58.0196 79.1793 57.6402 78.118C56.7968 75.7617 55.1166 74.033 53.3123 72.4676C46.3648 66.4411 39.3803 60.4579 32.3588 54.518C27.7959 50.6365 23.1851 46.812 18.6295 42.9225C18.4043 42.7302 18.3932 42.1349 18.4844 41.7766C18.5443 41.6215 18.6409 41.4833 18.766 41.3737C18.8911 41.2642 19.0408 41.1867 19.2025 41.1478C21.583 40.9916 23.9688 40.7927 26.3519 40.8052C45.1486 40.9045 63.9452 41.0283 82.7419 41.1766L82.7399 41.3499Z" fill="black"/></svg>
            </Link>


          </div>

          <hr className={styles.recipeLineBreak}></hr>

          <div className={styles.recipeContainer2}>
            <Link to={`/recipe/${encodeURIComponent("Garlic Butter Chicken")}`} className={styles.recipeTitle}>Garlic Butter Chicken</Link>
            <div className={styles.recipeDescription}>
              Rich and savory, this garlic butter blends creamy butter with fresh minced garlic and herbs. Perfect for spreading on bread, topping steaks, or enhancing vegetables.
            </div>
            <Link to={`/recipe/${encodeURIComponent("Garlic Butter Chicken")}`} className={styles.goToRecipe}>Go to recipe
              <svg className={styles.flippedArrow} fill="none" viewBox="0 0 151 84"
              xmlns="http://www.w3.org/2000/svg"><path d="M82.7399 41.3499C100.736 41.2042 118.732 41.0874 136.728 40.8905C140.315 40.8505 143.907 40.5689 147.48 40.2178C148.071 40.1535 148.629 39.9124 149.08 39.5259C149.532 39.1395 149.857 38.6258 150.012 38.0518C150.305 37.133 149.285 35.8295 148.067 35.6378C146.886 35.4521 145.71 35.1639 144.523 35.0924C136.94 34.6329 129.358 33.9826 121.768 33.8454C106.175 33.5651 90.5773 33.4943 74.9807 33.4765C60.1836 33.4595 45.3858 33.6439 30.5886 33.6787C28.2127 33.6846 25.8354 33.3853 23.4634 33.1733C23.306 33.1345 23.1609 33.0567 23.0414 32.9472C22.9219 32.8377 22.8318 32.6999 22.7795 32.5465C22.7368 32.1803 22.8452 31.562 23.0887 31.4307C27.6358 28.9589 32.1271 26.3585 36.8029 24.1526C47.6803 19.0207 57.8844 12.7277 68.0813 6.41374C69.7569 5.37607 71.5132 4.322 72.1893 2.26307C72.312 1.8883 72.5037 1.24641 72.3475 1.12105C71.788 0.599524 71.1082 0.224493 70.3686 0.029504C69.581 -0.0633942 68.783 0.064092 68.0635 0.397733C65.5156 1.55223 62.9861 2.75664 60.5071 4.05094C42.786 13.3014 25.101 22.6069 7.37069 31.8324C0.682603 35.311 -2.49542 38.6846 5.53291 46.3329C7.84584 48.5375 10.1857 50.7389 12.7008 52.6993C24.3652 61.8006 36.0723 70.8462 47.8221 79.8362C49.4375 80.9957 51.1411 82.0271 52.9173 82.9211C54.0757 83.5499 55.2354 83.1764 56.2356 82.4229C57.3363 81.5926 58.0196 79.1793 57.6402 78.118C56.7968 75.7617 55.1166 74.033 53.3123 72.4676C46.3648 66.4411 39.3803 60.4579 32.3588 54.518C27.7959 50.6365 23.1851 46.812 18.6295 42.9225C18.4043 42.7302 18.3932 42.1349 18.4844 41.7766C18.5443 41.6215 18.6409 41.4833 18.766 41.3737C18.8911 41.2642 19.0408 41.1867 19.2025 41.1478C21.583 40.9916 23.9688 40.7927 26.3519 40.8052C45.1486 40.9045 63.9452 41.0283 82.7419 41.1766L82.7399 41.3499Z" fill="black"/></svg>
            </Link>
            <Link to={`/recipe/${encodeURIComponent("Garlic Butter Chicken")}`} className={styles.recipeImage2}
              style={{ backgroundImage: `url(${garlicButterImage})`}}
            ></Link>
          </div>

          <hr className={styles.recipeLineBreak}></hr>

          <div className={styles.recipeContainer}>
            <Link to="/recipe" className={styles.recipeImage}
              style={{ backgroundImage: `url(${tomatoSoupImage})`}}
            ></Link>
            <Link to="/recipe" className={styles.recipeTitle}>Tomato Basil Soup</Link>
            <div className={styles.recipeDescription}>
              Creamy, comforting, and full of rich tomato flavor with a fresh basil
              twist. It’s a cozy bowl of warmth that pairs perfectly with a grilled
              cheese sandwich or some crusty bread.
            </div>
            <Link to={`/recipe/${encodeURIComponent("Tomato Basil Soup")}`} className={styles.goToRecipe}>Go to recipe
            <svg className={styles.flippedArrow} fill="none" viewBox="0 0 151 84"
            xmlns="http://www.w3.org/2000/svg"><path d="M82.7399 41.3499C100.736 41.2042 118.732 41.0874 136.728 40.8905C140.315 40.8505 143.907 40.5689 147.48 40.2178C148.071 40.1535 148.629 39.9124 149.08 39.5259C149.532 39.1395 149.857 38.6258 150.012 38.0518C150.305 37.133 149.285 35.8295 148.067 35.6378C146.886 35.4521 145.71 35.1639 144.523 35.0924C136.94 34.6329 129.358 33.9826 121.768 33.8454C106.175 33.5651 90.5773 33.4943 74.9807 33.4765C60.1836 33.4595 45.3858 33.6439 30.5886 33.6787C28.2127 33.6846 25.8354 33.3853 23.4634 33.1733C23.306 33.1345 23.1609 33.0567 23.0414 32.9472C22.9219 32.8377 22.8318 32.6999 22.7795 32.5465C22.7368 32.1803 22.8452 31.562 23.0887 31.4307C27.6358 28.9589 32.1271 26.3585 36.8029 24.1526C47.6803 19.0207 57.8844 12.7277 68.0813 6.41374C69.7569 5.37607 71.5132 4.322 72.1893 2.26307C72.312 1.8883 72.5037 1.24641 72.3475 1.12105C71.788 0.599524 71.1082 0.224493 70.3686 0.029504C69.581 -0.0633942 68.783 0.064092 68.0635 0.397733C65.5156 1.55223 62.9861 2.75664 60.5071 4.05094C42.786 13.3014 25.101 22.6069 7.37069 31.8324C0.682603 35.311 -2.49542 38.6846 5.53291 46.3329C7.84584 48.5375 10.1857 50.7389 12.7008 52.6993C24.3652 61.8006 36.0723 70.8462 47.8221 79.8362C49.4375 80.9957 51.1411 82.0271 52.9173 82.9211C54.0757 83.5499 55.2354 83.1764 56.2356 82.4229C57.3363 81.5926 58.0196 79.1793 57.6402 78.118C56.7968 75.7617 55.1166 74.033 53.3123 72.4676C46.3648 66.4411 39.3803 60.4579 32.3588 54.518C27.7959 50.6365 23.1851 46.812 18.6295 42.9225C18.4043 42.7302 18.3932 42.1349 18.4844 41.7766C18.5443 41.6215 18.6409 41.4833 18.766 41.3737C18.8911 41.2642 19.0408 41.1867 19.2025 41.1478C21.583 40.9916 23.9688 40.7927 26.3519 40.8052C45.1486 40.9045 63.9452 41.0283 82.7419 41.1766L82.7399 41.3499Z" fill="black"/></svg>
            </Link>
          </div>
          <Link to="/recipes" className={styles.moreRecipesLink}>Click here for more recipes</Link>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
