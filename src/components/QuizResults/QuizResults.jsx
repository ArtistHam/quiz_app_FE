import React from "react";
import { Link } from "react-router-dom";

import * as styles from "./QuizResults.module.css";

const QuizResults = ({
  score,
  startedAt,
  completedAt,
  onSubmit,
  userName,
  setUserName,
}) => {
  const timeTaken = completedAt.diff(startedAt, "seconds");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz Completed!</h2>
      <p>Your score: {score}</p>
      <p>Time taken: {timeTaken} seconds</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={onSubmit} className={styles.button}>
        Submit
      </button>
      <Link to="/" className={styles.link}>
        Go to Main Page
      </Link>
    </div>
  );
};

export default QuizResults;
