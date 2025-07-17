"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

// --- validation schema ---
const announcementSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	slug: z.string().optional(),
	title: z.string().min(2, { message: "Title must be at least 2 characters" }),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters" }),
	url: z.string().url({ message: "Please enter a valid URL" }),
	priority: z.coerce.number().int().default(0),
	status: z.enum(["active", "draft", "unpublished"], {
		required_error: "Please select a status",
	}),
});

export default function AnnouncementForm({
	announcement = {},
	isEditing = false,
}) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(announcementSchema),
		defaultValues: {
			name: announcement.name || "",
			slug: announcement.slug || "",
			title: announcement.title || "",
			description: announcement.description || "",
			url: announcement.url || "",
			priority: announcement.priority ?? 0,
			status: announcement.status || "draft",
		},
	});

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			let res;
			if (isEditing && announcement._id) {
				res = await axiosInstance.put(
					`/announcements/${announcement._id}`,
					data,
				);
			} else {
				res = await axiosInstance.post("/announcements", data);
			}

			if (res.status >= 200 && res.status < 300) {
				toast(isEditing ? "Announcement updated" : "Announcement created", {
					variant: "success",
				});
				router.push("/admin/announcements");
			} else {
				toast(`Failed to ${isEditing ? "update" : "create"} announcement`, {
					variant: "destructive",
				});
				console.error(`${isEditing ? "Update" : "Create"} failed:`, res.data);
			}
		} catch (err) {
			toast.error(
				`An error occurred while ${isEditing ? "updating" : "creating"} the announcement`,
				{
					variant: "destructive",
				},
			);
			console.error(
				`${isEditing ? "Update" : "Create"} error:`,
				err.response ? err.response.data : err.message,
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>
					{isEditing ? "Edit Announcement" : "Add New Announcement"}
				</CardTitle>
				<CardDescription>
					{isEditing
						? "Update the announcement information below"
						: "Fill in the details to create a new announcement"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Announcement name" {...field} />
										</FormControl>
										<FormDescription>
											Internal name for this announcement
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Slug */}
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input
												placeholder="announcement-slug (leave empty to auto-generate)"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Leave empty to auto-generate from name
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Title */}
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Announcement title" {...field} />
										</FormControl>
										<FormDescription>
											Public title displayed on the announcement
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* URL */}
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input
												placeholder="https://example.com/page"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Link destination when announcement is clicked
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Priority */}
							<FormField
								control={form.control}
								name="priority"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Priority</FormLabel>
										<FormControl>
											<Input type="number" placeholder="0" {...field} />
										</FormControl>
										<FormDescription>
											Higher numbers appear first
										</FormDescription>
										<FormMessage />
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
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="active">Active</SelectItem>
													<SelectItem value="draft">Draft</SelectItem>
													<SelectItem value="unpublished">
														Unpublished
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>
											Only active announcements are displayed
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Announcement description"
											className="resize-none min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Description text for the announcement
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Actions */}
						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/admin/announcements")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting
									? "Saving..."
									: isEditing
										? "Update Announcement"
										: "Create Announcement"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
