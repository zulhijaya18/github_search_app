export interface GitHubRepository {
  name: string;
  fullName: string;
  id: number;
  nodeId: string;
  private: boolean;
  url: string;
  htmlUrl: string;
  description: string;
  fork: boolean;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  language?: string;
  license?: License;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export interface License {
  key: string;
  name: string;
  nodeId: string;
  spdxId: string;
  url: string;
}
