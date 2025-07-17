// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
// 	AlertDialog,
// 	AlertDialogAction,
// 	AlertDialogCancel,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";


// export function DeleteProductButton({ productId, productName }) {
// 	const router = useRouter();
// 	const [isDeleting, setIsDeleting] = useState(false);
// 	const [open, setOpen] = useState(false);

// 	async function handleDelete() {
// 		setIsDeleting(true);

// 		try {
// 			const { data } = await axiosInstance.delete(`/product/${productId}`);

// 			if (data.success) {
// 				toast({
// 					title: "Product deleted",
// 					description: `Successfully deleted product: ${productName}`,
// 				});
// 				router.refresh();
// 			} else {
// 				toast({
// 					title: "Error",
// 					description: data.error || "Failed to delete product",
// 					variant: "destructive",
// 				});
// 			}
// 		} catch (error) {
// 			toast({
// 				title: "Error",
// 				description: "An unexpected error occurred",
// 				variant: "destructive",
// 			});
// 		} finally {
// 			setIsDeleting(false);
// 			setOpen(false);
// 		}
// 	}

// 	return (
// 		<AlertDialog open={open} onOpenChange={setOpen}>
// 			<AlertDialogTrigger asChild>
// 				<Button variant="destructive" size="sm">
// 					<Trash2 className="h-4 w-4 mr-1" />
// 					Delete
// 				</Button>
// 			</AlertDialogTrigger>
// 			<AlertDialogContent>
// 				<AlertDialogHeader>
// 					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
// 					<AlertDialogDescription>
// 						This will permanently delete the product &quot;{productName}&quot;.
// 						This action cannot be undone.
// 					</AlertDialogDescription>
// 				</AlertDialogHeader>
// 				<AlertDialogFooter>
// 					<AlertDialogCancel>Cancel</AlertDialogCancel>
// 					<AlertDialogAction
// 						onClick={(e) => {
// 							e.preventDefault();
// 							handleDelete();
// 						}}
// 						disabled={isDeleting}
// 						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
// 					>
// 						{isDeleting ? "Deleting..." : "Delete"}
// 					</AlertDialogAction>
// 				</AlertDialogFooter>
// 			</AlertDialogContent>
// 		</AlertDialog>
// 	);
// }


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
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

export function DeleteProductButton({ productId, productName }) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	async function handleDelete() {
		setIsDeleting(true);

		try {
			const { data } = await axiosInstance.delete(`/products/${productId}`);

			if (data.success) {
				toast("Product deleted", {
					description: `Successfully deleted product: ${productName}`,
				});
				router.refresh();
			} else {
				toast("Error", {
					description: data.error || "Failed to delete product",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast("Error", {
				description: "An unexpected error occurred",
				variant: "destructive",
			});
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
						This will permanently delete the product "{productName}".
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