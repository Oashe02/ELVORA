import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function GenericExportButton({
	endpoint,
	entityName,
	queryParams = {},
	buttonText = "Export",
	variant = "outline",
}) {
	const [isExporting, setIsExporting] = useState(false);

	const handleExport = async (format) => {
		setIsExporting(true);
		toast.info(`Exporting ${entityName} as ${format.toUpperCase()}...`);

		try {
			// Build URL with format and additional query params
			const params = new URLSearchParams({ format, ...queryParams });
			const url = `${endpoint}?${params.toString()}`;

			const response = await axiosInstance.get(url, {
				responseType: "blob", // This is crucial for file downloads
			});

			// Create a URL for the blob
			const blobUrl = window.URL.createObjectURL(response.data);

			// Determine filename from Content-Disposition header, or create one
			let filename = `${entityName}-export-${new Date().toISOString().split("T")[0]}.${format}`;
			const contentDisposition = response.headers["content-disposition"];
			if (contentDisposition) {
				const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
				if (filenameMatch && filenameMatch.length > 1) {
					filename = filenameMatch[1];
				}
			}

			// Create a temporary link to trigger the download
			const a = document.createElement("a");
			a.href = blobUrl;
			a.download = filename;
			document.body.appendChild(a);
			a.click();

			// Clean up the temporary link and blob URL
			a.remove();
			window.URL.revokeObjectURL(blobUrl);

			toast.success(
				`${entityName} exported as ${format.toUpperCase()} successfully.`,
			);
		} catch (err) {
			console.error("Export error:", err);
			const reader = new FileReader();
			let errorMessage = `There was an error exporting the ${entityName.toLowerCase()}.`;

			// Try to read the error message from the blob response
			if (err.response && err.response.data instanceof Blob) {
				reader.onload = function () {
					try {
						const errorJson = JSON.parse(this.result);
						errorMessage =
							errorJson.message ||
								`Error exporting ${entityName.toLowerCase()}.`;
					} catch (e) {
						// Blob is not JSON, use default message
					}
					toast.error(errorMessage);
				};
				reader.readAsText(err.response.data);
			} else {
				toast.error(errorMessage);
			}
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={variant} disabled={isExporting}>
					<Download className="mr-2 h-4 w-4" />
					{buttonText}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleExport("csv")}>
					Export as CSV
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExport("json")}>
					Export as JSON
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
