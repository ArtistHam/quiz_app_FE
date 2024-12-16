import React from "react";
import * as styles from "./QuizResults.module.css";
import Button from "../Button/Button";

const QuizResults = ({
  score,
  onSubmit,
  userName,
  setUserName,
  resetQuiz,
  timeTaken = 10,
  submitting,
  isTopTen = false,
}) => {
  const isResultAvailable = score !== null && timeTaken !== null;

  const formatTime = (timeInSeconds) => {
    const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(timeInSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.positionalContainer}>
        <div className={styles.position}>
          <h1 className={styles.title}>Great job!</h1>
          <div className={styles.glassContainer}>
            <div className={styles.star}></div>

            {isResultAvailable ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className={styles.scoreBlock}>
                  <p
                    className={
                      isTopTen ? styles.scoreLabelTopTen : styles.scoreLabel
                    }
                  >
                    Your score:
                  </p>
                  <div className={styles.scoreInfo}>
                    <p className={styles.time}>{formatTime(timeTaken)}</p>
                    <p className={styles.correctAnswers}>
                      <p className={styles.score}>{score}/10</p>
                      <span>right answers</span>
                    </p>
                  </div>
                </div>

                {isTopTen ? (
                  <>
                    <p className={styles.topTenMessage}>
                      You’re in a Top 10 list!
                      <br />
                      Enter your name and submit
                    </p>
                    <div className={styles.sumbitBlock}>
                      <p className={styles.nameLabel}>Your name:</p>
                      <input
                        type="text"
                        placeholder=""
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.nameInput}
                      />
                    </div>
                    <div className={styles.buttonsRowTopTen}>
                      <Button
                        variant="primary"
                        onClick={onSubmit}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                      <Button variant="outline-light" onClick={resetQuiz}>
                        Try again
                      </Button>
                      <Button
                        variant="outline-light"
                        as="link"
                        to="/leaderboard"
                      >
                        Highscore
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={styles.buttonsRow}>
                    <Button variant="outline-light" onClick={resetQuiz}>
                      Try again
                    </Button>
                    <Button variant="outline-light" as="link" to="/leaderboard">
                      Highscore
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
