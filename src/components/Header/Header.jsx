import React from "react";
import * as styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = ({ isResultsPage = false }) => {
  return (
    <header
      className={`${styles.header} ${isResultsPage ? styles.resultsPage : ""}`}
    >
      <Link to="/quiz_app_FE/" className={styles.logoContainer}>
        <img src="/quiz_app_FE/images/logo.png" alt="App Logo" className={styles.logo} />
        <span className={styles.appName}>iProov Deepfake Quiz</span>
      </Link>
    </header>
  );
};

export default Header;
