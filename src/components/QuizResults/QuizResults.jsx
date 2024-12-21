import React, { useEffect, useState } from "react";
import * as styles from "./QuizResults.module.css";
import Button from "../Button/Button";

const QuizResults = ({
  score,
  onSubmitHighscore,
  userName,
  setUserName,
  timeTaken,
  submitting,
  isTopTen = false,
  onTryAgain,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const desktopTitle = isTopTen ? "Fantastic work!" : "You did it!";

  const formatTime = (timeInSeconds) => {
    const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(timeInSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  const timeFormatted = formatTime(timeTaken);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  if (isMobile) {
    return (
      <div className={styles.containerMobile}>
        <div className={styles.backgroundImageMobile}></div>
        <div className={styles.positionalContainerMobile}>
          <div className={styles.positionMobile}>
            <h1 className={styles.titleMobile}>
              {isTopTen ? "Fantastic work!" : "You did it!"}
            </h1>
            <div className={styles.glassContainerMobile}>
              <div className={styles.starMobile}></div>
              <p className={styles.scoreLabelMobile}>Your result:</p>
              <div className={styles.resultsBlockMobile}>
                <p className={styles.timeMobile}>{timeFormatted}</p>
                <p className={styles.answersMobile}>
                  {score}/10
                  <br />
                  <span className={styles.rightAnswersMobile}>
                    right answers
                  </span>
                </p>
              </div>

              {isTopTen ? (
                <>
                  <p className={styles.topTenMessageMobile}>
                    You’re in a Top 10 list!
                    <br />
                    Enter your name and Submit
                  </p>
                  <img
                    src="/images/arrow.png"
                    alt="Arrow"
                    className={styles.arrowImageMobile}
                  />
                  <div className={styles.submitBlockMobile}>
                    <input
                      type="text"
                      placeholder="Please enter your name here"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={styles.nameInputMobile}
                    />
                    <Button
                      variant="submit-desktop"
                      onClick={onSubmitHighscore}
                      disabled={submitting}
                      className={styles.submitButtonMobile}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className={styles.buttonsColumnMobile}>
                  <Button variant="primary" as="link" to="/">
                    Learn more
                  </Button>
                  <Button variant="secondary" as="link" to="/leaderboard">
                    Highscore
                  </Button>
                </div>
              )}
            </div>

            {isTopTen && (
              <div className={styles.buttonsRowTopTenOutsideMobile}>
                <Button variant="primary" as="link" to="/">
                  Learn more
                </Button>
                <Button variant="secondary" as="link" to="/leaderboard">
                  Highscore
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const panelLearnMore = (
    <div className={styles.learnMoreBlock}>
      <h2 className={styles.panelTitle}>Want to learn more?</h2>
      <p className={`${styles.panelText} ${styles.panelTextGeneral}`}>
        At iProov, we provide resilient facial biometric verification to
        organizations worldwide, helping them defend against the evolving
        deepfake threat. Visit our website to learn how we’re making digital
        interactions safer.
      </p>
    </div>
  );

  let panelResult = null;

  if (!isTopTen) {
    panelResult = (
      <div className={styles.resultBlock}>
        <h2 className={styles.panelTitle}>Your result:</h2>
        <div className={styles.scoreInfo}>
          <p className={`${styles.panelText} ${styles.panelTextMargin}`}>
            You’ve completed the challenge.
            <br />
            Try again to get your name into the highscore list!
          </p>
          <div className={styles.resultsBlockMargin}>
            <p className={styles.resultsCounter}>{score}/10 </p>
            <p className={`${styles.resultScore} ${styles.resultScoreMargin}`}>
              correct guesses <span>in</span> {timeFormatted}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    panelResult = (
      <div className={styles.resultBlock}>
        <h2 className={styles.panelTitle}>Your result:</h2>
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
            <div className={styles.submitHighscoreBlock}>
              <input
                type="text"
                placeholder="Please enter your name here"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.nameInput}
              />
              <Button
                variant="submit-desktop"
                onClick={onSubmitHighscore}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activePanel = currentSlide === 0 ? panelLearnMore : panelResult;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.gradientOverlay}></div>

      <div className={styles.positionalContainer}>
        <div className={styles.position}>
          <h1 className={styles.title}>{desktopTitle}</h1>

          <div className={styles.glassContainer}>
            <div className={styles.star}></div>

            <div className={styles.mainPanel}>{activePanel}</div>

            <div className={styles.panelArrows}>
              <div
                className={styles.arrowButton}
                onClick={() => handleSlide(-1)}
                style={{ cursor: leftArrowDisabled ? "default" : "pointer" }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <g>
                    <path
                      d="M23 11L15 19.5L23 28"
                      stroke={leftArrowStroke}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="19.5"
                      stroke={leftArrowStroke}
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>

              <div
                className={styles.arrowButton}
                onClick={() => handleSlide(+1)}
                style={{ cursor: rightArrowDisabled ? "default" : "pointer" }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M17 11L25 19.5L17 28"
                    stroke={rightArrowStroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="19.5"
                    transform="matrix(-1 0 0 1 40 0)"
                    stroke={rightArrowStroke}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.buttonsRowBottom}>
              <Button
                variant="primary-results"
                as="link"
                to="https://www.iproov.com/"
              >
                Learn more
              </Button>
              <Button variant="primary-results" onClick={onTryAgain}>
                Try again
              </Button>
              <Button variant="secondary" as="link" to="/leaderboard">
                View highscores
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
