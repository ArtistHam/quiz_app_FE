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
        <div className={styles.mobileTopBar}>
          <img
            src="/images/timerIcon.png"
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
          {progressDots.map((dotClass, i) => (
            <span key={i} className={dotClass} />
          ))}
        </div>
      </div>

      <img
        src="/images/aiHuman3.png"
        alt="Decor"
        className={styles.mobileAiHuman}
      />
    </div>
  );
};

export default MobileQuiz;
