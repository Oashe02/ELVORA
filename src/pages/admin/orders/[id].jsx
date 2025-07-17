import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { OrderDetailView } from "@/components/orders/OrderDetailView";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function OrderDetailPage({ order }) {
	if (!order) {
		return notFound();
	}

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<Link href="/admin/orders">
						<Button variant="outline" size="sm" className="h-8">
							<ChevronLeft className="mr-1 h-4 w-4" />
							Back to Orders
						</Button>
					</Link>
					<Link href={`/admin/orders/${order._id}`}>
						<Button variant="outline" size="sm" className="h-8">
							<Edit className="mr-1 h-4 w-4" />
							Full Edit Mode
						</Button>
					</Link>
				</div>

				<OrderDetailView order={order} />
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const res = await axiosInstance.get(`/orders/${params.id}`);
		if (res.status !== 200 || !res.data) {
			return { notFound: true };
		}
		return { props: { order: res.data } };
	} catch (err) {
		return { notFound: true };
	}
}
