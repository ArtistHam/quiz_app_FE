import React from "react";

import * as styles from "./LoadingScreen.module.css";

import Header from "../../../../components/Header/Header";

const LoadingScreen = () => {
  return (
    <>
      <Header />
      <div className={styles.loadingContainer}>Loading...</div>
    </>
  );
};

export default LoadingScreen;
