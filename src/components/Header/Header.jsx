import React from "react";

import * as styles from "./Header.module.css";

import { Link } from "react-router-dom";

const Header = ({
  isResultsPage = false,
  alignment = "left",
  onLogoClick = null,
}) => {
  const logoElement = onLogoClick ? (
    <div
      className={styles.logoContainer}
      onClick={onLogoClick}
      role="button"
      tabIndex={0}
    >
      <img src="/quiz_app_FE/images/logo.png" alt="App Logo" className={styles.logo} />
      <span className={styles.appName}>iProov Deepfake Quiz</span>
    </div>
  ) : (
    <Link to="/quiz_app_FE/" className={styles.logoContainer}>
      <img src="/quiz_app_FE/images/logo.png" alt="App Logo" className={styles.logo} />
      <span className={styles.appName}>iProov Deepfake Quiz</span>
    </Link>
  );

  return (
    <header
      className={`${styles.header} ${isResultsPage ? styles.resultsPage : ""}`}
    >
      <div className={`${styles.headerInner} ${styles[alignment]}`}>
        {logoElement}
      </div>
    </header>
  );
};

export default Header;
