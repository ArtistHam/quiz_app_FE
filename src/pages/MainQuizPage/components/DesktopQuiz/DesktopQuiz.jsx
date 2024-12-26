import React from "react";

import * as styles from "./DesktopQuiz.module.css";

import { formatTime } from "../../../../utils/formatTime";

import Button from "../../../../components/Button/Button";

const DesktopQuiz = ({
  currentFile,
  isVideo,
  handleAnswer,
  totalTimeSpent,
  questionTimeSpent,
  questionCount,
  progressDots,
  currentAnswerState,
  onNext,
}) => {
  const { answered, isCorrect } = currentAnswerState;

  let borderColor = "var(--color-light-grey)";
  if (answered) {
    borderColor = isCorrect ? "rgba(205, 254, 92, 1)" : "rgba(255, 51, 0, 1)";
  }

  const overlayText = isCorrect
    ? "Spot on!\nYou got it!"
    : "Good try,\nbut that one fooled you.";

  const starStyle = {
    transform: isCorrect ? "rotate(0deg)" : "rotate(45deg)",
  };

  return (
    <div className={styles.container}>
      <div className={styles.quizLayout}>
        <div
          className={`${styles.quizLeftColumn} ${
            answered ? styles.blurredLeft : ""
          }`}
        >
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
              <p className={styles.quizText}>
                Examine each carefully, then choose whether you think it’s
                genuine or AI-generated.
              </p>
              <p className={styles.quizText}>
                The clock is ticking, so move quickly for a better score. But
                remember, accuracy matters.
              </p>
              <p className={styles.quizText}>Good luck!</p>
            </div>

            <div className={styles.bottomSection}>
              <div
                className={`${styles.totalTime} ${
                  answered ? styles.timeHighlight : ""
                }`}
              >
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
              src="/quiz_app_FE/images/woman.png"
              alt="Decor"
              className={styles.decorBottomLeft}
            />
            <div className={styles.rotatedGradient}></div>
          </div>
        </div>

        <div className={styles.quizRightColumn}>
          <div className={styles.mediaFrame} style={{ borderColor }}>
            <div>
              <div
                className={`${styles.mediaWrapper} ${
                  answered ? styles.blurredMedia : ""
                }`}
              >
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
              </div>
            </div>

            {answered && (
              <div className={styles.answerOverlay}>
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{overlayText}</p>
                  <img
                    src="/quiz_app_FE/images/decorativeStar4.svg"
                    alt="starOrCross"
                    className={styles.answerStar}
                    style={starStyle}
                  />
                </div>
              </div>
            )}

            <div className={`${styles.questionTime}`}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.883982 11.1591L0.884038 11.1591L0.885697 11.1517C0.906388 11.0593 0.941285 11.0412 0.954741 11.0346C0.982435 11.0208 1.03982 11.0095 1.11677 11.031C1.19291 11.0523 1.25196 11.0962 1.28366 11.1415C1.30855 11.1771 1.32859 11.2282 1.30847 11.3174C0.737965 13.8133 0.882897 16.4194 1.72663 18.8366C2.57043 21.2541 4.07894 23.3845 6.07891 24.9832L6.08172 24.9855C7.76491 26.3113 9.74022 27.2163 11.8435 27.6253C13.9468 28.0342 16.1173 27.9353 18.1747 27.3367C20.232 26.7382 22.1168 25.6572 23.6724 24.1838C25.2281 22.7103 26.4095 20.8868 27.1187 18.8649L27.1187 18.8649C27.8305 16.8355 28.0455 14.665 27.7459 12.5353C27.4463 10.4057 26.6408 8.37879 25.3968 6.62448C24.1527 4.87017 22.5064 3.4395 20.5957 2.4523C19.0493 1.65329 17.3661 1.16362 15.6403 1.00615V0.725234V0.562449C17.7003 0.757704 19.6972 1.40529 21.4861 2.46494C23.6285 3.73394 25.396 5.5485 26.6082 7.7235C27.6782 9.67434 28.2642 11.8535 28.3173 14.0778C28.3703 16.3027 27.8884 18.5079 26.9122 20.5079C25.9359 22.5079 24.4938 24.2443 22.707 25.5711C20.9202 26.898 18.841 27.7765 16.6442 28.1329L16.6439 28.1329C14.3814 28.5013 12.0629 28.3047 9.89474 27.5607C7.72654 26.8168 5.77582 25.5484 4.21611 23.8686C2.6564 22.1887 1.53605 20.1494 0.954713 17.9321C0.373377 15.7147 0.34908 13.3881 0.883982 11.1591ZM14.4152 1.95047C14.4903 1.95045 14.5653 1.95112 14.6403 1.95246V6.8172C14.6403 6.87693 14.6166 6.93422 14.5744 6.97646C14.5321 7.0187 14.4748 7.04243 14.4151 7.04243C14.3554 7.04243 14.2981 7.0187 14.2558 6.97646C14.2136 6.93422 14.1899 6.87693 14.1899 6.8172V1.95051L14.4152 1.95047ZM14.6547 0.503807L14.1899 0.968594V0.729623C14.1913 0.669215 14.216 0.611645 14.2587 0.568874L13.9052 0.215321L14.2587 0.568873C14.3012 0.526418 14.3582 0.501824 14.4182 0.500036C14.497 0.500631 14.5759 0.501889 14.6547 0.503807Z"
                  fill={answered ? "#ff8300" : "#F0FDFF"}
                  stroke={answered ? "#ff8300" : "#F0FDFF"}
                />
                <path
                  d="M14.2471 14.5635L8.10062 8.4185C8.06095 8.37628 8.03906 8.32035 8.03956 8.26234C8.04007 8.20328 8.06376 8.14679 8.10552 8.10503C8.14728 8.06327 8.20377 8.03958 8.26283 8.03907C8.32085 8.03857 8.37679 8.06048 8.41902 8.10016L14.5655 14.2452C14.6051 14.2874 14.627 14.3433 14.6265 14.4013C14.626 14.4604 14.6023 14.5169 14.5606 14.5586C14.5188 14.6004 14.4623 14.6241 14.4033 14.6246C14.3452 14.6251 14.2893 14.6032 14.2471 14.5635Z"
                  fill={answered ? "#ff8300" : "#F0FDFF"}
                  stroke={answered ? "#ff8300" : "#F0FDFF"}
                />
              </svg>

              <span
                className={answered ? styles.timeHighlight : ""}
                style={{ marginLeft: "8px" }}
              >
                {formatTime(questionTimeSpent)}
              </span>
            </div>
          </div>

          {answered ? (
            <div className={styles.answerButtons}>
              <Button variant="quiz-next" onClick={onNext}>
                Next
              </Button>
            </div>
          ) : (
            <div className={styles.answerButtons}>
              <Button
                variant="quiz-desktop"
                onClick={() => handleAnswer("real")}
              >
                Real
              </Button>
              <Button
                variant="quiz-desktop"
                onClick={() => handleAnswer("fake")}
              >
                Fake
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopQuiz;
