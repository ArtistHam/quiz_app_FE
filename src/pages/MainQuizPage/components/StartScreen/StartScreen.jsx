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
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <img
            src="/images/decorativeStar.png"
            alt="Star"
            className={styles.starImage}
          />
          <h1 className={styles.mainTitle}>Will You Guess?</h1>

          {(!isMobile || mobileStep === "info") && (
            <p className={styles.infoText}>
              You will see an image or a video with two buttons next to it:
              "Real" and "Fake".
              {isMobile && (
                <>
                  <br />
                  <br />
                </>
              )}
              After making a choice, you are presented with the next image
              (total of 10 images).
              {isMobile && (
                <>
                  <br />
                  <br />
                </>
              )}
              Upon completing the quiz, you will see your score (number of
              correct guesses) and time taken.
            </p>
          )}

          <div className={styles.buttonsRow}>
            {(!isMobile || mobileStep === "initial") && (
              <>
                <Button
                  variant={isMobile ? "outline-orange" : "primary"}
                  onClick={handleMobileTakeQuiz}
                >
                  Take quiz »
                </Button>
                <Button
                  variant={isMobile ? "mobile-secondary" : "secondary"}
                  as="link"
                  to="/leaderboard"
                >
                  Highscore
                </Button>
              </>
            )}
            {isMobile && mobileStep === "info" && (
              <Button variant="mobile-primary" onClick={handleMobileReady}>
                I'm ready!
              </Button>
            )}
          </div>
        </div>

        {(!isMobile || (isMobile && mobileStep === "initial")) && (
          <div className={styles.rightColumn}>
            <img
              src="/images/man.png"
              alt="Decorative"
              className={styles.mainImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
