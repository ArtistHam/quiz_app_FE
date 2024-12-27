import React, { useState, useEffect } from "react";

import * as styles from "./LeaderboardPage.module.css";

import { fetchHighscores } from "../../utils/api";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const LeaderboardPage = () => {
  const [scores, setScores] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchHighscores();
        setScores(data);
      } catch (error) {
        console.error("Failed to load highscores");
      }
    };
    loadScores();
  }, []);

  const formatTime = (timeInSeconds) => {
    const t = parseInt(timeInSeconds, 10);
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m} min ${s} sec`;
  };

  if (isMobile && !scores) {
    return (
      <>
        <Header alignment="center" />
        <div className={styles.containerMobile}>
          <h1 className={styles.titleMobile}>Highscore list</h1>
          <p className={styles.loadingTextMobile}>Loading...</p>
        </div>
      </>
    );
  }

  if (isMobile && scores) {
    return (
      <>
        <Header alignment="center" />
        <div className={styles.containerMobile}>
          <h1 className={styles.titleMobile}>Highscore list</h1>
          <div className={styles.tableContainerMobile}>
            <table className={styles.tableMobile}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderMobile}>Name</th>
                  <th className={styles.tableHeaderMobile}>Time</th>
                  <th className={styles.tableHeaderMobile}>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className={styles.tableCellNickNameMobile}>
                      {item.name}
                    </td>
                    <td className={styles.tableCellTimeMobile}>
                      {formatTime(item.time)}
                    </td>
                    <td className={styles.tableCellScoreMobile}>
                      {item.score}/10
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <img
            src="/images/decorativeStar.svg"
            alt="Star"
            className={styles.starImageMobile}
          />
          <div className={styles.leaderboardButtonsColumnMobile}>
            <Button
              variant="highscore-mobile-primary"
              as="link"
              to="https://www.iproov.com/"
            >
              Learn more
              <span className={styles.buttonTextDecor}> &raquo;</span>
            </Button>
            <Button
              variant="highscore-mobile-secondary"
              as="link"
              to="/?start=1"
            >
              Try yourself
            </Button>
          </div>
          <div className={styles.gradientDecorMobile}></div>
          <div className={styles.gradientDecorMobileBottom}></div>
        </div>
      </>
    );
  }

  if (!scores) {
    return (
      <>
        <Header alignment="center" />
        <div className={styles.container}>
          <h1 className={styles.title}>Highscore list</h1>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header alignment="center" />
      <div className={styles.container}>
        <div className={styles.gradientOverlay}></div>
        <h1 className={styles.title}>Highscore list</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th
                  className={`${styles.tableHeader} ${styles.tableHeaderName}`}
                >
                  Name
                </th>
                <th className={styles.tableHeader}>Time</th>
                <th className={styles.tableHeader}>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((item, index) => (
                <tr key={index}>
                  <td className={styles.tableCellNickName}>{item.name}</td>
                  <td className={styles.tableCellTime}>
                    {formatTime(item.time)}
                  </td>
                  <td className={styles.tableCellScore}>{item.score}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.buttonsRow}>
          <Button
            variant="primary-results"
            as="link"
            to="https://www.iproov.com/"
          >
            Learn more <span className={styles.buttonTextDecor}> &raquo;</span>
          </Button>
          <Button
            variant="secondary-results"
            onClick={() => {
              sessionStorage.setItem("autoStartQuiz", "true");
              window.location.href = "/";
            }}
          >
            Try yourself
          </Button>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
