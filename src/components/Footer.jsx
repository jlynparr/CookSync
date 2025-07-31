import React from "react";
import styles from "./Footer.module.css";

import foodImage1 from "../assets/images/Peppers.png";
import bottomLogo from "../assets/images/bottomLogo.png";
import instagramIcon from "../assets/images/instagram.png";
import facebookIcon from "../assets/images/facebook.png";
import tiktokIcon from "../assets/images/tiktok.png";
import youtubeIcon from "../assets/images/youtube.png";
import twitterIcon from "../assets/images/twitterIMG.png";

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
            <a className={styles.bottomLinks}>Home</a>
            <a className={styles.bottomLinks}>About</a>
            <a className={styles.bottomLinks}>Recipes</a>
          </div>
          <hr className={styles.lineSplit}></hr>
          <div className={styles.socialMediaIcons}>Contact Us<br></br>
            <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
            <img src={youtubeIcon} alt="YouTube" className={styles.socialIcon} />
            <img src={tiktokIcon} alt="TikTok" className={styles.socialIcon} />
            <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
            <img src={twitterIcon} alt="Twitter" className={styles.socialIcon} />
          </div>    
      </div>
      </>
  );
};

export default Footer;