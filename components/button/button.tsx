import React, { forwardRef } from "react";
import styles from "./button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  type?: "button" | "submit" | "reset";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", ...props }, ref) => {
    return <button ref={ref} type={type} className={styles.button} {...props} />;
  }
);

Button.displayName = "Button";
