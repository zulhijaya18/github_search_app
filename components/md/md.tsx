/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState, ReactNode } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./md.module.css";
import { usePathname } from "next/navigation";
import remarkGfm from "remark-gfm";
import { transformImageUri } from "@/utils/image-github-transform";
import { useRepositoriesStore } from "@/stores/repositories-store";
import { CodeBlock } from "../codeblock/codeblock";

interface MDProps {
  content: string;
}

export default function MD(props: MDProps) {
  const { content } = props;
  const pathname = usePathname();
  const [username, repositoryName] = pathname.split("/").filter(Boolean);
  const store = useRepositoriesStore();

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
        pre({ children, ...props }) {
          return (
            <pre {...props} className={styles.pre}>
              <code>{children}</code>
            </pre>
          );
        },
        code({ inline, className, children }) {
          if (inline || !className) {
            return children;
          }
          const match = /language-(\w+)/.exec(className);
          const code = String(children).replace(/\n$/, "");

          return <CodeBlock code={code} language={match?.[1]} />;
        },
      }}
    >
      {content}
    </Markdown>
  );
}
