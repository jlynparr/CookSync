import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Navbar.module.css";
import LoginPopup from "./LoginPopup";
import CreateAccountPopup from "./CreateAccountPopup";

import logo from "../assets/images/cooksynclogo.png";

import { Link } from 'react-router-dom';

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

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#333"  // You can change the color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = () => {
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  return (
    <>
      {/* NavBar Image */}
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <img src={logo} alt="CookSync Logo" className={styles.logoImage} />
        </div>
        <Link to="/" className={styles.navOption}>Home</Link>
        <Link to="/recipes"  className={styles.navOption}>Recipes</Link>
        <Link to="/about"  className={styles.navOption}>About</Link>

          <div>
            <button className={styles.signUp} onClick={() => setShowSignup(true)}>Sign Up</button>
            {showSignup && (
              <CreateAccountPopup 
                onClose={() => setShowSignup(false)} 
                onSwitchToLogin={handleSwitchToLogin} 
              />
            )}

          </div>

          <div>
            <button className={styles.logIn} onClick={() => setShowLogin(true)}>Log In</button>
            {showLogin && (
              <LoginPopup 
                onClose={() => setShowLogin(false)} 
                onSwitchToSignup={handleSwitchToSignup}
               />
            )}    
          </div>

          <div className={styles.search}>
            <button
              onClick={toggleSearch}
              aria-label="Toggle search"
              className={styles.searchIconButton}
            >
              <SearchIcon />
            </button>

            {searchOpen && (
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <button className={styles.closeButton} onClick={closeSearch}>
                  <CloseIcon />
                </button>
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search recipes..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.submitButton}>Go</button>
              </form>
            )}
          </div>
      </div>
      </>
  );
};

export default Navbar;
