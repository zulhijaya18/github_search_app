import { GitHubUserQuery } from "@/domains/github-user/github-user";
import { apiCall } from "@/utils/api-call";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams.entries());
    const { q, page, perPage } = queries;

    console.log(queries);

    if (!q) {
      return new Response("Missing q parameter", { status: 400 });
    }

    const response = await apiCall(`/search/users`, {
      method: "GET",
      params: {
        q,
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
      } as GitHubUserQuery,
    });

    const data = await response.data;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
