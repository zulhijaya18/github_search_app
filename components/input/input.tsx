import React, { forwardRef } from "react";
import styles from "./input.module.css";
import { cx } from "class-variance-authority";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cx(styles.input, props.className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
