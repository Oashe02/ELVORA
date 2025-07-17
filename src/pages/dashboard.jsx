"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	LayoutDashboard,
	ShoppingCart,
	User,
	Heart,
	LogOut,
	Download,
	Package,
	Truck,
	CheckCircle,
	Clock,
	ShoppingBag,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import useWishlistStore from "@/store/wishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { downloadInvoice } from "../utils/invoiceUtils";
import { downloadRecentOrder } from "../utils/invoiceUtils";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";
import Layout from "@/components/layouts/Layout";

const title = "Customer Dashboard | Volvo Parts UAE";
const description =
	"Manage your account, view orders, update your profile, and check your wishlist for genuine Volvo parts in the UAE.";
const canonicalUrl = "https://volvopartsuae.com/dashboard";
const keywords =
	"Volvo parts UAE, customer dashboard, view orders, update profile, wishlist, Volvo spare parts Dubai, manage account UAE";

const openGraph = {
	type: "website",
	locale: "en_AE",
	url: canonicalUrl,
	title,
	description,
	siteName: "Volvo Parts UAE",
	images: [
		{
			url: "https://volvopartsuae.com/assets/og-volvo-parts.jpg",
			width: 1200,
			height: 630,
			alt: "Volvo Parts UAE Customer Dashboard",
		},
	],
};

const twitter = {
	cardType: "summary_large_image",
	site: "@volvopartsuae",
	handle: "@volvopartsuae",
	title,
	description,
	image: openGraph.images[0].url,
};

const breadcrumbs = [
	{ position: 1, name: "Home", item: "https://volvopartsuae.com/" },
	{ position: 2, name: "Dashboard", item: canonicalUrl },
];

const jsonLdSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebPage",
			"@id": canonicalUrl,
			url: canonicalUrl,
			name: title,
			isPartOf: { "@id": "https://volvopartsuae.com/#website" },
			about: { "@id": "https://volvopartsuae.com/#organization" },
			primaryImageOfPage: { "@id": openGraph.images[0].url },
			image: openGraph.images,
			thumbnailUrl: openGraph.images[0].url,
			datePublished: "2023-01-01T00:00:00+00:00",
			dateModified: "2025-06-02T00:00:00+00:00",
			description,
			breadcrumb: {
				"@type": "BreadcrumbList",
				itemListElement: breadcrumbs.map((breadcrumb) => ({
					"@type": "ListItem",
					position: breadcrumb.position,
					name: breadcrumb.name,
					item: breadcrumb.item,
				})),
			},
			inLanguage: "en-AE",
		},
		{
			"@type": "Organization",
			"@id": "https://volvopartsuae.com/#organization",
			name: "Volvo Parts UAE",
			url: "https://volvopartsuae.com/",
			sameAs: [
				"https://www.facebook.com/volvopartsuae",
				"https://twitter.com/volvopartsuae",
				"https://www.instagram.com/volvopartsuae",
			],
			telephone: "+971 50 123 4567",
			email: "support@volvopartsuae.com",
			address: {
				streetAddress: "Refada 2, Industrial Area",
				addressLocality: "Sharjah",
				addressRegion: "Sharjah",
				postalCode: "",
				addressCountry: "AE",
			},
			geo: {
				latitude: 25.3463,
				longitude: 55.4209,
			},
			hasMap:
				"https://www.google.com/maps?q=Refada+2,+Industrial+Area,+Sharjah,+UAE",
		},
		{
			"@type": "LocalBusiness",
			"@id": "https://volvopartsuae.com/#localbusiness",
			name: "Volvo Parts UAE",
			url: "https://volvopartsuae.com/",
			telephone: "+971 50 123 4567",
			email: "support@volvopartsuae.com",
			address: {
				"@type": "PostalAddress",
				streetAddress: "Refada 2, Industrial Area",
				addressLocality: "Sharjah",
				addressRegion: "Sharjah",
				postalCode: "",
				addressCountry: "AE",
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: 25.3463,
				longitude: 55.4209,
			},
			openingHours: [
				{
					"@type": "OpeningHoursSpecification",
					dayOfWeek: [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
					],
					opens: "09:00",
					closes: "18:00",
				},
			],
			priceRange: "$$",
			sameAs: [
				"https://www.facebook.com/volvopartsuae",
				"https://twitter.com/volvopartsuae",
				"https://www.instagram.com/volvopartsuae",
			],
		},
	],
};

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "How can I view my order history on the dashboard?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Navigate to the 'My Orders' tab on the customer dashboard to view your complete order history, including order details, status, and invoices.",
			},
		},
		{
			"@type": "Question",
			name: "How do I update my profile information?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Go to the 'Update Profile' tab, edit your personal details such as name, phone, and address, and click 'Update Profile' to save changes.",
			},
		},
		{
			"@type": "Question",
			name: "Can I download invoices for my orders?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes, in the 'My Orders' or 'Dashboard' tab, click the 'Invoice' or 'Recent Order' button next to an order to download its invoice or receipt.",
			},
		},
		{
			"@type": "Question",
			name: "How do I manage my wishlist?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Visit the 'Wishlist' tab to view, add, or remove items. You can check stock status and prices for your saved Volvo parts.",
			},
		},
		{
			"@type": "Question",
			name: "What should I do if I encounter an error on the dashboard?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "If you see an error, try refreshing the page. If the issue persists, contact our support team at support@volvopartsuae.com or +971 50 123 4567.",
			},
		},
	],
};

