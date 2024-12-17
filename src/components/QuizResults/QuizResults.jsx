import React, { useEffect, useState } from "react";
import * as styles from "./QuizResults.module.css";
import Button from "../Button/Button";

const QuizResults = ({
  score,
  onSubmit,
  userName,
  setUserName,
  resetQuiz,
  timeTaken,
  submitting,
  isTopTen = true,
  onTryAgain,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isResultAvailable = score !== null && timeTaken !== null;
  const formatTime = (timeInSeconds) => {
    const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(timeInSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // mobile
  if (isMobile) {
    // if (!isResultAvailable) {
    //   return (
    //     <div className={styles.containerMobile}>
    //       <div className={styles.backgroundImageMobile}></div>
    //       <div className={styles.positionalContainerMobile}>
    //         <div className={styles.positionMobile}>
    //           <h1 className={styles.titleMobile}>Great job!</h1>
    //           <div className={styles.glassContainerMobile}>
    //             <div className={styles.starMobile}></div>
    //             <div className={styles.loadingTextMobile}>Loading...</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    const timeFormatted = formatTime(timeTaken);

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
                    src="/images/arrow.png"
                    alt="Arrow"
                    className={styles.arrowImageMobile}
                  />
                  <div className={styles.submitBlockMobile}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={styles.nameInputMobile}
                    />
                    <Button
                      variant="primary"
                      onClick={onSubmit}
                      disabled={submitting}
                      className={styles.submitButtonMobile}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className={styles.buttonsColumnMobile}>
                  <Button variant="outline-light" onClick={onTryAgain}>
                    Try again
                  </Button>
                  <Button variant="outline-light" as="link" to="/leaderboard">
                    Highscore
                  </Button>
                </div>
              )}
            </div>

            {isTopTen && (
              <div className={styles.buttonsRowTopTenOutsideMobile}>
                <Button variant="outline-light" onClick={onTryAgain}>
                  Try again
                </Button>
                <Button variant="outline-light" as="link" to="/leaderboard">
                  Highscore
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // desktop
  // if (!isResultAvailable) {
  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.backgroundImage}></div>
  //       <div className={styles.positionalContainer}>
  //         <div className={styles.position}>
  //           <h1 className={styles.title}>Great job!</h1>
  //           <div className={styles.glassContainer}>
  //             <div className={styles.star}></div>
  //             <div>Loading...</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const timeFormatted = formatTime(timeTaken);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.positionalContainer}>
        <div className={styles.position}>
          <h1 className={styles.title}>Great job!</h1>
          <div className={styles.glassContainer}>
            <div className={styles.star}></div>
            <div className={styles.scoreBlock}>
              <p
                className={
                  isTopTen ? styles.scoreLabelTopTen : styles.scoreLabel
                }
              >
                Your score:
              </p>
              <div className={styles.scoreInfo}>
                <p className={styles.time}>{timeFormatted}</p>
                {/* Заменили вложенные p-tags */}
                <div className={styles.correctAnswers}>
                  <span className={styles.score}>{score}/10</span>
                  <span>right answers</span>
                </div>
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
                  <Button variant="outline-light" onClick={onTryAgain}>
                    Try again
                  </Button>
                  <Button variant="outline-light" as="link" to="/leaderboard">
                    Highscore
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.buttonsRow}>
                <Button variant="outline-light" onClick={onTryAgain}>
                  Try again
                </Button>
                <Button variant="outline-light" as="link" to="/leaderboard">
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
