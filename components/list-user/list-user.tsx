import React, { HTMLAttributes } from "react";
import { UserItem } from "../user-item/user-item";
import { forwardRef } from "react";
import styles from "./list-user.module.css";
import { cx } from "class-variance-authority";
import { useUsersStore } from "@/stores/users-store";

type ListUserProps = HTMLAttributes<HTMLDivElement>;

export const ListUser = forwardRef<HTMLDivElement, ListUserProps>(
  ({ ...props }, ref) => {
    const store = useUsersStore();
    const { items, isFetching } = store;
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.listUser, props.className)}
      >
        {items?.map((item) => (
          <UserItem key={item.id} item={item} />
        ))}
        {isFetching && <div>Loading...</div>}
        {items?.length === 0 && <div>No users found</div>}
      </div>
    );
  }
);

ListUser.displayName = "ListUser";
