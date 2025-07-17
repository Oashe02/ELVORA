import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function TabbyFailure() {
	const router = useRouter();

	useEffect(() => {
		toast.error("Payment failed. Please try again.");
		router.push("/checkout");
	}, [router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<p>Redirecting...</p>
			</div>
		</div>
	);
}
