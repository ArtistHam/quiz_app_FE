import React, { useState, useEffect } from "react";
import * as styles from "./StatisticPage.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { fetchStatistic } from "../../utils/api";

const StatisticPage = () => {
  const [statistic, setStatistic] = useState(null);
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
    const loadStatistic = async () => {
      try {
        const data = await fetchStatistic();
        setStatistic(data);
      } catch (error) {
        console.error("Failed to load statistics");
      }
    };
    loadStatistic();
  }, []);

  if (!statistic) {
    return (
      <>
        <Header alignment="center" />
        <div className={styles.container}>
          <h1 className={styles.title}>Statistic</h1>
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
        <h1 className={styles.title}>Statistic</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Category</th>
                <th className={styles.tableHeader}>Average Score</th>
                <th className={styles.tableHeader}>Average Time</th>
                <th className={styles.tableHeader}>Completion</th>
              </tr>
            </thead>
            <tbody>
              {/* All Time Statistics */}
              <tr>
                <td className={styles.tableCellNickName}>All Time</td>
                <td className={styles.tableCellTime}>
                  {statistic.allTimeAverageScore}
                </td>
                <td className={styles.tableCellTime}>
                  {statistic.allTimeAverageTime} mins
                </td>
                <td className={styles.tableCellTime}>
                  {statistic.allTimeCompletion}
                </td>
              </tr>
              {/* Last 7 Days Statistics */}
              <tr>
                <td className={styles.tableCellNickName}>Last 7 Days</td>
                <td className={styles.tableCellTime}>
                  {statistic.sevenDaysAverageScore}
                </td>
                <td className={styles.tableCellTime}>
                  {statistic.sevenDaysAverageTime} mins
                </td>
                <td className={styles.tableCellTime}>
                  {statistic.sevenDaysCompletion}
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className={styles.panelTitle}>Last 10 Attempts</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Attempt ID</th>
                <th className={styles.tableHeader}>Date</th>
                <th className={styles.tableHeader}>Score</th>
                <th className={styles.tableHeader}>Time</th>
              </tr>
            </thead>
            <tbody>
              {statistic.last10.map((item) => (
                <tr key={item.id}>
                  <td className={styles.tableCellTime}>{item.id}</td>
                  <td className={styles.tableCellTime}>
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>
                  <td className={styles.tableCellTime}>{item.score}/10</td>
                  <td className={styles.tableCellTime}>{item.time} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.buttonsRow}>
          <Button variant="secondary" as="link" to="/">
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
