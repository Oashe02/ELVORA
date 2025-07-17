import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function TabbySuccess() {
	const router = useRouter();
	const { order_id, payment_id } = router.query;
	const [isVerifying, setIsVerifying] = useState(true);

	useEffect(() => {
		if (order_id) {
			verifyPayment();
		}
	}, [order_id, payment_id]);

	const verifyPayment = async () => {
		try {
			const response = await axiosInstance.post("/tabby/verify", {
				orderId: order_id,
				paymentId: payment_id,
			});

			if (response.data.success) {
				toast.success("Payment successful!");
				router.push(`/success/${order_id}`);
			} else {
				toast.error("Payment verification failed");
				router.push("/checkout");
			}
		} catch (error) {
			console.error("Payment verification error:", error);
			toast.error("Payment verification failed");
			router.push("/checkout");
		} finally {
			setIsVerifying(false);
		}
	};

	if (isVerifying) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
					<p>Verifying your Tabby payment...</p>
				</div>
			</div>
		);
	}

	return null;
}
