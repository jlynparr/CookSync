import React from "react";
import styles from "./HeroImage.module.css";

const HeroImage = ({ image, title }) => {
  return (
    <div className={styles.heroWrapper}>
      {/* Background image behind everything */}
      <div
        className={styles.foodMain}
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Centered overlay text */}
      <div className={styles.textBackground}>
        <div className={styles.titleText1}>{title}</div>
      </div>
    </div>
  );
};

export default HeroImage;
