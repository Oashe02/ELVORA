import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";

const {
	useStripe,
	useElements,
	Elements,
	PaymentElement,
} = require("@stripe/react-stripe-js");
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

const StripePayment = ({
	onClose,
	clientSecret,
	orderData,
	onPaymentSuccess,
	onPaymentError,
	settings,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentError, setPaymentError] = useState(null);

	const handlePayment = async () => {
		if (!stripe || !elements || !clientSecret) {
			setPaymentError("Payment system not ready. Please try again.");
			return;
		}

		setIsProcessing(true);
		setPaymentError(null);
		const res = await stripe.elements().submit();
		console.log(res);
		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					// return_url: `${window.location.origin}/success`,
					payment_method_data: {
						billing_details: {
							name: `${orderData.firstName} ${orderData.lastName}`,
							email: orderData.email,
							phone: orderData.phone,
							address: {
								line1: orderData.address,
								line2: orderData.apartment || "",
								city: orderData.city,
								state: orderData.emirate,
								country: "AE",
							},
						},
					},
				},
				redirect: "if_required",
			});

			if (error) {
				throw new Error(error.message);
			}

			if (paymentIntent && paymentIntent.status === "succeeded") {
				onPaymentSuccess(paymentIntent);
			} else if (paymentIntent && paymentIntent.status === "requires_action") {
				// 3D Secure or other authentication required
				setPaymentError("Please complete the payment authentication.");
			} else {
				// Payment is processing
				onPaymentSuccess(paymentIntent);
			}
		} catch (error) {
			console.error("Payment error:", error);
			setPaymentError(error.message);
			onPaymentError(error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				{/* Modal Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900">
						Complete Payment
					</h2>
					<button
						onClick={onClose}
						disabled={isProcessing}
						className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Order Summary */}
				{/* <div className="p-6 border-b border-gray-200">
					<h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span className="text-gray-600">Subtotal</span>
							<span>
								{settings?.general?.currency} {subtotal.toFixed(2)}
							</span>
						</div>
						{shippingCharge > 0 && (
							<div className="flex justify-between">
								<span className="text-gray-600">Shipping</span>
								<span>
									{settings?.general?.currency} {shippingCharge.toFixed(2)}
								</span>
							</div>
						)}
						{tax > 0 && (
							<div className="flex justify-between">
								<span className="text-gray-600">Tax</span>
								<span>
									{settings?.general?.currency} {tax.toFixed(2)}
								</span>
							</div>
						)}
						{couponDiscount > 0 && (
							<div className="flex justify-between text-green-600">
								<span>Discount</span>
								<span>
									-{settings?.general?.currency} {couponDiscount.toFixed(2)}
								</span>
							</div>
						)}
						<div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
							<span>Total</span>
							<span>
								{settings?.general?.currency} {total.toFixed(2)}
							</span>
						</div>
					</div>
				</div> */}

				{/* Payment Form */}
				<div className="p-6">
					<div className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Payment Details
							</label>
							<div className="border border-gray-300 rounded-lg p-4 focus-within:border-black transition-colors">
								<PaymentElement
									id="payment-element-modal"
									options={{
										layout: "tabs",
									}}
								/>
							</div>
						</div>

						{paymentError && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
								<div className="flex items-center">
									<svg
										className="w-5 h-5 text-red-400 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="text-sm text-red-700">{paymentError}</p>
								</div>
							</div>
						)}

						<div className="flex space-x-3">
							<button
								type="button"
								onClick={onClose}
								disabled={isProcessing}
								className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handlePayment}
								disabled={isProcessing}
								className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
							>
								{isProcessing ? (
									<>
										<div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
										Processing...
									</>
								) : (
									`Pay Now`
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Security Notice */}
				<div className="px-6 pb-6">
					<div className="flex items-center justify-center text-xs text-gray-500">
						<svg
							className="w-4 h-4 mr-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						Secured by Stripe • SSL Encrypted
					</div>
				</div>
			</div>
		</div>
	);
};

export const StripePaymentModal = ({
	isOpen,
	onClose,
	clientSecret,
	orderData,
	onPaymentSuccess,
	onPaymentError,
	settings,
}) => {
	if (!isOpen) return null;

	return (
		<>
			{clientSecret ? (
				<Elements
					stripe={stripePromise}
					options={{
						clientSecret: clientSecret,
						appearance: {
							theme: "stripe",
							variables: {
								colorPrimary: "#000000",
								colorBackground: "#ffffff",
								colorText: "#30313d",
								colorDanger: "#df1b41",
								fontFamily: "system-ui, sans-serif",
								spacingUnit: "4px",
								borderRadius: "8px",
							},
						},
					}}
				>
					<StripePayment
						onClose={onClose}
						clientSecret={clientSecret}
						orderData={orderData}
						onPaymentSuccess={onPaymentSuccess}
						onPaymentError={onPaymentError}
						settings={settings}
					/>
				</Elements>
			) : (
				<div className="text-center py-8">
					<div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
					<p className="text-gray-600">Preparing payment...</p>
				</div>
			)}
		</>
	);
};
