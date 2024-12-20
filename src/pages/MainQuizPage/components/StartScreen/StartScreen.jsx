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
            src="/quiz_app_FE/images/decorativeStar.png"
            alt="Star"
            className={styles.starImage}
          />
          <h1 className={styles.mainTitle}>Can You Spot A Deepfake?</h1>

          {(!isMobile || mobileStep === "info") && (
            <p className={styles.infoText} style={{ fontSize: "24px" }}>
              As criminals get better at using AI to create convincing fake
              images and videos, it’s more important than ever to know what’s
              real and what’s not. Deepfakes can make people appear to say or do
              things that never happened, blurring the line between truth and
              illusion. Some are easy to detect – others aren’t. Take our quiz
              to test your skills at spotting deepfakes!
            </p>
          )}

          <div className={styles.buttonsRow}>
            {(!isMobile || mobileStep === "initial") && (
              <>
                <Button
                  variant={isMobile ? "outline-orange" : "primary"}
                  onClick={handleMobileTakeQuiz}
                >
                  Start quiz »
                </Button>
                <Button
                  variant={isMobile ? "mobile-secondary" : "secondary"}
                  as="link"
                  to="/quiz_app_FE/leaderboard"
                >
                  View Highscore
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
              src="/quiz_app_FE/images/man.png"
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
