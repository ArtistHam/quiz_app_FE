import React from "react";
import * as styles from "./QuizResults.module.css";

const QuizResults = ({
  score,
  onSubmit,
  userName,
  setUserName,
  resetQuiz,
  timeTaken,
  submitting,
}) => {
  const isResultAvailable = score !== null && timeTaken !== null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz Completed!</h2>
      {isResultAvailable ? (
        <>
          <p>Your score: {score}</p>
          <p>Time taken: {timeTaken} seconds</p>
          <button onClick={resetQuiz} className={styles.link}>
            Go to Main Page
          </button>
        </>
      ) : (
        <>
          <p>Please enter your name and submit to see your results.</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={onSubmit}
            className={styles.button}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <button onClick={resetQuiz} className={styles.link}>
            Go to Main Page
          </button>
        </>
      )}
    </div>
  );
};

export default QuizResults;
