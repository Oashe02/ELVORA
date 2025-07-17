"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

const taxSettingsSchema = z.object({
	enabled: z.boolean().default(true),
	taxRate: z.coerce.number().min(0, "VAT percentage must be a positive number"),
	pricesIncludeTax: z.boolean().default(false),
});

export function TaxSettings({ initialSettings }) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Set default values for the form
	const defaultValues = {
		enabled: initialSettings?.enabled,
		taxRate: initialSettings?.taxRate, // Default UAE VAT is 5%
		pricesIncludeTax: initialSettings?.pricesIncludeTax,
	};

	const form = useForm({
		resolver: zodResolver(taxSettingsSchema),
		defaultValues,
	});

	async function onSubmit(data) {
		setIsSubmitting(true);
		try {
			const response = await axiosInstance.put(`/settings`, {
				tax: data,
			});
			toast("Settings Updated Successfully", {
				description: "Your tax settings have been updated.",
			});
		} catch (error) {
			console.error("Failed to update settings:", error);
			toast.error("Failed to update settings", {
				description:
					"There was an error updating your tax settings. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<Card>
					<CardContent className="pt-6">
						<FormField
							control={form.control}
							name="enabled"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Enable VAT Calculation
										</FormLabel>
										<FormDescription>
											Enable or disable VAT calculation for your store.
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

						<div className="mt-6">
							<FormField
								control={form.control}
								name="taxRate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Default VAT Percentage (UAE)</FormLabel>
										<FormControl>
											<Input type="number" step="0.01" min="0" {...field} />
										</FormControl>
										<FormDescription>
											Standard VAT rate in UAE is 5%
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="mt-6">
							<FormField
								control={form.control}
								name="pricesIncludeTax"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Products Include VAT
											</FormLabel>
											<FormDescription>
												Enable if the prices you enter for products already
												include VAT.
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
					</CardContent>
				</Card>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Changes"}
				</Button>
			</form>
		</Form>
	);
}
