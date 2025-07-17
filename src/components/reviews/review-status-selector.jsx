"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import axiosInstance from "@/lib/axiosInstance"

const statuses = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
]

export function ReviewStatusSelector({ reviewId, currentStatus, onStatusChange }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) {
      setOpen(false)
      return
    }

    setIsUpdating(true)
    try {
      await axiosInstance.put(`/review/${reviewId}`, {
        status: newStatus,
      })

      setStatus(newStatus)
      toast.success(`Review status changed to "${newStatus}"`)
      if (onStatusChange) onStatusChange()
    } catch (error) {
      toast.error("Failed to update review status.")
      console.error("Status update error:", error)
    } finally {
      setIsUpdating(false)
      setOpen(false)
    }
  }

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "approved":
        return "text-green-500"
      case "pending":
        return "text-amber-500"
      case "rejected":
        return "text-red-500"
      default:
        return ""
    }
  }

  const formatStatus = (value) => value.charAt(0).toUpperCase() + value.slice(1)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Change status from ${status}`}
          disabled={isUpdating}
          className={cn("w-[140px] justify-between", getStatusColor(status))}
        >
          {formatStatus(status)}
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
                  onSelect={() => {
                    if (status !== statusOption.value) {
                      handleStatusChange(statusOption.value)
                    }
                  }}
                  disabled={status === statusOption.value}
                  className={cn(getStatusColor(statusOption.value))}
                >
                  <Check className={cn("mr-2 h-4 w-4", status === statusOption.value ? "opacity-100" : "opacity-0")} />
                  {formatStatus(statusOption.value)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
