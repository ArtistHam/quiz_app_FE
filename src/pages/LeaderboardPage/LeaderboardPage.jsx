import React, { useState, useEffect } from "react";
import * as styles from "./LeaderboardPage.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { fetchHighscores } from "../../utils/api";

const LeaderboardPage = () => {
  const [scores, setScores] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
            src="/images/decorativeStar.png"
            alt="Star"
            className={styles.starImageMobile}
          />
          <div className={styles.leaderboardButtonsColumnMobile}>
            <Button variant="primary" as="link" to="/?start=1">
              Take quiz »
            </Button>
            <Button variant="secondary" onClick={() => window.history.back()}>
              Close
            </Button>
          </div>
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
          <Button variant="secondary" as="link" to="/?start=1">
            Try yourself
          </Button>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
