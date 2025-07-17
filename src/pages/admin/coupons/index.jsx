// pages/admin/coupons/index.js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DeleteCouponButton from "@/components/coupon/DeleteCouponButton";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/ui/data-table";
import GenericExportButton from "@/components/helper/GenericExportButton";
import GenericImportButton from "@/components/helper/GenericImportButton";
import { CouponStatusSelector } from "@/components/coupon/CouponStatusSelector";
import AdminLayout from "@/components/layouts/AdminLayout";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";


export default function CouponsPage({
	coupons,
	totalPages,
	currentPage,
	activeTab,
	searchQuery,
}) {
	const router = useRouter();

	const handleTabChange = (value) => {
		const status = value !== "all" ? `&status=${value}` : "";
		const search = searchQuery
			? `&search=${encodeURIComponent(searchQuery)}`
			: "";
		router.push(`/admin/coupons?page=1${status}${search}`);
	};

	const handlePageChange = (page) => {
		const status = activeTab !== "all" ? `&status=${activeTab}` : "";
		const search = searchQuery
			? `&search=${encodeURIComponent(searchQuery)}`
			: "";
		router.push(`/admin/coupons?page=${page}${status}${search}`);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const status = activeTab !== "all" ? `&status=${activeTab}` : "";
		const search = searchQuery
			? `&search=${encodeURIComponent(searchQuery)}`
			: "";
		router.push(`/admin/coupons?page=1${status}${search}`);
	};

	const formatDate = (iso) =>
		new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(new Date(iso));

	const columns = [
		{
			key: "code",
			label: "Code",
			render: (c) => (
				<div className="font-mono font-bold text-primary">{c.code}</div>
			),
		},
		{
			key: "discount",
			label: "Discount",
			render: (c) => (
				<div>
					{c.type === "percentage" ? `${c.value}%` : `$${c.value.toFixed(2)}`}
					{c.maxDiscountAmount > 0 && (
						<div className="text-xs text-muted-foreground">
							Max: <ServerPriceDisplay amount={c.maxDiscountAmount.toFixed(2)}/>
						</div>
					)}
				</div>
			),
		},
		{
			key: "usage",
			label: "Usage",
			render: (c) => <div>{c.usedBy.length} used</div>,
		},
		{
			key: "expiry",
			label: "Expiry",
			render: (c) => <div>{formatDate(c.expiryDate)}</div>,
		},
		{
			key: "status",
			label: "Status",
			render: (c) => (
				<CouponStatusSelector
					couponId={c._id}
					currentStatus={c.status}
					onStatusChange={() => router.replace(router.asPath)}
				/>
			),
		},
		{
			key: "actions",
			label: "Actions",
			render: (c) => (
				<div className="flex items-center gap-2">
					<Link href={`/admin/coupons/${c._id}`}>
						<Button variant="outline" size="sm">
							<Edit className="h-4 w-4 mr-1" />
							Edit
						</Button>
					</Link>
					<DeleteCouponButton couponId={c._id} couponCode={c.code} />
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<Head>
				<title>Coupons</title>
			</Head>
			<div className="space-y-6 p-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
					<div className="flex items-center gap-2">
						<GenericExportButton
							endpoint="/helper/export"
							entityName="Coupons"
							queryParams={{
								entity: "coupons",
								status: activeTab !== "all" ? activeTab : "",
							}}
						/>
						<GenericImportButton
							endpoint="/helper/import"
							entityName="Coupons"
							onImportComplete={() => router.replace(router.asPath)}
						/>
						<Link href="/admin/coupons/new">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Coupon
							</Button>
						</Link>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<Tabs
						defaultValue={activeTab}
						onValueChange={handleTabChange}
						className="flex-1"
					>
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="expired">Expired</TabsTrigger>
							<TabsTrigger value="disabled">Disabled</TabsTrigger>
						</TabsList>
					</Tabs>
					<form
						onSubmit={handleSearch}
						className="flex items-center space-x-2 ml-auto"
					>
						<Input
							type="search"
							placeholder="Search coupons..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="max-w-xs"
						/>
						<Button type="submit" size="sm">
							<Search className="h-4 w-4 mr-1" />
							Search
						</Button>
					</form>
				</div>

				<DataTable
					data={coupons}
					columns={columns}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ query, req }) {
	const page = parseInt(query.page || "1", 10);
	const statusParam = query.status || "all";
	const searchParam = query.search || "";

	const params = { page };
	if (statusParam !== "all") params.status = statusParam;
	if (searchParam) params.search = searchParam;

	try {
		const { data } = await axiosInstance.get("/coupons", {
			params,
			headers: { cookie: req.headers.cookie || "" },
		});
		return {
			props: {
				coupons: data.coupons,
				totalPages: data.totalPages,
				currentPage: page,
				activeTab: statusParam,
				searchQuery: searchParam,
			},
		};
	} catch {
		return {
			props: {
				coupons: [],
				totalPages: 1,
				currentPage: page,
				activeTab: statusParam,
				searchQuery: searchParam,
			},
		};
	}
}
