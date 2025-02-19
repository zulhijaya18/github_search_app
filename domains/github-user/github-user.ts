export interface GitHubUser {
    login: string;
    id: number;
    nodeId: string;
    url: string;
    htmlUrl: string;
    type: string;
    reposUrl: string;
}

export interface GitHubUserQuery {
    q: string;
    page?: number;
    perPage?: number;
}