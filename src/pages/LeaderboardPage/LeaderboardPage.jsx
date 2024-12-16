import React, { useState, useEffect } from "react";
import * as styles from "./LeaderboardPage.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { fetchHighscores } from "../../utils/api";

const LeaderboardPage = () => {
  const [scores, setScores] = useState(null);

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

  return (
    <>
      <Header />
      <div className={styles.container}>
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
                  <td className={styles.tableCellNickName}>{item.nickname}</td>
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
          <Button variant="primary" as="link" to="/">
            Take quiz »
          </Button>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
