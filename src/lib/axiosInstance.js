"use client";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`, // Adjust this based on your API structure
});

// Attach token automatically before each request
axiosInstance.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("@token");
			console.log({ "toekn in authstate": token });

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Handle response errors, especially 401 Unauthorized
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Handle 401 Unauthorized errors
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Remove invalid token
			localStorage.removeItem("@token");

			// Store the current path for redirect after login
			const currentPath = window.location.pathname;
			if (currentPath !== "/login") {
				localStorage.setItem("redirectAfterLogin", currentPath);
			}

			// Sign out and redirect to login page
			// await signOut({ redirect: false });
			window.location.href = `/login?callbackUrl=${encodeURIComponent(
				currentPath,
			)}`;

			return Promise.reject(error);
		}

		// Handle other auth-related errors (403, etc.)
		if (error.response?.status === 403) {
			// toast.error("You don't have permission to access this resource");
		}

		// Handle server errors
		if (error.response?.status >= 500) {
			// toast.error("Server error. Please try again later.");
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
