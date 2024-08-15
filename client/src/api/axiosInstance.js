// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and if a refresh token exists
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refreshToken", refreshToken);

      if (refreshToken) {
        try {
          const { data } = await axios.post("/api/refresh-token", {
            refreshToken,
          });

          // Store new tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Update the original request with the new access token
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          alert("Token refresh failed, logging out...", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        alert("No refresh token available, logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
