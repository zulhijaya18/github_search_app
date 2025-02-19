import { GITHUB_BASE_URL } from "@/constants/base-url";
import axios from "axios";

// Create an Axios instance with default configuration
const apiCall = axios.create({
  baseURL: GITHUB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// Add a request interceptor for global request configuration
apiCall.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global response handling
apiCall.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export { apiCall };
