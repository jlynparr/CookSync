// src/components/LoginPopup.jsx
import React from 'react';
import styles from './CreateAccountPopup.module.css';

import googleIcon from '../assets/images/googleIcon.png';
import appleIcon from '../assets/images/appleIcon.png';
import XIcon from '../assets/images/XIcon.png';
import createImage from '../assets/images/createImage.jpg';
import logo from '../assets/images/cooksynclogo.png';

const CreateAccountPopup = ({onClose}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
                <div className={styles.rightSide}>
          <div className={styles.logoArrow}>
            <img className={styles.logoImage} src={logo}/>
            <button className={styles.closeBtn} onClick={onClose}>
              <svg width="3em" height="2em" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 2L4 12L15 22" stroke="#FC7217" strokeWidth="3" fill="none" />
                <line x1="4" y1="12" x2="35" y2="12" stroke="#FC7217" strokeWidth="3" />
              </svg>Go Back
            </button>
          </div>  
          <div className={styles.loginForm}>  
            <h2>Create Account</h2>
            <div className={styles.socialButtonsWrapper}>
                <button className={styles.signInButtons}><img src={googleIcon} className={styles.icons}/>Sign up with Google</button>
                <button className={styles.signInButtons}><img src={appleIcon} className={styles.icons}/>Sign up with Apple ID</button>
                <button className={styles.signInButtons}><img src={XIcon} className={styles.icons}/>Sign up with X</button>
            </div>
            <div className={styles.sectionBreak}>
              <div className={styles.lineBreak}></div>
              <span>or</span>
              <div className={styles.lineBreak}></div>
            </div>
            <form>
            <input type="text" placeholder="Email*" required />
            <input type="password" placeholder="Password*" required />
            <input type="password" placeholder="Confirm Password*" required />
            <button className={styles.loginButton} type="submit">Create Account</button>
            </form>
          </div>
          <div className={styles.plainFontStyle}>Already have an account? <span className={styles.boldStyle}>Log in</span></div>
        </div>
        <div className={styles.leftSide}>
            <img src={createImage} className={styles.loginImage}/>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPopup;