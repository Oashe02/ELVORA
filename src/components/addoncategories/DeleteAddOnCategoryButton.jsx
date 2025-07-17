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

export default function DeleteAddOnCategoryButton({ addonCategoryId, addonCategoryName }) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	async function handleDelete() {
		setIsDeleting(true);
		try {
			const res = await axiosInstance.delete(`/addons/${addonCategoryId}`);
			if (res.status === 200) {
				toast.success(`Successfully deleted category: ${addonCategoryName}`);
				router.refresh();
			} else {
				toast.error(res.data?.error || "Failed to delete category");
			}
		} catch (err) {
			toast.error("An unexpected error occurred");
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
						This will permanently delete the category "{addonCategoryName}". This
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
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
