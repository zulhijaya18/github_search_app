import { Link } from "lucide-react";
import { forwardRef } from "react";
import styles from "./github-link.module.css";
import { cx } from "class-variance-authority";

interface GitHubLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
}

export const GitHubLink = forwardRef<HTMLDivElement, GitHubLinkProps>(
  ({ href, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cx(styles.githubLink, props.className)}
      >
        <Link size={12} />
        <a href={href} target="_blank" className={styles.url}>
          {href}
        </a>
      </div>
    );
  }
);

GitHubLink.displayName = "GitHubLink";
