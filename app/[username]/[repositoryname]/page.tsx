"use client";

import { apiClient } from "@/utils/api-client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import { ReadMeEntity } from "@/domains/readme/readme-entity";
import MD from "@/components/md/md";

export default function RepositoryReadMe() {
  const username = usePathname().split("/")[1];
  const repositoryName = usePathname().split("/")[2];

  const { data } = useQuery({
    queryKey: ["read-me", repositoryName],
    queryFn: async () => {
      const response = await apiClient.get<ReadMeEntity>(`/api/read-me`, {
        params: {
          repositoryName,
          username,
        },
      });
      return response.data;
    },
  });

  const content = data?.content
    ? Buffer.from(data.content, "base64").toString()
    : "";

  return (
    <div className={styles.main}>
      <MD content={content} />
    </div>
  );
}
