"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Edit, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DeleteReviewButton } from "@/components/reviews/delete-review-button";
import { ReviewStatusSelector } from "@/components/reviews/review-status-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import axiosInstance from "@/lib/axiosInstance";
import axiosServer from "@/lib/axiosServer";

export default function ReviewsPage({
	reviews,
	totalPages,
	currentPage,
	activeTab,
	productId,
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const refreshData = () => router.replace(router.asPath);

	const handlePageChange = (page) => {
		const status = activeTab !== "all" ? `&status=${activeTab}` : "";
		const productParam = productId ? `&productId=${productId}` : "";
		router.push(`/admin/reviews?page=${page}${status}${productParam}`);
	};

	const handleTabChange = (value) => {
		const status = value !== "all" ? `&status=${value}` : "";
		const productParam = productId ? `&productId=${productId}` : "";
		router.push(`/admin/reviews?page=1${status}${productParam}`);
	};

	const handleStatusChange = () => refreshData();

	const renderStars = (rating) => {
		return (
			<div className="flex items-center">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
					/>
				))}
				<span className="ml-2 text-sm">{rating}/5</span>
			</div>
		);
	};

	const columns = [
		{
			key: "product",
			label: "Product",
			render: (review) => (
				<div className="max-w-[200px] truncate font-medium">
					{review.productName || review.productId}
				</div>
			),
		},
		{
			key: "rating",
			label: "Rating",
			render: (review) => renderStars(review.rating),
		},
		{
			key: "title",
			label: "Title",
			render: (review) => (
				<div className="max-w-[200px] truncate">{review.title}</div>
			),
		},
		{
			key: "user",
			label: "User",
			render: (review) => (
				<div className="max-w-[150px] truncate">
					{review.userName || "Anonymous"}
					{review.verified && (
						<span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
							Verified
						</span>
					)}
				</div>
			),
		},
		{
			key: "helpful",
			label: "Helpful",
			render: (review) => <div>{review.helpfulCount || 0}</div>,
		},
		{
			key: "status",
			label: "Status",
			render: (review) => (
				<ReviewStatusSelector
					reviewId={review._id}
					currentStatus={review.status}
					onStatusChange={handleStatusChange}
				/>
			),
		},
		{
			key: "actions",
			label: "Actions",
			render: (review) => (
				<div className="flex items-center gap-2">
					<Link href={`/admin/reviews/${review._id}`}>
						<Button variant="outline" size="sm">
							<Edit className="h-4 w-4 mr-1" />
							Edit
						</Button>
					</Link>
					<DeleteReviewButton
						reviewId={review._id}
						reviewTitle={review.title.substring(0, 20)}
						onDelete={refreshData}
					/>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<Head>
				<title>Reviews</title>
			</Head>

			<div className="space-y-6 p-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
					<Link href="/admin/reviews/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Review
						</Button>
					</Link>
				</div>

				<Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="approved">Approved</TabsTrigger>
						<TabsTrigger value="pending">Pending</TabsTrigger>
						<TabsTrigger value="rejected">Rejected</TabsTrigger>
					</TabsList>

					<TabsContent value={activeTab} className="mt-4">
						{loading ? (
							<div className="flex justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
							</div>
						) : (
							<DataTable
								data={reviews}
								columns={columns}
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query, req }) {
	console.log({ cooke: req.headers.cookie });

	const page = Number.parseInt(query.page || "1", 10);
	const statusParam = query.status || "all";
	const productId = query.productId || null;
	const params = { page };

	if (statusParam !== "all") params.status = statusParam;
	if (productId) params.productId = productId;

	try {
		const { data } = await axiosServer.get("/review", {
			params,
			headers: { cookie: req?.headers?.cookie || "" },
		});

		return {
			props: {
				reviews: data.reviews || [],
				totalPages: data.totalPages || 1,
				currentPage: data.currentPage || page,
				activeTab: statusParam,
				productId,
			},
		};
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return {
			props: {
				reviews: [],
				totalPages: 1,
				currentPage: page,
				activeTab: statusParam,
				productId,
			},
		};
	}
}
