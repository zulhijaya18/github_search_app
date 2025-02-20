import { apiCall } from "@/utils/api-call";
import { convertObjectToCamelCase } from "@/utils/converter";
import { NextRequest } from "next/server";

/**
 * Get user repositories
 * @example
 * GET /api/repositories?username=github
 */
export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    if (!username) {
      return new Response("Missing username", { status: 400 });
    }

    const response = await apiCall(`/users/${username}/repos`, {
      method: "GET",
    });

    const resdata = await response.data;
    const data = convertObjectToCamelCase(resdata);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
