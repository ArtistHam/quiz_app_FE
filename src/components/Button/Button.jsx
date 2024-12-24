import React from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";
import * as styles from "./Button.module.css";

const Button = ({
  variant = "primary",
  children,
  className,
  as,
  to,
  onClick,
  ...props
}) => {
  if (as === "link" && to) {
    return (
      <Link
        to={to}
        className={classNames(className, styles.button, styles[variant])}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
