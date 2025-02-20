import React, { HTMLAttributes } from "react";
import { UserItem } from "../user-item/user-item";
import { forwardRef } from "react";
import styles from "./list-user.module.css";
import { cx } from "class-variance-authority";
import { GitHubUser } from "@/domains/github-user/github-user";

type ListUserProps = HTMLAttributes<HTMLDivElement> & {
  items?: GitHubUser[];
  isFetching?: boolean;
  observer?: (node: HTMLDivElement) => void;
};

export const ListUser = forwardRef<HTMLDivElement, ListUserProps>(
  ({ observer, items, isFetching, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.listUser, props.className)}
      >
        {items?.map((item) => (
          <UserItem key={item.id} item={item} ref={observer} />
        ))}
        {isFetching && <div>Loading...</div>}
        {items && items?.length === 0 && <div>No users found</div>}
      </div>
    );
  }
);

ListUser.displayName = "ListUser";
