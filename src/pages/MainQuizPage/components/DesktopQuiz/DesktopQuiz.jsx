import React from "react";
import * as styles from "./DesktopQuiz.module.css";
import Button from "../../../../components/Button/Button";
import { formatTime } from "../../../../utils/formatTime";

const DesktopQuiz = ({
  currentFile,
  isVideo,
  handleAnswer,
  totalTimeSpent,
  questionTimeSpent,
  questionCount,
  progressDots,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.quizLayout}>
        <div className={styles.quizLeftColumn}>
          <div className={styles.centeredLeftColumn}>
            <div className={styles.topSection}>
              <h1 className={styles.quizTitle}>Real or fake?</h1>
              <p className={styles.quizText}>
                You’ll see 10 images or videos, one at a time.
                <br />
                <br />
                Examine each carefully, then choose whether you think it’s
                genuine or AI-generated.
                <br />
                <br />
                The clock is ticking, so move quickly for a better score. But
                remember, accuracy matters.
                <br />
                <br />
                Good luck!
              </p>
            </div>

            <div className={styles.bottomSection}>
              <div className={styles.totalTime}>
                <span className={styles.totalTimeLabel}>Total time spent:</span>
                <span className={styles.totalTimeValue}>
                  {formatTime(totalTimeSpent)}
                </span>
              </div>

              <div className={styles.questionCounter}>{questionCount}</div>

              <div className={styles.progressDots}>
                {progressDots.map((status, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${
                      status === "correct"
                        ? styles.dotCorrect
                        : status === "incorrect"
                        ? styles.dotIncorrect
                        : status === "current"
                        ? styles.dotCurrent
                        : status === "past"
                        ? styles.dotPast
                        : styles.dotFuture
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.decorContainer}>
            <img
              src="/images/woman.png"
              alt="Decor"
              className={styles.decorBottomLeft}
            />

            <div className={styles.rotatedGradient}></div>
          </div>
        </div>

        <div className={styles.quizRightColumn}>
          <div className={styles.mediaFrame}>
            {isVideo ? (
              <video key={questionCount} className={styles.media} controls>
                <source src={currentFile.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={questionCount}
                src={currentFile.url}
                alt="question"
                className={styles.image}
              />
            )}

            <div className={styles.questionTime}>
              <img
                src="/images/timerIcon.png"
                alt="Timer"
                className={styles.timerIcon}
              />
              <span>{formatTime(questionTimeSpent)}</span>
            </div>
          </div>

          <div className={styles.answerButtons}>
            <Button variant="primary" onClick={() => handleAnswer("real")}>
              Real
            </Button>
            <Button variant="primary" onClick={() => handleAnswer("fake")}>
              Fake
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopQuiz;
