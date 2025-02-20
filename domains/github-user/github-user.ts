export interface GitHubUser {
    login: string;
    id: number;
    nodeId: string;
    url: string;
    htmlUrl: string;
    type: string;
    reposUrl: string;
    score: number;
    publicRepos: number;
    avatarUrl: string;
}

export interface GitHubUserQuery {
    q: string;
    page?: number;
    perPage?: number;
}