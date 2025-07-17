"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function DeleteAnnouncementButton({
	announcementId,
	announcementName,
}) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	async function handleDelete() {
		setIsDeleting(true);
		try {
			const res = await axiosInstance.delete(
				`/announcements/${announcementId}`,
			);
			if (res.status === 200) {
				toast("Announcement deleted successfully", {
					variant: "success",
				});
				// Optionally, you can redirect or refresh the page
				router.refresh();
			} else {
				toast.error("Failed to delete announcement", {
					variant: "destructive",
				});
				console.error("Delete failed:", res.data);
			}
		} catch (err) {
			toast.error("An error occurred while deleting the announcement", {
				variant: "destructive",
			});
			console.error("Delete error:", err);
		} finally {
			setIsDeleting(false);
			setOpen(false);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="sm">
					<Trash2 className="h-4 w-4 mr-1" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the announcement "{announcementName}".
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
