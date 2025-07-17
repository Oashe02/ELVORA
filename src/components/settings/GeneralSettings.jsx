import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

const generalSettingsSchema = z.object({
	storeName: z.string().min(1, "Store name is required"),
	storeEmail: z.string().email("Invalid email address"),
	storePhone: z.string().optional(),
	storeAddress: z.string().optional(),
	storeCity: z.string().optional(),
	storeState: z.string().optional(),
	storeZip: z.string().optional(),
	storeCountry: z.string().optional(),
	currency: z.string().min(1, "Currency is required"),
	weightUnit: z.enum(["kg", "g", "lb", "oz"]).default("kg"),
	dimensionUnit: z.enum(["cm", "m", "in", "ft"]).default("cm"),
	enableInventoryTracking: z.boolean().default(true),
	lowStockThreshold: z.coerce.number().int().min(0).default(5),
	orderPrefix: z.string().default("ORD-"),
});

export function GeneralSettings({ initialSettings }) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Set default values for the form
	const defaultValues = {
		storeName: initialSettings?.storeName,
		storeEmail: initialSettings?.storeEmail,
		storePhone: initialSettings?.storePhone,
		storeAddress: initialSettings?.storeAddress,
		storeCity: initialSettings?.storeCity,
		storeState: initialSettings?.storeState,
		storeZip: initialSettings?.storeZip,
		storeCountry: initialSettings?.storeCountry,
		currency: initialSettings?.currency,
		weightUnit: initialSettings?.weightUnit,
		dimensionUnit: initialSettings?.dimensionUnit,
		enableInventoryTracking: initialSettings?.enableInventoryTracking,
		lowStockThreshold: initialSettings?.lowStockThreshold,
		orderPrefix: initialSettings?.orderPrefix,
	};

	const form = useForm({
		resolver: zodResolver(generalSettingsSchema),
		defaultValues,
	});

	async function onSubmit(data) {
		setIsSubmitting(true);
		try {
			const response = await axiosInstance.put(`/settings`, {
				general: data,
			});
			toast("Settings updated successfully");
		} catch (error) {
			console.error("Failed to update settings:", error);
			toast.error("Failed to update settings");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Store Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="storeName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Store Name</FormLabel>
									<FormControl>
										<Input placeholder="My Store" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="storeEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Store Email</FormLabel>
									<FormControl>
										<Input placeholder="store@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="storePhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Store Phone</FormLabel>
									<FormControl>
										<Input placeholder="+1 (555) 123-4567" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="storeAddress"
							render={({ field }) => (
								<FormItem>
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
							name="storeCity"
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
							name="storeState"
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
							name="storeZip"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ZIP/Postal Code</FormLabel>
									<FormControl>
										<Input placeholder="10001" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="storeCountry"
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
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-medium">Store Preferences</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="currency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Currency</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select currency" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="AED">AED (AED)</SelectItem>
											<SelectItem value="USD">USD ($)</SelectItem>
											<SelectItem value="EUR">EUR (€)</SelectItem>
											<SelectItem value="GBP">GBP (£)</SelectItem>
											<SelectItem value="JPY">JPY (¥)</SelectItem>
											<SelectItem value="CAD">CAD (C$)</SelectItem>
											<SelectItem value="AUD">AUD (A$)</SelectItem>
											<SelectItem value="INR">INR (₹)</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="weightUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Weight Unit</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select weight unit" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="kg">Kilograms (kg)</SelectItem>
											<SelectItem value="g">Grams (g)</SelectItem>
											<SelectItem value="lb">Pounds (lb)</SelectItem>
											<SelectItem value="oz">Ounces (oz)</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="dimensionUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dimension Unit</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select dimension unit" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="cm">Centimeters (cm)</SelectItem>
											<SelectItem value="m">Meters (m)</SelectItem>
											<SelectItem value="in">Inches (in)</SelectItem>
											<SelectItem value="ft">Feet (ft)</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="orderPrefix"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Order ID Prefix</FormLabel>
									<FormControl>
										<Input placeholder="ORD-" {...field} />
									</FormControl>
									<FormDescription>
										Prefix used for order numbers (e.g., ORD-12345)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="enableInventoryTracking"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">
										Enable Inventory Tracking
									</FormLabel>
									<FormDescription>
										Track product inventory and manage stock levels
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lowStockThreshold"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Low Stock Threshold</FormLabel>
								<FormControl>
									<Input type="number" min="0" {...field} />
								</FormControl>
								<FormDescription>
									Products with stock below this number will be marked as low
									stock
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Changes"}
				</Button>
			</form>
		</Form>
	);
}
