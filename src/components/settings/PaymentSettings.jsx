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
import { Trash2, Plus, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

const paymentMethodSchema = z.object({
	name: z.string().min(1, "Name is required"),
	key: z
		.string()
		.min(1, "Key is required")
		.regex(
			/^[a-z0-9_-]+$/,
			"Key must contain only lowercase letters, numbers, hyphens, and underscores",
		),
	description: z.string().optional(),
	enabled: z.boolean().default(true),
});

const paymentSettingsSchema = z.object({
	methods: z.array(paymentMethodSchema).default([]),
});

export function PaymentSettings({ initialSettings }) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Set default values for the form
	const defaultValues = {
		methods: initialSettings?.methods,
	};

	const form = useForm({
		resolver: zodResolver(paymentSettingsSchema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "methods",
	});

	async function onSubmit(data) {
		setIsSubmitting(true);
		try {
			const response = await axiosInstance.put(`/settings`, {
				payment: data,
			});
			toast("Settings Updated Successfully", {
				description: "Your payment settings have been updated.",
			});
		} catch (error) {
			console.error("Failed to update settings:", error);
			toast.error("Failed to update settings", {
				description:
					"There was an error updating your payment settings. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	const handleNameChange = (index, value) => {
		const currentKey = form.getValues(`methods.${index}.key`);

		// Only auto-generate key if it's empty or hasn't been manually edited
		if (!currentKey) {
			const generatedKey = value
				.toLowerCase()
				.replace(/[^a-z0-9]/g, "_")
				.replace(/_+/g, "_");

			form.setValue(`methods.${index}.key`, generatedKey);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium">Payment Methods</h3>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() =>
							append({
								name: "",
								key: "",
								description: "",
								enabled: true,
							})
						}
					>
						<Plus className="mr-2 h-4 w-4" />
						Add Payment Method
					</Button>
				</div>

				{fields.length === 0 ? (
					<Card>
						<CardContent className="pt-6 flex flex-col items-center justify-center p-6 text-center">
							<CreditCard className="h-12 w-12 text-gray-400 mb-4" />
							<h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
							<p className="text-sm text-gray-500 mb-4">
								Add payment methods to allow customers to pay for their orders.
							</p>
							<Button
								type="button"
								onClick={() =>
									append({
										name: "",
										key: "",
										description: "",
										enabled: true,
									})
								}
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Payment Method
							</Button>
						</CardContent>
					</Card>
				) : (
					fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader className="pb-3">
								<CardTitle className="text-base">
									Payment Method {index + 1}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`methods.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g. Credit Card, PayPal"
														{...field}
														onChange={(e) => {
															field.onChange(e);
															handleNameChange(index, e.target.value);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`methods.${index}.key`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Key</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g. credit_card, paypal"
														{...field}
														onChange={(e) => {
															// Auto-generate key from name if empty
															if (field.value === "" && e.target.value === "") {
																const nameValue = form.getValues(
																	`methods.${index}.name`,
																);
																if (nameValue) {
																	const generatedKey = nameValue
																		.toLowerCase()
																		.replace(/[^a-z0-9]/g, "_")
																		.replace(/_+/g, "_");
																	field.onChange(generatedKey);
																} else {
																	field.onChange(e.target.value);
																}
															} else {
																field.onChange(e.target.value);
															}
														}}
													/>
												</FormControl>
												<FormDescription>
													Unique identifier used in code (lowercase, no spaces)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`methods.${index}.enabled`}
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
												<div className="space-y-0.5">
													<FormLabel>Status</FormLabel>
													<FormDescription>
														Enable or disable this payment method
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

								<FormField
									control={form.control}
									name={`methods.${index}.description`}
									render={({ field }) => (
										<FormItem className="mt-4">
											<FormLabel>Description (Optional)</FormLabel>
											<FormControl>
												<Input
													placeholder="Brief description of the payment method"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end mt-4">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => remove(index)}
									>
										<Trash2 className="mr-2 h-4 w-4" />
										Remove
									</Button>
								</div>
							</CardContent>
						</Card>
					))
				)}

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Changes"}
				</Button>
			</form>
		</Form>
	);
}
