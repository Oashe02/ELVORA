// pages/admin/products/index.js
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import { DeleteAddOnProductButton } from "@/components/addons-products/DeleteAddOnProductButton";
import { StatusSelector } from "@/components/addons-products/StatusSelector";
import GoogleMerchantButton from "@/components/addons-products/GoogleMerchantButton";
import GenericExportButton from "@/components/helper/GenericExportButton";
import GenericImportButton from "@/components/helper/GenericImportButton";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";


const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default function AddOnProductsPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pageParam = searchParams.get("page");
	const currentPage = pageParam ? Number(pageParam) : 1;
	const initialStatus = searchParams.get("status") || "all";

	const [activeTab, setActiveTab] = useState(initialStatus);

	// Build SWR key based on page & status
	const statusQuery = activeTab !== "all" ? `&status=${activeTab}` : "";
	const swrKey = `addons-product?page=${currentPage}${statusQuery}`; // ❌ no leading slash

	const { data, error, isValidating } = useSWR(swrKey, fetcher, {
		revalidateOnFocus: false,
	});

	const loading = !data && !error;
	const products = data?.products || [];
	const totalPages = data?.totalPages || 1;

	const handlePageChange = (page) => {
		router.push(`/admin/addons-product?page=${page}${statusQuery}`);
	};

	const handleTabChange = (value) => {
		setActiveTab(value);
		const statusParam = value !== "all" ? `&status=${value}` : "";
		router.push(`/admin/addons-product?page=1${statusParam}`);
	};

	const handleStatusChange = async (id, status) => {
		try {
			await axiosInstance.put(`/addons-product/${id}`, { status });
			// revalidate the list
			mutate(swrKey);
		} catch {
			// swallow or toast
		}
	};

	const columns = [
		{
			key: "name",
			label: "AddOn-Product",
			render: (product) => (
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-md bg-muted overflow-hidden relative">
						{product.thumbnail && (
							<img
								src={product.thumbnail}
								alt={product.name}
								className="h-full w-full object-cover"
							/>
						)}
					</div>
					<div>
						<div className="font-medium">{product.name}</div>
						<div className="text-sm text-muted-foreground">
							{product.category?.name}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "price",
			label: "Price",
			render: (product) => (
				<div>
					<div className="font-medium"><ServerPriceDisplay  amount={product.price.toFixed(2)}/></div>
					{product.mrp > product.price && (
						<div className="text-sm text-muted-foreground line-through">
							<ServerPriceDisplay amount={product.mrp.toFixed(2)} />
						</div>
					)}
				</div>
			),
		},
		{
			key: "stock",
			label: "Stock",
			render: (product) => (
				<div className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
					{product.stock}
				</div>
			),
		},
		{
			key: "status",
			label: "Status",
			render: (product) => (
				<StatusSelector
					itemId={product._id}
					currentStatus={product.status}
					onStatusChange={handleStatusChange}
					onStatusChangeComplete={() => mutate(swrKey)}
				/>
			),
		},
		{
			key: "actions",
			label: "Actions",
			render: (product) => (
				<div className="flex items-center gap-2">
					<Link href={`/admin/addons-products/${product._id}`}>
						<Button variant="outline" size="sm">
							<Edit className="h-4 w-4 mr-1" />
							Edit
						</Button>
					</Link>
					<DeleteAddOnProductButton
						addOnProductId={product._id}
						addOnProductName={product.name}
						onDelete={() => mutate(swrKey)}
					/>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Products</h1>
					<div className="flex items-center gap-2">
						<GoogleMerchantButton />
						<GenericExportButton
							endpoint="/generic-export"
							entityName="Products"
							queryParams={{
								entity: "products",
								status: activeTab !== "all" ? activeTab : "",
							}}
						/>
						<GenericImportButton
							endpoint="/generic-import"
							entityName="Products"
							onImportComplete={() => mutate(swrKey)}
						/>
						<Link href="/admin/addons-products/new">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add AddOn-Product
							</Button>
						</Link>
					</div>
				</div>

				<Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
						<TabsTrigger value="unpublished">Unpublished</TabsTrigger>
					</TabsList>

					{["all", "active", "draft", "unpublished"].map((tab) => (
						<TabsContent key={tab} value={tab} className="mt-4">
							{loading || isValidating ? (
								<div className="flex justify-center py-8">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
								</div>
							) : (
								<DataTable
									data={products}
									columns={columns}
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
								/>
							)}
						</TabsContent>
					))}
				</Tabs>
			</div>
		</AdminLayout>
	);
}
