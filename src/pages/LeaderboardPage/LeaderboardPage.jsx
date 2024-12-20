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
        <Header />
        <div className={styles.containerMobile}>
          <h1 className={styles.titleMobile}>Highscores</h1>
          <p className={styles.loadingTextMobile}>Loading...</p>
        </div>
      </>
    );
  }

  // Mobile
  if (isMobile && scores) {
    return (
      <>
        <Header />
        <div className={styles.containerMobile}>
          <h1 className={styles.titleMobile}>Highscores</h1>
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
            src="/quiz_app_FE/images/decorativeStar.png"
            alt="Star"
            className={styles.starImageMobile}
          />
          <div className={styles.leaderboardButtonsColumnMobile}>
            <Button variant="primary" as="link" to="/quiz_app_FE/">
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
        <Header />
        <div className={styles.container}>
          <h1 className={styles.title}>Highscores</h1>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  // Desktop
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.gradientOverlay}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className={styles.title}>Highscores</h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Name</th>
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
            <Button variant="primary" as="link" to="/quiz_app_FE/">
              Take quiz »
            </Button>
            <Button variant="secondary" onClick={() => window.history.back()}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
