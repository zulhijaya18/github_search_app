import React, { forwardRef } from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    return <input type={type} ref={ref} className={styles.input} {...props} />;
  }
);

Input.displayName = "Input";
