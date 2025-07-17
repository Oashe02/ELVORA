"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";
import { ShoppingCart, Wrench, Settings, Truck } from "lucide-react";
import Layout from "@/components/layouts/Layout";
import { Sparkles, Flame } from "lucide-react";

const Register = ({ announcements }) => {
	const { setSession } = useAuthStore();

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState("email");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const sendOtp = async () => {
		setLoading(true);
		setMessage("");

		const { data } = await axiosInstance.post("/auth/request-otp", { email });
		if (data.ok) {
			setStep("otp");
			toast.success("OTP sent to your email.");
		} else {
			toast.error("Failed to send OTP.");
		}
		setLoading(false);
	};

	const verifyOtp = async () => {
		try {
			setLoading(true);

			const { data } = await axiosInstance.post(
				"/auth/verify-otp",
				{
					email,
					code: otp,
				},
				{ withCredentials: true },
			);

			if (data.ok) {
				handleRedirection(data);
			} else {
				toast.error("Invalid OTP.");
			}
			setLoading(false);
		} catch (error) {
			console.error("Error verifying OTP:", error);
			toast.error("Failed to verify OTP.");
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log({
			googleLoing: window.google,
			googleClient: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		});

		const initializeGoogleLogin = () => {
			const btn = document.getElementById("googleBtn");
			if (!btn || !window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
				return;

			window.google.accounts.id.initialize({
				client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
				callback: async (response) => {
					try {
						const { data } = await axiosInstance.post(
							"/auth/google",
							{
								idToken: response.credential,
							},
							{ withCredentials: true },
						);

						console.log("[Google Login] Response:", data);

						if (data.ok) {
							handleRedirection(data);
						} else {
							alert(data.error || "Google login failed.");
						}
					} catch (error) {
						console.error("Google login error:", error);
						alert("Something went wrong with Google login.");
					}
				},
			});

			window.google.accounts.id.renderButton(btn, {
				theme: "outline",
				size: "large",
				width: 300,
			});
		};

		// Run only on client
		if (typeof window !== "undefined") {
			const interval = setInterval(() => {
				if (window.google && document.getElementById("googleBtn")) {
					initializeGoogleLogin();
					clearInterval(interval);
				}
			}, 100);

			// Cleanup interval on unmount
			return () => clearInterval(interval);
		}
	}, []);

	const handleRedirection = async (data) => {
		console.log("[OTP LOGIN] Response:", data);

		const token = data.token;
		if (!token) {
			setMessage("Authentication failed: No token returned.");
			return;
		}

		try {
			const decoded = jwtDecode(token);
			setSession({
				user: decoded,
			});
			localStorage.setItem("@token", token);

			setMessage("Login successful! Redirecting...");
			window.location.href = decoded.role === "admin" ? "/dashboard" : "/";
		} catch (err) {
			console.error("JWT decode failed", err);
			setMessage("Invalid session token.");
			setLoading(false);
		}
	};

	return (
		<Layout announcements={announcements}>
			<Script
				src="https://accounts.google.com/gsi/client"
				strategy="afterInteractive"
			/>

			<div className="flex items-center justify-center min-h-screen bg-white p-4">
				<div className="bg-white rounded-3xl shadow-lg max-w-5xl w-full overflow-hidden">
					<div className="flex max-md:flex-col">
						{/* Left - Brand Visual */}
						<div className="md:w-1/2 w-full bg-gradient-to-br from-[#f8e9dc] to-[#fdf7f2] p-12 flex flex-col justify-center relative">
							<div className="absolute inset-0 opacity-5 bg-[url('/assets/perfume-bg.png')] bg-cover bg-center" />

							<div className="relative z-10 text-[#5c4438]">
								<h1 className="text-4xl font-semibold leading-tight mb-6">
									Welcome to <span className="italic underline">PERFUM</span>
								</h1>
								<p className="text-base text-[#7b5c50] mb-8">
									Where luxury meets scent — discover premium perfumes crafted
									to elevate your senses.
								</p>

								<div className="flex space-x-6 mt-6">
									<div className="text-center">
										<div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
											<Sparkles className="w-8 h-8 text-[#5c4438]" />
										</div>
										<p className="text-sm">Floral Notes</p>
									</div>
									<div className="text-center">
										<div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
											<Flame className="w-8 h-8 text-[#5c4438]" />
										</div>
										<p className="text-sm">Luxury Bottles</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right - Login Form */}
						<div className="md:w-1/2 w-full p-12">
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-[#3e2b23] mb-2">
									Login to Continue
								</h2>
								<p className="text-[#6b4c41]">
									Enter your email to receive a login code
								</p>
								{message && (
									<p className="text-purple-500 text-md mt-4 font-medium">
										{message}
									</p>
								)}
							</div>

							<form className="space-y-6">
								<div>
									<input
										className="w-full px-4 py-4 border border-[#e8d8cc] rounded-xl focus:ring-2 focus:ring-[#5c4438] focus:border-[#5c4438] outline-none transition-all text-gray-900 placeholder-[#bbaaa1] text-lg"
										type="email"
										placeholder="Email address"
										value={email}
										name="email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								{step === "otp" && (
									<div>
										<input
											className="w-full px-4 py-4 border border-[#e8d8cc] rounded-xl focus:ring-2 focus:ring-[#5c4438] focus:border-[#5c4438] outline-none transition-all text-gray-900 placeholder-[#bbaaa1] text-lg"
											type="text"
											placeholder="Enter verification code"
											value={otp}
											onChange={(e) => setOtp(e.target.value)}
											required
										/>
									</div>
								)}

								<button
									type="button"
									onClick={step === "email" ? sendOtp : verifyOtp}
									disabled={loading}
									className="w-full bg-[#5c4438] hover:bg-[#463129] text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 text-lg"
								>
									{loading
										? step === "email"
											? "Sending Code..."
											: "Verifying..."
										: step === "email"
											? "Send Verification Code"
											: "Verify & Login"}
								</button>

								<div className="relative my-8">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-[#e8d8cc]"></div>
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-4 bg-white text-[#8d766c]">
											Or Login with
										</span>
									</div>
								</div>

								<div className="flex justify-center">
									<div id="googleBtn" className="w-full flex justify-center" />
								</div>

								{step === "otp" && (
									<div className="text-center mt-6">
										<button
											type="button"
											onClick={() => setStep("email")}
											className="text-[#5c4438] hover:text-[#3e2b23] font-medium underline transition-colors"
										>
											← Back to email
										</button>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Register;

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
