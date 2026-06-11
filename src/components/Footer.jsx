import React from "react";
import styles from "./Footer.module.css";

import foodImage1 from "../assets/images/Peppers.png";
import bottomLogo from "../assets/images/bottomLogo.png";
import instagramIcon from "../assets/images/instagram.png";
import facebookIcon from "../assets/images/facebook.png";
import tiktokIcon from "../assets/images/tiktok.png";
import youtubeIcon from "../assets/images/youtube.png";
import twitterIcon from "../assets/images/twitterIMG.png";

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
        {/* Footer */}
        <div className={styles.footerImage}
              style={{ backgroundImage: `url(${foodImage1})`}}
        ></div>
        <div className={styles.footer}>
          <div className={styles.logoCopyIcons}>
            <div className={styles.bottomLogo}
              style={{ backgroundImage: `url(${bottomLogo})`}}
            ></div>  
            <div>&copy; Copyright 2025</div>
          </div>
          <div>
            <hr className={styles.linkLines}></hr>
            <hr className={styles.linkLines}></hr>
            <hr className={styles.linkLines}></hr>
          </div>
          <div>
            <Link to="/" className={styles.bottomLinks}>Home</Link>
            <Link to="/about" className={styles.bottomLinks}>About</Link>
            <Link to="/recipes" className={styles.bottomLinks}>Recipes</Link>
          </div>
          <hr className={styles.lineSplit}></hr>
          <div className={styles.socialMediaIcons}>Contact Us<br></br>
            <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} onClick={() => window.open('https://www.instagram.com/cooksyncteam/', '_blank')}/>
            <img src={youtubeIcon} alt="YouTube" className={styles.socialIcon} onClick={() => window.open('https://www.youtube.com/channel/UCdZsa2CeVN8w_On0yLVwbNg', '_blank')}/>
            <img src={tiktokIcon} alt="TikTok" className={styles.socialIcon} onClick={() => window.open('https://www.tiktok.com/@cooksyncteam', '_blank')}/>
            <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
            <img src={twitterIcon} alt="Twitter" className={styles.socialIcon} onClick={() => window.open('https://x.com/CookSyncTeam', '_blank')}/>
          </div>    
      </div>
      </>
  );
};

export default Footer;