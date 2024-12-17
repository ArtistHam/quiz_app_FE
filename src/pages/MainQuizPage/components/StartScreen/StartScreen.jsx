import React from "react";
import Button from "../../../../components/Button/Button";
import * as styles from "./StartScreen.module.css";

const StartScreen = ({
  isMobile,
  mobileStep,
  handleMobileTakeQuiz,
  handleMobileReady,
}) => {
  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.orangeGradient}></div>
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <img
            src="/images/decorativeStar.png"
            alt="Star"
            className={styles.starImage}
          />
          <h1 className={styles.mainTitle}>Will you guess?</h1>

          {(!isMobile || mobileStep === "info") && (
            <p className={styles.infoText}>
              You will see an image or a video with two buttons next to it:
              "Real" and "Fake". After making a choice, you are presented with
              the next image (total of 10 images). Upon completing the quiz, you
              will see your score (number of correct guesses) and time taken.
            </p>
          )}

          <div className={styles.buttonsRow}>
            {(!isMobile || mobileStep === "initial") && (
              <>
                <Button variant="primary" onClick={handleMobileTakeQuiz}>
                  Take quiz »
                </Button>
                <Button variant="secondary" as="link" to="/leaderboard">
                  Highscore
                </Button>
              </>
            )}
            {isMobile && mobileStep === "info" && (
              <Button variant="primary" onClick={handleMobileReady}>
                I'm ready!
              </Button>
            )}
          </div>
        </div>

        {(!isMobile || (isMobile && mobileStep === "initial")) && (
          <div className={styles.rightColumn}>
            <img
              src="/images/aiHuman.png"
              alt="Decorative"
              className={styles.mainImage}
            />
            <div className={styles.greenGradient}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
