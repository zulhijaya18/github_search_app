import React, { HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./list-repository.module.css";
import { cx } from "class-variance-authority";
import { RepositoryItem } from "../repository-item/repository-item";
import { GitHubRepository } from "@/domains/github-repository/github-repository";

type ListRepositoryProps = HTMLAttributes<HTMLDivElement> & {
  items?: GitHubRepository[];
  isFetching?: boolean;
  observer?: (node: HTMLDivElement) => void;
};

export const ListRepository = forwardRef<HTMLDivElement, ListRepositoryProps>(
  ({ items, observer, isFetching, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.listRepository, props.className)}
      >
        {items?.map((item) => (
          <RepositoryItem key={item.id} item={item} ref={observer} />
        ))}
        {isFetching && <div>Loading...</div>}
        {!isFetching && items?.length === 0 && <div>No repositories found</div>}
      </div>
    );
  }
);

ListRepository.displayName = "ListRepository";
