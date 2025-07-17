import Link from "next/link";
import {
	Package,
	Layers,
	ShoppingCart,
	Ticket,
	ImageIcon,
	Bell,
	Plus,
} from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useSettingStore } from "@/store/useSettingStore";
import { ServerPriceDisplay } from "@/components/blocks/ServerPriceDisplay";
import { Bar, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
);

export default function AdminDashboard() {
	const settings = useSettingStore((s) => s.setting);

	const router = useRouter();
	const [stats, setStats] = useState({});
	const [recent, setRecent] = useState({});
	const [analytics, setAnalytics] = useState({
		monthlyRevenue: [],
		statusDistribution: {},
	});
	const [loading, setLoading] = useState(true);
	const { user, status } = useAuthStore();

	useEffect(() => {
		console.log({ user, status });
		const fetchDashboard = async () => {
			try {
				const { data } = await axiosInstance.get("/dashboard");

				setStats({
					totalOrders: data.totalOrders || 0,
					pendingOrders: data.pendingOrders || 0,
					processingOrders: data.processingOrders || 0,
					completeOrders: data.completeOrders || 0,
					cancelledOrders: data.cancelledOrders || 0,
					totalRevenue: data.totalRevenue || 0,
					totalCategories: data.totalCategories || 0,
					totalCustomers: data.totalCustomers || 0,
					totalCoupons: data.totalCoupons || 0,
					totalBanners: data.totalBanners || 0,
					thisMonthRevenue: data.analytics?.thisMonthRevenue || 0,
					totalProducts: data.totalProducts || 0,
				});

				setRecent({
					orders: data.recentOrders || [],
					customers: data.recentCustomers || [],
					bestSellers: data.bestSellerProducts || [],
				});

				setAnalytics({
					monthlyRevenue: data.analytics?.monthlyRevenue || [],
					statusDistribution: data.analytics?.statusDistribution || {},
				});

				setLoading(false);
			} catch (err) {
				console.error("Error fetching dashboard data:", err);
				router.push("/login");
			}
		};
		if (user) fetchDashboard();
	}, [user, router]);

	// Data for Monthly Revenue Bar Chart
	const monthlyRevenueData = {
		labels: analytics.monthlyRevenue.map((item) => item.month),
		datasets: [
			{
				label: "Monthly Revenue",
				data: analytics.monthlyRevenue.map((item) => item.revenue),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	// Data for Order Status Pie Chart
	const statusDistributionData = {
		labels: Object.keys(analytics.statusDistribution),
		datasets: [
			{
				label: "Order Status Distribution",
				data: Object.values(analytics.statusDistribution),
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	if (loading) return <AdminLayout>Loading...</AdminLayout>;
	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<div className="flex gap-2">
						<Link href="/admin/products/new">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Product
							</Button>
						</Link>
						<Link href="/admin/orders/new">
							<Button variant="outline">
								<Plus className="mr-2 h-4 w-4" />
								Add Order
							</Button>
						</Link>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Products
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalProducts}</div>
							<p className="text-xs text-muted-foreground">
								Products in your inventory
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats?.totalRevenue?.toFixed(2)}
							</div>
							<p className="text-xs text-muted-foreground">
								Total revenue generated
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pending Orders
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.pendingOrders}</div>
							<p className="text-xs text-muted-foreground">
								Total pending orders
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Processing Orders
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats?.processingOrders}
							</div>
							<p className="text-xs text-muted-foreground">
								Total processing orders
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Complete Orders
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.completeOrders}</div>
							<p className="text-xs text-muted-foreground">
								Total complete orders
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Cancelled Orders
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.cancelledOrders}</div>
							<p className="text-xs text-muted-foreground">
								Total cancelled orders
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Categories
							</CardTitle>
							<Layers className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalCategories}</div>
							<p className="text-xs text-muted-foreground">
								Categories in your system
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Customers
							</CardTitle>
							<Layers className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalCustomers}</div>
							<p className="text-xs text-muted-foreground">
								Customers in your system
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Orders
							</CardTitle>
							<ShoppingCart className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalOrders}</div>
							<p className="text-xs text-muted-foreground">
								Orders in your system
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Coupons
							</CardTitle>
							<Ticket className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalCoupons}</div>
							<p className="text-xs text-muted-foreground">
								Coupons in your system
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Banners
							</CardTitle>
							<ImageIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats?.totalBanners}</div>
							<p className="text-xs text-muted-foreground">
								Banners in your system
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue generated this month
							</CardTitle>
							<ImageIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats?.thisMonthRevenue?.toFixed(2)}
							</div>

							<p className="text-xs text-muted-foreground">
								Revenue generated this month
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="orders" className="space-y-4">
					<TabsList>
						<TabsTrigger value="orders">Recent Orders</TabsTrigger>
						<TabsTrigger value="customers">Recent Customers</TabsTrigger>
						<TabsTrigger value="bestSellers">Best Sellers</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
					</TabsList>

					<TabsContent value="orders">
						<Card>
							<CardHeader>
								<CardTitle>Recent Orders</CardTitle>
								<CardDescription>Recently placed orders</CardDescription>
							</CardHeader>
							<CardContent>
								{recent.orders.length === 0 ? (
									<div className="text-center py-6">
										<p className="text-muted-foreground">No orders found</p>
										<Link
											href="/admin/orders/new"
											className="mt-4 inline-block"
										>
											<Button variant="outline">Add your first order</Button>
										</Link>
									</div>
								) : (
									<div className="space-y-4">
										{recent.orders.map((order) => (
											<div
												key={order?._id.toString()}
												className="flex items-center justify-between border-b pb-4"
											>
												<div>
													<h3 className="font-medium">{order?.orderId}</h3>
													<p className="text-sm text-muted-foreground">
														{order?.profile?.firstName}{" "}
														{order?.profile?.lastName} •{" "}
														<ServerPriceDisplay amount={order?.total} />
													</p>
												</div>
												<Link href={`/admin/orders/${order?._id}`}>
													<Button variant="ghost" size="sm">
														View
													</Button>
												</Link>
											</div>
										))}
										<div className="pt-4 text-center">
											<Link href="/admin/orders">
												<Button variant="outline">View All Orders</Button>
											</Link>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="customers">
						<Card>
							<CardHeader>
								<CardTitle>Recent Customers</CardTitle>
								<CardDescription>Recently registered customers</CardDescription>
							</CardHeader>
							<CardContent>
								{recent.customers.length === 0 ? (
									<div className="text-center py-6">
										<p className="text-muted-foreground">No customers found</p>
									</div>
								) : (
									<div className="space-y-4">
										{recent.customers.map((customer) => (
											<div
												key={customer?._id.toString()}
												className="flex items-center justify-between border-b pb-4"
											>
												<div>
													<h3 className="font-medium">
														{customer?.firstName} {customer?.lastName}
													</h3>
													<p className="text-sm text-muted-foreground">
														{customer?.email} • {customer?.phone || "No phone"}{" "}
														• {customer?.country || "No country"}
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="bestSellers">
						<Card>
							<CardHeader>
								<CardTitle>Best Selling Products</CardTitle>
								<CardDescription>Top performing products</CardDescription>
							</CardHeader>
							<CardContent>
								{recent?.bestSellers?.length === 0 ? (
									<div className="text-center py-6">
										<p className="text-muted-foreground">No products found</p>
										<Link
											href="/admin/products/new"
											className="mt-4 inline-block"
										>
											<Button variant="outline">Add your first product</Button>
										</Link>
									</div>
								) : (
									<div className="space-y-4">
										{recent?.bestSellers.map((product) => (
											<div
												key={product?.product?._id.toString()}
												className="flex items-center justify-between border-b pb-4"
											>
												<div>
													<h3 className="font-medium">
														{product?.product?.name}
													</h3>
													<p className="text-sm text-muted-foreground">
														SKU: {product?.product?.sku} •{" "}
														<ServerPriceDisplay
															amount={product?.product?.price}
														/>{" "}
														• Total Sales:{" "}
														<ServerPriceDisplay amount={product.totalSales} />
													</p>
												</div>
												<Link href={`/admin/products/${product?.product?._id}`}>
													<Button variant="ghost" size="sm">
														View
													</Button>
												</Link>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="analytics">
						<div className="grid gap-6 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Monthly Revenue</CardTitle>
									<CardDescription>Revenue over time</CardDescription>
								</CardHeader>
								<CardContent>
									<Bar
										data={monthlyRevenueData}
										options={{
											responsive: true,
											plugins: {
												legend: {
													position: "top",
												},
												title: {
													display: true,
													text: "Monthly Revenue",
												},
											},
										}}
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Order Status Distribution</CardTitle>
									<CardDescription>Breakdown of order statuses</CardDescription>
								</CardHeader>
								<CardContent>
									<Pie
										data={statusDistributionData}
										options={{
											responsive: true,
											plugins: {
												legend: {
													position: "top",
												},
												title: {
													display: true,
													text: "Order Status Distribution",
												},
											},
										}}
									/>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</AdminLayout>
	);
}

// Removed getServerSideProps - data is now fetched client-side
