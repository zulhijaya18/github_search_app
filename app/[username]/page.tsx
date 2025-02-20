"use client";

import React, { useMemo } from "react";
import styles from "./page.module.css";
import { apiClient } from "@/utils/api-client";
import { GitHubRepository } from "@/domains/github-repository/github-repository";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ListRepository } from "@/components/list-repoitory/list-repository";
import { useRepositoriesStore } from "@/stores/repositories-store";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BookMarked } from "lucide-react";
import { BackButton } from "@/components/back-button/back-button";
import { GitHubLink } from "@/components/github-link/github-link";
import { PER_PAGE_SIZE } from "@/constants/per-page";
import { useCallback, useRef } from "react";
import { GitHubUser } from "@/domains/github-user/github-user";

export default function Repository() {
  const username = usePathname().split("/")[1];
  const store = useRepositoriesStore();
  const observer = useRef<IntersectionObserver>(null);

  useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await apiClient.get<GitHubUser>(
        `/api/users/${username}`
      );
      store.setUser(response.data);
      return response.data;
    },
  });

  const {
    data = undefined,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["repos", username],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<GitHubRepository[]>(
        `/api/repositories`,
        {
          params: {
            username,
            page: pageParam,
            perPage: PER_PAGE_SIZE,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const nextPage = allPages.length + 1;
      const totalCount = store.user?.publicRepos || 0;
      const totalPages = Math.ceil(totalCount / PER_PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const repos = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      if (!page) return acc;
      return [...(acc || []), ...(page || [])];
    }, [] as GitHubRepository[]);
  }, [data]);

  const { htmlUrl, avatarUrl, publicRepos } = store.user || {};

  return (
    <div className={styles.main}>
      <div>
        <BackButton />
      </div>
      <div className={styles.reposOwner}>
        {avatarUrl && (
          <Image
            src={avatarUrl}
            width={65}
            height={65}
            alt={"Avatar"}
            className={styles.avatar}
          />
        )}
        <div className={styles.userInfo}>
          <h2>{username}</h2>
          <GitHubLink href={htmlUrl} />
        </div>
      </div>
      <div className={styles.textIcon}>
        <BookMarked size={18} />
        Repositories
      </div>
      {publicRepos && publicRepos > 0 && (
        <div className={styles.itemsFound}>
          {publicRepos} repositories found
        </div>
      )}
      <ListRepository
        items={repos}
        isFetching={isFetching}
        observer={lastElementRef}
      />
    </div>
  );
}
