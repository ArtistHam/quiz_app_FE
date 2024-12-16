import React from "react";
import classNames from "classnames";
import * as styles from "./Button.module.css";

const Button = ({ variant = "primary", children, className, ...props }) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
