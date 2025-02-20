import { GitHubUserQuery } from "@/domains/github-user/github-user";
import { apiCall } from "@/utils/api-call";
import {
  convertObjectToCamelCase,
  convertObjectToSnakeCase,
} from "@/utils/converter";
import { NextRequest } from "next/server";

/**
 * Get user repositories
 * @example
 * GET /api/users?q=github
 * GET /api/users?q=github&page=1
 * GET /api/users?q=github&perPage=10
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams.entries());
    const { q, page, perPage } = queries;

    if (!q) {
      return new Response("Missing q parameter", { status: 400 });
    }

    const params = {
      q,
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    } as GitHubUserQuery;

    const response = await apiCall(`/search/users`, {
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
