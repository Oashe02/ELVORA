"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Trash2 } from "lucide-react";
import {
	FileDownIcon as CaretDown,
	CreditCard,
	CircleDollarSignIcon as CurrencyCircleDollar,
	HandIcon as Handbag,
	MicroscopeIcon as MagnifyingGlass,
	DollarSignIcon as Money,
	StoreIcon as Storefront,
	Tag,
	Truck,
} from "lucide-react";
import { useSettingStore } from "@/store/useSettingStore";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation"; // Updated import for App Router
import Layout from "@/components/layouts/Layout";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { StripePaymentModal } from "@/components/StripePaymentModal";

const checkoutSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	deliveryType: z.enum(["ship", "pickup"]),
	country: z.string().min(1, "Please select a country"),
	emirate: z.string().min(1, "Please select an emirate"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	address: z.string().min(1, "Address is required"),
	apartment: z.string().optional(),
	city: z.string().min(1, "City is required"),
	phone: z.string().min(6, "Valid phone number is required"),
	shippingMethod: z.string().min(1, "Please select a shipping method"),
	paymentMethod: z.string().min(1, "Please select a payment method"),
	couponCode: z.string().optional(),
	useShippingAsBilling: z.boolean().optional(),
	notes: z.string().optional(),
});

const CheckoutComponent = ({ announcements }) => {
	const {
		isEmpty,
		items,
		totalItems,
		emptyCart,
		updateItemQuantity,
		removeItem,
		setCart,
	} = useCart();

	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	const handlePaymentSuccess = (paymentIntent) => {
		emptyCart();
		setShowStripeModal(false);
		toast.success("Payment successful! Your order is being processed.");
		router.push(`/success/${stripeOrderData.orderId}`);
	};
	const handlePaymentError = (error) => {
		toast.error(error.message);
	};

	const [showStripeModal, setShowStripeModal] = useState(false);
	const [stripeClientSecret, setStripeClientSecret] = useState(null);
	const [stripeOrderData, setStripeOrderData] = useState(null);
	const [isCreatingPaymentIntent, setIsCreatingPaymentIntent] = useState(false);
	const handleCloseModal = () => {
		setShowStripeModal(false);
		setStripeClientSecret(null);
		setStripeOrderData(null);
	};
	const router = useRouter();
	const settings = useSettingStore((s) => s.setting);
	const { currency } = settings?.general || {};
	const { user } = useAuthStore();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [couponCode, setCouponCode] = useState("");
	const [couponDiscount, setCouponDiscount] = useState(0);
	const [summary, setSummary] = useState(null);
	const [loadingSummary, setLoadingSummary] = useState(true);

	const totalItemEntries = items.length;

	const fetchSummary = async (shippingMethod) => {
		if (items.length === 0) {
			setSummary(null);
			setLoadingSummary(false);
			return;
		}
		setLoadingSummary(true);
		try {
			const { data } = await axiosInstance.post("/orders/summary", {
				products: items,
				couponCode,
				shippingMethod,
			});
			if (data.success) {
				setSummary(data.summary);
			} else {
				setSummary(null);
			}
		} catch (error) {
			setSummary(null);
			console.error("Error fetching summary:", error);
		} finally {
			setLoadingSummary(false);
		}
	};

	const handleBackToShopping = () => {
		window.history.back();
	};

	useEffect(() => {
		if (settings?.shipping?.shippingMethods) {
			console.log(
				"Available Shipping Methods:",
				settings.shipping.shippingMethods,
			);
		}
	}, [settings]);

	const availableShippingMethods = useMemo(() => {
		if (!settings?.shipping?.enabled || !settings?.shipping?.shippingMethods) {
			return [];
		}
		return settings.shipping.shippingMethods.filter(
			(method) => method.active !== false,
		);
	}, [settings]);

	const defaultShippingMethod = useMemo(() => {
		const defaultMethod = availableShippingMethods.find(
			(method) => method.isDefault,
		);
		return (
			defaultMethod?.name ||
			(availableShippingMethods.length > 0
				? availableShippingMethods[0].name
				: "")
		);
	}, [availableShippingMethods]);

	const availablePaymentMethods = useMemo(() => {
		if (!settings?.payment?.methods) {
			return [];
		}
		return settings.payment.methods.filter((method) => method.enabled);
	}, [settings]);

	const defaultPaymentMethod = useMemo(() => {
		const cashOnDelivery = availablePaymentMethods.find(
			(method) => method.key === "cash_on_delivery",
		);
		return (
			cashOnDelivery?.key ||
			(availablePaymentMethods.length > 0
				? availablePaymentMethods[0].key
				: "cash_on_delivery")
		);
	}, [availablePaymentMethods]);

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			email: user?.email || "",
			country: "United Arab Emirates",
			emirate: "Dubai",
			deliveryType: "ship",
			shippingMethod: defaultShippingMethod,
			paymentMethod: defaultPaymentMethod,
			useShippingAsBilling: true,
			phone: "",
		},
	});

	useEffect(() => {
		if (defaultShippingMethod && defaultPaymentMethod) {
			reset((prev) => ({
				...prev,
				shippingMethod: defaultShippingMethod,
				paymentMethod: defaultPaymentMethod,
			}));
		}
	}, [defaultShippingMethod, defaultPaymentMethod, reset]);

	useEffect(() => {
		if (defaultShippingMethod) {
			setValue("shippingMethod", defaultShippingMethod);
		}
	}, [defaultShippingMethod, setValue]);

	const onError = (formErrors) => {
		const firstError = Object.values(formErrors)[0];
		if (firstError && firstError.message) {
			toast.error(firstError.message);
		}
	};

	useEffect(() => {
		if (user?.email) {
			reset((prev) => ({
				...prev,
				email: user.email,
			}));
		}
	}, [user, reset]);

	const paymentMethod = watch("paymentMethod");
	const selectedEmirate = watch("emirate");
	const selectedShippingMethod = watch("shippingMethod");
	const deliveryType = watch("deliveryType");

	useEffect(() => {
		if (selectedShippingMethod) {
			fetchSummary(selectedShippingMethod);
		}
	}, [items, couponCode, selectedShippingMethod]);

	const { subtotal } = useMemo(() => {
		const subtotal = items.reduce(
			(acc, item) => acc + item.price * (item.quantity ?? 1),
			0,
		);
		return { subtotal };
	}, [items]);

	const tax = useMemo(() => {
		if (!settings?.tax?.enabled) return 0;
		const taxRate = settings.tax.taxRate;
		return taxRate ? subtotal * (taxRate / 100) : 0;
	}, [settings, subtotal]);

	const taxRatePercentage = useMemo(() => {
		if (!settings?.tax?.enabled) return 0;
		const taxRate = settings.tax.taxRate;
		return taxRate ? taxRate : 0;
	}, [settings]);

	const shippingCharge = useMemo(() => {
		if (!settings?.shipping?.enabled || deliveryType === "pickup") return 0;
		const method = settings.shipping.shippingMethods.find(
			(m) =>
				m?.code === selectedShippingMethod ||
				m?.name?.toLowerCase() === selectedShippingMethod?.toLowerCase(),
		);
		if (!method) return 0;
		return subtotal >=
			(method?.freeShippingThreshold || Number.POSITIVE_INFINITY)
			? 0
			: method?.cost;
	}, [settings, selectedShippingMethod, subtotal, deliveryType]);

	const total = useMemo(() => {
		return subtotal + tax + shippingCharge - couponDiscount;
	}, [subtotal, tax, shippingCharge, couponDiscount]);

	const [tabbyEligible, setTabbyEligible] = useState(false);
	const [tabbyInstallments, setTabbyInstallments] = useState(null);
	const [isCreatingTabbySession, setIsCreatingTabbySession] = useState(false);

	// const availablePaymentMethods = useMemo(() => {
	// 	const methods = [];

	// 	if (settings?.payment?.methods) {
	// 		methods.push(
	// 			...settings.payment.methods.filter((method) => method.enabled),
	// 		);
	// 	}

	// 	// Add Tabby if eligible
	// 	if (tabbyEligible) {
	// 		methods.push({
	// 			key: "tabby",
	// 			name: "Pay with Tabby",
	// 			enabled: true,
	// 		});
	// 	}

	// 	return methods;
	// }, [settings, tabbyEligible]);

	// Check Tabby eligibility when total changes
	useEffect(() => {
		const checkTabbyEligibility = async () => {
			if (total >= 50) {
				// Minimum amount for Tabby
				try {
					const response = await axiosInstance.post("/tabby/eligibility", {
						amount: total,
						currency: settings?.general?.currency || "AED",
						phone: watch("phone"),
					});

					setTabbyEligible(response.data.eligible);
					setTabbyInstallments(response.data.installments);
				} catch (error) {
					console.error("Error checking Tabby eligibility:", error);
					setTabbyEligible(false);
				}
			} else {
				setTabbyEligible(false);
			}
		};

		const delayCheck = setTimeout(checkTabbyEligibility, 500); // Debounce
		return () => clearTimeout(delayCheck);
	}, [total, watch("phone"), settings]);

	const handleTabbyPayment = async (orderData) => {
		try {
			setIsCreatingTabbySession(true);

			const response = await axiosInstance.post(
				"/tabby/create-session",
				orderData,
			);

			if (response.data.success) {
				// Redirect to Tabby checkout
				window.location.href = response.data.redirectUrl;
			} else {
				toast.error(
					response.data.error || "Failed to create Tabby payment session",
				);
			}
		} catch (error) {
			console.error("Tabby payment error:", error);
			toast.error(
				error?.response?.data?.error || "Failed to process Tabby payment",
			);
		} finally {
			setIsCreatingTabbySession(false);
		}
	};

	const handleCouponApply = async (code) => {
		if (!code) return;
		try {
			const { data } = await axiosInstance.post("/coupons/validate", {
				code,
				cart: items.map((item) => ({
					_id: item._id,
					quantity: item.quantity,
					price: item.price,
					stock: item.stock, // Include stock in coupon validation
				})),
				subtotal,
				shippingCost: shippingCharge.toFixed(2),
			});
			if (data.success) {
				setCouponCode(code);
				// The discount will be updated from the summary response
				// setCouponDiscount(data.discount || 0);
				toast.success(`Coupon applied: ${data.message}`);
			} else {
				setCouponCode("");
				toast.error(data.message || "Invalid coupon code");
			}
		} catch (error) {
			console.error("Error validating coupon:", error);
			setCouponCode("");
			toast.error(
				error?.response?.data?.message || "Failed to validate coupon",
			);
		}
		// The useEffect hook will automatically refetch the summary when couponCode changes
	};

	const onSubmit = async (data) => {
		if (isEmpty) {
			toast.error("Your cart is empty");
			return;
		}
		try {
			setIsSubmitting(true);
			if (data.paymentMethod === "stripe") {
				setIsCreatingPaymentIntent(true);
			}
			const orderData = {
				...data,
				products: items.map((item) => ({
					_id: item._id,
					quantity: item.quantity,
					price: item.price,
					stock: item.stock, // Include stock in order data
				})),
				tax,
				taxRate: taxRatePercentage,
				shippingCharge: shippingCharge,
				couponCode,
				couponDiscount,
				total: total,
				subtotal,
				currency: settings?.general?.currency,
			};

			// Handle Tabby payment
			if (data.paymentMethod === "tabby") {
				await handleTabbyPayment(orderData);
				return;
			}

			// Handle Stripe payment
			if (data.paymentMethod === "stripe") {
				setIsCreatingPaymentIntent(true);
			}

			const { data: orderRes } = await axiosInstance.post("/orders", orderData);
			if (orderRes?.stripeClientSecret) {
				if (!orderRes?.stripeClientSecret) {
					throw new Error("Payment intent not created");
				}
				setStripeClientSecret(orderRes?.stripeClientSecret);
				setStripeOrderData({ ...orderData, orderId: orderRes.order.orderId });
				setShowStripeModal(true);
			} else {
				emptyCart();
				toast.success("Order placed successfully!");
				if (orderRes?.order?.orderId) {
					router.push(`/success/${orderRes.order.orderId}`);
				} else {
					router.push("/success");
				}
			}
		} catch (error) {
			console.error("Order submission error:", error);
			toast.error(
				error?.response?.data?.error ||
					error?.message ||
					"Failed to place order. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
			setIsCreatingPaymentIntent(false); // Ensure reset in all cases
		}
	};

	const renderTabbyPaymentOption = () => {
		if (!tabbyEligible) return null;

		return (
			<div
				className={`relative flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
					paymentMethod === "tabby"
						? "border-black bg-gray-50 shadow-sm"
						: "border-gray-200 hover:border-gray-300 bg-white"
				}`}
				onClick={() => setValue("paymentMethod", "tabby")}
			>
				<div className="flex items-center gap-4">
					<Controller
						name="paymentMethod"
						control={control}
						render={({ field }) => (
							<div className="relative">
								<input
									type="radio"
									id="payment_tabby"
									value="tabby"
									checked={field.value === "tabby"}
									onChange={() => field.onChange("tabby")}
									className="sr-only"
								/>
								<div
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
										field.value === "tabby"
											? "border-black bg-black"
											: "border-gray-300"
									}`}
								>
									{field.value === "tabby" && (
										<div className="w-2 h-2 bg-white rounded-full"></div>
									)}
								</div>
							</div>
						)}
					/>
					<div>
						<label
							htmlFor="payment_tabby"
							className="font-medium text-gray-900 cursor-pointer"
						>
							Pay with Tabby
						</label>
						<div className="text-sm text-gray-500 mt-1">
							Split into 4 interest-free payments
						</div>
						{tabbyInstallments && (
							<div className="text-sm text-green-600 mt-1">
								4 payments of {settings?.general?.currency}{" "}
								{(total / 4).toFixed(2)}
							</div>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<svg
						className="w-8 h-8 text-purple-600"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
					</svg>
					<span className="text-purple-600 font-bold text-sm">tabby</span>
				</div>
			</div>
		);
	};

	const displayFormError = (fieldName) => {
		if (errors[fieldName]) {
			return (
				<p className="text-red-500 text-sm mt-1">
					{errors[fieldName]?.message}
				</p>
			);
		}
		return null;
	};



	const isProcessing =
		isSubmitting || isCreatingPaymentIntent || isCreatingTabbySession;
	const getButtonText = () => {
		if (isCreatingTabbySession) return "Redirecting to Tabby...";
		if (isCreatingPaymentIntent) return "Preparing Payment...";
		if (isSubmitting) return "Processing Order...";
		if (paymentMethod === "tabby") return "Pay with Tabby";
		if (paymentMethod === "stripe") return "Pay Now";
		return "Place Order";
	};

	if (!isClient) {
		return (
			<div className="container mx-auto px-4 py-12 text-center">
				<p>Loading checkout...</p>
			</div>
		);
	}

	if (isEmpty) {
		return (
			<Layout announcements={announcements}>
				<div className="flex flex-col items-center justify-center min-h-screen p-4">
					<h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
					<p className="text-gray-500">
						Please add items to your cart before proceeding.
					</p>
					<button
						onClick={() => (window.location.href = "/")}
						className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
					>
						Browse Products
					</button>
				</div>
			</Layout>
		);
	}

	return (
		<Layout announcements={announcements}>
			<div className="checkout-block relative md:pt-[74px] pt-[56px]">
				<div className="content-main flex max-lg:flex-col-reverse justify-between">
					<div className="left flex lg:justify-end w-full">
						<div className="lg:max-w-[716px] flex-shrink-0 w-full lg:pr-[70px] pl-[16px] max-lg:pr-[16px]">
							<form onSubmit={handleSubmit(onSubmit, onError)}>
								<div>
									<div className="relative">
										<div className="font-medium mb-6 text-[16px]">
											Your Cart
										</div>
										<input
											type="email"
											className={`border border-black/30 px-4 py-3 w-full rounded-lg ${errors.email ? "border-red-500" : "border-gray-800"}`}
											placeholder="Email or mobile phone number"
											{...register("email")}
										/>
										{displayFormError("email")}
									</div>

									<div className="form-checkout mt-5">
										<div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
											<div className="col-span-full relative">
												<select
													className={`border border-black/30 px-4 py-3 w-full rounded-lg appearance-none ${errors.country ? "border-red-500" : "border-gray-300"}`}
													id="country"
													{...register("country")}
													disabled
												>
													<option value="United Arab Emirates">
														United Arab Emirates
													</option>
												</select>
												<CaretDown
													className="absolute right-4 top-1/2 transform -translate-y-1/2"
													size={16}
												/>
												{displayFormError("country")}
											</div>

											<div className="col-span-full relative mt-4">
												<select
													className={`border border-black/30 px-4 py-3 w-full rounded-lg appearance-none ${errors.emirate ? "border-red-500" : "border-gray-300"}`}
													id="emirate"
													{...register("emirate")}
												>
													<option value="">Choose Emirate</option>
													<option value="Abu Dhabi">Abu Dhabi</option>
													<option value="Dubai">Dubai</option>
													<option value="Sharjah">Sharjah</option>
													<option value="Ajman">Ajman</option>
													<option value="Umm Al Quwain">Umm Al Quwain</option>
													<option value="Ras Al Khaimah">Ras Al Khaimah</option>
													<option value="Fujairah">Fujairah</option>
												</select>
												<CaretDown
													className="absolute right-4 top-1/2 transform -translate-y-1/2"
													size={16}
												/>
												{displayFormError("emirate")}
											</div>

											<div className="">
												<input
													className={`border border-black/30 px-4 py-3 w-full rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
													id="firstName"
													type="text"
													placeholder="First Name"
													{...register("firstName")}
												/>
												{displayFormError("firstName")}
											</div>
											<div className="">
												<input
													className={`border border-black/30 px-4 py-3 w-full rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
													id="lastName"
													type="text"
													placeholder="Last Name"
													{...register("lastName")}
												/>
												{displayFormError("lastName")}
											</div>
											<div className="col-span-full relative">
												<input
													className={`border border-black/30 pl-4 pr-12 py-3 w-full rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
													id="address"
													type="text"
													placeholder="Address"
													{...register("address")}
												/>
												<MagnifyingGlass
													className="absolute top-1/2 -translate-y-1/2 right-5"
													size={20}
												/>
												{displayFormError("address")}
											</div>
											<div className="">
												<input
													className="border border-black/30 px-4 py-3 w-full rounded-lg"
													id="apartment"
													type="text"
													placeholder="Apartment, suite, etc. (optional)"
													{...register("apartment")}
												/>
											</div>
											<div className="">
												<input
													className={`border border-black/30 px-4 py-3 w-full rounded-lg ${errors.city ? "border-red-500" : "border-gray-300"}`}
													id="city"
													type="text"
													placeholder="City"
													{...register("city")}
												/>
												{displayFormError("city")}
											</div>

											<div className="col-span-full">
												<Controller
													name="phone"
													control={control}
													render={({ field }) => (
														<div className={errors.phone ? "has-error" : ""}>
															<PhoneInput
																country={"ae"}
																value={field.value}
																onChange={field.onChange}
																inputClass={`border border-black/30 px-4 py-3 w-full rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
																containerClass="phone-input-container"
																buttonClass="phone-input-button"
																dropdownClass="phone-input-dropdown"
																placeholder="Phone Number"
															/>
															{displayFormError("phone")}
														</div>
													)}
												/>
											</div>
										</div>
										<div className="font-medium mt-6 text-[16px]">Delivery</div>
										<div className="mt-2">
											<div className="flex items-center gap-2 relative px-5 border border-gray-300 rounded-t-lg">
												<input
													type="radio"
													id="ship_type"
													value="ship"
													className="cursor-pointer"
													{...register("deliveryType")}
												/>
												<label
													htmlFor="ship_type"
													className="w-full py-4 cursor-pointer"
												>
													Ship
												</label>
												<Truck
													className="absolute top-1/2 right-5 -translate-y-1/2"
													size={20}
												/>
											</div>
											<div className="flex items-center gap-2 relative px-5 border border-gray-300 rounded-b-lg border-t-0">
												<input
													type="radio"
													id="store_type"
													value="pickup"
													className="cursor-pointer"
													{...register("deliveryType")}
												/>
												<label
													htmlFor="store_type"
													className="w-full py-4 cursor-pointer"
												>
													Pickup in store
												</label>
												<Storefront
													className="absolute top-1/2 right-5 -translate-y-1/2"
													size={20}
												/>
											</div>
										</div>

										{deliveryType === "ship" && (
											<>
												<h4 className="font-medium mt-6 text-[16px]">
													Shipping method
												</h4>
												<div className="mt-3 space-y-3">
													{availableShippingMethods.length > 0 ? (
														availableShippingMethods.map((method, index) => (
															<div
																key={index}
																className={`flex items-center justify-between px-5 py-4 border rounded-lg cursor-pointer ${selectedShippingMethod === method.name ? "border-black bg-gray-50" : "border-gray-300"}`}
																onClick={() =>
																	setValue("shippingMethod", method.name || "")
																}
															>
																<div className="flex items-center gap-3">
																	<input
																		type="radio"
																		id={`shipping_${method.name}`}
																		value={method.name}
																		checked={
																			selectedShippingMethod === method.name
																		}
																		{...register("shippingMethod")}
																	/>
																	<label
																		htmlFor={`shipping_${method.name}`}
																		className="cursor-pointer"
																	>
																		<div className="font-medium">
																			{method.name}
																		</div>
																		{method.description && (
																			<div className="text-sm text-gray-500">
																				{method.description}
																			</div>
																		)}
																		{method.estimatedDeliveryDays && (
																			<div className="text-sm text-gray-500">
																				Estimated delivery:{" "}
																				{method.estimatedDeliveryDays} days
																			</div>
																		)}
																		{method.freeShippingThreshold && (
																			<div className="text-sm text-gray-500">
																				Free shipping on orders over{" "}
																				{settings?.general?.currency ||
																					currency?.symbol}{" "}
																				{method.freeShippingThreshold.toFixed(
																					2,
																				)}
																			</div>
																		)}
																	</label>
																</div>
																<div className="text-right font-medium">
																	{subtotal >=
																	(method.freeShippingThreshold ||
																		Number.POSITIVE_INFINITY) ? (
																		"Free"
																	) : (
																		<span>
																			{settings?.general?.currency ||
																				currency?.symbol}{" "}
																			{method.cost.toFixed(2)}
																		</span>
																	)}
																</div>
															</div>
														))
													) : (
														<div className="px-5 py-4 border border-gray-300 rounded-lg">
															No shipping methods available. Please contact
															customer support.
														</div>
													)}
													{errors.shippingMethod && (
														<p className="text-red-500 text-sm mt-1">
															{errors.shippingMethod.message}
														</p>
													)}
												</div>
											</>
										)}

										<div className="mt-8">
											<div className="mb-6">
												<h4 className="font-semibold text-xl text-black mb-2">
													Payment Method
												</h4>
												<p className="text-gray-600 text-sm">
													All transactions are secure and encrypted with 256-bit
													SSL protection.
												</p>
											</div>

											<div className="space-y-4">
												{availablePaymentMethods.length > 0 ? (
													availablePaymentMethods.map((method, index) => (
														<div
															key={index}
															className={`relative flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
																paymentMethod === method.key
																	? "border-black bg-gray-50 shadow-sm"
																	: "border-gray-200 hover:border-gray-300 bg-white"
															}`}
															onClick={() =>
																setValue("paymentMethod", method.key)
															}
														>
															<div className="flex items-center gap-4">
																<Controller
																	name="paymentMethod"
																	control={control}
																	render={({ field }) => (
																		<div className="relative">
																			<input
																				type="radio"
																				id={`payment_${method.key}`}
																				value={method.key}
																				checked={field.value === method.key}
																				onChange={() =>
																					field.onChange(method.key)
																				}
																				className="sr-only"
																				aria-label={`Select ${method.name} payment method`}
																			/>
																			<div
																				className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
																					field.value === method.key
																						? "border-black bg-black"
																						: "border-gray-300"
																				}`}
																			>
																				{field.value === method.key && (
																					<div className="w-2 h-2 bg-white rounded-full"></div>
																				)}
																			</div>
																		</div>
																	)}
																/>
																<label
																	htmlFor={`payment_${method.key}`}
																	className="font-medium text-gray-900 cursor-pointer"
																>
																	{method.name}
																</label>
															</div>
															<div
																className={`transition-colors ${
																	paymentMethod === method.key
																		? "text-black"
																		: "text-gray-400"
																}`}
															>
																{method.key === "cash_on_delivery" && (
																	<Money size={24} />
																)}
																{method.key === "credit_card" && (
																	<CreditCard size={24} />
																)}
																{method.key === "stripe" && (
																	<CreditCard size={24} />
																)}
																{method.key === "paypal" && (
																	<CurrencyCircleDollar size={24} />
																)}
															</div>
														</div>
													))
												) : (
													<div
														className={`relative flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
															paymentMethod === "cash_on_delivery"
																? "border-black bg-gray-50 shadow-sm"
																: "border-gray-200 hover:border-gray-300 bg-white"
														}`}
													>
														<div className="flex items-center gap-4">
															<Controller
																name="paymentMethod"
																control={control}
																render={({ field }) => (
																	<div className="relative">
																		<input
																			type="radio"
																			id="cash_on_delivery"
																			value="cash_on_delivery"
																			checked={
																				field.value === "cash_on_delivery"
																			}
																			onChange={() =>
																				field.onChange("cash_on_delivery")
																			}
																			className="sr-only"
																			aria-label="Select Cash on Delivery payment method"
																		/>
																		<div
																			className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
																				field.value === "cash_on_delivery"
																					? "border-black bg-black"
																					: "border-gray-300"
																			}`}
																		>
																			{field.value === "cash_on_delivery" && (
																				<div className="w-2 h-2 bg-white rounded-full"></div>
																			)}
																		</div>
																	</div>
																)}
															/>
															<label
																htmlFor="cash_on_delivery"
																className="font-medium text-gray-900 cursor-pointer"
															>
																Cash on Delivery
															</label>
														</div>
														<div
															className={`transition-colors ${
																paymentMethod === "cash_on_delivery"
																	? "text-black"
																	: "text-gray-400"
															}`}
														>
															<Money size={24} />
														</div>
													</div>
												)}

												{errors.paymentMethod && (
													<div className="flex items-center gap-2 text-red-600 text-sm mt-2">
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
																clipRule="evenodd"
															/>
														</svg>
														{errors.paymentMethod.message}
													</div>
												)}
											</div>
										</div>
										{paymentMethod === "stripe" && (
											<div className="mt-6">
												<div className="border-2 border-gray-200 p-6 rounded-xl bg-white">
													<div className="text-center py-6">
														<div className="flex items-center justify-center mb-4">
															<CreditCard size={48} className="text-gray-400" />
														</div>
														<h3 className="text-lg font-medium text-gray-900 mb-2">
															Secure Card Payment
														</h3>
														<p className="text-gray-600 text-sm">
															Your payment will be processed securely when you
															place your order
														</p>
														<div className="flex items-center justify-center mt-4 space-x-6">
															<img
																src="/images/visa.png"
																alt="Visa"
																className="h-6"
															/>
															<img
																src="/images/mastercard.png"
																alt="Mastercard"
																className="h-6"
															/>
															<img
																src="/images/amex.png"
																alt="American Express"
																className="h-6"
															/>
														</div>
													</div>
												</div>
											</div>
										)}

										{renderTabbyPaymentOption()}
										<div className="mt-8">
											<label
												htmlFor="notes"
												className="block font-semibold text-lg text-black mb-3"
											>
												Order Notes
												<span className="text-gray-500 font-normal text-sm ml-2">
													(Optional)
												</span>
											</label>
											<textarea
												id="notes"
												className="border-2 border-gray-200 px-4 py-4 w-full rounded-xl focus:border-black focus:outline-none transition-colors resize-none bg-white"
												rows={4}
												placeholder="Add any special instructions for your order..."
												{...register("notes")}
											></textarea>
										</div>

										<div className="mt-10">
											<button
												type="submit"
												className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
												disabled={isSubmitting || isCreatingPaymentIntent}
											>
												{isSubmitting || isCreatingPaymentIntent ? (
													<div className="flex items-center justify-center gap-3">
														<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
														<span>
															{paymentMethod === "stripe" &&
															isCreatingPaymentIntent
																? "Preparing Payment..."
																: "Processing Order..."}
														</span>
													</div>
												) : (
													<span className="flex items-center justify-center gap-2">
														<svg
															className="w-5 h-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
															/>
														</svg>
														{paymentMethod === "stripe"
															? "Pay Now"
															: "Place Order"}
													</span>
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
							<div className="text-sm text-gray-500 mt-12 py-3 border-t border-gray-300"></div>
						</div>
					</div>
					{/* Right Cart Summary */}
					<div className="right justify-start flex-shrink-0 lg:w-[47%] bg-gray-50">
						<div className="lg:sticky lg:top-24 h-fit lg:max-w-[606px] w-full flex-shrink-0 lg:pl-[80px] pr-[16px] max-lg:pl-[16px]">
							<div className="flex flex-col gap-7">
								{items.map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-between gap-6"
									>
										<div className="flex items-center gap-6">
											<div className="relative flex-shrink-0 w-[100px] h-[100px]">
												<img
													src={
														item.thumbnail || "/images/product/placeholder.png"
													}
													alt={item.name}
													className="w-full h-full object-cover rounded-lg"
												/>
												<span className="flex items-center justify-center absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black text-white">
													{item.quantity}
												</span>
											</div>
											<div>
												<strong className="font-medium">{item.name}</strong>
												<div className="flex items-center gap-2 mt-2">
													<Tag className="text-gray-500" size={16} />
													<span className="text-gray-500">
														{item.sku || "N/A"}
													</span>
												</div>
												<div className="flex items-center gap-2 mt-2">
													<span className="text-gray-500">
														Stock:{" "}
														{item.stock !== undefined ? item.stock : "N/A"}
													</span>
													{item.stock !== undefined &&
														item.stock <= 5 &&
														item.stock > 0 && (
															<span className="text-red-500 text-sm">
																(Low Stock)
															</span>
														)}
													{item.stock === 0 && (
														<span className="text-red-500 text-sm">
															(Out of Stock)
														</span>
													)}
												</div>
												<div className="flex items-center gap-2 mt-2">
													<button
														onClick={() => {
															updateItemQuantity(item._id, item.quantity - 1);
															toast.success(
																`Decreased quantity for ${item.name}`,
															);
														}}
														disabled={item.quantity <= 1}
														className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
														title="Decrease quantity"
														aria-label={`Decrease quantity for ${item.name}`}
													>
														−
													</button>
													<span className="text-sm font-medium">
														{item.quantity}
													</span>
													<button
														onClick={() => {
															if (
																item.stock !== undefined &&
																item.quantity >= item.stock
															) {
																toast.error(
																	`Cannot add more ${item.name}. Only ${item.stock} in stock.`,
																);
																return;
															}
															updateItemQuantity(item._id, item.quantity + 1);
															toast.success(
																`Increased quantity for ${item.name}`,
															);
														}}
														disabled={
															item.stock !== undefined &&
															item.quantity >= item.stock
														}
														className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
														title="Increase quantity"
														aria-label={`Increase quantity for ${item.name}`}
													>
														+
													</button>
												</div>
											</div>
										</div>
										<div className="flex flex-col gap-1 items-end">
											{item.originalPrice &&
												item.originalPrice > item.price && (
													<del className="text-sm text-gray-500 text-end">
														{settings?.general?.currency}{" "}
														{(item.originalPrice * item.quantity).toFixed(2)}
													</del>
												)}
											<strong className="font-medium">
												{settings?.general?.currency}{" "}
												{(item.price * item.quantity).toFixed(2)}
											</strong>
											<button
												onClick={() => {
													try {
														if (!item._id) {
															throw new Error(
																"Item _id is undefined or invalid",
															);
														}
														removeItem(item._id);
														toast.success(`${item.name} removed from cart`);
														if (totalItems === 1) {
															emptyCart();
														}
													} catch (error) {
														console.error("Error removing item:", error);
														setCart(items.filter((i) => i._id !== item._id));
														toast.success(
															`${item.name} removed from cart (fallback)`,
														);
													}
												}}
												className="mt-2 text-red-600 hover:text-red-800"
												title="Remove item"
												aria-label={`Remove ${item.name} from cart`}
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
							</div>

							<div className="mt-8">
								<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
								{loadingSummary ? (
									<div className="text-center">Loading summary...</div>
								) : summary ? (
									<div className="space-y-3">
										<div className="flex justify-between">
											<span>Subtotal</span>
											<span>
												{summary.currency} {summary.subtotal.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Shipping</span>
											<span>
												{summary.shipping.cost === 0
													? "Free"
													: `${summary.currency} ${summary.shipping.cost.toFixed(2)}`}
											</span>
										</div>
										{summary.tax.amount > 0 && (
											<div className="flex justify-between">
												<span>Tax ({summary.tax.rate}%)</span>
												<span>
													{summary.currency} {summary.tax.amount.toFixed(2)}
												</span>
											</div>
										)}
										{summary.discount > 0 && (
											<div className="flex justify-between text-green-600">
												<span>Discount</span>
												<span>
													- {summary.currency} {summary.discount.toFixed(2)}
												</span>
											</div>
										)}
										<div className="border-t border-gray-300 pt-3 mt-3">
											<div className="flex justify-between items-center">
												<span className="text-lg font-medium">Total</span>
												<span className="text-xl font-bold">
													{summary.currency} {summary.total.toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								) : (
									<div className="text-center">Could not load summary.</div>
								)}


								<div className="mt-8">
									<div className="mb-4">
										<h3 className="text-xl font-semibold text-black mb-2 flex items-center gap-2">
											<svg
												className="w-5 h-5 text-black"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
												/>
											</svg>
											Apply Coupon
										</h3>
										<p className="text-gray-600 text-sm">
											Enter your discount code to save on your order
										</p>
									</div>

									<div className="relative">
										<div className="flex rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-black transition-colors bg-white shadow-sm">
											<div className="relative flex-1">
												<input
													type="text"
													className="w-full px-4 py-4 text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none"
													placeholder="Enter coupon code (e.g., SAVE20)"
													value={couponCode}
													onChange={(e) => setCouponCode(e.target.value)}
												/>
												{couponCode && (
													<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
														<svg
															className="w-5 h-5 text-gray-400"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
															/>
														</svg>
													</div>
												)}
											</div>
											<button
												type="button"
												onClick={() => handleCouponApply(couponCode)}
												disabled={!couponCode.trim()}
												className="px-6 py-4 bg-black text-white font-semibold hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 6v6m0 0v6m0-6h6m-6 0H6"
													/>
												</svg>
												Apply
											</button>
										</div>
									</div>

									{couponDiscount > 0 && (
										<div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
											<div className="flex items-center gap-3">
												<div className="flex-shrink-0">
													<svg
														className="w-6 h-6 text-green-600"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
												<div>
													<p className="font-semibold text-green-800">
														Coupon Applied Successfully!
													</p>
													<p className="text-green-700 text-sm">
														You saved {settings?.general?.currency}{" "}
														{couponDiscount.toFixed(2)} on your order
													</p>
												</div>
											</div>
										</div>
									)}

									<div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
										<svg
											className="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										Coupon codes are case-sensitive and cannot be combined with
										other offers
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style jsx global>{`
				.phone-input-container {
					width: 100%;
				}
				.phone-input-container .form-control {
					width: 100% !important;
					height: 40px;
				}
				.phone-input-button {
					background-color: #f3f4f6 !important;
					border: 1px solid #e5e7eb !important;
					border-right: none !important;
				}
				.phone-input-dropdown {
					max-height: 200px;
					overflow-y: auto;
				}
			`}</style>

			{stripeClientSecret && (
				<StripePaymentModal
					isOpen={showStripeModal}
					onClose={handleCloseModal}
					clientSecret={stripeClientSecret}
					orderData={stripeOrderData}
					onPaymentSuccess={handlePaymentSuccess}
					onPaymentError={handlePaymentError}
					settings={settings}
				/>
			)}
		</Layout>
	);
};

function CheckoutPage(props) {
	return <CheckoutComponent {...props} />;
}

export default CheckoutPage;

export async function getStaticProps() {
	try {
		const announcementsRes = await axiosInstance.get("/announcements");
		return {
			props: {
				announcements: announcementsRes.data.announcements || [],
			},
			revalidate: 3600,
		};
	} catch (error) {
		console.error("Error fetching announcements:", error.message);
		return {
			props: {
				announcements: [],
			},
		};
	}
}
