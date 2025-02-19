"use client";

import { Button } from "@/components/button/button";
import styles from "./page.module.css";
import { Searchbar } from "@/components/searchbar/searchbar";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "@/utils/api-client";

export default function Home() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.get(`/api/users`, {
        params: {
          q: search,
        },
      });
      const data = await response.data;
      console.log(data);
    },
  });

  const handleSearch = () => {
    mutate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [search, setSearch] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>GitHub Search</h1>
          <p>Search for GitHub users and repositories</p>
        </div>
        <div className={styles.searchContainer}>
          <Searchbar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
