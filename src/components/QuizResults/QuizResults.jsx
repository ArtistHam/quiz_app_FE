import React, { useEffect, useState } from "react";
import * as styles from "./QuizResults.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const QuizResults = ({
  score,
  onSubmitHighscore,
  userName,
  setUserName,
  timeTaken,
  submitting,
  resetQuiz,
  isTopTen = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatTime = (timeInSeconds) => {
    const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(timeInSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const timeFormatted = formatTime(timeTaken);

  if (isMobile) {
    return (
      <div className={styles.containerMobile}>
        <div className={styles.backgroundImageMobile}></div>
        <div className={styles.positionalContainerMobile}>
          <div className={styles.positionMobile}>
            <h1 className={styles.titleMobile}>Great job!</h1>
            <div className={styles.glassContainerMobile}>
              <div className={styles.starMobile}></div>
              <p className={styles.scoreLabelMobile}>Your score:</p>
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
                    src="/quiz_app_FE/images/arrow.png"
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
                  <Button variant="primary" as="link" to="/quiz_app_FE/">
                    Learn more
                  </Button>
                  <Button
                    variant="secondary"
                    as="link"
                    to="/quiz_app_FE/leaderboard"
                  >
                    Highscore
                  </Button>
                </div>
              )}
            </div>

            {isTopTen && (
              <div className={styles.buttonsRowTopTenOutsideMobile}>
                <Button variant="primary" as="link" to="/quiz_app_FE/">
                  Learn more
                </Button>
                <Button variant="secondary" to="/quiz_app_FE/leaderboard">
                  Highscore
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.gradientOverlay}></div>
      <div className={styles.positionalContainer}>
        <div className={styles.position}>
          <h1 className={styles.title} style={{ fontSize: "68px" }}>
            You did it!
          </h1>
          <div className={styles.glassContainer}>
            <div className={styles.star}></div>
            <div className={styles.scoreBlock} style={{ fontSize: "24px" }}>
              You’ve completed the challenge.
              <p
                className={
                  isTopTen ? styles.scoreLabelTopTen : styles.scoreLabel
                }
                style={{ fontSize: "48px", marginBottom: "40px" }}
              >
                Your result:
              </p>
              <div className={styles.scoreInfo}>
                <div className={styles.correctAnswers}>
                  <div className={styles.score} style={{ fontSize: "48px" }}>
                    {score}/10
                  </div>
                  <div style={{ fontSize: "32px" }}>correct guesses</div>
                </div>
                <p style={{ fontSize: "24px", fontStyle: "italic" }}>in</p>

                <p
                  className={styles.time}
                  style={{ fontSize: "32px", marginBottom: "55px" }}
                >
                  {timeFormatted}
                </p>
                {!isTopTen && (
                  <p style={{ fontSize: "24px", fontStyle: "italic" }}>
                    Try again to get your name into the highscore list!
                  </p>
                )}
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
                <div className={styles.buttonsRowTopTen}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      resetQuiz();
                      navigate("/quiz_app_FE/");
                    }}
                  >
                    Try again
                  </Button>
                  <Button
                    variant="secondary"
                    as="link"
                    to="/quiz_app_FE/leaderboard"
                  >
                    Highscore
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.buttonsRow}>
                <Button
                  variant="primary"
                  onClick={() => {
                    resetQuiz();
                    navigate("/quiz_app_FE/");
                  }}
                >
                  Try again
                </Button>
                <Button
                  variant="secondary"
                  as="link"
                  to="/quiz_app_FE/leaderboard"
                >
                  Highscore
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
