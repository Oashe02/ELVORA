"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";
import { logger } from "@/utils/logger";

export function usePaginatedAPI(endpoint, options = {}) {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		total: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { limit = 10, searchParam = "search" } = options;

	useEffect(() => {
		fetchData();
	}, [router.query[searchParam], router.query.page]);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const searchQuery = router.query[searchParam] || "";
			const page = Number.parseInt(router.query.page) || 1;

			const response = await axiosInstance.get(`${endpoint}`, {
				params: {
					[searchParam]: searchQuery,
					page,
					limit,
				},
				withCredentials: true, // Ensures cookies are sent with this request
			});

			if (!response.data) {
				throw new Error("Failed to fetch data");
			}

			const result = await response.data;
			setData(result.data);
			setPagination(result.pagination);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (value) => {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				[searchParam]: value,
				page: 1, // Reset to first page on new search
			},
		});
	};

	const handlePageChange = (page) => {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				page,
			},
		});
	};

	const mutate = () => {
		fetchData();
	};

	return {
		data,
		pagination,
		loading,
		error,
		handleSearch,
		handlePageChange,
		mutate,
	};
}
