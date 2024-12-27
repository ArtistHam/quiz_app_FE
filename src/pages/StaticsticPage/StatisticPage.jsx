import React, { useState, useEffect } from "react";
import * as styles from "./StatisticPage.module.css";

import { fetchStatistic } from "../../utils/api";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const StatisticPage = () => {
  const [statistic, setStatistic] = useState(null);
  const isMobile = useIsMobile();

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

  const convertSecondsToMinutes = (seconds) => {
    return (seconds / 60).toFixed(2);
  };

  const roundAverageScore = (score) => {
    return score.toFixed(3);
  };

  const renderDesktop = () => (
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
                <td className={styles.tableCell}>
                  {roundAverageScore(statistic.allTimeAverageScore)}
                </td>
                <td className={styles.tableCell}>
                  {convertSecondsToMinutes(statistic.allTimeAverageTime)} mins
                </td>
                <td className={styles.tableCell}>
                  {statistic.allTimeCompletion}
                </td>
              </tr>
              {/* Last 7 Days Statistics */}
              <tr>
                <td className={styles.tableCellNickName}>Last 7 Days</td>
                <td className={styles.tableCell}>
                  {roundAverageScore(statistic.sevenDaysAverageScore)}
                </td>
                <td className={styles.tableCell}>
                  {convertSecondsToMinutes(statistic.sevenDaysAverageTime)} mins
                </td>
                <td className={styles.tableCell}>
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
                  <td className={styles.tableCell}>{item.id}</td>
                  <td className={styles.tableCell}>
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>
                  <td className={styles.tableCell}>{item.score}/10</td>
                  <td className={styles.tableCell}>
                    {convertSecondsToMinutes(item.time)} mins
                  </td>
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

  const renderMobile = () => {
    if (!statistic) {
      return (
        <>
          <Header alignment="center" />
          <div className={styles.containerMobile}>
            <h1 className={styles.titleMobile}>Statistic</h1>
            <p className={styles.loadingTextMobile}>Loading...</p>
          </div>
        </>
      );
    }

    return (
      <>
        <Header alignment="center" />
        <div className={styles.containerMobile}>
          <h1 className={styles.titleMobile}>Statistic</h1>

          <div className={styles.tableContainerMobile}>
            <table className={styles.tableMobile}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderMobile}>Category</th>
                  <th className={styles.tableHeaderMobile}>Avg Score</th>
                  <th className={styles.tableHeaderMobile}>Avg Time</th>
                  <th className={styles.tableHeaderMobile}>Completion</th>
                </tr>
              </thead>
              <tbody>
                {/* All Time Statistics */}
                <tr>
                  <td className={styles.tableCellNickNameMobile}>All Time</td>
                  <td className={styles.tableCellMobile}>
                    {roundAverageScore(statistic.allTimeAverageScore)}
                  </td>
                  <td className={styles.tableCellMobile}>
                    {convertSecondsToMinutes(statistic.allTimeAverageTime)} mins
                  </td>
                  <td className={styles.tableCellMobile}>
                    {statistic.allTimeCompletion}
                  </td>
                </tr>
                {/* Last 7 Days Statistics */}
                <tr>
                  <td className={styles.tableCellNickNameMobile}>
                    Last 7 Days
                  </td>
                  <td className={styles.tableCellMobile}>
                    {roundAverageScore(statistic.sevenDaysAverageScore)}
                  </td>
                  <td className={styles.tableCellMobile}>
                    {convertSecondsToMinutes(statistic.sevenDaysAverageTime)}{" "}
                    mins
                  </td>
                  <td className={styles.tableCellMobile}>
                    {statistic.sevenDaysCompletion}
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 className={styles.tableTitleMobile}>Last 10 Attempts</h2>
            <table className={styles.tableMobile}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderMobile}>Attempt ID</th>
                  <th className={styles.tableHeaderMobile}>Date</th>
                  <th className={styles.tableHeaderMobile}>Score</th>
                  <th className={styles.tableHeaderMobile}>Time</th>
                </tr>
              </thead>
              <tbody>
                {statistic.last10.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.tableCellMobile}>{item.id}</td>
                    <td className={styles.tableCellMobile}>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className={styles.tableCellMobile}>{item.score}/10</td>
                    <td className={styles.tableCellMobile}>
                      {convertSecondsToMinutes(item.time)} mins
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Button variant="secondary" as="link" to="/">
              Back
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (isMobile) {
    return renderMobile();
  }

  return statistic ? (
    renderDesktop()
  ) : (
    <>
      <Header alignment="center" />
      <div className={styles.container}>
        <h1 className={styles.title}>Statistic</h1>
        <p>Loading...</p>
      </div>
    </>
  );
};

export default StatisticPage;
