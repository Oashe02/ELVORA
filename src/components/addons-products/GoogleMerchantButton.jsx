"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertCircle,
	Check,
	ChevronDown,
	RefreshCw,
	Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function GoogleMerchantButton() {
	const router = useRouter();
	const [isSyncing, setIsSyncing] = useState(false);
	const [syncResult, setSyncResult] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleSync = async () => {
		try {
			setIsSyncing(true);
			setSyncResult(null);
			setShowDialog(true);

			const { data } = await axiosInstance.get("/google-merchant/sync");

			setSyncResult(data);

			if (data.success) {
				toast(`${data.successCount} products synced successfully.`);
			} else {
				toast.error("Sync Failed");
			}
		} catch (error) {
			console.error("Error syncing with Google Merchant:", error);
			setSyncResult({
				success: false,
				message:
					error instanceof Error ? error.message : "An unknown error occurred",
			});

			toast.error("Failed to sync with Google Merchant Center");
		} finally {
			setIsSyncing(false);
		}
	};

	const handleGoToSettings = () => {
		router.push("/admin/integrations/google-merchant");
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex items-center gap-2">
						<RefreshCw className="h-4 w-4" />
						Google Merchant
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={handleSync}>
						<RefreshCw className="mr-2 h-4 w-4" />
						Sync Products
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleGoToSettings}>
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Google Merchant Sync</DialogTitle>
						<DialogDescription>
							{isSyncing
								? "Syncing products with Google Merchant Center..."
								: syncResult
									? syncResult.success
										? "Products successfully synced with Google Merchant Center."
										: "Failed to sync products with Google Merchant Center."
									: "Starting sync process..."}
						</DialogDescription>
					</DialogHeader>

					<div className="py-4">
						{isSyncing ? (
							<div className="flex items-center justify-center">
								<RefreshCw className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : syncResult ? (
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									{syncResult.success ? (
										<Check className="h-5 w-5 text-green-500" />
									) : (
										<AlertCircle className="h-5 w-5 text-red-500" />
									)}
									<span>{syncResult.message}</span>
								</div>

								{syncResult.totalProducts > 0 && (
									<div className="text-sm">
										<p>Total Products: {syncResult.totalProducts}</p>
										<p>Successfully Synced: {syncResult.successCount}</p>
										{syncResult.failureCount > 0 && (
											<p>Failed: {syncResult.failureCount}</p>
										)}
									</div>
								)}

								{syncResult.errors && syncResult.errors.length > 0 && (
									<div className="mt-4">
										<p className="font-medium">Errors:</p>
										<div className="max-h-40 overflow-y-auto text-sm">
											{syncResult.errors.slice(0, 5).map((error, index) => (
												<div
													key={index}
													className="mt-1 rounded bg-gray-100 p-2 dark:bg-gray-800"
												>
													<p className="font-medium">
														{error.productTitle || error.productId}
													</p>
													<p className="text-red-500">{error.error}</p>
												</div>
											))}
											{syncResult.errors.length > 5 && (
												<p className="mt-2 text-sm text-gray-500">
													And {syncResult.errors.length - 5} more errors...
												</p>
											)}
										</div>
									</div>
								)}
							</div>
						) : null}
					</div>

					<DialogFooter className="sm:justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={() => setShowDialog(false)}
							disabled={isSyncing}
						>
							Close
						</Button>

						{!isSyncing && syncResult && (
							<Button type="button" onClick={handleGoToSettings}>
								Go to Settings
							</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
