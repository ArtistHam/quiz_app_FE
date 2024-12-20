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
            src="/images/decorativeStar.svg"
            alt="Star"
            className={styles.starImage}
          />
          <h1 className={styles.mainTitle}>Can You Spot A Deepfake?</h1>

          {!isMobile && (
            <p className={styles.infoText}>
              As criminals get better at using AI to create convincing fake
              images and videos, it’s more important than ever to know what’s
              real and what’s not. Deepfakes can make people appear to say or do
              things that never happened, blurring the line between truth and
              illusion. Some are easy to detect – others aren’t. Take our quiz
              to test your skills at spotting deepfakes!
            </p>
          )}

          {(isMobile || mobileStep === "info") && (
            <p className={styles.infoText}>
              You will see an image or a video with two buttons next to it:
              "Real" and "Fake".
              <>
                <br />
                <br />
              </>
              After making a choice, you are presented with the next image
              (total of 10 images).
              <>
                <br />
                <br />
              </>
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
                  Start quiz
                  <span className={styles.buttonTextDecor}> &raquo;</span>
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
            {/* Добавляем отдельный div для man */}
            <div className={styles.manDecor}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
