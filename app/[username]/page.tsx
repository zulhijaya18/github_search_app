"use client";

import { usePathname } from "next/navigation";
import React from "react";
import styles from "./../page.module.css";

export default function Repository() {
  const pathname = usePathname();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>{pathname}</div>
      </main>
    </div>
  );
}
