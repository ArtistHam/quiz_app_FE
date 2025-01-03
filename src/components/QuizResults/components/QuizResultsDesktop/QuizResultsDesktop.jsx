import React, { useState } from "react";
import * as styles from "./QuizResultsDesktop.module.css";

import HighscoreForm from "../HighscoreForm/HighscoreForm";
import Button from "../../../Button/Button";

export default function QuizResultsDesktop({
  score,
  timeTaken,
  isTopTen = false,
  submitting,
  onSubmitHighscore,
  userName,
  setUserName,
  onTryAgain,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const leftArrowDisabled = currentSlide === 0;
  const rightArrowDisabled = currentSlide === 1;

  const leftArrowStroke = leftArrowDisabled
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(240, 253, 255, 1)";

  const rightArrowStroke = rightArrowDisabled
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(240, 253, 255, 1)";

  const handleSlide = (direction) => {
    if (direction === -1 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    if (direction === 1 && currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const formatTime = (timeInSeconds) => {
    const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(timeInSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  const timeFormatted = formatTime(timeTaken);

  const desktopTitle = isTopTen ? "Fantastic work!" : "You did it!";

  const panelLearnMore = (
    <div className={styles.learnMoreBlock}>
      <h2 className={styles.panelTitle}>Want to learn more?</h2>
      <p className={`${styles.panelText} ${styles.panelTextGeneral}`}>
        At iProov, we provide resilient facial biometric verification to
        organizations worldwide, helping them defend against the evolving
        deepfake threat. Visit our website to learn how we’re making digital
        interactions safer.
      </p>
      <div className={styles.learnMoreButton}>
        <Button
          variant="primary-results"
          as="link"
          to="https://www.iproov.com/"
        >
          Learn more
        </Button>
      </div>
    </div>
  );

  let panelResult = null;
  if (!isTopTen) {
    panelResult = (
      <div className={styles.resultBlock}>
        <h2 className={styles.panelTitle}>Your score:</h2>
        <div className={styles.scoreInfo}>
          <p className={styles.scoreInfoText}>
            You’ve completed the challenge. <br /> Try again to get your name
            into the highscore list!
          </p>
          <div className={styles.resultsBlockMargin}>
            <p className={styles.resultsCounter}>{score}/10 </p>
            <p className={`${styles.resultScore} ${styles.resultScoreMargin}`}>
              correct guesses <span>in</span> {timeFormatted}
            </p>
          </div>
        </div>
        <div className={styles.buttonsRowBottom}>
          <Button variant="primary-results" onClick={onTryAgain}>
            Try again
          </Button>
          <Button variant="secondary-results" as="link" to="/leaderboard">
            View highscores
          </Button>
        </div>
      </div>
    );
  } else {
    panelResult = (
      <div className={styles.resultBlock}>
        <h2 className={styles.panelTitle}>Your score:</h2>
        <div className={styles.marginResultBlock}>
          <div className={styles.resultStats}>
            <p className={styles.resultsCounter}>{score}/10 </p>
            <p className={styles.resultScore}>
              correct guesses <span>in</span>
            </p>
            <p className={styles.resultTime}>{timeFormatted}</p>
          </div>

          <div className={styles.centralBlock}>
            <p className={styles.panelText}>
              This score puts you in the high score list.
              <br />
              Enter a name or pseudonym to see it listed among the best.
            </p>
            <HighscoreForm
              userName={userName}
              setUserName={setUserName}
              onSubmitHighscore={onSubmitHighscore}
              submitting={submitting}
            />
          </div>
        </div>
        <div className={styles.buttonsRowBottom}>
          <Button variant="primary-results" onClick={onTryAgain}>
            Try again
          </Button>
          <Button variant="secondary-results" as="link" to="/leaderboard">
            View highscores
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.gradientOverlay}></div>

      <div className={styles.positionalContainer}>
        <div className={styles.position}>
          <h1 className={styles.title}>{desktopTitle}</h1>

          <div className={styles.glassContainer}>
            <div className={styles.star}></div>

            <div className={styles.mainPanel}>
              {panelResult}
              {panelLearnMore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
