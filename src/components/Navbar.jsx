import React from "react";
import styles from "./Navbar.module.css";

import logo from "../assets/images/cooksynclogo.png";

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

const Navbar = () => {
  return (
    <>
      {/* NavBar Image */}
      <div className={styles.navBar}>
      <div
        className={styles.logo}
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
      <div className={styles.home}>Home</div>
      <div className={styles.spacer}></div>
      <div className={styles.recipes}>Recipes</div>
      <div className={styles.spacer}></div>
      <div className={styles.about}>About</div>
      <button className={styles.signUp}>Sign Up</button>
      <button className={styles.logIn}>Log In</button>
      <div
        className={styles.search}>
        <SearchIcon />
      </div>
      </div>
      </>
  );
};

export default Navbar;
