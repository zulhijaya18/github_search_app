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
    language: string;    
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
}