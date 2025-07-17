"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, Tag, Gift } from "lucide-react";

const ModalNewsletter = ({ coupons = [] }) => {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const [selectedCoupon, setSelectedCoupon] = useState(null);

	useEffect(() => {
		if (coupons.length > 0) {
			setSelectedCoupon(coupons[0]);
			setTimeout(() => {
				setOpen(true);
			}, 3000);
		}
	}, [coupons]);

	const handleCopyCode = () => {
		if (selectedCoupon) {
			navigator.clipboard.writeText(selectedCoupon.code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	if (!open || !selectedCoupon) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
			onClick={() => setOpen(false)}
		>
			<div className="container px-4">
				<div
					className="relative max-w-md mx-auto bg-white rounded-3xl shadow-2xl transform animate-in zoom-in-95 duration-500 ease-out border border-white/20"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
					<div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-15 blur-xl"></div>
					<button
						className="absolute right-4 top-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg group"
						onClick={() => setOpen(false)}
					>
						<X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
					</button>

					<div className="relative p-8 pt-12 text-center">
						<div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg mb-6 animate-pulse">
							<Gift className="w-4 h-4" />
							Special Offer
						</div>
						<div className="mb-6">
							<h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight mb-2">
								BLACK
							</h1>
							<h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 leading-tight">
								FRIDAY
							</h1>
						</div>
						<p className="text-lg text-gray-700 mb-6 font-medium">
							{selectedCoupon.firstPurchaseOnly ? "New customers" : "Customers"}{" "}
							save{" "}
							<span className="text-2xl font-bold text-red-500 animate-bounce inline-block">
								{selectedCoupon.type === "fixed"
									? `$${selectedCoupon.value}`
									: `${selectedCoupon.value}%`}
							</span>
							<br />
							with the code below
						</p>
						<div className="bg-white rounded-2xl p-4 mb-6 shadow-inner border-2 border-dashed border-gray-300 relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 opacity-50"></div>
							<div className="relative flex items-center justify-between">
								<div className="flex items-center gap-3">
									<Tag className="w-6 h-6 text-red-500" />
									<span className="text-2xl font-black text-gray-800 tracking-wider">
										{selectedCoupon.code}
									</span>
								</div>
							</div>
						</div>
						<button
							onClick={handleCopyCode}
							className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 group"
						>
							<Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
							{copied ? "Copied!" : "Copy Coupon Code"}
						</button>

						{copied && (
							<div className="absolute inset-x-0 bottom-4 mx-8">
								<div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium animate-in slide-in-from-bottom-2 duration-300">
									✓ Code copied to clipboard!
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalNewsletter;
