import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Loader2,
	Truck,
	CreditCard,
	Package,
	FileText,
	User,
	Calendar,
	Tag,
	Trash2,
	ExternalLink,
} from "lucide-react";
import { PrintInvoice } from "./PrintInvoice";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

const ORDER_STATUSES = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
	"returned",
	"partially_shipped",
	"on_hold",
	"refunded",
];

const PAYMENT_STATUSES = [
	"pending",
	"paid",
	"failed",
	"refunded",
	"partially_refunded",
	"authorized",
	"voided",
];

export function OrderDetailView({ order }) {

	console.log("Order Detail View Rendered", order);
	const router = useRouter();
	const printRef = useRef(null);
	const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
	const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
	const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
	const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [statusNote, setStatusNote] = useState("");
	const [paymentNote, setPaymentNote] = useState("");
	const [notes, setNotes] = useState(order.notes || "");
	const [trackingNumber, setTrackingNumber] = useState(
		order.shipping?.trackingNumber || "",
	);
	const [carrier, setCarrier] = useState(order.shipping?.carrier || "");
	const [selectedStatus, setSelectedStatus] = useState(order.status);
	const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
		order.paymentStatus,
	);

	const getStatusColor = (status) => {
		const statusColors = {
			pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
			processing: "bg-blue-100 text-blue-800 border-blue-200",
			shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
			delivered: "bg-green-100 text-green-800 border-green-200",
			cancelled: "bg-red-100 text-red-800 border-red-200",
			returned: "bg-orange-100 text-orange-800 border-orange-200",
			partially_shipped: "bg-purple-100 text-purple-800 border-purple-200",
			on_hold: "bg-gray-100 text-gray-800 border-gray-200",
			refunded: "bg-pink-100 text-pink-800 border-pink-200",
		};
		return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
	};

	const getPaymentStatusColor = (status) => {
		const statusColors = {
			pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
			paid: "bg-green-100 text-green-800 border-green-200",
			failed: "bg-red-100 text-red-800 border-red-200",
			refunded: "bg-orange-100 text-orange-800 border-orange-200",
			partially_refunded: "bg-pink-100 text-pink-800 border-pink-200",
			authorized: "bg-blue-100 text-blue-800 border-blue-200",
			voided: "bg-gray-100 text-gray-800 border-gray-200",
		};
		return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
	};

	const handleStatusChange = async (newStatus) => {
		setIsUpdatingStatus(true);
		try {
			const response = await axiosInstance.put(`/orders/${order._id}`, {
				status: newStatus,
				notes: statusNote,
			});
			toast.success("Status updated", {
				description: `Order status changed to ${newStatus}`,
			});
			setStatusNote("");
			router.refresh();
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to update status";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsUpdatingStatus(false);
		}
	};

	const handlePaymentStatusChange = async (newStatus) => {
		setIsUpdatingPayment(true);
		try {
			const response = await axiosInstance.put(`/orders/${order._id}`, {
				paymentStatus: newStatus,
				notes: paymentNote,
			});
			toast.success("Payment status updated", {
				description: `Payment status changed to ${newStatus}`,
			});
			setPaymentNote("");
			router.refresh();
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to update payment status";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsUpdatingPayment(false);
		}
	};

	const handleShippingUpdate = async () => {
		setIsUpdatingShipping(true);
		try {
			const response = await axiosInstance.put(`/orders/${order._id}`, {
				carrier,
				trackingNumber,
			});
			toast.success("Shipping updated", {
				description: "Shipping information has been updated",
			});
			router.refresh();
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to update shipping information";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsUpdatingShipping(false);
		}
	};

	const handleNotesUpdate = async () => {
		setIsUpdatingNotes(true);
		try {
			const response = await axiosInstance.put(`/orders/${order._id}`, {
				notes,
			});
			toast.success("Notes updated", {
				description: "Order notes have been updated",
			});
			router.refresh();
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to update notes";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsUpdatingNotes(false);
		}
	};

	const handleDeleteOrder = async () => {
		setIsDeleting(true);
		try {
			const response = await axiosInstance.delete(`/orders/${order._id}`);
			if (response.data.success) {
				toast.success("Order deleted", {
					description: "The order has been permanently deleted",
				});
				router.push("/admin/orders");
			} else {
				throw new Error("Failed to delete order");
			}
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to delete order";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="space-y-4 px-4 sm:px-6 md:px-8">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
						Order {order.orderId}
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Placed on {format(new Date(order.createdAt), "PPP")} at{" "}
						{format(new Date(order.createdAt), "p")}
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Badge
						className={`text-xs sm:text-sm ${getStatusColor(order.status)}`}
					>
						Status:{" "}
						{order.status.charAt(0).toUpperCase() +
							order.status.slice(1).replace(/_/g, " ")}
					</Badge>
					<Badge
						className={`text-xs sm:text-sm ${getPaymentStatusColor(order.paymentStatus)}`}
					>
						Payment:{" "}
						{order.paymentStatus.charAt(0).toUpperCase() +
							order.paymentStatus.slice(1).replace(/_/g, " ")}
					</Badge>
				</div>
			</div>

			<Tabs defaultValue="details">
				<TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto overflow-x-auto">
					<TabsTrigger value="details" className="text-xs sm:text-sm">
						Order Details
					</TabsTrigger>
					<TabsTrigger value="invoice" className="text-xs sm:text-sm">
						Invoice
					</TabsTrigger>
					<TabsTrigger value="history" className="text-xs sm:text-sm">
						History
					</TabsTrigger>
					<TabsTrigger value="manage" className="text-xs sm:text-sm">
						Manage
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="space-y-4 sm:space-y-6">
					<div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<Package className="h-4 w-4 sm:h-5 sm:w-5" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="rounded-md border overflow-x-auto">
										<table className="min-w-full divide-y divide-border">
											<thead>
												<tr className="bg-muted/50">
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground">
														Product
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-muted-foreground">
														Price
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-muted-foreground">
														Quantity
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-muted-foreground">
														Total
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border">
												{order?.products?.map((item, index) => (
													<tr key={index}>
														<td className="px-2 sm:px-4 py-2 sm:py-3">
															<div className="flex items-center space-x-2 sm:space-x-3">
																{item?.product && item?.product?.thumbnail && (
																	<div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 overflow-hidden rounded-md border">
																		<Image
																			src={
																				item.product.thumbnail ||
																				"/placeholder.svg"
																			}
																			alt={item.name}
																			width={40}
																			height={40}
																			className="h-full w-full object-cover object-center"
																		/>
																	</div>
																)}
																<div className="flex flex-col">
																	<div className="font-medium text-xs sm:text-sm">
																		{item.name}
																	</div>
																	{item.sku && (
																		<div className="text-xs text-muted-foreground">
																			SKU: {item.sku}
																		</div>
																	)}
																	{item?.product && item?.product._id && (
																		<Link
																			href={`/admin/products/${item?.product?._id}`}
																			className="text-xs text-blue-600 hover:underline flex items-center mt-1"
																		>
																			View Product{" "}
																			<ExternalLink className="h-3 w-3 ml-1" />
																		</Link>
																	)}
																</div>
															</div>
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
															<ServerPriceDisplay
																amount={item?.price?.toFixed(2)}
															/>
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
															{item.quantity}
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
															<ServerPriceDisplay
																amount={item?.subtotal?.toFixed(2)}
															/>
														</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr>
													<td
														colSpan={3}
														className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right font-medium"
													>
														Subtotal
													</td>
													<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right">
														<ServerPriceDisplay
															amount={order?.subtotal?.toFixed(2)}
														/>
													</td>
												</tr>
												{order.discount > 0 && (
													<tr>
														<td
															colSpan={3}
															className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right font-medium"
														>
															Discount
															{order?.couponCode && (
																<span className="ml-1 text-xs text-muted-foreground">
																	(Code: {order?.couponCode})
																</span>
															)}
														</td>
														<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right text-red-600">
															-
															<ServerPriceDisplay
																amount={order?.discount?.toFixed(2)}
															/>
														</td>
													</tr>
												)}
												{order.tax > 0 && (
													<tr>
														<td
															colSpan={3}
															className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right font-medium"
														>
															Tax {order?.taxRate > 0 && `(${order?.taxRate}%)`}
														</td>
														<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right">
															<ServerPriceDisplay
																amount={order?.tax?.toFixed(2)}
															/>
														</td>
													</tr>
												)}
												{order?.shippingCharge > 0 && (
													<tr>
														<td
															colSpan={3}
															className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right font-medium"
														>
															Shipping
														</td>
														<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-right">
															<ServerPriceDisplay
																amount={order?.shippingCharge?.toFixed(2)}
															/>
														</td>
													</tr>
												)}
												<tr className="border-t border-border">
													<td
														colSpan={3}
														className="px-2 sm:px-4 py-3 text-sm sm:text-base text-right font-bold"
													>
														Total
													</td>
													<td className="px-2 sm:px-4 py-3 text-sm sm:text-base text-right font-bold">
														<ServerPriceDisplay
															amount={order?.total?.toFixed(2)}
														/>
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<Truck className="h-4 w-4 sm:h-5 sm:w-5" />
									Shipping Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="font-medium text-sm sm:text-base mb-1">
											Shipping Address
										</h3>
										<div className="text-xs sm:text-sm text-muted-foreground">
											<p>
												{order?.profile?.firstName} {order?.profile?.lastName}
											</p>
											<p>{order?.profile?.address}</p>
											{order?.profile?.apartment && (
												<p>{order?.profile?.apartment}</p>
											)}
											<p>
												{order?.profile?.emirate}, {order?.profile?.country}
											</p>
											{order?.profile?.phone && <p>{order?.profile?.phone}</p>}
											{order?.user?.email && <p>{order?.user?.email}</p>}
										</div>
									</div>
									<Separator />
									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="carrier" className="text-sm">
												Carrier
											</Label>
											<Input
												id="carrier"
												placeholder="e.g., UPS, FedEx, USPS"
												value={carrier}
												onChange={(e) => setCarrier(e.target.value)}
												className="text-sm"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="trackingNumber" className="text-sm">
												Tracking Number
											</Label>
											<Input
												id="trackingNumber"
												placeholder="Enter tracking number"
												value={trackingNumber}
												onChange={(e) => setTrackingNumber(e.target.value)}
												className="text-sm"
											/>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full text-sm"
									onClick={handleShippingUpdate}
									disabled={isUpdatingShipping}
								>
									{isUpdatingShipping ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										"Update Shipping Info"
									)}
								</Button>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<FileText className="h-4 w-4 sm:h-5 sm:w-5" />
									Order Notes
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Add internal notes about this order
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Textarea
										placeholder="Add notes about this order"
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
										rows={4}
										className="text-sm"
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full text-sm"
									onClick={handleNotesUpdate}
									disabled={isUpdatingNotes}
								>
									{isUpdatingNotes ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Saving...
										</>
									) : (
										"Save Notes"
									)}
								</Button>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<User className="h-4 w-4 sm:h-5 sm:w-5" />
									Customer
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="font-medium text-sm sm:text-base">
											{order?.profile?.firstName} {order?.profile?.lastName}
										</h3>
										<p className="text-xs sm:text-sm text-muted-foreground">
											{order?.user?.email}
										</p>
										{order?.profile?.phone && (
											<p className="text-xs sm:text-sm text-muted-foreground">
												{order?.profile?.phone}
											</p>
										)}
									</div>
									<Separator />
									<h4 className="font-medium text-sm sm:text-base mt-4">
										Order Without Account:{" "}
										{order?.profile?.isGuest ? "Yes" : "No"}
									</h4>
									{order?.user?._id && (
										<div>
											<p className="text-xs sm:text-sm">
												<span className="font-medium">Account ID:</span>{" "}
												{order?.user?._id.toString()}
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
						{order?.couponCode && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
										<Tag className="h-4 w-4 sm:h-5 sm:w-5" />
										Coupon Information
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-2 sm:gap-4">
											<div>
												<h3 className="text-xs sm:text-sm font-medium">
													Coupon Code
												</h3>
												<p className="text-xs sm:text-sm">
													{order?.couponCode}
												</p>
											</div>
											<div>
												<h3 className="text-xs sm:text-sm font-medium">
													Discount Amount
												</h3>
												<p className="text-xs sm:text-sm text-red-600">
													<ServerPriceDisplay
														amount={order?.discount.toFixed(2)}
													/>
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
						<Card className="md:col-span-3">
							<CardHeader>
								<CardTitle className="text-base sm:text-lg">
									Additional Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="payment-details">
										<AccordionTrigger className="text-sm sm:text-base">
											Payment Details
										</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-2">
												<p className="text-xs sm:text-sm">
													<span className="font-medium">Method:</span>{" "}
													{order?.paymentMethod}
												</p>
												{order?.payments && order?.payments?.length > 0 && (
													<>
														{order?.payments?.map((payment, index) => (
															<div
																key={index}
																className="border p-2 sm:p-3 rounded-md"
															>
																<p className="text-xs sm:text-sm">
																	<span className="font-medium">
																		Transaction ID:
																	</span>
																	{payment?.transactionId || "N/A"}
																</p>

																<p className="text-xs sm:text-sm flex items-center gap-1">
																	<span className="font-medium">Amount:</span>
																	<ServerPriceDisplay amount={order?.total?.toFixed(2)} />
																</p>
																<p className="text-xs sm:text-sm">
																	<span className="font-medium">Status:</span>
																	{order?.paymentStatus}
																</p>
															</div>
														))}
													</>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="invoice">
					<div ref={printRef}>
						<PrintInvoice order={order} />
					</div>
				</TabsContent>

				<TabsContent value="history">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
								<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
								Order History
							</CardTitle>
							<CardDescription className="text-xs sm:text-sm">
								Timeline of order status changes and updates
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{order?.history && order?.history?.length > 0 ? (
									<div className="border rounded-md overflow-x-auto">
										<table className="min-w-full divide-y divide-border">
											<thead>
												<tr className="bg-muted/50">
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground">
														Date
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground">
														Status
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground">
														Payment Status
													</th>
													<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-muted-foreground">
														Note
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border">
												{[...order?.history].reverse().map((entry, index) => (
													<tr key={index}>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
															{format(new Date(entry.timestamp), "PPP p")}
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
															<Badge className={getStatusColor(entry.status)}>
																{entry.status.charAt(0).toUpperCase() +
																	entry.status.slice(1).replace(/_/g, " ")}
															</Badge>
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
															<Badge
																className={getPaymentStatusColor(
																	entry.paymentStatus,
																)}
															>
																{entry.paymentStatus
																	? entry.paymentStatus
																		.charAt(0)
																		.toUpperCase() +
																	entry.paymentStatus
																		.slice(1)
																		.replace(/_/g, " ")
																	: "N/A"}
															</Badge>
														</td>
														<td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
															{entry.note}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<p className="text-muted-foreground text-center py-4 text-sm">
										No history available for this order.
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="manage">
					<div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<Package className="h-4 w-4 sm:h-5 sm:w-5" />
									Order Status
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Update the current order status
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="status" className="text-sm">
											Status
										</Label>
										<p className="text-base text-gray-500">
											Select "Return & Refund Manually" to process returns manually.
										</p>
										<Select
											defaultValue={order?.status}
											onValueChange={(value) => setSelectedStatus(value)}
										>
											<SelectTrigger id="status" className="text-sm">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												{ORDER_STATUSES.map((status) => (
													<SelectItem
														key={status}
														value={status}
														className="text-sm"
													>
														{status.charAt(0).toUpperCase() +
															status.slice(1).replace(/_/g, " ")}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="statusNote" className="text-sm">
											Note (optional)
										</Label>
										<Textarea
											id="statusNote"
											placeholder="Add a note about this status change"
											value={statusNote}
											onChange={(e) => setStatusNote(e.target.value)}
											className="text-sm"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											className="w-full text-sm"
											disabled={isUpdatingStatus}
										>
											{isUpdatingStatus ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Updating...
												</>
											) : (
												"Update Status"
											)}
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle className="text-base sm:text-lg">
												Update Order Status
											</AlertDialogTitle>
											<AlertDialogDescription className="text-sm">
												Are you sure you want to change the order status? This
												action will update the order history.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="text-sm">
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleStatusChange(selectedStatus)}
												className="text-sm"
											>
												Update Status
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
									<CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
									Payment Status
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Update the payment status
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="paymentStatus" className="text-sm">
											Payment Status
										</Label>
										<p className="text-base text-gray-500">
											Select "Return & Refund Manually" to process returns manually.
										</p>
										<Select
											defaultValue={order.paymentStatus}
											onValueChange={(value) => setSelectedPaymentStatus(value)}
										>
											<SelectTrigger id="paymentStatus" className="text-sm">
												<SelectValue placeholder="Select payment status" />
											</SelectTrigger>
											<SelectContent>
												{PAYMENT_STATUSES.map((status) => (
													<SelectItem
														key={status}
														value={status}
														className="text-sm"
													>
														{status.charAt(0).toUpperCase() +
															status.slice(1).replace(/_/g, " ")}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="paymentNote" className="text-sm">
											Note (optional)
										</Label>
										<Textarea
											id="paymentNote"
											placeholder="Add a note about this payment status change"
											value={paymentNote}
											onChange={(e) => setPaymentNote(e.target.value)}
											className="text-sm"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											className="w-full text-sm"
											disabled={isUpdatingPayment}
										>
											{isUpdatingPayment ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Updating...
												</>
											) : (
												"Update Payment Status"
											)}
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle className="text-base sm:text-lg">
												Update Payment Status
											</AlertDialogTitle>
											<AlertDialogDescription className="text-sm">
												Are you sure you want to change the payment status? This
												action will update the order history.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="text-sm">
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													handlePaymentStatusChange(selectedPaymentStatus)
												}
												className="text-sm"
											>
												Update Payment Status
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</CardFooter>
						</Card>
						<Card className="border-red-200">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base sm:text-lg text-red-600">
									<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
									Delete Order
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Permanently delete this order and all associated data
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-xs sm:text-sm text-muted-foreground">
									This action cannot be undone. This will permanently delete the
									order and remove all associated data from our servers.
								</p>
							</CardContent>
							<CardFooter>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant="destructive"
											className="w-full text-sm"
											disabled={isDeleting}
										>
											{isDeleting ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Deleting...
												</>
											) : (
												"Delete Order"
											)}
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle className="text-base sm:text-lg">
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription className="text-sm">
												This action cannot be undone. This will permanently
												delete the order #{order?.orderId} and remove all
												associated data from our servers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="text-sm">
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={handleDeleteOrder}
												className="bg-red-600 hover:bg-red-700 text-sm"
											>
												Delete Order
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</CardFooter>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
