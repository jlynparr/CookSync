import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import Footer from "../components/Footer";
import styles from "./AboutPage.module.css";

import chefImage from "../assets/images/chef.jpg";

const AboutPage = () => {
    return (
        <>
        <div className={styles.aboutBody}>
            <div className="topStyle">
                <Navbar />
                <HeroImage image={chefImage} title="About"/>
            </div>
            <div className={styles.aboutSection}>
                <div className={styles.aboutParagraph}>CookSync is your intelligent kitchen companion — built to make cooking easier, smarter, and more enjoyable.</div>
                <br />
                <div className={styles.aboutParagraph}>We know the struggle of figuring out what to make with the random ingredients in your fridge. That’s why we created CookSync: a powerful AI assistant that helps you discover recipes based on what you already have. Just type in your ingredients, and CookSync will instantly generate personalized meal ideas.</div>
                <br />
                <div className={styles.aboutParagraph}>But we don’t stop there. With CookSync, you can filter recipes by:
                            ⏱️ Cooking time
                            🍳 Difficulty level
                            🍽️ Number of servings
                            🚫 Ingredients to exclude</div>
                <br />
                <div className={styles.aboutParagraph}>Our mission is to reduce food waste, save you time, and bring inspiration back into your kitchen. Whether you're cooking for one, feeding a family, or just experimenting, CookSync is here to guide you every step of the way.</div>
                <br />
                <div className={styles.aboutParagraph}>Smart cooking starts here. Let’s sync up.</div>
                <br />
                <div className={styles.signature}>— The CookSync Team</div>
            </div>    

            <div>
                <Footer />
            </div>
        </div>    
        </>
    );
};

export default AboutPage;