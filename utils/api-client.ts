import axios from "axios";

// Create an Axios instance with default configuration
const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for global request configuration
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global response handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export { apiClient };
