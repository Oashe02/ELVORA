// components/BannerForm.js
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
import ImageUploader from "../helper/image-uploader";
import VideoUploader from "../helper/video-uploader";
import ThumbnailUploader from "../helper/thumbnail-uploader";
import axiosInstance from "@/lib/axiosInstance";

// --- validation schema ---
const bannerSchema = z.object({
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

export default function BannerForm({ banner = {}, isEditing = false }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [thumbnail, setThumbnail] = useState(banner.thumbnail || null);
	const [images, setImages] = useState(banner.images || []);
	const [videos, setVideos] = useState(banner.videos || []);

	const form = useForm({
		resolver: zodResolver(bannerSchema),
		defaultValues: {
			name: banner.name || "",
			slug: banner.slug || "",
			title: banner.title || "",
			description: banner.description || "",
			url: banner.url || "",
			priority: banner.priority || 0,
			status: banner.status || "draft",
		},
	});

	const onSubmit = async (data) => {
		if (!thumbnail) {
			toast.error("Thumbnail required", {
				description: "Please upload a thumbnail image for the banner",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const payload = { ...data, thumbnail, images, videos };
			let res;

			if (isEditing && banner._id) {
				res = await axiosInstance.put(`/banners/${banner._id}`, payload);
			} else {
				res = await axiosInstance.post("/banners", payload);
			}

			if (res.status >= 200 && res.status < 300) {
				toast.success(
					`Successfully ${isEditing ? "updated" : "created"} banner: ${data.name}`,
				);
				router.push("/admin/banners");
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
				<CardTitle>{isEditing ? "Edit Banner" : "Add New Banner"}</CardTitle>
				<CardDescription>
					{isEditing
						? "Update the banner information below"
						: "Fill in the details to create a new banner"}
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
											<Input placeholder="Banner name" {...field} />
										</FormControl>
										<FormDescription>
											Internal name for this banner
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
												placeholder="banner-slug (leave empty to auto-generate)"
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
											<Input placeholder="Banner title" {...field} />
										</FormControl>
										<FormDescription>
											Public title displayed on the banner
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
											Link destination when banner is clicked
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
												defaultValue={field.value}
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
											Only active banners are displayed on the site
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
											placeholder="Banner description"
											className="resize-none min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Description text for the banner
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* File Uploaders */}
						<div className="space-y-4">
							<FormItem>
								<FormLabel>Thumbnail</FormLabel>
								<FormControl>
									<ThumbnailUploader
										initialThumbnail={thumbnail || undefined}
										onChange={setThumbnail}
										label="Upload Banner Thumbnail"
									/>
								</FormControl>
								<FormDescription>
									This will be the main image for your banner
								</FormDescription>
								<FormMessage>
									{!thumbnail && "Thumbnail is required"}
								</FormMessage>
							</FormItem>

							<FormItem>
								<FormLabel>Banner Images</FormLabel>
								<FormControl>
									<ImageUploader
										initialImages={images}
										onChange={setImages}
										maxFiles={10}
										label="Upload Banner Images"
									/>
								</FormControl>
								<FormDescription>
									Upload additional banner images (up to 10)
								</FormDescription>
							</FormItem>

							<FormItem>
								<FormLabel>Banner Videos</FormLabel>
								<FormControl>
									<VideoUploader
										initialVideos={videos}
										onChange={setVideos}
										maxFiles={5}
										label="Upload Banner Videos"
									/>
								</FormControl>
								<FormDescription>
									Upload banner videos (up to 5)
								</FormDescription>
							</FormItem>
						</div>

						{/* Actions */}
						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/admin/banners")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting
									? "Saving..."
									: isEditing
										? "Update Banner"
										: "Create Banner"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
