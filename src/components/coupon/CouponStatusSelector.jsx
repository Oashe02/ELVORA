"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Toaster, toast } from "sonner";
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

/** place this in components/CouponStatusSelector.js */
export function CouponStatusSelector({
	couponId,
	currentStatus,
	onStatusChange,
}) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState(currentStatus);
	const [isUpdating, setIsUpdating] = useState(false);

	const statuses = [
		{ value: "active", label: "Active" },
		{ value: "disabled", label: "Disabled" },
		{ value: "expired", label: "Expired" },
	];

	const getStatusColor = (val) =>
		({
			active: "text-green-500",
			expired: "text-gray-500",
			disabled: "text-red-500",
		})[val] || "";

	const handleStatusChange = async (newStatus) => {
		if (newStatus === status) {
			setOpen(false);
			return;
		}

		setIsUpdating(true);
		try {
			const res = await fetch(`/api/coupons/${couponId}/status`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
			});
			const result = await res.json();

			if (res.ok) {
				setStatus(newStatus);
				toast.success(`Status changed to ${newStatus}`);
				onStatusChange?.();
			} else {
				toast.error(result.error || "Failed to update status");
			}
		} catch {
			toast.error("Unexpected network error");
		} finally {
			setIsUpdating(false);
			setOpen(false);
		}
	};

	return (
		<>
			<Toaster />
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
						<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[140px] p-0">
					<Command>
						<CommandList>
							<CommandEmpty>No statuses.</CommandEmpty>
							<CommandGroup>
								{statuses.map((opt) => (
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
		</>
	);
}
