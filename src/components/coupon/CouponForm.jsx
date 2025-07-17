// pages/admin/coupons/[id].js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/lib/axiosInstance";
const couponSchema = z
	.object({
		code: z
			.string()
			.min(3, { message: "Code must be at least 3 characters" })
			.max(20, { message: "Code must not exceed 20 characters" })
			.regex(/^[A-Za-z0-9_-]+$/, {
				message: "Only letters, numbers, underscores & hyphens",
			}),
		type: z.enum(["percentage", "fixed", "free_shipping", "buy_x_get_y"]),
		value: z.coerce.number().nonnegative(),
		minPurchaseAmount: z.coerce.number().nonnegative().default(0),
		maxDiscountAmount: z.coerce.number().nonnegative().default(0),
		isActive: z.boolean().default(true),
		startDate: z.date(),
		expiryDate: z.date(),
		usageLimit: z.coerce.number().int().nonnegative().default(0),
		perCustomerLimit: z.coerce.number().int().nonnegative().default(0),
		applicability: z.enum(["all", "products", "categories", "customers"]),
		applicableProducts: z.array(z.string()).optional(),
		applicableCategories: z.array(z.string()).optional(),
		excludedProducts: z.array(z.string()).optional(),
		excludedCategories: z.array(z.string()).optional(),
		customerType: z.enum(["all", "new", "returning", "vip"]),
		customerGroups: z.array(z.string()).optional(),
		firstPurchaseOnly: z.boolean().default(false),
		buyXQuantity: z.coerce.number().int().nonnegative().optional(),
		getYQuantity: z.coerce.number().int().nonnegative().optional(),
		getYProductId: z.string().optional(),
		hasTimeRestrictions: z.boolean().default(false),
		daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
		hoursOfDay: z
			.object({
				start: z.number().min(0).max(23),
				end: z.number().min(0).max(23),
			})
			.optional(),
		canCombineWithOtherCoupons: z.boolean().default(false),
		description: z.string().optional(),
		status: z.enum(["active", "expired", "disabled", "scheduled"]),
		featured: z.boolean().default(false),
	})
	.refine((data) => data.expiryDate > data.startDate, {
		message: "Expiry must be after start",
		path: ["expiryDate"],
	})
	.refine(
		(data) => {
			if (data.type === "percentage" && data.value > 100) return false;
			return true;
		},
		{
			message: "Percentage cannot exceed 100%",
			path: ["value"],
		},
	)
	.refine(
		(data) => {
			if (data.type === "buy_x_get_y") {
				return (
					data.buyXQuantity > 0 && data.getYQuantity > 0 && !!data.getYProductId
				);
			}
			return true;
		},
		{
			message: "Buy-X-Get-Y fields required",
			path: ["buyXQuantity"],
		},
	);

