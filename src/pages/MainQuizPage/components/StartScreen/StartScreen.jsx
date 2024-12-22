import React from "react";
import Button from "../../../../components/Button/Button";
import * as styles from "./StartScreen.module.css";

const StartScreen = ({
  isMobile,
  mobileStep,
  handleMobileTakeQuiz,
  handleMobileReady,
}) => {
  const InfoStep1 = () => (
    <>
      <div className={styles.verticalGradient}></div>
      <div className={styles.radialGradient}></div>
      <h1 className={styles.mainTitleMobile}>Can You Spot A Deepfake?</h1>

      <p className={styles.infoText}>
        As criminals get better at using AI to create convincing fake images and
        videos, it’s more important than ever to know what’s real and what’s
        not.
        <br />
        <br />
        Deepfakes can make people appear to say or do things that never
        happened, blurring the line between truth and illusion. Some are easy to
        detect – others aren’t.
        <br />
        <br />
        Take our quiz to test your skills at spotting deepfakes!
      </p>
      <div className={styles.buttonsRow}>
        <Button
          variant="mobile-primary"
          onClick={() => handleMobileTakeQuiz("info2")}
        >
          Start quiz
        </Button>
      </div>
    </>
  );

  const InfoStep2 = () => (
    <>
      <div className={styles.verticalGradient}></div>
      <div className={styles.radialGradient}></div>
      <h1 className={`${styles.mainTitleMobile} ${styles.titleMobileStep2}`}>
        Real or fake?
      </h1>
      <p className={`${styles.infoText} ${styles.infoTextStep2}`}>
        You’ll see 10 images or videos, one at a time.
        <br />
        <br />
        Examine each carefully, then choose whether you think it’s genuine or
        AI-generated.
        <br />
        <br />
        The clock is ticking, so move quickly for a better score. But remember,
        accuracy matters.
        <br />
        <br />
        Good luck!
      </p>
      <div className={styles.buttonsRow}>
        <Button variant="mobile-primary" onClick={handleMobileReady}>
          I’m ready!
        </Button>
      </div>
    </>
  );

  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <img
            src="/images/decorativeStar.svg"
            alt="Star"
            className={styles.starImage}
          />

          {!isMobile && (
            <>
              <h1 className={styles.mainTitle}>Can You Spot A Deepfake?</h1>
              <p className={styles.infoText}>
                As criminals get better at using AI to create convincing fake
                images and videos, it’s more important than ever to know what’s
                real and what’s not. Deepfakes can make people appear to say or
                do things that never happened, blurring the line between truth
                and illusion. Some are easy to detect – others aren’t. Take our
                quiz to test your skills at spotting deepfakes!
              </p>
              <div className={styles.buttonsRow}>
                <Button
                  variant="primary"
                  onClick={() => handleMobileTakeQuiz("startDesktop")}
                >
                  Start quiz
                  <span className={styles.buttonTextDecor}> &raquo;</span>
                </Button>
                <Button variant="secondary" as="link" to="/leaderboard">
                  View highscores
                </Button>
              </div>
            </>
          )}

          {isMobile && mobileStep === "initial" && (
            <>
              <h1 className={styles.mainTitleMobile}>
                Can You Spot A Deepfake?
              </h1>
              <div className={styles.buttonsRow}>
                <Button
                  variant="outline-orange"
                  onClick={() => handleMobileTakeQuiz("info1")}
                >
                  Start quiz
                  <span className={styles.buttonTextDecor}> &raquo;</span>
                </Button>
                <Button variant="mobile-secondary" as="link" to="/leaderboard">
                  View highscores
                </Button>
              </div>
            </>
          )}

          {isMobile && mobileStep === "info1" && <InfoStep1 />}
          {isMobile && mobileStep === "info2" && <InfoStep2 />}
        </div>

        {(!isMobile || (isMobile && mobileStep === "initial")) && (
          <div className={styles.rightColumn}>
            <div className={styles.manDecor}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartScreen;
