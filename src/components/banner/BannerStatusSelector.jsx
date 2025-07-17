"use client";

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

export default function BannerStatusSelector({ bannerId, currentStatus }) {
	const [status, setStatus] = useState(currentStatus);
	const [isUpdating, setIsUpdating] = useState(false);
	const router = useRouter();

	const handleStatusChange = async (newStatus) => {
		if (newStatus === status) return;
		setIsUpdating(true);
		try {
			await axiosInstance.patch(`/banners/${bannerId}/status`, {
				status: newStatus,
			});
			setStatus(newStatus);
			router.refresh();
		} catch (err) {
			console.error("Failed to update banner status:", err);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Select
			value={status}
			onValueChange={handleStatusChange}
			disabled={isUpdating}
		>
			<SelectTrigger className="w-[130px]">
				<SelectValue placeholder="Select status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="active">Active</SelectItem>
				<SelectItem value="draft">Draft</SelectItem>
				<SelectItem value="unpublished">Unpublished</SelectItem>
			</SelectContent>
		</Select>
	);
}
