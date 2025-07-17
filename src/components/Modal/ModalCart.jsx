import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useModalCart } from "@/context/ModalCartContext";
import { NotebookPenIcon, Tag, Truck, X } from "lucide-react";

const ModalCart = ({ serverTimeLeft }) => {
	const [timeLeft, setTimeLeft] = useState(serverTimeLeft);

	const [activeTab, setActiveTab] = (useState < string) | (undefined > "");
	const { isModalOpen, closeModalCart } = useModalCart();
	const { isEmpty, items, removeItem, updateItemQuantity, cartTotal } =
		useCart();

	console.log("Total Items in cart Modal :", items);

	const handleActiveTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<>
			<div
				className={`modal-cart-block ${isModalOpen ? "active" : ""}`}
				onClick={closeModalCart}
			>
				<div
					className={`modal-cart-main flex ${isModalOpen ? "open" : ""}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="left w-1/2 border-r border-line py-6 max-md:hidden">
						{/* Left side content */}
					</div>
					<div className="right cart-block md:w-1/2 w-full py-6 relative overflow-hidden">
						<div className="heading px-6 pb-3 flex items-center justify-between relative">
							<div className="heading5">Shopping Cart</div>
							<div
								className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
								onClick={closeModalCart}
							>
								<X size={14} />
							</div>
						</div>
						<div className="heading banner mt-3 px-6">
							<div className="text">
								Buy{" "}
								<span className="text-button">
									${150 - cartTotal > 0 ? (150 - cartTotal).toFixed(2) : "0.00"}
								</span>{" "}
								more to get <span className="text-button">freeship</span>
							</div>
							<div className="tow-bar-block mt-3">
								<div
									className="progress-line"
									style={{
										width:
											cartTotal <= 150 ? `${(cartTotal / 150) * 100}%` : `100%`,
									}}
								></div>
							</div>
						</div>

						<div className="list-product px-6 overflow-y-auto max-h-[calc(100vh-400px)]">
							{!isEmpty ? (
								<>
									<div
										style={{
											color: "red",
											fontWeight: "bold",
											marginBottom: "10px",
										}}
									>
										Number of items: {items.length}
									</div>
									{items.map((product) => (
										<div
											key={product.id}
											className="item py-5 flex items-center justify-between gap-3 border-b border-line"
										>
											<div className="infor flex items-center gap-3 w-full">
												<div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
													<img
														src={product.images?.[0] || "/placeholder.svg"}
														alt={product.name}
														width="100"
														height="100"
													/>
												</div>
												<div className="w-full">
													<div className="flex items-center justify-between w-full">
														<div className="name text-button">
															{product.name}
														</div>
														<div
															className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
															onClick={() => removeItem(product.id)}
														>
															Remove
														</div>
													</div>
													<div className="flex items-center justify-between gap-2 mt-3 w-full">
														<div className="flex items-center text-secondary2 capitalize">
															{product.quantity} × ${product.price}
														</div>
														<div className="product-price text-title">
															${product.price * (product.quantity ?? 1)}.00
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</>
							) : (
								<div className="empty-cart py-8 text-center">
									<div className="text-2xl mb-4">Your cart is empty</div>
									<div className="text-secondary">
										Add some products to your cart to see them here.
									</div>
								</div>
							)}
						</div>

						<div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
							<div className="flex items-center justify-center lg:gap-14 gap-8 px-6 py-4 border-b border-line">
								<div
									className="item flex items-center gap-3 cursor-pointer"
									onClick={() => handleActiveTab("note")}
								>
									<NotebookPenIcon className="text-xl" />
									<div className="caption1">Note</div>
								</div>
								<div
									className="item flex items-center gap-3 cursor-pointer"
									onClick={() => handleActiveTab("shipping")}
								>
									<Truck className="text-xl" />
									<div className="caption1">Shipping</div>
								</div>
								<div
									className="item flex items-center gap-3 cursor-pointer"
									onClick={() => handleActiveTab("coupon")}
								>
									<Tag className="text-xl" />
									<div className="caption1">Coupon</div>
								</div>
							</div>

							<div className="flex items-center justify-between pt-6 px-6">
								<div className="heading5">Subtotal</div>
								<div className="heading5">${cartTotal.toFixed(2)}</div>
							</div>

							<div className="block-button text-center p-6">
								<div className="flex items-center gap-4">
									<Link
										href={"/cart"}
										className="button-main basis-1/2 bg-white border border-black text-black text-center uppercase"
										onClick={closeModalCart}
									>
										View cart
									</Link>
									<Link
										href={"/checkout2"}
										className="button-main basis-1/2 text-center uppercase"
										onClick={closeModalCart}
									>
										Check Out
									</Link>
								</div>
								<div
									onClick={closeModalCart}
									className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
								>
									Or continue shopping
								</div>
							</div>

							{/* Note Tab */}
							<div
								className={`tab-item note-block ${activeTab === "note" ? "active" : ""}`}
							>
								<div className="px-6 py-4 border-b border-line">
									<div className="item flex items-center gap-3 cursor-pointer">
										<Icon.NotePencil className="text-xl" />
										<div className="caption1">Note</div>
									</div>
								</div>
								<div className="form pt-4 px-6">
									<textarea
										name="form-note"
										rows={4}
										placeholder="Add special instructions for your order..."
										className="caption1 py-3 px-4 bg-surface border-line rounded-md w-full"
									></textarea>
								</div>
								<div className="block-button text-center pt-4 px-6 pb-6">
									<div
										className="button-main w-full text-center"
										onClick={() => setActiveTab("")}
									>
										Save
									</div>
									<div
										onClick={() => setActiveTab("")}
										className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
									>
										Cancel
									</div>
								</div>
							</div>

							{/* Shipping & Coupon Tabs */}
							<div
								className={`tab-item note-block ${activeTab === "shipping" ? "active" : ""}`}
							>
								{/* Shipping content can be added here */}
							</div>
							<div
								className={`tab-item note-block ${activeTab === "coupon" ? "active" : ""}`}
							>
								{/* Coupon content can be added here */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalCart;
