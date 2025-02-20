import { apiCall } from "@/utils/api-call";
import { convertObjectToCamelCase } from "@/utils/converter";
import { NextRequest } from "next/server";

/**
 * Get user repositories
 * @example
 * GET /api/users/github
 */
export async function GET(request: NextRequest) {
  try {
    const username = request.url.split("/").pop();

    if (!username) {
      return new Response("Missing username parameter", { status: 400 });
    }

    const response = await apiCall(`/users/${username}`, {
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
