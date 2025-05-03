import React from "react";
import styles from "./HeroImage.module.css";

const HeroImage = ({image, title}) => {
    return (
      <>
     {/* Background Image */}
      <div
        className={styles.foodMain}
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className={styles.textBackground}>
        <div className={styles.titleText1}>{title}</div>
      </div> 
      <div></div>
    </>
  );
};

export default HeroImage;