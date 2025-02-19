import { GitHubUser } from "@/domains/github-user/github-user";

export interface UsersResponse {
    items: GitHubUser[];
    totalCount: number;
}