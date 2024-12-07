import React from "react";
import { Link } from "react-router-dom";

import * as styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome welcome welcome</h1>
      <div className={styles.buttons}>
        <Link to="/quiz" className={styles.button}>
          Start quiz
        </Link>
        <Link to="/leaderboard" className={styles.button}>
          Scores
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
