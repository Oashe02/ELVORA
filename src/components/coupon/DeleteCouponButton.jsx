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
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function DeleteCouponButton({ couponId, couponCode }) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const res = await axiosInstance.delete(`/coupons/${couponId}`);
			if (res.status === 200) {
				toast.success(`Successfully deleted coupon: ${couponCode}`);
				router.refresh();
			} else {
				toast.error(res.data?.error || "Failed to delete coupon");
			}
		} catch (error) {
			console.error(error);
			toast.error("An unexpected error occurred");
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
						This will permanently delete the coupon "{couponCode}". This action
						cannot be undone.
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