export default function CouponForm({ coupon, products, categories }) {
	console.log({
		coupon,
		products,
		categories,
	});
	const isEditing = Boolean(coupon);
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [activeTab, setActiveTab] = useState("basic");

	const form = useForm({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			code: coupon?.code || "",
			type: coupon?.type || "percentage",
			value: coupon?.value || 0,
			minPurchaseAmount: coupon?.minPurchaseAmount || 0,
			maxDiscountAmount: coupon?.maxDiscountAmount || 0,
			isActive: coupon?.isActive ?? true,
			startDate: coupon?.startDate ? new Date(coupon.startDate) : new Date(),
			expiryDate: coupon?.expiryDate
				? new Date(coupon.expiryDate)
				: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			usageLimit: coupon?.usageLimit || 0,
			perCustomerLimit: coupon?.perCustomerLimit || 0,
			applicability: coupon?.applicability || "all",
			applicableProducts: coupon?.applicableProducts || [],
			applicableCategories: coupon?.applicableCategories || [],
			excludedProducts: coupon?.excludedProducts || [],
			excludedCategories: coupon?.excludedCategories || [],
			customerType: coupon?.customerType || "all",
			customerGroups: coupon?.customerGroups || [],
			firstPurchaseOnly: coupon?.firstPurchaseOnly || false,
			buyXQuantity: coupon?.buyXQuantity || 0,
			getYQuantity: coupon?.getYQuantity || 0,
			getYProductId: coupon?.getYProductId || "",
			hasTimeRestrictions: coupon?.hasTimeRestrictions || false,
			daysOfWeek: coupon?.daysOfWeek || [],
			hoursOfDay: coupon?.hoursOfDay || { start: 0, end: 23 },
			canCombineWithOtherCoupons: coupon?.canCombineWithOtherCoupons || false,
			description: coupon?.description || "",
			status: coupon?.status || "active",
			featured: coupon?.featured || false,
		},
	});

	const watchType = form.watch("type");
	const watchApplicability = form.watch("applicability");
	const watchHasTimeRestrictions = form.watch("hasTimeRestrictions");

	async function onSubmit(data) {
		setSubmitting(true);
		console.log("Submitting data:", data);
		console.log("Coupon ID:", coupon?._id);

		try {
			let res;

			if (isEditing && coupon?._id) {
				res = await axiosInstance.put(`/coupons/${coupon?._id}`, data);
			} else {
				res = await axiosInstance.post("/coupons", data);
			}
			console.log("Response:", res);

			if (res.status >= 200 && res.status < 300) {
				toast.success(isEditing ? "Updated coupon" : "Created coupon");
				router.push("/admin/coupons");
			} else {
				toast.error(result.message || "Error");
			}
		} catch (e) {
			console.log({ error: e });

			toast.error("Network error");
		} finally {
			setSubmitting(false);
		}
	}

	// Days & hours helpers
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const hoursOfDay = Array.from({ length: 24 }, (_, i) => ({
		id: i,
		label:
			i === 0
				? "12 AM"
				: i < 12
					? `${i} AM`
					: i === 12
						? "12 PM"
						: `${i - 12} PM`,
	}));

	return (
		<>
			<div className="max-w-4xl mx-auto p-6">
				<h1 className="text-2xl font-bold mb-4">
					{isEditing ? "Edit Coupon" : "New Coupon"}
				</h1>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="grid grid-cols-4">
								{["basic", "restrictions", "applicability", "advanced"].map(
									(tab) => (
										<TabsTrigger key={tab} value={tab}>
											{tab.charAt(0).toUpperCase() + tab.slice(1)}
										</TabsTrigger>
									),
								)}
							</TabsList>

							{/* ===== Basic ===== */}
							<TabsContent value="basic" className="space-y-4">
								{/* Code */}
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) =>
														field.onChange(e.target.value.toUpperCase())
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Type */}
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="percentage">
															Percentage
														</SelectItem>
														<SelectItem value="fixed">Fixed</SelectItem>
														<SelectItem value="free_shipping">
															Free Shipping
														</SelectItem>
														<SelectItem value="buy_x_get_y">
															Buy X Get Y
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Value if not free shipping */}
								{watchType !== "free_shipping" && (
									<FormField
										control={form.control}
										name="value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{watchType === "percentage" ? "%" : "Value"}
												</FormLabel>
												<FormControl>
													<Input type="number" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{/* Description */}
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</TabsContent>

							{/* ===== Restrictions ===== */}
							<TabsContent value="restrictions" className="space-y-4">
								{[
									"minPurchaseAmount",
									"maxDiscountAmount",
									"usageLimit",
									"perCustomerLimit",
								].map((name) => (
									<FormField
										key={name}
										control={form.control}
										name={name}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{name.replace(/([A-Z])/g, " $1")}</FormLabel>
												<FormControl>
													<Input type="number" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
								{/* First purchase only */}
								<FormField
									control={form.control}
									name="firstPurchaseOnly"
									render={({ field }) => (
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>First Purchase Only</FormLabel>
										</FormItem>
									)}
								/>
								{/* Combinable */}
								<FormField
									control={form.control}
									name="canCombineWithOtherCoupons"
									render={({ field }) => (
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>Can Combine</FormLabel>
										</FormItem>
									)}
								/>
								{/* Time restrictions */}
								<FormField
									control={form.control}
									name="hasTimeRestrictions"
									render={({ field }) => (
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>Enable Time Restrictions</FormLabel>
										</FormItem>
									)}
								/>
								{watchHasTimeRestrictions && (
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="time">
											<AccordionTrigger>Time Restriction Details</AccordionTrigger>
											<AccordionContent>
												{/* Days */}
												<FormField
													control={form.control}
													name="daysOfWeek"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Valid Days</FormLabel>
															<div className="flex flex-wrap gap-2">
																{daysOfWeek.map((d, i) => (
																	<label
																		key={i}
																		className="flex items-center space-x-1"
																	>
																		<input
																			type="checkbox"
																			checked={
																				field.value?.includes(i) || false
																			}
																			onChange={(e) => {
																				const arr = field.value || [];
																				field.onChange(
																					e.target.checked
																							? [...arr, i]
																							: arr.filter((x) => x !== i),
																				);
																			}}
																		/>
																		<span>{d}</span>
																	</label>
																))}
															</div>
														</FormItem>
													)}
												/>
												{/* Hours */}
												<div className="grid grid-cols-2 gap-4">
													{["start", "end"].map((name) => (
														<FormField
															key={name}
															control={form.control}
															name={`hoursOfDay.${name}`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{name === "start" ? "From" : "To"} Hour
																	</FormLabel>
																	<FormControl>
																		<Select
																			onValueChange={(v) =>
																				field.onChange(parseInt(v))
																			}
																			value={field.value.toString()}
																		>
																			<SelectTrigger>
																				<SelectValue />
																			</SelectTrigger>
																			<SelectContent>
																				{hoursOfDay.map((h) => (
																					<SelectItem
																						key={h.id}
																						value={h.id.toString()}
																					>
																						{h.label}
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																	</FormControl>
																</FormItem>
															)}
														/>
													))}
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								)}
							</TabsContent>

							{/* ===== Applicability ===== */}
							<TabsContent value="applicability" className="space-y-4">
								{/* Applicability select */}
								<FormField
									control={form.control}
									name="applicability"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Applies To</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">All Products</SelectItem>
														<SelectItem value="products">
															Specific Products
														</SelectItem>
														<SelectItem value="categories">
															Specific Categories
														</SelectItem>
														<SelectItem value="customers">
															Specific Customers
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								{/* Depending on choice */}
								{watchApplicability === "products" && (
									<FormField
										control={form.control}
										name="applicableProducts"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Products</FormLabel>
												<ScrollArea className="h-48 border p-2">
													{products.map((p) => (
														<label
															key={p._id}
															className="flex items-center space-x-2"
														>
															<input
																type="checkbox"
																checked={field.value?.includes(p._id) || false}
																onChange={(e) => {
																	const arr = field.value || [];
																	field.onChange(
																		e.target.checked
																			? [...arr, p._id]
																			: arr.filter((x) => x !== p._id),
																	);
																}}
															/>
															<span>{p.name}</span>
														</label>
													))}
												</ScrollArea>
											</FormItem>
										)}
									/>
								)}
								{watchApplicability === "categories" && (
									<FormField
										control={form.control}
										name="applicableCategories"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Categories</FormLabel>
												<ScrollArea className="h-48 border p-2">
													{categories.map((c) => (
														<label
															key={c._id}
															className="flex items-center space-x-2"
														>
															<input
																type="checkbox"
																checked={field.value?.includes(c._id) || false}
																onChange={(e) => {
																	const arr = field.value || [];
																	field.onChange(
																		e.target.checked
																			? [...arr, c._id]
																			: arr.filter((x) => x !== c._id),
																	);
																}}
															/>
															<span>{c.name}</span>
														</label>
													))}
												</ScrollArea>
											</FormItem>
										)}
									/>
								)}
								{watchApplicability === "customers" && (
									<FormField
										control={form.control}
										name="customerType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Customer Type</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="all">All</SelectItem>
															<SelectItem value="new">New</SelectItem>
															<SelectItem value="returning">
																Returning
															</SelectItem>
															<SelectItem value="vip">VIP</SelectItem>
														</SelectContent>
													</Select>
												</FormControl>
											</FormItem>
										)}
									/>
								)}
							</TabsContent>

							{/* ===== Advanced ===== */}
							<TabsContent value="advanced" className="space-y-4">
								{/* Free dates */}
								{["startDate", "expiryDate"].map((name) => (
									<FormField
										key={name}
										control={form.control}
										name={name}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{name === "startDate" ? "Start" : "Expiry"} Date
												</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															className={cn(
																"w-full text-left",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value
																? format(field.value, "PPP")
																: "Pick date"}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent>
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															disabled={
																name === "expiryDate"
																	? (d) =>
																			d < new Date(form.getValues("startDate"))
																	: undefined
															}
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
								{/* Featured switch */}
								<FormField
									control={form.control}
									name="featured"
									render={({ field }) => (
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>Featured</FormLabel>
										</FormItem>
									)}
								/>
								{/* Status */}
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="active">Active</SelectItem>
														<SelectItem value="scheduled">Scheduled</SelectItem>
														<SelectItem value="expired">Expired</SelectItem>
														<SelectItem value="disabled">Disabled</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
							</TabsContent>
						</Tabs>

						<div className="flex justify-end space-x-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/admin/coupons")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={submitting}>
								{submitting ? "Saving…" : isEditing ? "Update" : "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
}

// --- SSR data fetching ---
