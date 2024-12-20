import React from "react";
import * as styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = ({ isResultsPage = false, alignment = "left" }) => {
  return (
    <header
      className={`${styles.header} ${isResultsPage ? styles.resultsPage : ""}`}
    >
      <div className={`${styles.headerInner} ${styles[alignment]}`}>
        <Link to="/" className={styles.logoContainer}>
          <img src="/images/logo.png" alt="App Logo" className={styles.logo} />
          <span className={styles.appName}>iProov Deepfake Quiz</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
