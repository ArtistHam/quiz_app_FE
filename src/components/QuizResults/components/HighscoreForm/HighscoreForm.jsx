import React from "react";

import Button from "../../../Button/Button";

import * as styles from "./HighscoreForm.module.css";

export default function HighscoreForm({
  userName,
  setUserName,
  onSubmitHighscore,
  submitting,
  mobile,
}) {
  return (
    <div
      className={
        mobile ? styles.submitBlockMobile : styles.submitHighscoreBlock
      }
    >
      <input
        type="text"
        placeholder="Please enter your name here"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className={mobile ? styles.nameInputMobile : styles.nameInput}
      />

      {mobile && (
        <svg
          width="16"
          height="37"
          viewBox="0 0 16 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29289 36.7071C7.68342 37.0976 8.31658 37.0976 8.70711 36.7071L15.0711 30.3431C15.4616 29.9526 15.4616 29.3195 15.0711 28.9289C14.6805 28.5384 14.0474 28.5384 13.6569 28.9289L8 34.5858L2.34315 28.9289C1.95262 28.5384 1.31946 28.5384 0.928932 28.9289C0.538408 29.3195 0.538408 29.9526 0.928932 30.3431L7.29289 36.7071ZM7 0L7 36H9L9 0L7 0Z"
            fill="white"
          />
        </svg>
      )}

      <Button
        variant={mobile ? "submit-mobile" : "submit-desktop"}
        onClick={onSubmitHighscore}
        disabled={submitting}
        className={mobile ? styles.submitButtonMobile : ""}
      >
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
