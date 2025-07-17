import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Edit, Plus, Search } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	OrderStatusBadge,
	PaymentStatusBadge,
} from "@/components/orders/OrderStatusBadge";
import { DeleteOrderButton } from "@/components/orders/DeleteOrderButton";
import axiosInstance from "@/lib/axiosInstance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenericExportButton from "@/components/helper/GenericExportButton";
import GenericImportButton from "@/components/helper/GenericImportButton";
import AdminLayout from "@/components/layouts/AdminLayout";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

// Server-side data fetch helper
async function fetchOrdersServer({
	page,
	limit,
	status,
	paymentStatus,
	search,
}) {
	const params = { page, limit };
	if (status && status !== "all") params.status = status;
	if (paymentStatus) params.paymentStatus = paymentStatus;
	if (search) params.search = search;
	const response = await axiosInstance.get("/orders", { params });
	return response.data;
}

export default function OrdersPage({
	orders,
	totalPages,
	page: currentPage,
	status: activeTabProp,
	paymentStatus: paymentStatusProp,
	search: searchProp,
}) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState(activeTabProp || "all");
	const [searchQuery, setSearchQuery] = useState(searchProp || "");
	const paymentStatus = paymentStatusProp || "";

	// Date and currency formatting
	const formatDate = (dateString) =>
		new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(dateString));

	const formatCurrency = (amount) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);

	// Table columns
	const columns = [
		{
			key: "orderId",
			label: "Order",
			render: (order) => (
				<div>
					<div className="font-medium">{order.orderId}</div>
					<div className="text-sm text-muted-foreground">
						{formatDate(order.createdAt)}
					</div>
				</div>
			),
		},
		{
			key: "customer",
			label: "Customer",
			render: (order) => (
				<div className="font-medium">
					{order.profile?.firstName} {order.profile?.lastName}
				</div>
			),
		},
		{
			key: "total",
			label: "Total",
			render: (order) => (
				<div className="font-medium">
					{" "}
					<ServerPriceDisplay amount={order.total} />{" "}
				</div>
			),
		},
		{
			key: "orderstatus",
			label: "Order Status",
			render: (order) => <OrderStatusBadge status={order.status} />,
		},
		{
			key: "paymentstatus",
			label: "Payment Status",
			render: (order) => <PaymentStatusBadge status={order.paymentStatus} />,
		},
		{
			key: "actions",
			label: "Actions",
			render: (order) => (
				<div className="flex items-center gap-2">
					<Link href={`/admin/orders/${order._id}`}>
						<Button variant="outline" size="sm">
							<Edit className="h-4 w-4 mr-1" />
							View
						</Button>
					</Link>
					<DeleteOrderButton orderId={order._id} orderNumber={order.orderId} />
				</div>
			),
		},
	];

	// Build URL query string
	const buildQuery = (page, status, paymentStatus, search) => {
		const params = new URLSearchParams();
		params.set("page", page);
		if (status && status !== "all") params.set("status", status);
		if (paymentStatus) params.set("paymentStatus", paymentStatus);
		if (search) params.set("search", search);
		return params.toString();
	};

	// Pagination, tab, and search handlers
	const handlePageChange = (page) =>
		router.push(
			`/admin/orders?${buildQuery(page, activeTab, paymentStatus, searchQuery)}`,
		);
	const handleTabChange = (value) => {
		setActiveTab(value);
		router.push(
			`/admin/orders?${buildQuery(1, value, paymentStatus, searchQuery)}`,
		);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		router.push(
			`/admin/orders?${buildQuery(1, activeTab, paymentStatus, searchQuery)}`,
		);
	};

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Orders</h1>
					<div className="flex items-center gap-2">
						<GenericExportButton
							endpoint="/generic-export"
							entityName="Orders"
							queryParams={{
								entity: "orders",
								status: activeTab !== "all" ? activeTab : "",
							}}
						/>
						<GenericImportButton
							endpoint="/generic-import"
							entityName="Orders"
							onImportComplete={() => router.replace(router.asPath)}
						/>
						<Link href="/admin/orders/new">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Order
							</Button>
						</Link>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<Tabs
						defaultValue={activeTab}
						onValueChange={handleTabChange}
						className="w-full"
					>
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="pending">Pending</TabsTrigger>
							<TabsTrigger value="processing">Processing</TabsTrigger>
							<TabsTrigger value="shipped">Shipped</TabsTrigger>
							<TabsTrigger value="delivered">Delivered</TabsTrigger>
							<TabsTrigger value="cancelled">Cancelled</TabsTrigger>
						</TabsList>
						<form
							onSubmit={handleSearch}
							className="flex mb-4 max-w-sm items-center space-x-2 ml-auto"
						>
							<Input
								type="search"
								placeholder="Search orders..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="max-w-xs"
							/>
							<Button type="submit" size="sm">
								<Search className="h-4 w-4 mr-1" />
								Search
							</Button>
						</form>
						<TabsContent value={activeTab} className="mt-0">
							<DataTable
								data={orders}
								columns={columns}
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query }) {
	const page = parseInt(query.page || "1", 10);
	const status = query.status || "all";
	const paymentStatus = query.paymentStatus || "";
	const search = query.search || "";

	// Fetch data with axiosInstance helper
	const { orders, totalPages } = await fetchOrdersServer({
		page,
		limit: 10,
		status,
		paymentStatus,
		search,
	});

	return { props: { orders, totalPages, page, status, paymentStatus, search } };
}
