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
  // ===== Все хуки объявляем в корне, а не внутри if =====
  const [isMobile, setIsMobile] = useState(false);

  // "слайдер" для десктоп
  const [currentSlide, setCurrentSlide] = useState(0);

  // "слайдер" для мобильных панелек
  const [mobileSlide, setMobileSlide] = useState(0);

  // заголовки
  const desktopTitle = isTopTen ? "Fantastic work!" : "You did it!";
  const mobileTitle = isTopTen ? "Fantastic work!" : "You did it!";

  // форматируем время
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

  // Логика переключения слайдов (десктоп)
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

  // ====== MOBILE логика ======
  // вместо if (isMobile) { const [mobileSlide, setMobileSlide] = useState(0); ... }
  // мы уже объявили mobileSlide выше
  const handleMobileSlide = (dir) => {
    if (dir === -1 && mobileSlide > 0) {
      setMobileSlide(mobileSlide - 1);
    }
    if (dir === 1 && mobileSlide < 1) {
      setMobileSlide(mobileSlide + 1);
    }
  };

  // Слайды для мобильной
  const mobilePanelLearn = (
    <>
      <h2 className={styles.panelTitleMobile}>Want to learn more?</h2>
      <p className={styles.panelTextMobile}>
        At iProov, we provide resilient facial biometric verification to
        organizations worldwide, helping them defend against the evolving
        deepfake threat. Visit our website to learn how we’re making digital
        interactions safer.
      </p>
    </>
  );

  let mobilePanelResult = null;
  isTopTen = false;
  if (!isTopTen) {
    mobilePanelResult = (
      <>
        <h2 className={styles.panelTitleMobile}>Your result:</h2>
        <p className={styles.panelTextMobile}>
          You’ve completed the challenge.
          <br />
          Try again to get your name into the highscore list!
        </p>
        <div className={styles.resultsBlockMobile}>
          <p className={styles.timeMobile}>{timeFormatted}</p>
          <p className={styles.answersMobile}>
            {score}/10
            <br />
            <span className={styles.rightAnswersMobile}>correct guesses</span>
          </p>
        </div>
      </>
    );
  } else {
    mobilePanelResult = (
      <>
        <h2 className={styles.panelTitleMobile}>Your result:</h2>
        <div className={styles.resultsBlockMobile}>
          <p className={styles.timeMobile}>{timeFormatted}</p>
          <p className={styles.answersMobile}>
            {score}/10
            <br />
            <span className={styles.rightAnswersMobile}>correct guesses</span>
          </p>
        </div>
        <p className={styles.panelTextMobile}>
          This score puts you in the high score list. Enter a name or pseudonym
          to see it listed among the best.
        </p>
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
    );
  }

  // Активный слайд мобильных панелей
  const mobileActivePanel =
    mobileSlide === 0 ? mobilePanelLearn : mobilePanelResult;

  // ====== DESKTOP логика ======
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

  // ====== Рендер компонента ======
  if (isMobile) {
    // Мобильная версия
    return (
      <div className={styles.containerMobile}>
        <div className={styles.backgroundImageMobile}></div>
        <div className={styles.positionalContainerMobile}>
          <div className={styles.positionMobile}>
            <h1 className={styles.titleMobile}>{mobileTitle}</h1>

            <div className={styles.glassContainerMobile}>
              <div className={styles.starMobile}></div>

              <div className={styles.mobilePanelsWrapper}>
                {mobileActivePanel}
              </div>

              <div className={styles.mobileArrowsRow}>
                <div
                  className={styles.mobileArrow}
                  style={{ opacity: mobileSlide === 0 ? 0.5 : 1 }}
                  onClick={() => handleMobileSlide(-1)}
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      d="M17.8 9.6L12 15.5L17.8 21.4"
                      stroke="white"
                      strokeOpacity={mobileSlide === 0 ? 0.4 : 0.9}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="15"
                      stroke="white"
                      strokeOpacity={mobileSlide === 0 ? 0.4 : 0.9}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className={styles.mobileArrow}
                  style={{ opacity: mobileSlide === 1 ? 0.5 : 1 }}
                  onClick={() => handleMobileSlide(1)}
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      d="M14.2 9.6L20 15.5L14.2 21.4"
                      stroke="white"
                      strokeOpacity={mobileSlide === 1 ? 0.4 : 0.9}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="15"
                      transform="matrix(-1 0 0 1 32 0)"
                      stroke="white"
                      strokeOpacity={mobileSlide === 1 ? 0.4 : 0.9}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.buttonsColumnMobile}>
              <Button variant="primary" onClick={onTryAgain}>
                Try again
              </Button>
              <Button variant="primary" as="link" to="https://www.iproov.com">
                Learn more
              </Button>
              <Button variant="secondary" as="link" to="/leaderboard">
                View highscores
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Десктоп
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
                onClick={() => handleSlide(1)}
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
