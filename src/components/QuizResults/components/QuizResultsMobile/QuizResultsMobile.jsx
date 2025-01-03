import React, { useState } from "react";
import * as styles from "./QuizResultsMobile.module.css";

import Button from "../../../Button/Button";
import HighscoreForm from "../HighscoreForm/HighscoreForm";

export default function QuizResultsMobile({
  score,
  timeTaken,
  isTopTen = false,
  submitting,
  onSubmitHighscore,
  userName,
  setUserName,
  onTryAgain,
}) {
  const [mobileSlide, setMobileSlide] = useState(0);

  const handleMobileSlide = (dir) => {
    if (dir === -1 && mobileSlide > 0) {
      setMobileSlide(mobileSlide - 1);
    }
    if (dir === 1 && mobileSlide < 1) {
      setMobileSlide(mobileSlide + 1);
    }
  };

  const formatTime = (time) => {
    const h = String(Math.floor(time / 3600)).padStart(2, "0");
    const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const timeFormatted = formatTime(timeTaken);
  const mobileTitle = isTopTen ? "Fantastic work!" : "You did it!";

  const mobilePanelLearn = (
    <>
      <h2 className={styles.panelTitleMobile}>Want to learn more?</h2>
      <p className={styles.panelTextMobile}>
        At iProov, we provide resilient facial biometric verification...
        <br />
        Visit our website to learn how we’re making digital interactions safer.
      </p>
    </>
  );

  let mobilePanelResult = null;
  if (!isTopTen) {
    mobilePanelResult = (
      <>
        <h2 className={styles.panelTitleMobile}>Your score:</h2>
        <div className={styles.resultsBlockMobile}>
          <p className={styles.timeMobile}>{timeFormatted}</p>
          <p className={styles.answersMobile}>{score}/10</p>
          <p className={styles.rightAnswersMobile}>correct guesses</p>
        </div>
      </>
    );
  } else {
    mobilePanelResult = (
      <>
        <h2
          className={`${styles.panelTitleMobile} ${styles.panelTitleMobileTop10}`}
        >
          Your score:
        </h2>
        <div className={styles.resultsBlockMobileTop10}>
          <p className={styles.timeMobileTop10}>{timeFormatted}</p>
          <p className={styles.answersMobile}>{score}/10</p>
          <p className={styles.rightAnswersMobileTop10}>correct guesses</p>
        </div>
        <p className={styles.panelTextMobileTop10}>
          This score puts you in the high score list. Enter a name or
          pseudonym...
        </p>
        <div className={styles.submitBlockMobile}>
          <HighscoreForm
            userName={userName}
            setUserName={setUserName}
            onSubmitHighscore={onSubmitHighscore}
            submitting={submitting}
            mobile
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.containerMobile}>
      <div className={styles.backgroundImageMobile}></div>
      <div className={styles.positionalContainerMobile}>
        <div className={styles.positionMobile}>
          <h1 className={styles.titleMobile}>{mobileTitle}</h1>

          <div className={styles.glassContainerMobile}>
            <div className={styles.starMobile}></div>

            <div className={styles.mobilePanelsWrapper}>
              {mobilePanelResult}
              {mobilePanelLearn}
            </div>
          </div>

          {isTopTen ? (
            <div className={styles.buttonsColumnMobile}>
              <Button
                variant="results-primary-mobile"
                as="link"
                to="https://www.iproov.com"
              >
                Learn more
              </Button>
            </div>
          ) : (
            <div className={styles.buttonsColumnMobile}>
              <Button variant="results-primary-mobile" onClick={onTryAgain}>
                Try again
              </Button>
              <Button
                variant="results-primary-mobile"
                as="link"
                to="https://www.iproov.com"
              >
                Learn more...
              </Button>
              <Button
                variant="results-secondary-mobile"
                as="link"
                to="/leaderboard"
              >
                View highscores
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
