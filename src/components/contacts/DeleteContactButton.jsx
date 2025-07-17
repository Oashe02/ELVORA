"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function DeleteContactButton({ contactId, contactName }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const res = await axiosInstance.delete(`/contact/${contactId}`);
			if (res.status === 200) {
				toast.success("Contact deleted successfully");
				window.location.reload();
			} else {
				toast.error(res.data?.error || "Failed to delete contact");
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while deleting the contact");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="text-red-500 border-red-200 hover:bg-red-50"
				>
					<Trash2 className="h-4 w-4 mr-1" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the contact message from {contactName}.
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
						className="bg-red-500 hover:bg-red-600"
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
