/* eslint-disable @next/next/no-img-element */
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./md.module.css";
import { usePathname } from "next/navigation";
import remarkGfm from "remark-gfm";
import { transformImageUri } from "@/utils/image-github-transform";
import { useRepositoriesStore } from "@/stores/repositories-store";

interface MDProps {
  content: string;
}

export default function MD(props: MDProps) {
  const { content } = props;
  const pathname = usePathname();
  const [username, repositoryName] = pathname.split("/").filter(Boolean);
  const store = useRepositoriesStore();

  console.log(store.repository?.defaultBranch);

  return (
    <Markdown
      className={styles.md}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ src, alt, ...props }) => {
          if (!src) return null;
          return (
            <img
              src={transformImageUri({
                src,
                username,
                repo: repositoryName,
                branch: store.repository?.defaultBranch,
              })}
              alt={alt}
              {...props}
              loading="lazy"
            />
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
