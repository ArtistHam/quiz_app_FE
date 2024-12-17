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
              <h1 className={styles.quizTitle}>Quiz has started!</h1>
              <p className={styles.quizText}>
                Now you see an image or a video with two buttons below: "Real"
                and "Fake".
                <br />
                <br />
                Make your choice depending on what you think about this one:
                whether it’s a real person’s photo, or it’s a fake made by an
                AI.
                <br />
                <br />
                The time is counting!
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
                {progressDots.map((dotClass, i) => (
                  <span key={i} className={dotClass} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.decorContainer}>
            <img
              src="/images/aiHuman3.png"
              alt="Decor"
              className={styles.decorBottomLeft}
            />

            <div className={styles.rotatedGradient}></div>

            <div className={styles.centerBottomDecor}>
              <img src="/images/decorativeStar3.png" alt="Decor" />
            </div>
          </div>
        </div>

        <div className={styles.quizRightColumn}>
          <div className={styles.mediaFrame}>
            {isVideo ? (
              <video key={questionCount} className={styles.media} controls>
                <source src={`http://${currentFile}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={questionCount}
                src={`http://${currentFile}`}
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
            <Button
              variant="outline-orange"
              onClick={() => handleAnswer("real")}
            >
              Real
            </Button>
            <Button
              variant="outline-orange"
              onClick={() => handleAnswer("fake")}
            >
              Fake
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopQuiz;
