import { Badge } from "@/components/ui/badge";

export function OrderStatusBadge({ status }) {
	switch (status) {
		case "pending":
			return (
				<Badge variant="outline" className="border-amber-500 text-amber-500">
					Pending
				</Badge>
			);
		case "processing":
			return (
				<Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>
			);
		case "shipped":
			return (
				<Badge className="bg-purple-500 hover:bg-purple-600">Shipped</Badge>
			);
		case "delivered":
			return (
				<Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
			);
		case "cancelled":
			return <Badge variant="destructive">Cancelled</Badge>;
		case "returned":
			return <Badge variant="secondary">Returned</Badge>;
		default:
			return null;
	}
}

export function PaymentStatusBadge({ status }) {
	switch (status) {
		case "pending":
			return (
				<Badge variant="outline" className="border-amber-500 text-amber-500">
					Pending
				</Badge>
			);
		case "paid":
			return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
		case "failed":
			return <Badge variant="destructive">Failed</Badge>;
		case "refunded":
			return <Badge variant="secondary">Refunded</Badge>;
		default:
			return null;
	}
}
