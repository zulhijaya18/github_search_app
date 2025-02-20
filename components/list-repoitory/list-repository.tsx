import React, { HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./list-repository.module.css";
import { cx } from "class-variance-authority";
import { useRepositoriesStore } from "@/stores/repositories-store";
import { RepositoryItem } from "../repository-item/repository-item";

type ListRepositoryProps = HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean;
}

export const ListRepository = forwardRef<HTMLDivElement, ListRepositoryProps>(
  ({isLoading, ...props }, ref) => {
    const store = useRepositoriesStore();
    const items = store.items;
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.listRepository, props.className)}
      >
        {!isLoading && items?.map((item) => (
          <RepositoryItem key={item.id} item={item} />
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && items?.length === 0 && <div>No repositories found</div>}
      </div>
    );
  }
);

ListRepository.displayName = "ListRepository";
