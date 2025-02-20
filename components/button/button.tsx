import React, { forwardRef } from "react";
import styles from "./button.module.css";
import { cx } from "class-variance-authority";

export type ButtonProps = React.ComponentProps<"button"> & {
  type?: "button" | "submit" | "reset";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(styles.button, props.className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
