import React from "react";
import * as styles from "./MobileQuiz.module.css";
import Button from "../../../../components/Button/Button";
import { formatTime } from "../../../../utils/formatTime";

const MobileQuiz = ({
  currentFile,
  isVideo,
  handleAnswer,
  questionCount,
  questionTimeSpent,
  progressDots,
}) => {
  return (
    <div className={styles.mobileQuizContainer}>
      <div className={styles.mobileMediaFrame}>
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
        <div className={styles.mobileBar}>
          <img
            src="/quiz_app_FE/images/timerIcon.png"
            alt="Timer"
            className={styles.timerIcon}
          />
          <span>{formatTime(questionTimeSpent)}</span>
          <div className={styles.mobileQuestionCounter}>{questionCount}</div>
        </div>
      </div>

      <div className={styles.answerButtonsMobile}>
        <Button variant="outline-orange" onClick={() => handleAnswer("real")}>
          Real
        </Button>
        <Button variant="outline-orange" onClick={() => handleAnswer("fake")}>
          Fake
        </Button>
      </div>

      <div className={styles.mobileBlurBlock}>
        <div className={styles.mobileBlurQuestionCounter}>{questionCount}</div>
        <div className={styles.mobileProgressDots}>
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
  );
};

export default MobileQuiz;
