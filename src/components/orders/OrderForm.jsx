"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { createOrder, updateOrder } from "@/lib/actions/order-actions";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";

// Form schema validation
const orderSchema = z.object({
	customer: z.object({
		lastName: z
			.string()
			.min(2, { message: "Last Name must be at least 2 characters" }),
		firstName: z
			.string()
			.min(2, { message: "First Name must be at least 2 characters" }),
		email: z.string().email({ message: "Please enter a valid email address" }),
		phone: z.string().optional(),
	}),
	shipping: z.object({
		address: z
			.string()
			.min(5, { message: "Address must be at least 5 characters" }),
		city: z.string().min(2, { message: "City must be at least 2 characters" }),
		state: z
			.string()
			.min(2, { message: "State must be at least 2 characters" }),
		postalCode: z
			.string()
			.min(2, { message: "Postal code must be at least 2 characters" }),
		country: z
			.string()
			.min(2, { message: "Country must be at least 2 characters" }),
		trackingNumber: z.string().optional(),
		carrier: z.string().optional(),
	}),
	products: z
		.array(
			z.object({
				product: z.string({ required_error: "Product is required" }),
				name: z.string().optional(),
				price: z.coerce
					.number()
					.positive({ message: "Price must be positive" }),
				quantity: z.coerce
					.number()
					.int()
					.positive({ message: "Quantity must be a positive integer" }),
				subtotal: z.coerce.number().optional(),
			}),
		)
		.min(1, { message: "At least one product is required" }),
	subtotal: z.coerce.number().optional(),
	discount: z.coerce
		.number()
		.nonnegative({ message: "Discount must be non-negative" })
		.default(0),
	tax: z.coerce
		.number()
		.nonnegative({ message: "Tax must be non-negative" })
		.default(0),
	shippingCharge: z.coerce
		.number()
		.nonnegative({ message: "Shipping cost must be non-negative" })
		.default(0),
	total: z.coerce.number().optional(),
	status: z.enum(
		["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
		{
			required_error: "Please select a status",
		},
	),
	paymentStatus: z.enum(["pending", "paid", "failed", "refunded"], {
		required_error: "Please select a payment status",
	}),
	paymentMethod: z
		.string()
		.min(2, { message: "Payment method must be at least 2 characters" }),
	notes: z.string().optional(),
	billingAddress: z.object({
		address: z
			.string()
			.min(5, { message: "Address must be at least 5 characters" }),
		city: z.string().min(2, { message: "City must be at least 2 characters" }),
		state: z
			.string()
			.min(2, { message: "State must be at least 2 characters" }),
		postalCode: z
			.string()
			.min(2, { message: "Postal code must be at least 2 characters" }),
		country: z
			.string()
			.min(2, { message: "Country must be at least 2 characters" }),
		phone: z.string().optional(),
	}),
});

export function OrderForm({ order, isEditing = false, products = [] }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch products

	// Initialize form with existing order data or defaults
	const form = useForm({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			customer: {
				lastName: order?.customer?.lastName || "",
				firstName: order?.customer?.firstName || "",
				email: order?.customer?.email || "",
				phone: order?.customer?.phone || "",
			},
			shipping: {
				address: order?.shipping?.address || "",
				city: order?.shipping?.city || "",
				state: order?.shipping?.state || "",
				postalCode: order?.shipping?.postalCode || "",
				country: order?.shipping?.country || "",
				trackingNumber: order?.shipping?.trackingNumber || "",
				carrier: order?.shipping?.carrier || "",
			},
			billingAddress: {
				address: order?.billingAddress?.address || "",
				city: order?.billingAddress?.city || "",
				state: order?.billingAddress?.state || "",
				postalCode: order?.billingAddress?.postalCode || "",
				country: order?.billingAddress?.country || "",
				phone: order?.billingAddress?.phone || "",
			},
			products: order?.products?.map((item) => ({
				product:
					typeof item.product === "object"
						? item.product._id?.toString()
						: item.product?.toString(),
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				subtotal: item.subtotal,
			})) || [{ product: "", name: "", price: 0, quantity: 1, subtotal: 0 }],
			subtotal: order?.subtotal || 0,
			discount: order?.discount || 0,
			tax: order?.tax || 0,
			shippingCharge: order?.shippingCharge || 0,
			total: order?.total || 0,
			status: order?.status || "pending",
			paymentStatus: order?.paymentStatus || "pending",
			paymentMethod: order?.paymentMethod || "credit_card",
			notes: order?.notes || "",
		},
	});

	// Watch form values to calculate totals
	const watchProducts = form.watch("products");
	const watchDiscount = form.watch("discount");
	const watchTax = form.watch("tax");
	const watchShipping = form.watch("shippingCharge");

	// Calculate subtotal and total when products change
	useEffect(() => {
		const calculateTotals = () => {
			// Calculate subtotal
			const subtotal = watchProducts.reduce((sum, item) => {
				const itemSubtotal = Number(item.price) * Number(item.quantity);
				return Number(sum) + Number(itemSubtotal);
			}, 0);

			// Calculate total
			const total =
				Number(subtotal) +
				Number(watchTax) +
				Number(watchShipping) -
				Number(watchDiscount);

			// Update form values
			form.setValue("subtotal", subtotal);
			form.setValue("total", total);
		};

		calculateTotals();
	}, [watchProducts, watchDiscount, watchTax, watchShipping, form]);

	// Handle product selection
	const handleProductChange = (index, productId) => {
		const selectedProduct = products.find(
			(p) => p._id.toString() === productId,
		);

		if (selectedProduct) {
			const price = selectedProduct.price;
			const quantity = form.getValues(`products.${index}.quantity`) || 1;
			const subtotal = price * quantity;

			form.setValue(`products.${index}.name`, selectedProduct.name);
			form.setValue(`products.${index}.price`, price);
			form.setValue(`products.${index}.subtotal`, subtotal);
		}
	};

	// Handle quantity change
	const handleQuantityChange = (index, quantity) => {
		const price = form.getValues(`products.${index}.price`) || 0;
		const subtotal = price * quantity;

		form.setValue(`products.${index}.subtotal`, subtotal);
	};

	// Add product line
	const addProductLine = () => {
		const currentProducts = form.getValues("products");
		form.setValue("products", [
			...currentProducts,
			{ product: "", name: "", price: 0, quantity: 1, subtotal: 0 },
		]);
	};

	// Remove product line
	const removeProductLine = (index) => {
		const currentProducts = form.getValues("products");
		if (currentProducts.length > 1) {
			form.setValue(
				"products",
				currentProducts.filter((_, i) => i !== index),
			);
		}
	};

	async function onSubmit(data) {
		setIsSubmitting(true);

		try {
			// Process data
			const processedData = {
				...data,
				// Calculate subtotal and total again to ensure accuracy
				subtotal: data.products.reduce(
					(sum, item) => sum + Number(item.price) * Number(item.quantity),
					0,
				),
				total:
					Number(
						data.products.reduce(
							(sum, item) => sum + Number(item.price) * Number(item.quantity),
							0,
						),
					) +
					Number(data.tax) +
					Number(data.shippingCharge) -
					Number(data.discount),
			};

			let res;

			// if (isEditing && order?._id) {
			// 	result = await updateOrder(order._id.toString(), processedData);
			// } else {
			// 	result = await createOrder(processedData);
			// 	console.log({ result });
			// }

			if (isEditing && coupon?._id) {
				res = await axiosInstance.put(
					`/orders/${order._id.toString()}`,
					processedData,
				);
			} else {
				res = await axiosInstance.post("/orders", processedData);
			}
			console.log("Response:", res);

			if (res.status >= 200 && res.status < 300) {
				toast.success(isEditing ? "Updated coupon" : "Created coupon");
				router.push("/admin/coupons");
			} else {
				toast.error(result.message || "Error");
			}

			console.log({ result });
		} catch (error) {
			toast("");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{isEditing ? "Edit Order" : "Add New Order"}</CardTitle>
				<CardDescription>
					{isEditing
						? "Update the order information below"
						: "Fill in the details to create a new order"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* Customer Information */}
						<div>
							<h3 className="text-lg font-medium mb-4">Customer Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="customer.firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Customer First Name</FormLabel>
											<FormControl>
												<Input placeholder="John Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="customer.lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Customer Last Name</FormLabel>
											<FormControl>
												<Input placeholder="John Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="customer.email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="john@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="customer.phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input placeholder="+1 (555) 123-4567" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Shipping Information */}
						<div>
							<h3 className="text-lg font-medium mb-4">Shipping Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="shipping.address"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input placeholder="123 Main St" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input placeholder="New York" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>State/Province</FormLabel>
											<FormControl>
												<Input placeholder="NY" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.postalCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Postal Code</FormLabel>
											<FormControl>
												<Input placeholder="10001" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Input placeholder="United States" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.carrier"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Carrier</FormLabel>
											<FormControl>
												<Input placeholder="FedEx" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shipping.trackingNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tracking Number</FormLabel>
											<FormControl>
												<Input placeholder="TRK123456789" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Products */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-medium">Products</h3>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addProductLine}
								>
									<Plus className="h-4 w-4 mr-1" />
									Add Product
								</Button>
							</div>

							{watchProducts.map((_, index) => (
								<div
									key={index}
									className="grid grid-cols-12 gap-4 mb-4 items-end"
								>
									<FormField
										control={form.control}
										name={`products.${index}.product`}
										render={({ field }) => (
											<FormItem className="col-span-4">
												<FormLabel>Product</FormLabel>
												<Select
													onValueChange={(value) => {
														field.onChange(value);
														handleProductChange(index, value);
													}}
													defaultValue={field.value}
													disabled={products.length === 0}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a product" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{products.length === 0 ? (
															<SelectItem value="no-products" disabled>
																No products available
															</SelectItem>
														) : (
															products.map((product) => (
																<SelectItem
																	key={product._id.toString()}
																	value={product._id.toString()}
																>
																	{product.name} (${product.price.toFixed(2)})
																</SelectItem>
															))
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`products.${index}.price`}
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="0.01"
														placeholder="0.00"
														{...field}
														onChange={(e) => {
															field.onChange(Number.parseFloat(e.target.value));
															handleQuantityChange(
																index,
																form.getValues(`products.${index}.quantity`),
															);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`products.${index}.quantity`}
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Quantity</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="1"
														{...field}
														onChange={(e) => {
															field.onChange(Number.parseInt(e.target.value));
															handleQuantityChange(
																index,
																Number.parseInt(e.target.value),
															);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`products.${index}.subtotal`}
										render={({ field }) => (
											<FormItem className="col-span-3">
												<FormLabel>Subtotal</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="0.01"
														placeholder="0.00"
														{...field}
														readOnly
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="col-span-1"
										onClick={() => removeProductLine(index)}
										disabled={watchProducts.length <= 1}
									>
										<Trash2 className="h-4 w-4 text-destructive" />
									</Button>
								</div>
							))}
						</div>

						{/* Order Summary */}
						<div>
							<h3 className="text-lg font-medium mb-4">Order Summary</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="subtotal"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subtotal</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="0.00"
													{...field}
													readOnly
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="discount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Discount</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="0.00"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="tax"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tax</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="0.00"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="shippingCharge"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Shipping Cost</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="0.00"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="total"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Total</FormLabel>
											<FormControl>
												<Input
													type="number"
													step="0.01"
													placeholder="0.00"
													{...field}
													readOnly
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="paymentMethod"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Payment Method</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select payment method" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="credit_card">
														Credit Card
													</SelectItem>
													<SelectItem value="paypal">PayPal</SelectItem>
													<SelectItem value="bank_transfer">
														Bank Transfer
													</SelectItem>
													<SelectItem value="cash_on_delivery">
														Cash on Delivery
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Status */}
						<div>
							<h3 className="text-lg font-medium mb-4">Order Status</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Order Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select order status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="pending">Pending</SelectItem>
													<SelectItem value="processing">Processing</SelectItem>
													<SelectItem value="shipped">Shipped</SelectItem>
													<SelectItem value="delivered">Delivered</SelectItem>
													<SelectItem value="cancelled">Cancelled</SelectItem>
													<SelectItem value="returned">Returned</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="paymentStatus"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Payment Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select payment status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="pending">Pending</SelectItem>
													<SelectItem value="paid">Paid</SelectItem>
													<SelectItem value="failed">Failed</SelectItem>
													<SelectItem value="refunded">Refunded</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Notes */}
						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Additional notes about the order"
											className="resize-none min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Billing Address */}
						<div>
							<h3 className="text-lg font-medium mb-4">Billing Address</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="billingAddress.address"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input placeholder="456 Elm Street" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingAddress.city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input placeholder="Los Angeles" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingAddress.state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>State</FormLabel>
											<FormControl>
												<Input placeholder="CA" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingAddress.postalCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Postal Code</FormLabel>
											<FormControl>
												<Input placeholder="90001" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingAddress.country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Input placeholder="USA" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="billingAddress.phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone (optional)</FormLabel>
											<FormControl>
												<Input placeholder="+1 555-987-6543" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/admin/orders")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting
									? "Saving..."
									: isEditing
										? "Update Order"
										: "Create Order"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
