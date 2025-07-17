"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

export function DeleteOrderButton({ orderId, orderNumber }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const { data } = await axiosInstance.delete(`/orders/${orderId}`);
			toast("Deleted");
			if (data.success) router.replace("/admin/orders");
		} catch {
			toast("Something wents wrong");
		} finally {
			setIsDeleting(false);
			setOpen(false);
		}
	};

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
						This will permanently delete order &quot;{orderNumber}&quot;. This
						action cannot be undone.
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
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
