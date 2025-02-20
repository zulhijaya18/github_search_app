"use client";

import { Button } from "@/components/button/button";
import styles from "./page.module.css";
import { Searchbar } from "@/components/searchbar/searchbar";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "@/utils/api-client";
import { ListUser } from "@/components/list-user/list-user";
import { UsersResponse } from "@/types/users-response";
import { useUsersStore } from "@/stores/users-store";

export default function Home() {
  const store = useUsersStore();
  const [search, setSearch] = useState("");
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await apiClient.get<UsersResponse>(`/api/users`, {
        params: {
          q: search,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      store.setItems(data.items);
      store.setTotalCount(data.totalCount);
    },
    onMutate: () => {
      store.reset();
      store.setIsFetching(true);
    },
    onError: (error) => {
      console.error(error);
      store.setIsFetching(false);
    },
    onSettled: () => {
      store.setIsFetching(false);
    },
  });

  const handleSearch = () => {
    if (!search) return;
    mutate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <h1>GitHub Search</h1>
        <p>Find GitHub users based on a keyword</p>
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
      {store.items && store.items.length > 0 && (
        <div className={styles.itemsFound}>{store.totalCount} users found</div>
      )}
      <ListUser />
    </div>
  );
}