const mockUser = {
	email: "ashadnasim123@gmail.com",
	profile: {
		firstName: "Ashad",
		lastName: "Nasim",
		phone: "+971501234567",
		address: "123 Sheikh Zayed Road",
		apartment: "Apt 45",
		country: "UAE",
		emirate: "Dubai",
		avatar_url: "/placeholder.svg?height=100&width=100",
	},
};

export default function CustomerDashboard({ announcements = [],	products,
	categories}) {
	console.log(announcements,"Announce Loaded");
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isProfileLoading, setIsProfileLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [profileData, setProfileData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		apartment: "",
		country: "",
		emirate: "",
	});

	const { wishlist = [] } = useWishlistStore();
	const { setSession } = useAuthStore();

	const [myOrdersData, setMyOrdersData] = useState([]);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

	const [orderData, setOrderData] = useState({
		totalOrders: 0,
		pendingOrders: 0,
		processingOrders: 0,
		completeOrders: 0,
		recentOrders: [],
	});

	const _getData = async () => {
		try {
			setIsLoading(true);
			const [dashboardData, myOrdersData] = await Promise.all([
				axiosInstance.get("/dashboard"),
				axiosInstance.get("/dashboard/my-orders"),
			]);
			const data = dashboardData?.data;
			const myOrders = myOrdersData?.data;

			setOrderData({
				totalOrders: data?.totalOrders || 0,
				pendingOrders: data?.pendingOrders || 0,
				processingOrders: data?.processingOrders || 0,
				completeOrders: data?.completeOrders || 0,
				recentOrders: data?.recentOrders || [],
			});
			setMyOrdersData(myOrders || []);
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
			toast.error("Failed to load dashboard data");
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		_getData();
	}, []);

	const getStatusColor = (status) => {
		if (!status) return "bg-gray-100 text-gray-800";
		switch (status?.toLowerCase()) {
			case "delivered":
				return "bg-green-100 text-green-800";
			case "processing":
				return "bg-blue-100 text-blue-800";
			case "shipped":
				return "bg-purple-100 text-purple-800";
			case "pending":
				return "bg-orange-100 text-orange-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status) => {
		if (!status) return <Package className="h-4 w-4" />;
		switch (status?.toLowerCase()) {
			case "delivered":
				return <CheckCircle className="h-4 w-4" />;
			case "processing":
				return <Package className="h-4 w-4" />;
			case "shipped":
				return <Truck className="h-4 w-4" />;
			case "pending":
				return <Clock className="h-4 w-4" />;
			default:
				return <Package className="h-4 w-4" />;
		}
	};

	const fetchProfileData = async () => {
		setIsProfileLoading(true);
		try {
			const { data } = await axiosInstance.get("/auth/profile");
			if (data?.ok && data?.profile) {
				setProfileData(data?.profile);
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
			toast.error("Failed to load profile data");
		} finally {
			setIsProfileLoading(false);
		}
	};

	useEffect(() => {
		fetchProfileData();
	}, []);

	const handleDownloadInvoice = async (orderId) => {
		try {
			if (isProfileLoading) {
				toast.info("Please wait, profile data is still loading...");
				return;
			}
			if (!profileData || Object.keys(profileData).length === 0) {
				console.warn("Profile data is empty, attempting to fetch...");
				await fetchProfileData();
				if (!profileData || Object.keys(profileData).length === 0) {
					toast.error("Profile data not available");
					return;
				}
			}

			const order = myOrdersData.find((o) => o.orderId === orderId);
			if (!order) {
				toast.error("Order not found");
				return;
			}

			const customer = {
				email:
					useAuthStore.getState().user?.email ||
					"no-email-provided@volvopartsuae.com",
				profile: {
					firstName: profileData?.firstName || "N/A",
					lastName: profileData?.lastName || "N/A",
					phone: profileData?.phone || "N/A",
					address: profileData?.address || "N/A",
					apartment: profileData?.apartment || "",
					country: profileData?.country || "N/A",
					emirate: profileData?.emirate || "N/A",
				},
			};

			await downloadInvoice(order, customer);
			toast.success("Invoice downloaded successfully");
		} catch (error) {
			console.error("Failed to download invoice:", error);
			toast.error("Failed to download invoice");
		}
	};

	const sidebarItems = [
		{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ id: "orders", label: "My Orders", icon: ShoppingCart },
		{ id: "profile", label: "Update Profile", icon: User },
		{ id: "wishlist", label: "Wishlist", icon: Heart },
	];

	const updateProfile = async () => {
		setIsUpdatingProfile(true);
		try {
			const { data } = await axiosInstance.post("/auth/update-profile", {
				firstName: profileData?.firstName,
				lastName: profileData?.lastName,
				phone: profileData?.phone,
				address: profileData?.address,
				apartment: profileData?.apartment,
				emirate: profileData?.emirate,
				country: profileData.country,
			});
			if (data?.ok) {
				setProfileData(data.profile || profileData);
				toast.success("Profile updated successfully!");
			} else {
				toast.error(data?.message || "Failed to update profile");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error(error.response?.data?.error || "Failed to update profile");
		} finally {
			setIsUpdatingProfile(false);
		}
	};

	// const downloadInvoiceRecentOrders = async (orderId) => {
	// 	try {
	// 		if (isProfileLoading) {
	// 			toast.info("Please wait, profile data is still loading...");
	// 			return;
	// 		}

	// 		if (!profileData || Object.keys(profileData).length === 0) {
	// 			console.warn("Profile data is empty, attempting to fetch...");
	// 			await fetchProfileData();
	// 			if (!profileData || Object.keys(profileData).length === 0) {
	// 				toast.error("Profile data not available");
	// 				return;
	// 			}
	// 		}

	// 		const order = orderData.recentOrders.find((o) => o.orderId === orderId);


	// 		if (!order) {
	// 			toast.error("Order not found");
	// 			return;
	// 		}

	// 		const customer = {
	// 			email:
	// 				useAuthStore.getState().user?.email ||
	// 				"no-email-provided@volvopartsuae.com",
	// 			profile: {
	// 				firstName: profileData.firstName || "N/A",
	// 				lastName: profileData.lastName || "N/A",
	// 				phone: profileData.phone || "N/A",
	// 				address: profileData.address || "N/A",
	// 				apartment: profileData.apartment || "",
	// 				country: profileData.country || "N/A",
	// 				emirate: profileData.emirate || "N/A",
	// 			},
	// 		};

	// 		await downloadRecentOrder(order, customer);
	// 		toast.success("Order receipt downloaded successfully");
	// 	} catch (error) {
	// 		console.error("Failed to download receipt:", error);
	// 		toast.error("Failed to download receipt");
	// 	}
	// };


	const downloadInvoiceRecentOrders = async (orderId) => {
		try {
			if (isProfileLoading) {
				toast.info("Please wait, profile data is still loading...");
				return;
			}
			if (!profileData || Object.keys(profileData).length === 0) {
				console.warn("Profile data is empty, attempting to fetch...");
				await fetchProfileData();
				if (!profileData || Object.keys(profileData).length === 0) {
					toast.error("Profile data not available");
					return;
				}
			}
			// console.log("Recent Orders Data:", orderData.recentOrders);
			let order = orderData.recentOrders.find((o) => o.orderId === orderId);
			if (!order) {
				console.error("Order not found for ID:", orderId);
				toast.error("Order not found");
				return;
			}
			// console.log("Selected Order:", JSON.stringify(order, null, 2));
			const requiredFields = [
				"orderId",
				"createdAt",
				"status",
				"total",
				"subtotal",
				"tax",
				"discount",
				"shippingCharge",
				"paymentStatus",
				"paymentMethod",
				"fulfillmentType",
				"couponCode",
				"items",
				"history",
			];
			const missingFields = requiredFields.filter((field) => order[field] === undefined);
			if (missingFields.length > 0) {
				console.warn("Missing fields in order:", missingFields);
				const defaultOrder = {
					orderId: order.orderId || "N/A",
					createdAt: order.createdAt || new Date().toISOString(),
					status: order.status || "unknown",
					total: order.total || 0,
					subtotal: order.subtotal || 0,
					tax: order.tax || 0,
					discount: order.discount || 0,
					shippingCharge: order.shippingCharge || 0,
					paymentStatus: order.paymentStatus || "unknown",
					paymentMethod: order.paymentMethod || "N/A",
					fulfillmentType: order.fulfillmentType || "N/A",
					couponCode: order.couponCode || null,
					carrier: order.carrier || null,
					estimatedDeliveryDate: order.estimatedDeliveryDate || null,
					actualDeliveryDate: order.actualDeliveryDate || null,
					tracking: order.tracking || null,
					items: order.items || [],
					history: order.history || [],
				};
				// console.log("Order with defaults:", JSON.stringify(defaultOrder, null, 2));
				order = defaultOrder;
			}
			if (!Array.isArray(order.items) || order.items.length === 0) {
				console.warn("Order items are missing or empty, using default empty item");
				order.items = [
					{
						name: "Unknown Product",
						quantity: 0,
						price: 0,
						sku: "N/A",
						subtotal: 0,
						tax: 0,
						discounts: [],
					},
				];
			} else {
				order.items = order.items.map((item) => ({
					name: item.name || "Unknown Product",
					quantity: Number(item.quantity) || 0,
					price: Number(item.price) || 0,
					sku: item.sku || "N/A",
					subtotal: Number(item.subtotal) || 0,
					tax: Number(item.tax) || 0,
					discounts: item.discounts || [],
					thumbnail: item.thumbnail || null,
					variant: item.variant || null,
				}));
			}
			const customer = {
				email: useAuthStore.getState().user?.email || "no-email-provided@volvopartsuae.com",
				profile: {
					firstName: profileData.firstName || "N/A",
					lastName: profileData.lastName || "N/A",
					phone: profileData.phone || "N/A",
					address: profileData.address || "N/A",
					apartment: profileData.apartment || "",
					country: profileData.country || "N/A",
					emirate: profileData.emirate || "N/A",
				},
			};
			// console.log("Customer Data:", JSON.stringify(customer, null, 2));
			await downloadRecentOrder(order, customer);
			toast.success("Order receipt downloaded successfully");
		} catch (error) {
			console.error("Failed to download receipt:", error);
			toast.error("Failed to download receipt");
		}
	};
	const orderStats = {
		total: orderData.totalOrders,
		pending: orderData.pendingOrders,
		processing: orderData.processingOrders,
		complete: orderData.completeOrders,
	};

	if (hasError) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="text-center p-6 max-w-md">
					<h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
						Something went wrong
					</h2>
					<p className="text-gray-600 mb-6 text-sm sm:text-base">
						We couldn't load your dashboard data. Please try refreshing the page
						or contact support if the problem persists.
					</p>
					<Button
						onClick={() => {
							setHasError(false);
							_getData();
						}}
						className="bg-green-600 hover:bg-green-700 text-sm sm:text-base"
					>
						Retry
					</Button>
				</div>
			</div>
		);
	}

	if (isLoading && activeTab === "dashboard") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	function capitalize(str) {
		if (typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// console.log(orderData.recentOrders, " orderData.recentOrders");


	return (
		<Layout announcements={announcements} categories={categories} products={products}>
			<SeoWrapper
				title={title}
				description={description}
				canonicalUrl={canonicalUrl}
				keywords={keywords}
				openGraph={openGraph}
				twitter={twitter}
				breadcrumbs={breadcrumbs}
				jsonLdSchema={jsonLdSchema}
				faq={faqSchema.mainEntity}
			>
				<div className="min-h-screen bg-gray-50 flex pt-6 md:pt-12  sm:pt-12 overflow-hidden">
					{/* Sidebar */}
					<div className="w-16 sm:w-64 bg-white border-r border-gray-200 p-2 sm:p-6 fixed h-full overflow-y-auto">
						<div className="space-y-7 sm:space-y-7 mt-10">
							{sidebarItems.map((item) => {
								const Icon = item.icon;
								return (
									<button
										key={item.id}
										onClick={() => setActiveTab(item.id)}
										className={`w-full flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${activeTab === item.id
											? "bg-green-50 text-green-700 border border-green-200"
											: "text-gray-700 hover:bg-gray-50"
											}`}
										aria-label={item.label}
									>
										<Icon className="h-5 w-5 sm:h-5 sm:w-5" />
										<span className="hidden sm:inline font-medium">{item.label}</span>
									</button>
								);
							})}

							<button
								onClick={() => {
									localStorage.removeItem("@token");
									window.location.href = "/";
									setSession();
								}}
								className="w-full flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base transition-colors bg-red-50 text-red-700 border border-red-200"
								aria-label="Logout"
							>
								<LogOut className="h-5 w-5 sm:h-5 sm:w-5" />
								<span className="hidden sm:inline font-medium">Logout</span>
							</button>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1 ml-16 sm:ml-64 p-4 sm:p-8">
						{/* Dashboard Tab */}
						{activeTab === "dashboard" && (
							<div className="space-y-6 sm:space-y-8">
								<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
									Dashboard
								</h1>

								{/* Order Stats */}
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
									<Card>
										<CardContent className="p-4 sm:p-6">
											<div className="flex items-center space-x-3 sm:space-x-4">
												<div className="p-2 sm:p-3 bg-red-100 rounded-full">
													<ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
												</div>
												<div>
													<p className="text-xs sm:text-sm font-medium text-gray-600">
														Total Orders
													</p>
													<p className="text-xl sm:text-2xl font-bold text-gray-900">
														{orderStats.total}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardContent className="p-4 sm:p-6">
											<div className="flex items-center space-x-3 sm:space-x-4">
												<div className="p-2 sm:p-3 bg-orange-100 rounded-full">
													<Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
												</div>
												<div>
													<p className="text-xs sm:text-sm font-medium text-gray-600">
														Pending Orders
													</p>
													<p className="text-xl sm:text-2xl font-bold text-gray-900">
														{orderStats.pending}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardContent className="p-4 sm:p-6">
											<div className="flex items-center space-x-3 sm:space-x-4">
												<div className="p-2 sm:p-3 bg-blue-100 rounded-full">
													<Truck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
												</div>
												<div>
													<p className="text-xs sm:text-sm font-medium text-gray-600">
														Processing Order
													</p>
													<p className="text-xl sm:text-2xl font-bold text-gray-900">
														{orderStats.processing}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardContent className="p-4 sm:p-6">
											<div className="flex items-center space-x-3 sm:space-x-4">
												<div className="p-2 sm:p-3 bg-green-100 rounded-full">
													<CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
												</div>
												<div>
													<p className="text-xs sm:text-sm font-medium text-gray-600">
														Complete Orders
													</p>
													<p className="text-xl sm:text-2xl font-bold text-gray-900">
														{orderStats.complete}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
								{/* Recent Orders or Empty State */}
								{orderData.recentOrders?.length === 0 ? (
									<div className="flex flex-col items-center justify-center py-12 sm:py-16">
										<div className="p-4 sm:p-6 bg-gray-100 rounded-full mb-4">
											<ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
										</div>
										<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
											You Have No Orders Yet!
										</h3>
										<p className="text-gray-600 text-sm sm:text-base">
											Start shopping to see your orders here.
										</p>
									</div>
								) : (
									<div className="space-y-4 sm:space-y-6">
										{orderData.recentOrders?.map((order) => (
											<Card
												key={order._id || order.orderId}
												className="shadow-sm border border-gray-200"
											>
												<CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
													<div>
														<CardTitle className="text-base sm:text-lg font-semibold">
															{order.orderId}
														</CardTitle>
														<CardDescription className="text-xs sm:text-sm">
															Placed on:{" "}
															{order.createdAt
																? new Date(order.createdAt).toLocaleString("en-US", {
																	dateStyle: "medium",
																	timeStyle: "short",
																})
																: "N/A"}
														</CardDescription>
													</div>
													<div className="flex items-center gap-2 sm:gap-3 flex-wrap">
														<Badge
															className={`${getStatusColor(order.status)} text-xs sm:text-sm capitalize`}
														>
															{order.status || "Unknown"}
														</Badge>
														<Badge
															className={`${getStatusColor(order.paymentStatus)} text-xs sm:text-sm capitalize`}
														>
															Payment: {order.paymentStatus || "Unknown"}
														</Badge>
														<span className="text-xs sm:text-sm text-gray-700 capitalize">
															{order.paymentMethod
																? order.paymentMethod.replace(/_/g, " ")
																: "N/A"}
														</span>
														<Button
															size="sm"
															variant="outline"
															onClick={() => downloadInvoiceRecentOrders(order.orderId)}
															className="text-xs sm:text-sm"
														>
															<Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1" />
															Recent Invoice
														</Button>
													</div>
												</CardHeader>

												<CardContent className="space-y-4">
													{/* Items Section */}
													<div>
														<h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
															Items
														</h3>
														<ul className="space-y-2">
															{order.items?.map((item, idx) => (
																<li key={idx} className="flex items-center gap-3 sm:gap-4">
																	<img
																		src={item?.thumbnail || "/placeholder.svg"}
																		alt={item?.name || "Product"}
																		className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
																	/>
																	<div className="flex-1">
																		<p className="font-medium text-sm sm:text-base">
																			{item?.name || "Unnamed Product"}
																		</p>
																		<p className="text-xs sm:text-sm text-gray-500">
																			SKU: {item?.sku || "N/A"}
																		</p>
																		<p className="text-xs sm:text-sm text-gray-500">
																			Qty: {item?.quantity || 0}
																		</p>
																	</div>
																	<p className="text-xs sm:text-sm font-medium text-gray-800">
																		<ServerPriceDisplay amount={item?.subtotal?.toFixed(2) || 0} />
																	</p>
																</li>
															))}
														</ul>
													</div>

													{/* Financial Details */}
													<div className="space-y-2 text-xs sm:text-sm font-medium text-gray-800">
														{order.couponCode && (
															<div className="flex justify-between">
																<span>Coupon Code:</span>
																<span>{order.couponCode}</span>
															</div>
														)}
														{order.discount > 0 && (
															<div className="flex justify-between">
																<span>Discount:</span>
																<ServerPriceDisplay amount={order.discount.toFixed(2)} />
															</div>
														)}
														<div className="flex justify-between">
															<span>Subtotal:</span>
															<ServerPriceDisplay amount={order.subtotal.toFixed(2)} />
														</div>
														<div className="flex justify-between">
															<span>Tax:</span>
															<ServerPriceDisplay amount={order.tax.toFixed(2)} />
														</div>
														{order.shippingCharge > 0 && (
															<div className="flex justify-between">
																<span>Shipping:</span>
																<ServerPriceDisplay amount={order.shippingCharge.toFixed(2)} />
															</div>
														)}
														<div className="flex justify-between font-bold">
															<span>Total:</span>
															<ServerPriceDisplay amount={order.total.toFixed(2)} />
														</div>
													</div>

													{/* Delivery Details */}
													<div className="text-xs sm:text-sm text-gray-700 space-y-1">
														<h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
															Delivery Details
														</h3>
														{order.fulfillmentType && (
															<p>
																<span className="font-medium">Fulfillment:</span>{" "}
																{order.fulfillmentType.replace(/_/g, " ").toUpperCase()}
															</p>
														)}
														{order.estimatedDeliveryDate ? (
															<p>
																<span className="font-medium">Estimated Delivery:</span>{" "}
																{new Date(order.estimatedDeliveryDate).toLocaleDateString(
																	"en-US",
																	{ dateStyle: "medium" }
																)}
															</p>
														) : (
															<p>
																<span className="font-medium">Estimated Delivery:</span> Not
																Available
															</p>
														)}
														{order.actualDeliveryDate ? (
															<p>
																<span className="font-medium">Delivered On:</span>{" "}
																{new Date(order.actualDeliveryDate).toLocaleDateString("en-US", {
																	dateStyle: "medium",
																})}
															</p>
														) : order.status === "delivered" ? (
															<p>
																<span className="font-medium">Delivered On:</span> Not Available
															</p>
														) : null}
														{order.carrier ? (
															<p>
																<span className="font-medium">Carrier:</span> {order.carrier}
															</p>
														) : (
															<p>
																<span className="font-medium">Carrier:</span> Not Available
															</p>
														)}
														{order.tracking ? (
															<p>
																<span className="font-medium">Tracking ID:</span> {order.tracking}
															</p>
														) : (
															<p>
																<span className="font-medium">Tracking ID:</span> Not Available
															</p>
														)}
													</div>

													{/* Order History */}
													{order.history?.length > 0 && (
														<div className="text-xs sm:text-sm text-gray-700">
															<h3 className="font-medium text-gray-800 mb-2">Order History</h3>
															<ul className="space-y-1">
																{order.history.map((event, idx) => (
																	<li key={idx}>
																		<span className="font-medium">
																			{new Date(event.timestamp).toLocaleString("en-US", {
																				dateStyle: "medium",
																				timeStyle: "short",
																			})}
																		</span>
																		: {event.note} (Status: {event.status})
																	</li>
																))}
															</ul>
														</div>
													)}
												</CardContent>
											</Card>
										))}
									</div>
								)}
							</div>
						)}

						{/* My Orders Tab */}
						{activeTab === "orders" && (
							<div className="space-y-6 sm:space-y-8">
								<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
									Orders Overview
								</h1>

								<div className="space-y-4 sm:space-y-6">
									{myOrdersData?.length === 0 ? (
										<div className="flex flex-col items-center justify-center py-12 sm:py-16">
											<div className="p-4 sm:p-6 bg-gray-100 rounded-full mb-4">
												<ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
											</div>
											<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
												No Orders Found!
											</h3>
											<p className="text-gray-600 text-sm sm:text-base">
												Orders will appear here once placed.
											</p>
										</div>
									) : (
										myOrdersData.map((order) => (
											<Card key={order.orderId} className="shadow-sm border border-gray-200">
												<CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
													<div>
														<CardTitle className="text-base sm:text-lg font-semibold">
															{order.orderId}
														</CardTitle>
														<CardDescription className="text-xs sm:text-sm">
															Placed on:{" "}
															{order.placedOn
																? new Date(order.placedOn).toLocaleString("en-US", {
																	dateStyle: "medium",
																	timeStyle: "short",
																})
																: "N/A"}
														</CardDescription>
													</div>
													<div className="flex items-center gap-2 sm:gap-3 flex-wrap">
														<Badge
															className={`${getStatusColor(
																order.status
															)} text-xs sm:text-sm capitalize`}
														>
															{order.status || "Unknown"}
														</Badge>
														<Badge
															className={`${getStatusColor(
																order.paymentStatus
															)} text-xs sm:text-sm capitalize`}
														>
															Payment: {order.paymentStatus || "Unknown"}
														</Badge>
														<span className="text-xs sm:text-sm text-gray-700 capitalize">
															{order.paymentMethod
																? order.paymentMethod.replace(/_/g, " ")
																: "N/A"}
														</span>
														<Button
															size="sm"
															variant="outline"
															onClick={() => handleDownloadInvoice(order.orderId)}
															className="text-xs sm:text-sm"
														>
															<Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1" />
															Invoice
														</Button>
													</div>
												</CardHeader>

												<CardContent className="space-y-4">
													<div>
														<h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
															Items
														</h3>
														<ul className="space-y-2">
															{order.items?.map((item, idx) => (
																<li
																	key={idx}
																	className="flex items-center gap-3 sm:gap-4"
																>
																	<img
																		src={item?.thumbnail || "/placeholder.svg"}
																		alt={item?.name || "Product"}
																		className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border"
																	/>
																	<div className="flex-1">
																		<p className="font-medium text-sm sm:text-base">
																			{item?.name || "Unnamed Product"}
																		</p>
																		<p className="text-xs sm:text-sm text-gray-500">
																			SKU: {item?.sku || "N/A"}
																		</p>
																		<p className="text-xs sm:text-sm text-gray-500">
																			Qty: {item?.quantity || 0}
																		</p>
																	</div>
																	<p className="text-xs sm:text-sm font-medium text-gray-800">
																		<ServerPriceDisplay
																			amount={item?.subtotal?.toFixed(2) || 0}
																		/>
																	</p>
																</li>
															))}
														</ul>
													</div>

													<div className="space-y-2 text-xs sm:text-sm font-medium text-gray-800">
														{order.couponCode && (
															<div className="flex justify-between">
																<span>Coupon Code:</span>
																<span>{order.couponCode}</span>
															</div>
														)}
														{order.discount > 0 && (
															<div className="flex justify-between">
																<span>Discount:</span>
																<ServerPriceDisplay amount={order.discount.toFixed(2)} />
															</div>
														)}
														<div className="flex justify-between">
															<span>Subtotal:</span>
															<ServerPriceDisplay amount={order.subtotal.toFixed(2)} />
														</div>
														<div className="flex justify-between">
															<span>Tax:</span>
															<ServerPriceDisplay amount={order.tax.toFixed(2)} />
														</div>
														{order.shippingCharge > 0 && (
															<div className="flex justify-between">
																<span>Shipping:</span>
																<ServerPriceDisplay amount={order.shippingCharge.toFixed(2)} />
															</div>
														)}
														<div className="flex justify-between font-bold">
															<span>Total:</span>
															<ServerPriceDisplay amount={order.total.toFixed(2)} />
														</div>
													</div>

													<div className="text-xs sm:text-sm text-gray-700 space-y-1">
														<h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
															Delivery Details
														</h3>
														{order.fulfillmentType && (
															<p>
																<span className="font-medium">Fulfillment:</span>{" "}
																{capitalize(order.fulfillmentType.replace(/_/g, " "))}
															</p>
														)}
														{order.estimatedDeliveryDate ? (
															<p>
																<span className="font-medium">Estimated Delivery:</span>{" "}
																{new Date(order.estimatedDeliveryDate).toLocaleDateString(
																	"en-US",
																	{ dateStyle: "medium" }
																)}
															</p>
														) : (
															<p>
																<span className="font-medium">Estimated Delivery:</span>{" "}
																Not Available
															</p>
														)}
														{order.actualDeliveryDate ? (
															<p>
																<span className="font-medium">Delivered On:</span>{" "}
																{new Date(order.actualDeliveryDate).toLocaleDateString(
																	"en-US",
																	{ dateStyle: "medium" }
																)}
															</p>
														) : order.status === "delivered" ? (
															<p>
																<span className="font-medium">Delivered On:</span>{" "}
																Not Available
															</p>
														) : null}
														{order.carrier ? (
															<p>
																<span className="font-medium">Carrier:</span>{" "}
																{order.carrier}
															</p>
														) : (
															<p>
																<span className="font-medium">Carrier:</span>{" "}
																Not Available
															</p>
														)}
														{order.tracking ? (
															<p>
																<span className="font-medium">Tracking ID:</span>{" "}
																{order.tracking}
															</p>
														) : (
															<p>
																<span className="font-medium">Tracking ID:</span>{" "}
																Not Available
															</p>
														)}
													</div>

													{order.history?.length > 0 && (
														<div className="text-xs sm:text-sm text-gray-700">
															<h3 className="font-medium text-gray-800 mb-2">
																Order History
															</h3>
															<ul className="space-y-1">
																{order.history.map((event, idx) => (
																	<li key={idx}>
																		<span className="font-medium">
																			{new Date(event.timestamp).toLocaleString("en-US", {
																				dateStyle: "medium",
																				timeStyle: "short",
																			})}
																		</span>
																		: {event.note} (Status: {event.status})
																	</li>
																))}
															</ul>
														</div>
													)}
												</CardContent>
											</Card>
										))
									)}
								</div>
							</div>
						)}

						{/* Update Profile Tab */}
						{activeTab === "profile" && (
							<div className="space-y-6 sm:space-y-8">
								<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
									Update Profile
								</h1>

								{isProfileLoading ? (
									<div className="flex justify-center items-center h-64">
										<div className="flex flex-col items-center">
											<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
											<p className="text-sm sm:text-base">
												Loading profile data...
											</p>
										</div>
									</div>
								) : (
									<Card className="max-w-full sm:max-w-2xl">
										<CardHeader>
											<CardTitle className="text-lg sm:text-xl">
												Personal Information
											</CardTitle>
											<CardDescription className="text-sm sm:text-base">
												Update your account details and personal information
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 sm:space-y-6">
											<div className="grid grid-cols-1 gap-4">
												<div>
													<Label htmlFor="firstName" className="text-xs sm:text-sm">
														First Name
													</Label>
													<Input
														id="firstName"
														value={profileData.firstName || ""}
														onChange={(e) =>
															setProfileData({
																...profileData,
																firstName: e.target.value,
															})
														}
														placeholder="First Name"
														className="text-sm sm:text-base"
													/>
												</div>
												<div>
													<Label htmlFor="lastName" className="text-xs sm:text-sm">
														Last Name
													</Label>
													<Input
														id="lastName"
														value={profileData.lastName || ""}
														onChange={(e) =>
															setProfileData({
																...profileData,
																lastName: e.target.value,
															})
														}
														placeholder="Last Name"
														className="text-sm sm:text-base"
													/>
												</div>
											</div>

											<div>
												<Label htmlFor="email" className="text-xs sm:text-sm">
													Email
												</Label>
												<Input
													id="email"
													type="email"
													value={mockUser.email}
													disabled
													className="bg-gray-50 text-sm sm:text-base"
												/>
											</div>

											<div>
												<Label htmlFor="phone" className="text-xs sm:text-sm">
													Phone
												</Label>
												<Input
													id="phone"
													value={profileData.phone || ""}
													onChange={(e) =>
														setProfileData({
															...profileData,
															phone: e.target.value,
														})
													}
													placeholder="Phone number"
													className="text-sm sm:text-base"
												/>
											</div>

											<div>
												<Label htmlFor="address" className="text-xs sm:text-sm">
													Address
												</Label>
												<Input
													id="address"
													value={profileData.address || ""}
													onChange={(e) =>
														setProfileData({
															...profileData,
															address: e.target.value,
														})
													}
													placeholder="Street address"
													className="text-sm sm:text-base"
												/>
											</div>

											<div className="grid grid-cols-1 gap-4">
												<div>
													<Label htmlFor="apartment" className="text-xs sm:text-sm">
														Apartment
													</Label>
													<Input
														id="apartment"
														value={profileData.apartment || ""}
														onChange={(e) =>
															setProfileData({
																...profileData,
																apartment: e.target.value,
															})
														}
														placeholder="Apartment, suite, etc."
														className="text-sm sm:text-base"
													/>
												</div>
												<div>
													<Label htmlFor="emirate" className="text-xs sm:text-sm">
														Emirate
													</Label>
													<Input
														id="emirate"
														value={profileData.emirate || ""}
														onChange={(e) =>
															setProfileData({
																...profileData,
																emirate: e.target.value,
															})
														}
														placeholder="Emirate"
														className="text-sm sm:text-base"
													/>
												</div>
											</div>

											<div className="flex justify-end">
												<Button
													className="bg-green-600 hover:bg-green-700 text-sm sm:text-base"
													onClick={updateProfile}
													disabled={isUpdatingProfile}
												>
													{isUpdatingProfile ? (
														<>
															<svg
																className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
															>
																<circle
																	className="opacity-25"
																	cx="12"
																	cy="12"
																	r="10"
																	stroke="currentColor"
																	strokeWidth="4"
																></circle>
																<path
																	className="opacity-75"
																	fill="currentColor"
																	d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
																></path>
															</svg>
															Updating...
														</>
													) : (
														"Update Profile"
													)}
												</Button>
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						)}

						{/* Wishlist Tab */}
						{activeTab === "wishlist" && (
							<div className="space-y-6 sm:space-y-8">
								<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
									Wishlist
								</h1>

								<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{wishlist?.length > 0 ? (
										wishlist.map((item) => (
											<Card key={item._id || Math.random()}>
												<CardContent className="p-3 sm:p-4">
													<img
														src={item?.thumbnail || "/placeholder.svg"}
														alt={item?.name || "Product"}
														className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
													/>
													<h3 className="font-semibold text-base sm:text-lg mb-2">
														{item?.name || "Unnamed Product"}
													</h3>
													<p className="text-lg sm:text-xl font-bold text-green-600 mb-2 sm:mb-3">
														<ServerPriceDisplay amount={item?.price || 0} />
													</p>
													<div className="flex items-center justify-between">
														<Badge
															variant={
																item?.stock > 0 ? "default" : "destructive"
															}
															className="text-xs sm:text-sm"
														>
															{item?.stock > 0 ? "In Stock" : "Out of Stock"}
														</Badge>
													</div>
												</CardContent>
											</Card>
										))
									) : (
										<p className="text-gray-600 text-sm sm:text-base">
											Your wishlist is empty.
										</p>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</SeoWrapper>
		</Layout>
	);
}


export async function getStaticProps() {
	try {
		const [announcementsRes, productsRes, categoriesRes] = await Promise.all([
			axiosInstance.get("/announcements"),
			axiosInstance.get("/products?featured=true"),
			axiosInstance.get("/categories?status=active"),
		]);

		return {
			props: {
				announcements: announcementsRes.data?.announcements || [],
				products: productsRes.data?.products || [],
				categories: categoriesRes.data?.categories || [],
			},
			revalidate: 3600,
		};
	} catch (error) {
		console.error("Error in getStaticProps:", error.message);

		return {
			props: {
				announcements: [],
				products: [],
				categories: [],
			},
			revalidate: 3600,
		};
	}
}

<style jsx global>{`
	/* Mobile-specific styles */
	@media (max-width: 639px) {
		/* Ensure sidebar buttons are touch-friendly */
		.sidebar button {
			min-height: 44px;
			min-width: 44px;
			padding: 8px;
			justify-content: center;
		}

		/* Ensure inputs are full-width and touch-friendly */
		.input {
			height: 44px;
			font-size: 14px;
			padding: 10px;
		}

		/* Adjust card padding */
		.card-content {
			padding: 12px;
		}

		/* Prevent horizontal overflow */
		.min-h-screen {
			overflow-x: hidden;
		}

		/* Ensure sidebar stays fixed without overflow */
		.sidebar {
			position: fixed;
			top: 0;
			left: 0;
			width: 64px;
			height: 100%;
			overflow-y: auto;
			z-index: 10;
		}

		/* Adjust main content margin */
		.main-content {
			margin-left: 64px;
		}
	}
`}</style>
