import { GitHubUser } from "@/domains/github-user/github-user";
import React, { HTMLAttributes } from "react";
import { UserItem } from "../user-item/user-item";
import { forwardRef } from "react";
import styles from "./list-user.module.css";
import { cx } from "class-variance-authority";

interface ListUserProps extends HTMLAttributes<HTMLDivElement> {
  items?: GitHubUser[];
}

export const ListUser = forwardRef<HTMLDivElement, ListUserProps>(
  ({ items, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.listUser, props.className)}
      >
        {items?.map((item) => (
          <UserItem key={item.id} item={item} />
        ))}
        {items?.length === 0 && <div>No users found</div>}
      </div>
    );
  }
);

ListUser.displayName = "ListUser";
