import { GitHubUser } from "@/domains/github-user/github-user";
import { forwardRef, HTMLAttributes } from "react";
import styles from "./user-item.module.css";
import Image from "next/image";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { cx } from "class-variance-authority";
import { Link } from "lucide-react";

interface UserItemProps extends HTMLAttributes<HTMLDivElement> {
  item: GitHubUser;
}

export const UserItem = forwardRef<HTMLDivElement, UserItemProps>(
  ({ item, ...props }, ref) => {
    const router = useRouter();

    const handleRepository = () => {
      router.push(`/${item.login}`);
    };
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.userItem, props.className)}
      >
        <Image
          src={item.avatarUrl}
          width={45}
          height={45}
          alt={"Avatar"}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <div className={styles.login}>{item.login}</div>
          <div>
            <Link size={12} />
            &nbsp;
            <a href={item.htmlUrl} target="_blank" className={styles.url}>
              {item.htmlUrl}
            </a>
          </div>
        </div>
        <div className={styles.repositoryButtonContainer}>
          <Button type="button" onClick={handleRepository}>
            Repository
          </Button>
        </div>
      </div>
    );
  }
);

UserItem.displayName = "UserItem";
