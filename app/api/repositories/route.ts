import { GitHubRepositoryQuery } from "@/domains/github-repository/github-repository";
import { apiCall } from "@/utils/api-call";
import {
  convertObjectToCamelCase,
  convertObjectToSnakeCase,
} from "@/utils/converter";
import { NextRequest } from "next/server";

/**
 * Get user repositories
 * @example
 * GET /api/repositories?username=github
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams.entries());
    const { username, page, perPage } = queries;

    if (!username) {
      return new Response("Missing username", { status: 400 });
    }

    const params = {
      username,
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    } as GitHubRepositoryQuery;

    const response = await apiCall(`/users/${username}/repos`, {
      method: "GET",
      params: convertObjectToSnakeCase(params),
    });

    const resdata = await response.data;
    const data = convertObjectToCamelCase(resdata);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
