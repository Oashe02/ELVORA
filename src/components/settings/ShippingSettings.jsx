"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

const shippingMethodSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	cost: z.coerce.number().min(0, "Cost must be a positive number"),
	freeShippingThreshold: z.coerce
		.number()
		.min(0, "Threshold must be a positive number")
		.optional(),
	estimatedDeliveryDays: z.coerce
		.number()
		.int()
		.min(0, "Days must be a positive integer")
		.optional(),
	isDefault: z.boolean().default(false),
	regions: z.array(z.string()).default([]),
	active: z.boolean().default(true),
});

const shippingSettingsSchema = z.object({
	enabled: z.boolean().default(true),
	calculationType: z.enum(["flat", "weight", "price"]).default("flat"),
	shippingOrigin: z.object({
		address: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		country: z.string().optional(),
		zipCode: z.string().optional(),
	}),
	shippingMethods: z.array(shippingMethodSchema).default([]),
});

export function ShippingSettings({ initialSettings }) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Set default values for the form
	const defaultValues = {
		enabled: initialSettings?.enabled ?? true,
		calculationType: initialSettings?.calculationType ?? "flat",
		shippingOrigin: initialSettings?.shippingOrigin ?? {
			address: "",
			city: "",
			state: "",
			country: "",
			zipCode: "",
		},
		shippingMethods: initialSettings?.shippingMethods ?? [
			{
				name: "Standard Shipping",
				description: "Delivery within 3-5 business days",
				cost: 5.99,
				freeShippingThreshold: 50,
				estimatedDeliveryDays: 5,
				isDefault: true,
				regions: ["Domestic"],
				active: true,
			},
		],
	};

	const form = useForm({
		resolver: zodResolver(shippingSettingsSchema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "shippingMethods",
	});

	async function onSubmit(data) {
		setIsSubmitting(true);
		try {
			const response = await axiosInstance.put(`/settings`, {
				shipping: data,
			});
			toast("Settings Updated Successfully", {
				description: "Your shipping settings have been updated.",
			});
		} catch (error) {
			console.error("Failed to update settings:", error);
			toast.error("Failed to update settings", {
				description:
					"There was an error updating your shipping settings. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="enabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">Enable Shipping</FormLabel>
								<FormDescription>
									Enable or disable shipping for your store.
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

				<div className="space-y-4">
					<h3 className="text-lg font-medium">Shipping Origin</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="shippingOrigin.address"
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
							name="shippingOrigin.city"
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
							name="shippingOrigin.state"
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
							name="shippingOrigin.country"
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
							name="shippingOrigin.zipCode"
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
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium">Shipping Methods</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() =>
								append({
									name: "",
									description: "",
									cost: 0,
									freeShippingThreshold: 0,
									estimatedDeliveryDays: 0,
									isDefault: fields.length === 0,
									regions: [],
									active: true,
								})
							}
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Shipping Method
						</Button>
					</div>

					{fields.map((field, index) => (
						<Card key={field.id}>
							<CardContent className="pt-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`shippingMethods.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g. Standard Shipping"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`shippingMethods.${index}.cost`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Cost</FormLabel>
												<FormControl>
													<Input type="number" step="0.01" min="0" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`shippingMethods.${index}.description`}
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder="e.g. Delivery within 3-5 business days"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`shippingMethods.${index}.freeShippingThreshold`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Free Shipping Threshold</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="0.01"
														min="0"
														placeholder="0 for no free shipping"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Orders above this amount qualify for free shipping (0
													for no free shipping)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`shippingMethods.${index}.estimatedDeliveryDays`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Estimated Delivery Days</FormLabel>
												<FormControl>
													<Input type="number" min="0" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`shippingMethods.${index}.isDefault`}
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
												<div className="space-y-0.5">
													<FormLabel>Default Method</FormLabel>
													<FormDescription>
														Use as default shipping method
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
										name={`shippingMethods.${index}.active`}
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
												<div className="space-y-0.5">
													<FormLabel>Active</FormLabel>
													<FormDescription>
														Enable or disable this shipping method
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
								</div>

								<div className="flex justify-end mt-4">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => remove(index)}
										disabled={fields.length === 1}
									>
										<Trash2 className="mr-2 h-4 w-4" />
										Remove
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Changes"}
				</Button>
			</form>
		</Form>
	);
}
