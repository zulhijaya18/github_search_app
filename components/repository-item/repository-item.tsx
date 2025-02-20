import { GitHubRepository } from "@/domains/github-repository/github-repository";
import { forwardRef, HtmlHTMLAttributes } from "react";
import styles from "./repository-item.module.css";
import { cx } from "class-variance-authority";
import { BookA, GitFork, Scale, Star } from "lucide-react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { useRepositoriesStore } from "@/stores/repositories-store";

interface RepositoryItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  item: GitHubRepository;
}

export const RepositoryItem = forwardRef<HTMLDivElement, RepositoryItemProps>(
  ({ item, ...props }, ref) => {
    const router = useRouter();
    const store = useRepositoriesStore();
    const handleReadMeButton = () => {
      store.setRepository(item);
      router.push(`/${item.fullName}`);
    };
    return (
      <div
        ref={ref}
        className={cx(styles.repositoryItemContainer, props.className)}
        {...props}
      >
        <div className={styles.repositoryItem}>
          <h3 className={styles.name}>
            <a href={item.htmlUrl} target="_blank">
              {item.name}
            </a>
          </h3>
          <div className={styles.description}>{item.description}</div>
          <div className={styles.repositoryHighLight}>
            {item.language && (
              <div className={styles.language}>
                <BookA size={12} />
                {item.language}
              </div>
            )}
            <div className={styles.stargazersCount}>
              <Star size={12} />
              {item.stargazersCount}
            </div>
            <div className={styles.forksCount}>
              <GitFork size={12} />
              {item.forksCount}
            </div>
            {item.license && (
              <div className={styles.license}>
                <Scale size={12} />
                {item.license.name}
              </div>
            )}
          </div>
        </div>
        <div className={styles.readMeButton}>
          <Button type="button" onClick={handleReadMeButton}>
            Read me
          </Button>
        </div>
      </div>
    );
  }
);

RepositoryItem.displayName = "RepositoryItem";
