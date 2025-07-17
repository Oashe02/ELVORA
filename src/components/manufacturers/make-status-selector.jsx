import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";

const statusOptions = [
  { value: "active", label: "Active", color: "bg-green-500" },
  { value: "draft", label: "Draft", color: "bg-yellow-500" },
  { value: "unpublished", label: "Unpublished", color: "bg-gray-500" },
];

export function MakeStatusSelector({ makeId, currentStatus, onStatusChange }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  
  const currentStatusObj = statusOptions.find(opt => opt.value === status);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return;
    
    setLoading(true);
    try {
      await axiosInstance.put(`/make/${makeId}`, { status: newStatus });
      setStatus(newStatus);
      toast.success("Status updated");
      onStatusChange();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          disabled={loading}
        >
          <span className={`w-2 h-2 rounded-full ${currentStatusObj?.color}`}></span>
          <span>{currentStatusObj?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className="flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${option.color}`}></span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}