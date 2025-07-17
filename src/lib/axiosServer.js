// lib/axiosServer.js
const axios = require("axios");

const axiosServer = axios.create({
	// On the server, use the “non‐NEXT_PUBLIC” env var if you need to hide your real URL.
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
	// You can set a default timeout, etc., here if you like
	timeout: 10000,
});

// (Optional) Interceptor to log request URLs for debugging
axiosServer.interceptors.request.use(
	(config) => {
		// e.g. console.log("→ [axiosServer]", config.method.toUpperCase(), config.url);
		return config;
	},
	(error) => Promise.reject(error),
);

// (Optional) Interceptor to handle 5xx errors in one place
axiosServer.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status >= 500) {
			// you could log or transform the error here
			// e.g. console.error("[Server Axios] 5xx error:", error.response.status);
		}
		return Promise.reject(error);
	},
);

module.exports = axiosServer;
