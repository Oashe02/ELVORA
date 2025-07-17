// components/CategoryForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
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
import axiosInstance from "@/lib/axiosInstance";
import ImageUploader from "../helper/image-uploader";
import VideoUploader from "../helper/video-uploader";
import ThumbnailUploader from "../helper/thumbnail-uploader";

// --- validation schema ---
const categorySchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	slug: z.string().optional(),
	shortDescription: z
		.string()
		.min(10, { message: "Short description must be at least 10 characters" }),
	description: z
		.string()
		.min(20, { message: "Description must be at least 20 characters" }),
	priority: z.coerce.number().int().default(0),
	status: z.enum(["active", "draft", "unpublished"], {
		required_error: "Please select a status",
	}),
});

export default function CategoryForm({ category = {}, isEditing = false }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [thumbnail, setThumbnail] = useState(category.thumbnail || null);
	const [images, setImages] = useState(category.images || []);
	const [videos, setVideos] = useState(category.videos || []);

	const form = useForm({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category.name || "",
			slug: category.slug || "",
			shortDescription: category.shortDescription || "",
			description: category.description || "",
			priority: category.priority || 0,
			status: category.status || "draft",
		},
	});

	const onSubmit = async (data) => {
		if (!thumbnail) {
			toast.error("Thumbnail required", {
				description: "Please upload a thumbnail image for the category",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const payload = { ...data, thumbnail, images, videos };
			let res;
			if (isEditing && category._id) {
				res = await axiosInstance.put(`/categories/${category._id}`, payload);
			} else {
				res = await axiosInstance.post("/categories", payload);
			}

			if (res.status >= 200 && res.status < 300) {
				toast.success(
					`Successfully ${isEditing ? "updated" : "created"} category!`,
				);
				router.push("/admin/categories");
			} else {
				toast.error(res.data?.error || "Something went wrong");
			}
		} catch (err) {
			toast.error("An unexpected error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>
					{isEditing ? "Edit Category" : "Add New Category"}
				</CardTitle>
				<CardDescription>
					{isEditing
						? "Update the category information below"
						: "Fill in the details to create a new category"}
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
											<Input placeholder="Category name" {...field} />
										</FormControl>
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
												placeholder="category-slug (leave empty to auto-generate)"
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
											Only active categories are displayed on the site
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Short Description */}
						<FormField
							control={form.control}
							name="shortDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Short Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Brief description of the category"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Full Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Detailed description of the category"
											className="min-h-[150px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* File Uploaders */}
						<div className="space-y-4">
							{/* Thumbnail */}
							<FormItem>
								<FormLabel>Thumbnail</FormLabel>
								<FormControl>
									<ThumbnailUploader
										initialThumbnail={thumbnail}
										onChange={setThumbnail}
										label="Upload Category Thumbnail"
									/>
								</FormControl>
								<FormDescription>
									This will be the main image for your category
								</FormDescription>
								<FormMessage>
									{!thumbnail && "Thumbnail is required"}
								</FormMessage>
							</FormItem>

							{/* Images */}
							<FormItem>
								<FormLabel>Category Images</FormLabel>
								<FormControl>
									<ImageUploader
										initialImages={images}
										onChange={setImages}
										maxFiles={10}
										label="Upload Category Images"
									/>
								</FormControl>
								<FormDescription>
									Upload additional category images (up to 10)
								</FormDescription>
							</FormItem>

							{/* Videos */}
							<FormItem>
								<FormLabel>Category Videos</FormLabel>
								<FormControl>
									<VideoUploader
										initialVideos={videos}
										onChange={setVideos}
										maxFiles={5}
										label="Upload Category Videos"
									/>
								</FormControl>
								<FormDescription>
									Upload category videos (up to 5)
								</FormDescription>
							</FormItem>
						</div>

						{/* Actions */}
						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/admin/categories")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting
									? "Saving..."
									: isEditing
										? "Update Category"
										: "Create Category"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
