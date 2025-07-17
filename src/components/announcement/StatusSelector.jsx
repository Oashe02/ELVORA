"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUSES = [
	{ value: "active", label: "Active" },
	{ value: "draft", label: "Draft" },
	{ value: "unpublished", label: "Unpublished" },
];

export default function StatusSelector({
	itemId,
	currentStatus,
	onStatusChangeComplete,
}) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState(currentStatus);
	const [isUpdating, setIsUpdating] = useState(false);

	const getStatusColor = (val) => {
		switch (val) {
			case "active":
				return "text-green-500";
			case "draft":
				return "text-amber-500";
			case "unpublished":
				return "text-gray-500";
			default:
				return "";
		}
	};

	const handleStatusChange = async (newStatus) => {
		if (newStatus === status) {
			setOpen(false);
			return;
		}

		setIsUpdating(true);
		try {
			const res = await axiosInstance.patch(`/announcements/${itemId}/status`, {
				status: newStatus,
			});

			if (res.status === 200) {
				setStatus(newStatus);
				toast("Status updated successfully", {
					variant: "success",
				});
				if (onStatusChangeComplete) onStatusChangeComplete();
			} else {
				toast("Failed to update status", {
					variant: "destructive",
				});
				console.error("Status update failed:", res.data);
			}
		} catch (err) {
			toast("An error occurred while updating status", {
				variant: "destructive",
			});
			console.error("Status update error:", err);
		} finally {
			setIsUpdating(false);
			setOpen(false);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={isUpdating}
					className={cn("w-[140px] justify-between", getStatusColor(status))}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[140px] p-0">
				<Command>
					<CommandList>
						<CommandEmpty>No status found.</CommandEmpty>
						<CommandGroup>
							{STATUSES.map((opt) => (
								<CommandItem
									key={opt.value}
									value={opt.value}
									onSelect={() => handleStatusChange(opt.value)}
									// className={cn(getStatusColor(opt.value))}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											status === opt.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{opt.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
