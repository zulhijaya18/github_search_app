"use client";

import React from "react";
import styles from "./page.module.css";
import { apiClient } from "@/utils/api-client";
import { GitHubRepository } from "@/domains/github-repository/github-repository";
import { useQuery } from "@tanstack/react-query";
import { ListRepository } from "@/components/list-repoitory/list-repository";
import { useRepositoriesStore } from "@/stores/repositories-store";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BookMarked } from "lucide-react";
import { BackButton } from "@/components/back-button/back-button";
import { GitHubLink } from "@/components/github-link/github-link";

export default function Repository() {
  const username = usePathname().split("/")[1];
  const store = useRepositoriesStore();
  const { isLoading } = useQuery({
    queryKey: ["repos", username],
    queryFn: async () => {
      const response = await apiClient.get<GitHubRepository[]>(
        `/api/repositories?username=${username}`
      );
      store.setItems(response.data);
      return response.data;
    },
  });

  return (
    <div className={styles.main}>
      <div>
        <BackButton />
      </div>
      <div className={styles.reposOwner}>
        {store.user && (
          <Image
            src={store.user?.avatarUrl}
            width={65}
            height={65}
            alt={"Avatar"}
            className={styles.avatar}
          />
        )}
        <div className={styles.userInfo}>
          <h2>{username}</h2>
          <GitHubLink href={store.user?.htmlUrl} />
        </div>
      </div>
      <div className={styles.textIcon}>
        <BookMarked size={18} />
        Repositories
      </div>
      <ListRepository isLoading={isLoading} />
    </div>
  );
}
