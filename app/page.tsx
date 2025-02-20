"use client";

import { Button } from "@/components/button/button";
import styles from "./page.module.css";
import { Searchbar } from "@/components/searchbar/searchbar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import { apiClient } from "@/utils/api-client";
import { ListUser } from "@/components/list-user/list-user";
import { UsersResponse } from "@/types/users-response";
import { useUsersStore } from "@/stores/users-store";
import { GitHubUser } from "@/domains/github-user/github-user";
import { PER_PAGE_SIZE } from "@/constants/per-page";

export default function Home() {
  const store = useUsersStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const observer = useRef<IntersectionObserver>(null);

  const { page, search, setSearch, totalCount } = store;

  const handleSearch = () => {
    const value = searchRef.current?.value;
    if (!value || value ===  "") return
    setSearch(value);
  };

  const {
    data = undefined,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    initialPageParam: page,
    enabled: Boolean(search),
    queryKey: ["users", search],
    queryFn: async ({ pageParam }) => {
      if (!search) return;
      const response = await apiClient.get<UsersResponse>(`/api/users`, {
        params: {
          q: search,
          page: pageParam,
          perPage: PER_PAGE_SIZE,
        },
      });
      store.setTotalCount(response.data.totalCount);
      const data = response.data;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.totalCount / PER_PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const users = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      if (!page) return acc;
      return [...(acc || []), ...(page.items || [])];
    }, [] as GitHubUser[]);
  }, [data]);

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
        <Searchbar ref={searchRef} onKeyDown={handleKeyDown} />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {totalCount > 0 && (
        <div className={styles.itemsFound}>{totalCount} users found</div>
      )}
      <ListUser
        items={users}
        isFetching={isFetching}
        observer={lastElementRef}
      />
    </div>
  );
}
