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
  defaultBranch: string;
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

export interface GitHubRepositoryQuery {
  username: string;
  page?: number;
  perPage?: number;
}
