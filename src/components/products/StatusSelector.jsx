"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

const statuses = [
	{ value: "active", label: "Active" },
	{ value: "draft", label: "Draft" },
	{ value: "unpublished", label: "Unpublished" },
];

export function StatusSelector({
	itemId,
	currentStatus,
	onStatusChange,
	onStatusChangeComplete,
}) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState(currentStatus);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleStatusChange = async (newStatus) => {
		if (newStatus === status) {
			setOpen(false);
			return;
		}

		setIsUpdating(true);
		try {
			const result = await onStatusChange(itemId, newStatus);

			if (result.success) {
				setStatus(newStatus);
				toast("Status updated");
				if (onStatusChangeComplete) {
					onStatusChangeComplete();
				}
			} else {
				toast.error("Failed to update");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
		} finally {
			setIsUpdating(false);
			setOpen(false);
		}
	};

	// const getStatusColor = (statusValue) => {
	// 	switch (statusValue) {
	// 		case "active":
	// 			return "text-green-500";
	// 		case "draft":
	// 			return "text-amber-500";
	// 		case "unpublished":
	// 			return "text-gray-500";
	// 		default:
	// 			return "";
	// 	}
	// };

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={isUpdating}
					className={cn("w-[140px] justify-between")}
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
							{statuses.map((statusOption) => (
								<CommandItem
									key={statusOption.value}
									value={statusOption.value}
									onSelect={() => handleStatusChange(statusOption.value)}
									// className={cn(getStatusColor(statusOption.value))}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											status === statusOption.value
												? "opacity-100"
												: "opacity-0",
										)}
									/>
									{statusOption.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
