"use client";

import { apiClient } from "@/utils/api-client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import { ReadMeEntity } from "@/domains/readme/readme-entity";
import MD from "@/components/md/md";
import { BackButton } from "@/components/back-button/back-button";
import { GitHubLink } from "@/components/github-link/github-link";
import { useRepositoriesStore } from "@/stores/repositories-store";
import Image from "next/image";
import { RepositoryItem } from "@/components/repository-item/repository-item";

export default function RepositoryReadMe() {
  const username = usePathname().split("/")[1];
  const repositoryName = usePathname().split("/")[2];
  const store = useRepositoriesStore();

  const { data, isLoading } = useQuery({
    queryKey: ["read-me", repositoryName],
    queryFn: async () => {
      const response = await apiClient.get<ReadMeEntity>(`/api/read-me`, {
        params: {
          repositoryName,
          username,
        },
      });
      return response.data;
    },
  });

  const content = data?.content
    ? Buffer.from(data.content, "base64").toString()
    : "";

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
      <RepositoryItem item={store.repository!} showButton={false} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && !content && <div>Readme not found</div>}
      {!isLoading && (
        <div className={styles.md}>
          <MD content={content} />
        </div>
      )}
    </div>
  );
}
