

// "use client";
// import { useRef, useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay, FreeMode } from "swiper/modules";
// import "swiper/css/bundle";
// import SwiperCore from "swiper/core";
// import { useCart } from "react-use-cart";
// import { toast } from "sonner";

// import {
// 	Heart,
// 	X,
// 	Dot,
// 	Plus,
// 	Minus,
// 	ShareIcon as ShareNetwork,
// 	ClockIcon as ArrowClockwise,
// 	FileQuestionIcon as Question,
// 	Timer,
// 	Eye,
// 	PlayCircle,
// 	CheckCircle,
// 	CircleIcon as CircleNotch,
// 	ChevronDown,
// 	ChevronUp,
// 	ChevronRight,
// 	ShoppingBag,
// 	ChevronLeft,
// } from "lucide-react";
// import Rate from "../Rate";
// import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";
// import useWishlistStore from "@/store/wishlistStore";
// import Reviews from "@/components/Reviews";
// import axiosInstance from "@/lib/axiosInstance";
// import "swiper/css";
// import "swiper/css/navigation"; // Add here
// import { motion, AnimatePresence } from "framer-motion";
// import RecommendedProductsSlider from "@/components/RecommendedProductsSlider";
// import Testimonial from "@/components/home/Testimonial";
// import FAQSection from "@/components/faq-section";
// import BestSellerSection from "@/components/BestSellerSection";

// SwiperCore.use([Navigation, Thumbs]);

// const ProductDetail = ({
// 	productData,
// 	reviews,
// 	addons,
// 	addonsProducts,
// 	faqs,
// 	feed,
// 	testimonial,
// }) => {
// 	console.log("ProductDetail props:", { testimonial, faqs, feed });

// 	// console.log("detailpage",addons,addonsProducts)
// 	const [isClient, setIsClient] = useState(false);
// 	const [isMobile, setIsMobile] = useState(false);
// 	const [inCartExact, setInCartExact] = useState(false);
// 	//   const [inCart, setInCart] = useState(false);
// 	const [recommended, setRecommended] = useState([]);

// 	useEffect(() => {
// 		setIsClient(true);
// 		const checkMobile = () => {
// 			setIsMobile(window.innerWidth < 768);
// 		};
// 		checkMobile();
// 		window.addEventListener("resize", checkMobile);
// 		return () => {
// 			window.removeEventListener("resize", checkMobile);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const fetchRecommendations = async () => {
// 			try {
// 				console.log("Fetching recommendations for:", productData.name);
// 				const res = await axiosInstance.get(`/products/recommended`, {
// 					params: { productName: productData.name },
// 				});
// 				console.log(
// 					"API URL:",
// 					`/recommended?productName=${encodeURIComponent(productData.name)}`,
// 				);
// 				console.log("Recommended Products:", res.data);
// 				setRecommended(res.data);
// 			} catch (err) {
// 				console.error("Error fetching recommended products:", err);
// 			}
// 		};

// 		if (productData?.name) {
// 			fetchRecommendations();
// 		}
// 	}, [productData?.name]);

// 	const { addItem, items, removeItem } = useCart();

// 	const { addToWishlist, removeFromWishlist, isInWishlist } =
// 		useWishlistStore();
// 	const isProductInWishlist = isClient && isInWishlist(productData._id);

// 	const parsedProduct =
// 		typeof productData === "string" ? JSON.parse(productData) : productData;
// 	const product = useMemo(
// 		() => ({
// 			...parsedProduct,
// 			id: parsedProduct?._id,
// 		}),
// 		[parsedProduct],
// 	);

// 	const mediaItems = [...(product?.images || []), ...(product?.videos || [])];
// 	// console.log(mediaItems, "mediaItems")

// 	const swiperRef = useRef(null);
// 	const mainSwiperRef = useRef(null);
// 	const [openPopupImg, setOpenPopupImg] = useState(false);
// 	const [thumbsSwiper, setThumbsSwiper] = useState(null);
// 	const [activeTab, setActiveTab] = useState("description");
// 	const [justAddedToCart, setJustAddedToCart] = useState(false);
// 	const [currentQuantity, setCurrentQuantity] = useState(1);
// 	const [isProcessing, setIsProcessing] = useState(false);
// 	const [recommendedProducts, setRecommendedProducts] = useState([]);
// 	const [recLoading, setRecLoading] = useState(true);
// 	const [recError, setRecError] = useState(null);
// 	const popupSwiperRef = useRef(null);
// 	const [lastAdded, setLastAdded] = useState({
// 		productId: null,
// 		quantity: null,
// 	});
// 	const [activeAddOnCategoryId, setActiveAddOnCategoryId] = useState(null);
// 	const [activeIndex, setActiveIndex] = useState(0);

// 	// Static data for the new design
// 	const [selectedSize, setSelectedSize] = useState("Medium");
// 	const [selectedVariant, setSelectedVariant] = useState(null);

// 	const [selectedAddOns, setSelectedAddOns] = useState({
// 		candles: false,
// 		balloons: false,
// 		chocolates: false,
// 		giftCards: false,
// 	});
// 	const [expandedSections, setExpandedSections] = useState({
// 		delivery: false,
// 		care: false,
// 	});

// 	const percentSale = product?.mrp
// 		? Math.floor(100 - (product.price / product.mrp) * 100)
// 		: 0;
// 	const pid = product.id || product._id;

// 	const hasSizes =
// 		Array.isArray(product?.variants) && product.variants.length > 0;
// 	const sizeKey = hasSizes
// 		? selectedSize?.toLowerCase() || "default"
// 		: "default";
// 	const productId = hasSizes ? `${product._id}-${sizeKey}` : `${product._id}`;

// 	const cartItem = items.find((item) => item.productId === productId);
// 	const inCartExactQuantity = cartItem?.quantity === currentQuantity;

// 	// Static data that doesn't come dynamically
// 	const addonsProductss = [
// 		{
// 			name: "CANDEL NAME",
// 			price: 450,
// 			image: "/placeholder.svg?height=100&width=100",
// 		},
// 		{
// 			name: "CANDEL NAME",
// 			price: 450,
// 			image: "/placeholder.svg?height=100&width=100",
// 		},
// 		{
// 			name: "CANDEL NAME",
// 			price: 450,
// 			image: "/placeholder.svg?height=100&width=100",
// 		},
// 		{
// 			name: "CANDEL NAME",
// 			price: 450,
// 			image: "/placeholder.svg?height=100&width=100",
// 		},
// 	];

// 	// ✅ Sizes from API (with fallback)
// 	const sizes =
// 		product?.variants?.length > 0
// 			? product.variants.map(
// 					(v) => v.size.charAt(0).toUpperCase() + v.size.slice(1),
// 				)
// 			: ["Small", "Medium", "Large", "Extra Large"];

// 	// ✅ Dynamic Gift Set Options
// 	const giftSetOptions =
// 		product?.giftSetOptions?.length > 0
// 			? product.giftSetOptions.map((option) => ` ${option}`)
// 			: [
// 					"* with Balloons 3pcs",
// 					"* with Cardamom Bergamot Candle",
// 					"* with Cardamom Bergamot Candle & Balloons",
// 				];

// 	// ✅ Care Instructions (fallback)
// 	const careInstructions = product?.careInstructions
// 		? product.careInstructions.split("\n").filter(Boolean)
// 		: [
// 				"Trim stems at a 45-degree angle and place them in a clean vase with water.",
// 				"Remove wilted flowers and leaves promptly.",
// 				"Change water every two days and re-trim stems for longer freshness.",
// 			];
// 	const deliveryInformation = product?.deliveryInformation
// 		? product.deliveryInformation.split("\n").filter(Boolean)
// 		: [
// 				"Orders placed before 4 PM are eligible for same-day delivery in major metro cities.",
// 				"We offer standard, fixed-time, and midnight delivery options to suit every occasion.",
// 				"The delivery team ensures the bouquet is handled with utmost care to preserve freshness.",
// 				"You’ll receive real-time tracking updates once your order is dispatched.",
// 				"In rare cases of high demand or remote locations, delivery time may slightly vary.",
// 				"Please ensure recipient's availability to avoid missed deliveries.",
// 				"Personalized message cards are included free with every order.",
// 			];

// 	useEffect(() => {
// 		setCurrentQuantity(1);
// 	}, [product._id]);

// 	const handleSwiper = (swiper) => {
// 		setThumbsSwiper(swiper);
// 	};
// 	useEffect(() => {
// 		const pid = product?.id || product?._id;
// 		const matched = items.some(
// 			(item) => item.productId === pid && item.quantity === currentQuantity,
// 		);
// 		setInCartExact(matched);
// 	}, [items, product, currentQuantity]);
// 	useEffect(() => {
// 		if (hasSizes && product.variants.length > 0) {
// 			const defaultVariant = product.variants[0];
// 			setSelectedSize(
// 				defaultVariant.size.charAt(0).toUpperCase() +
// 					defaultVariant.size.slice(1),
// 			);
// 			setSelectedVariant(defaultVariant);
// 		}
// 	}, [product]);

// 	const handleAddToCart = () => {
// 		const selectedSizeKey = selectedSize?.toLowerCase() || "default";
// 		const productId = `${product._id}-${selectedSizeKey}`;

// 		const existingItem = items.find((item) => item.id === productId);
// 		const newQuantity = existingItem
// 			? existingItem.quantity + currentQuantity
// 			: currentQuantity;

// 		addItem(
// 			{
// 				...product,
// 				id: productId, // Unique per variant
// 				productId,
// 				size: selectedSize,
// 				price: selectedVariant?.price ?? product.price,
// 				quantity: newQuantity,
// 			},
// 			currentQuantity, // this tells react-use-cart to add this many more
// 		);

// 		toast(`${product.name} (${currentQuantity}) added to cart`);
// 	};

// 	const inCart = items.some((item) => item.productId === productId);

// 	const handleBuyNow = () => {
// 		if (!product) {
// 			toast("Product information is missing");
// 			return;
// 		}
// 		setIsProcessing(true);
// 		try {
// 			addItem(
// 				{
// 					...product,
// 					id: productId, // 👈 important: unique ID for cart
// 					productId,
// 					price: selectedVariant?.price ?? product.price,
// 					size: selectedVariant?.size ?? selectedSize,
// 					quantity: 1,
// 				},
// 				1,
// 			);
// 			setTimeout(() => {
// 				window.location.href = "/checkout";
// 			}, 500);
// 		} catch (error) {
// 			console.error("Error during Buy Now process:", error);
// 			toast("Failed to process. Please try again.");
// 			setIsProcessing(false);
// 		}
// 	};

// 	const handleDecreaseQuantity = () => {
// 		if (currentQuantity > 1) {
// 			setCurrentQuantity(currentQuantity - 1);
// 		}
// 	};

// 	const handleIncreaseQuantity = () => {
// 		setCurrentQuantity(currentQuantity + 1);
// 	};

// 	useEffect(() => {
// 		console.log("Cart Items:", items);
// 	}, [items]);

// 	const handleAddToWishlist = () => {
// 		const productId = product._id || product.id;
// 		if (isProductInWishlist) {
// 			removeFromWishlist(productId);
// 			toast(`${product.name} removed from wishlist`);
// 		} else {
// 			addToWishlist(product);
// 			toast(`${product.name} added to wishlist`);
// 		}
// 	};

// 	const handleActiveTab = (tab) => {
// 		setActiveTab(tab);
// 	};

// 	const toggleSection = (section) => {
// 		setExpandedSections((prev) => ({
// 			...prev,
// 			[section]: !prev[section],
// 		}));
// 	};

// 	const selectedCategorySlugs = Object.keys(selectedAddOns).filter(
// 		(key) => selectedAddOns[key],
// 	);

// 	useEffect(() => {
// 		if (addons.length && !activeAddOnCategoryId) {
// 			setActiveAddOnCategoryId(addons[0]._id);
// 		}
// 	}, [addons]);

// 	const filteredAddOnProducts = addonsProducts.filter(
// 		(product) => product.category?._id === activeAddOnCategoryId,
// 	);

// 	useEffect(() => {
// 		setCurrentQuantity(1);
// 	}, [product._id]);

// 	useEffect(() => {
// 		const fetchRecommendedProducts = async () => {
// 			try {
// 				setRecLoading(true);
// 				setRecError(null);
// 				const productName = product?.name || "";
// 				const query = productName
// 					? `?productNames=${encodeURIComponent(productName)}`
// 					: "";
// 				const response = await axiosInstance.get(
// 					`/products/recommended${query}`,
// 				);
// 				setRecommendedProducts(response.data);
// 			} catch (error) {
// 				console.error("Failed to fetch recommended products:", error);
// 				setRecError("Failed to load recommended products. Please try again.");
// 			} finally {
// 				setRecLoading(false);
// 			}
// 		};
// 		fetchRecommendedProducts();
// 	}, [product]);

// 	useEffect(() => {
// 		if (product?.variants?.length > 0) {
// 			const variant = product.variants.find(
// 				(v) => v.size.toLowerCase() === selectedSize.toLowerCase(),
// 			);
// 			setSelectedVariant(variant);
// 		}
// 	}, [selectedSize, product]);

// 	useEffect(() => {
// 		setCurrentQuantity(1);
// 	}, [product._id]);

// 	useEffect(() => {
// 		const fetchRecommendedProducts = async () => {};
// 		fetchRecommendedProducts();
// 	}, [product]);

// 	const handleRecAddToCart = (recProduct, e) => {
// 		e.stopPropagation();
// 		addItem(
// 			{
// 				...recProduct,
// 				id: recProduct._id,
// 				productId: recProduct._id,
// 				price: recProduct.price,
// 				quantity: 1,
// 			},
// 			1,
// 		);
// 		toast(`${recProduct.name} added to cart`);
// 	};

// 	const truncateDescription = (text, maxLength = 50) => {
// 		if (!text) return "No description available.";
// 		if (text.length <= maxLength) return text;
// 		return text.substring(0, maxLength).trim() + "...";
// 	};

// 	// Handle popup opening with correct slide
// 	const handleImageClick = (index) => {
// 		console.log("Image clicked", index);

// 		setActiveIndex(index);
// 		setOpenPopupImg(true);
// 	};

// 	// Effect to handle popup swiper slide when popup opens
// 	useEffect(() => {
// 		if (openPopupImg && popupSwiperRef.current) {
// 			// Small delay to ensure swiper is fully mounted
// 			const timer = setTimeout(() => {
// 				popupSwiperRef.current?.slideTo(activeIndex, 0);
// 			}, 50);
// 			return () => clearTimeout(timer);
// 		}
// 	}, [openPopupImg, activeIndex]);

// 	// Handle keyboard events for popup
// 	useEffect(() => {
// 		const handleKeyDown = (e) => {
// 			if (openPopupImg && e.key === "Escape") {
// 				setOpenPopupImg(false);
// 			}
// 		};

// 		if (openPopupImg) {
// 			document.addEventListener("keydown", handleKeyDown);
// 			document.body.style.overflow = "hidden";
// 		}

// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 			document.body.style.overflow = "unset";
// 		};
// 	}, [openPopupImg]);

// 	return (
// 		<>
// 			{/* Breadcrumb */}
// 			<div className="container mx-auto px-4 py-4">
// 				<div className="flex items-center text-sm text-gray-500 space-x-2">
// 					<span>Home</span>
// 					<span>{">"}</span>
// 					<span>Product Category Listing</span>
// 					<span>{">"}</span>
// 					<span className="text-gray-900">Product Details Page</span>
// 				</div>
// 			</div>

// 			<div className="product-detail default text-black">
// 				<div className="featured-product">
// 					<div className="container flex justify-between gap-y-6 flex-wrap">
// 						<div className="list-img md:w-1/2 md:pr-[45px] w-full">
// 							{/* MAIN SWIPER */}
// 							<div className="relative">
//               <Swiper
//   onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
//   slidesPerView={1}
//   navigation={{
//     nextEl: ".swiper-button-next-main",
//     prevEl: ".swiper-button-prev-main",
//   }}
//   thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//   modules={[Navigation, Thumbs]}
//   className="mainSwiper rounded-2xl overflow-hidden"
//   loop={false}
// >
//   {mediaItems.map((item, index) => (
//     <SwiperSlide key={index}>
//       <div onClick={() => handleImageClick(index)}>
//         {item.endsWith(".mp4") ? (
//           <video
//             autoPlay // ✅ for autoplay
//             muted
//             loop
//             playsInline
//             poster={product.thumbnail}
//             className="w-full aspect-[3/4] object-cover"
//           >
//             <source src={item} type="video/mp4" />
//           </video>
//         ) : (
//           <Image
//             src={item || "/placeholder.svg"}
//             alt={`product-image-${index}`}
//             width={1000}
//             height={1333}
//             className="w-full object-cover cursor-pointer aspect-[3/4]"
//           />
//         )}
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>


// 								{/* Main Swiper Buttons */}
// 								<div className="swiper-button-prev-main absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
// 									<svg
// 										width="20"
// 										height="20"
// 										viewBox="0 0 24 24"
// 										fill="none"
// 										stroke="currentColor"
// 										strokeWidth="2"
// 									>
// 										<polyline points="15,18 9,12 15,6"></polyline>
// 									</svg>
// 								</div>
// 								<div className="swiper-button-next-main absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
// 									<svg
// 										width="20"
// 										height="20"
// 										viewBox="0 0 24 24"
// 										fill="none"
// 										stroke="currentColor"
// 										strokeWidth="2"
// 									>
// 										<polyline points="9,18 15,12 9,6"></polyline>
// 									</svg>
// 								</div>
// 							</div>

// 							{/* THUMBNAILS */}
// 							<div className="mt-4">
//               <Swiper
//   onSwiper={setThumbsSwiper}
//   slidesPerView={4}
//   spaceBetween={12}
//   navigation={{
//     nextEl: ".swiper-button-next-thumb",
//     prevEl: ".swiper-button-prev-thumb",
//   }}
//   watchSlidesProgress
//   modules={[Navigation, Thumbs]}
//   className="thumbsSwiper relative"
//   breakpoints={{
//     640: { slidesPerView: 4 },
//     480: { slidesPerView: 3 },
//     0: { slidesPerView: 2 },
//   }}
// >
//   {mediaItems.map((item, index) => (
//     <SwiperSlide key={index}>
//       <div
//         className={`cursor-pointer transition-opacity ${
//           index === mainSwiperRef.current?.activeIndex ? "opacity-100" : "opacity-60 hover:opacity-80"
//         }`}
//       >
//         {item.endsWith(".mp4") ? (
//           <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
//             <Image
//               src={product.thumbnail || "/placeholder.svg"}
//               width={500}
//               height={500}
//               alt={`thumb-video-${index}`}
//               className="w-full h-full object-cover"
//             />
//             <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
//           </div>
//         ) : (
//           <Image
//             src={item || "/placeholder.svg"}
//             alt={`thumb-${index}`}
//             width={500}
//             height={500}
//             className="w-full aspect-[3/4] object-cover rounded-xl"
//           />
//         )}
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>


// 								{mediaItems.length > 4 && (
// 									<>
// 										<div className="swiper-button-prev-thumb absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors -translate-x-2">
// 											<svg
// 												width="16"
// 												height="16"
// 												viewBox="0 0 24 24"
// 												fill="none"
// 												stroke="currentColor"
// 												strokeWidth="2"
// 											>
// 												<polyline points="15,18 9,12 15,6"></polyline>
// 											</svg>
// 										</div>
// 										<div className="swiper-button-next-thumb absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors translate-x-2">
// 											<svg
// 												width="16"
// 												height="16"
// 												viewBox="0 0 24 24"
// 												fill="none"
// 												stroke="currentColor"
// 												strokeWidth="2"
// 											>
// 												<polyline points="9,18 15,12 9,6"></polyline>
// 											</svg>
// 										</div>
// 									</>
// 								)}
// 							</div>

// 							{/* POPUP VIEW */}
// 							{openPopupImg && (
// 								<div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center">
// 									<button
// 										className="absolute top-4 right-4 z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
// 										onClick={() => setOpenPopupImg(false)}
// 									>
// 										<X className="text-white" size={28} />
// 									</button>

// 									<div className="w-full h-full flex items-center justify-center p-4">
// 										<Swiper
// 											onSwiper={(swiper) => (popupSwiperRef.current = swiper)}
// 											slidesPerView={1}
// 											initialSlide={activeIndex}
// 											navigation={{
// 												nextEl: ".swiper-button-next-popup",
// 												prevEl: ".swiper-button-prev-popup",
// 											}}
// 											loop={false} // << this too
// 											modules={[Navigation]}
// 											className="popupSwiper max-w-4xl w-full h-full"
// 										>
// 											{mediaItems.map((item, index) => (
// 												<SwiperSlide key={index}>
// 													<div
// 														onClick={() => handleImageClick(index)}
// 														className="w-full aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
// 													>
// 														{item.endsWith(".mp4") ? (
// 															<video
// 																autoPlay
// 																muted
// 																loop
// 																playsInline
// 																className="w-full h-full object-cover"
// 																poster={product.thumbnail}
// 															>
// 																<source src={item} type="video/mp4" />
// 															</video>
// 														) : (
// 															<Image
// 																src={item || "/placeholder.svg"}
// 																alt={`product-image-${index}`}
// 																width={1000}
// 																height={1333} // 3:4 ratio
// 																className="w-full h-full object-cover"
// 															/>
// 														)}
// 													</div>
// 												</SwiperSlide>
// 											))}
// 										</Swiper>

// 										{mediaItems.length > 1 && (
// 											<>
// 												<div className="swiper-button-prev-popup absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors">
// 													<svg
// 														width="24"
// 														height="24"
// 														viewBox="0 0 24 24"
// 														fill="none"
// 														stroke="white"
// 														strokeWidth="2"
// 													>
// 														<polyline points="15,18 9,12 15,6"></polyline>
// 													</svg>
// 												</div>
// 												<div className="swiper-button-next-popup absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors">
// 													<svg
// 														width="24"
// 														height="24"
// 														viewBox="0 0 24 24"
// 														fill="none"
// 														stroke="white"
// 														strokeWidth="2"
// 													>
// 														<polyline points="9,18 15,12 9,6"></polyline>
// 													</svg>
// 												</div>
// 											</>
// 										)}
// 									</div>
// 								</div>
// 							)}
// 							<div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-gray-200"></div>
// 							<div className="mt-6 space-y-3">
// 								<div className="flex items-center gap-4 flex-wrap">
// 									<div className="flex items-center gap-1">
// 										<ArrowClockwise size={18} />
// 										<div className="font-medium">Delivery & Return</div>
// 									</div>
// 									<div className="flex items-center gap-1">
// 										<Question size={18} />
// 										<div className="font-medium">Ask A Question</div>
// 									</div>
// 								</div>
// 								<div className="flex items-center gap-1">
// 									<Timer size={18} />
// 									<div className="font-medium">Estimated Delivery:</div>
// 									<div className="text-gray-500">According To Your Order</div>
// 								</div>
// 								<div className="flex items-center gap-1">
// 									<Eye size={18} />
// 									<div className="font-medium">TBD</div>
// 									<div className="text-gray-500">
// 										people viewing this product right now!
// 									</div>
// 								</div>
// 								<div className="flex items-center gap-1">
// 									<div className="font-medium">Product Code:</div>
// 									<div className="text-gray-500">{product?.sku}</div>
// 								</div>
// 							</div>
// 							<div className="mt-7">
// 								<div className="pt-6 pb-4 px-4 border border-gray-300 rounded-xl relative">
// 									<div className="text-lg font-semibold px-5 bg-white absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
// 										Guaranteed safe checkout
// 									</div>
// 									<div className="flex items-center justify-center">
// 										<Image
// 											src="/tmprvsweas2.webp"
// 											width={600}
// 											height={80}
// 											alt="All Payment Methods"
// 											className="object-contain"
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 						<div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
// 							<div className="flex justify-between">
// 								<div>
// 									<div className="text-sm text-gray-500 font-semibold uppercase">
// 										{product?.brand}
// 									</div>
// 									<div className="text-3xl font-bold mt-1">
// 										{product?.name?.toUpperCase() || "PRODUCT NAME"}
// 									</div>
// 								</div>
// 								{isClient && (
// 									<div
// 										className={`w-12 h-12 flex items-center justify-center border border-gray-300 cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ${
// 											isProductInWishlist ? "bg-black" : ""
// 										}`}
// 										onClick={handleAddToWishlist}
// 										aria-label={
// 											isProductInWishlist
// 												? "Remove from wishlist"
// 												: "Add to wishlist"
// 										}
// 									>
// 										<Heart
// 											size={24}
// 											className={
// 												isProductInWishlist
// 													? "text-white fill-current"
// 													: "text-red-800"
// 											}
// 											color={isProductInWishlist ? "red" : "green"}
// 										/>
// 									</div>
// 								)}
// 							</div>

// 							<div className="flex items-center mt-3">
// 								<Rate currentRate={0} size={14} />
// 								<span className="text-sm text-gray-500 ml-2">
// 									({reviews?.length || 0} Reviews)
// 								</span>
// 							</div>

// 							{/* Pricing, Discount, Quantity, Add to Cart – INLINE */}
// 							<div className="flex flex-wrap items-center gap-4 mt-5 border-b border-gray-200 pb-6">
// 								{/* Price */}
// 								<div className="text-2xl font-bold text-black">
// 									<ServerPriceDisplay
// 										amount={selectedVariant?.price ?? product.price}
// 									/>
// 								</div>

// 								{/* MRP */}
// 								{product?.mrp && product?.mrp > product?.price && (
// 									<div className="text-base text-gray-500 line-through">
// 										<ServerPriceDisplay
// 											amount={selectedVariant?.mrp ?? product.mrp}
// 										/>
// 									</div>
// 								)}

// 								{/* Discount Badge */}
// 								{product?.mrp && percentSale > 0 && (
// 									<div className="text-xs font-semibold bg-green-500 px-2 py-0.5 rounded-full text-black">
// 										-{percentSale}%
// 									</div>
// 								)}

// 								{/* Quantity Selector */}
// 								<div className="p-2 flex items-center justify-between rounded-md border border-gray-300 w-[120px] flex-shrink-0">
// 									<Minus
// 										size={16}
// 										onClick={handleDecreaseQuantity}
// 										className={`cursor-pointer ${currentQuantity <= 1 ? "opacity-50 pointer-events-none" : ""}`}
// 									/>
// 									<div className="text-sm font-semibold">{currentQuantity}</div>
// 									<Plus
// 										size={16}
// 										onClick={handleIncreaseQuantity}
// 										className="cursor-pointer"
// 									/>
// 								</div>

// 								{/* Add to Cart Button */}
// 								<button
// 									onClick={handleAddToCart}
// 									disabled={inCartExactQuantity}
// 									className={`py-2 px-4 text-sm flex items-center gap-2 border border-black rounded-md transition-all duration-300
//     ${inCartExactQuantity ? "bg-green-50 cursor-not-allowed opacity-70" : "hover:bg-black hover:text-white"}
//   `}
// 								>
// 									{inCartExactQuantity ? (
// 										<>
// 											<CheckCircle size={16} className="text-green-500" />
// 											Added
// 										</>
// 									) : (
// 										"Add To Cart"
// 									)}
// 								</button>

// 								{/* Buy Now Button */}
// 								<button
// 									onClick={handleBuyNow}
// 									disabled={isProcessing}
// 									className="py-2 px-4 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
// 								>
// 									{isProcessing ? (
// 										<>
// 											<CircleNotch size={16} className="animate-spin" />
// 											Processing...
// 										</>
// 									) : (
// 										"Buy Now"
// 									)}
// 								</button>
// 							</div>
// 							{typeof product?.redeemPoints === "number" &&
// 								product?.redeemPoints > 0 && (
// 									<div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-300 p-3  shadow-sm">
// 										<span className="text-yellow-700 font-semibold text-base">
// 											🎁 Redeem with{" "}
// 											<span className="text-lg font-bold">
// 												{product?.redeemPoints} Points
// 											</span>
// 										</span>
// 										<span className="ml-auto text-sm text-red-500 font-medium ">
// 											Order Fast!
// 										</span>
// 									</div>
// 								)}

// 							{/* Description */}
// 							<p className="text-gray-600 leading-relaxed mt-4 mb-6">
// 								{product?.description ||
// 									"Indulge in the exquisite beauty of our Pink Perfection flower arrangement, featuring the Gerbera Pink and the Candy Pink Rose, creating a captivating display of pink hues. Indulge in the exquisite beauty of our Pink Perfection flower arrangement, featuring the Gerbera Pink and the Candy Pink Rose, creating a captivating display of pink hues, and the Candy Pink Rose, creating a captivating display of pink hues."}
// 							</p>

// 							{/* Gift Set Options */}
// 							<div className="mb-6">
// 								<h3 className="font-semibold mb-3">
// 									Gift Set options include:
// 								</h3>
// 								<div className="space-y-1">
// 									{giftSetOptions
// 										.join(" ")
// 										.split(".")
// 										.filter((option) => option.trim() !== "")
// 										.map((option, index) => (
// 											<p key={index} className="text-gray-600">
// 												* {option.trim()}.
// 											</p>
// 										))}
// 								</div>
// 							</div>

// 							{/* Size Selection */}
// 							{hasSizes && (
// 								<div className="mb-6">
// 									<h3 className="font-semibold mb-3">Select size:</h3>
// 									<div className="flex space-x-2">
// 										{product.variants.map((variant) => {
// 											const size =
// 												variant.size.charAt(0).toUpperCase() +
// 												variant.size.slice(1);
// 											return (
// 												<button
// 													key={size}
// 													onClick={() => setSelectedSize(size)}
// 													className={`px-4 py-2 border  transition-colors ${
// 														selectedSize === size
// 															? "bg-black text-white border-black"
// 															: "border-gray-300 hover:border-gray-400"
// 													}`}
// 												>
// 													{size}
// 												</button>
// 											);
// 										})}
// 									</div>
// 								</div>
// 							)}

// 							{/* Add-ons */}
// 							<div className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar">
// 								{addons.map((addon) => {
// 									const isActive = activeAddOnCategoryId === addon._id;
// 									return (
// 										<motion.button
// 											key={addon._id}
// 											onClick={() => setActiveAddOnCategoryId(addon._id)}
// 											whileTap={{ scale: 0.96 }}
// 											whileHover={{ scale: 1.03 }}
// 											className={`px-4 py-2 border  whitespace-nowrap flex items-center space-x-2 transition-colors duration-200 ${
// 												isActive
// 													? "bg-black text-white border-black"
// 													: "border-gray-300 hover:border-gray-400"
// 											}`}
// 										>
// 											<span>{addon.name}</span>
// 											<AnimatePresence mode="wait" initial={false}>
// 												<motion.span
// 													key={isActive ? "down" : "right"}
// 													initial={{ opacity: 0, y: -5 }}
// 													animate={{ opacity: 1, y: 0 }}
// 													exit={{ opacity: 0, y: 5 }}
// 													transition={{ duration: 0.2 }}
// 												>
// 													{isActive ? (
// 														<ChevronDown size={16} />
// 													) : (
// 														<ChevronRight size={16} />
// 													)}
// 												</motion.span>
// 											</AnimatePresence>
// 										</motion.button>
// 									);
// 								})}
// 							</div>
// 							<motion.div
// 								key={activeAddOnCategoryId}
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								exit={{ opacity: 0, y: -20 }}
// 								transition={{ duration: 0.3, ease: "easeOut" }}
// 								className="mb-6 relative"
// 							>
// 								<div className="relative">
// 									<Swiper
// 										spaceBetween={16}
// 										slidesPerView={isMobile ? 1.2 : 4}
// 										modules={[Navigation]}
// 										navigation={{
// 											nextEl: ".custom-swiper-next",
// 											prevEl: ".custom-swiper-prev",
// 										}}
// 										className="w-full"
// 									>
// 										{filteredAddOnProducts.map((product, index) => (
// 											<SwiperSlide key={index}>
// 												<div className="border rounded-xl p-3 text-center">
// 													<div className="aspect-square relative bg-gray-100 rounded-lg mb-2 overflow-hidden">
// 														<Image
// 															src={product.thumbnail || "/placeholder.svg"}
// 															alt={product.name}
// 															fill
// 															className="object-cover"
// 														/>
// 													</div>
// 													<h4 className="text-sm font-medium mb-1">
// 														{product.name}
// 													</h4>
// 													<div className="flex justify-center">
// 														<ServerPriceDisplay amount={product.price} />
// 													</div>
// 													<button
// 														className="w-full bg-black text-white text-xs py-1 px-2 rounded flex items-center justify-center space-x-1 gap-1"
// 														onClick={() => {
// 															addItem(
// 																{
// 																	...product,
// 																	id: product._id,
// 																	productId: product._id,
// 																	quantity: 1,
// 																	price: product.price,
// 																},
// 																1,
// 															);
// 															toast(`${product.name} added to cart`);
// 														}}
// 													>
// 														ADD TO CART
// 														<ShoppingBag size={15} />
// 													</button>
// 												</div>
// 											</SwiperSlide>
// 										))}
// 									</Swiper>

// 									{/* Arrows */}
// 									<div className="custom-swiper-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-black">
// 										<ChevronLeft size={40} />
// 									</div>
// 									<div className="custom-swiper-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-black">
// 										<ChevronRight size={40} />
// 									</div>
// 								</div>
// 							</motion.div>

// 							{/* Expandable Sections */}
// 							<div className="space-y-4 mt-6">
// 								{/* DELIVERY INFORMATION */}
// 								<div className="border  overflow-hidden">
// 									<button
// 										onClick={() => toggleSection("delivery")}
// 										className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all duration-200 ${
// 											expandedSections.delivery
// 												? "bg-gray-100 font-bold"
// 												: "hover:bg-gray-50"
// 										}`}
// 									>
// 										<span
// 											className={`text-sm tracking-wide ${
// 												expandedSections.delivery
// 													? "text-black"
// 													: "text-gray-700"
// 											}`}
// 										>
// 											DELIVERY INFORMATION
// 										</span>
// 										{expandedSections.delivery ? (
// 											<ChevronUp size={20} />
// 										) : (
// 											<ChevronDown size={20} />
// 										)}
// 									</button>
// 									{expandedSections.delivery && (
// 										<div className="px-4 pb-4 pt-2 text-sm text-gray-600 border-t border-dashed border-gray-300 animate-fade-in">
// 											{deliveryInformation.map((instruction, index) => (
// 												<p key={index} className="mb-2 last:mb-0">
// 													{instruction}
// 												</p>
// 											))}
// 										</div>
// 									)}
// 								</div>

// 								{/* CARE INSTRUCTIONS */}
// 								<div className="border  overflow-hidden">
// 									<button
// 										onClick={() => toggleSection("care")}
// 										className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all duration-200 ${
// 											expandedSections.care
// 												? "bg-gray-100 font-bold"
// 												: "hover:bg-gray-50"
// 										}`}
// 									>
// 										<span
// 											className={`text-sm tracking-wide ${
// 												expandedSections.care ? "text-black" : "text-gray-700"
// 											}`}
// 										>
// 											CARE INSTRUCTIONS
// 										</span>
// 										{expandedSections.care ? (
// 											<ChevronUp size={20} />
// 										) : (
// 											<ChevronDown size={20} />
// 										)}
// 									</button>
// 									{expandedSections.care && (
// 										<div className="px-4 pb-4 pt-2 text-sm text-gray-600 border-t border-dashed border-gray-300 animate-fade-in">
// 											{careInstructions.map((instruction, index) => (
// 												<p key={index} className="mb-2 last:mb-0">
// 													{instruction}
// 												</p>
// 											))}
// 										</div>
// 									)}
// 								</div>
// 							</div>

// 							<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 uppercase">
// 								{product?.color?.length > 0 && (
// 									<div>
// 										<span className="font-bold">Color:</span>{" "}
// 										{product.color.join(", ")}
// 									</div>
// 								)}
// 								{product?.occasion?.length > 0 && (
// 									<div>
// 										<span className="f font-bold">Occasion:</span>{" "}
// 										{product.occasion.join(", ")}
// 									</div>
// 								)}
// 								{product?.flowerType && (
// 									<div>
// 										<span className="font-bold">Flower Type:</span>{" "}
// 										{product.flowerType}
// 									</div>
// 								)}
// 								{product?.fragranceLevel && (
// 									<div>
// 										<span className="font-bold">Fragrance:</span>{" "}
// 										{product.fragranceLevel}
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<RecommendedProductsSlider
// 				title="More Related Product's"
// 				products={recommendedProducts}
// 			/>
// 			<Testimonial data={testimonial} />
// 			<BestSellerSection data={feed} limit={10} />
// 			<FAQSection faqs={faqs} />
// 		</>
// 	);
// };

// export default ProductDetail;


"use client"
import { useRef, useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs } from "swiper/modules"
import "swiper/css/bundle"
import SwiperCore from "swiper/core"
import { useCart } from "react-use-cart"
import { toast } from "sonner"
import {
  Heart,
  X,
  Plus,
  Minus,
  ClockIcon as ArrowClockwise,
  FileQuestionIcon as Question,
  Timer,
  Eye,
  PlayCircle,
  CheckCircle,
  CircleIcon as CircleNotch,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react"
import Rate from "../Rate"
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay"
import useWishlistStore from "@/store/wishlistStore"
import axiosInstance from "@/lib/axiosInstance"
import "swiper/css"
import "swiper/css/navigation"
import { motion, AnimatePresence } from "framer-motion"
import RecommendedProductsSlider from "@/components/RecommendedProductsSlider"
import Testimonial from "@/components/home/Testimonial"
import FAQSection from "@/components/faq-section"
import BestSellerSection from "@/components/BestSellerSection"
import Reviews from "@/components/Reviews"

SwiperCore.use([Navigation, Thumbs])

const ProductDetail = ({ productData, reviews, addons, addonsProducts, faqs, feed, testimonial }) => {
  console.log("Product reviews:", reviews);

  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [inCartExact, setInCartExact] = useState(false)
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log("Fetching recommendations for:", productData.name)
        const res = await axiosInstance.get(`/products/recommended`, {
          params: { productName: productData.name },
        })
        console.log("API URL:", `/recommended?productName=${encodeURIComponent(productData.name)}`)
        console.log("Recommended Products:", res.data)
        setRecommended(res.data)
      } catch (err) {
        console.error("Error fetching recommended products:", err)
      }
    }

    if (productData?.name) {
      fetchRecommendations()
    }
  }, [productData?.name])

  const { addItem, items, removeItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const isProductInWishlist = isClient && isInWishlist(productData._id)

  const parsedProduct = typeof productData === "string" ? JSON.parse(productData) : productData
  const product = useMemo(
    () => ({
      ...parsedProduct,
      id: parsedProduct?._id,
    }),
    [parsedProduct],
  )

  const mediaItems = [...(product?.images || []), ...(product?.videos || [])]

  const swiperRef = useRef(null)
  const mainSwiperRef = useRef(null)
  const [openPopupImg, setOpenPopupImg] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeTab, setActiveTab] = useState("description")
  const [justAddedToCart, setJustAddedToCart] = useState(false)
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [recLoading, setRecLoading] = useState(true)
  const [recError, setRecError] = useState(null)
  const popupSwiperRef = useRef(null)
  const [lastAdded, setLastAdded] = useState({
    productId: null,
    quantity: null,
  })
  const [activeAddOnCategoryId, setActiveAddOnCategoryId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Static data for the new design
  const [selectedSize, setSelectedSize] = useState("Medium")
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedAddOns, setSelectedAddOns] = useState({
    candles: false,
    balloons: false,
    chocolates: false,
    giftCards: false,
  })
  const [expandedSections, setExpandedSections] = useState({
    delivery: false,
    care: false,
  })

  const percentSale = product?.mrp ? Math.floor(100 - (product.price / product.mrp) * 100) : 0

  const pid = product.id || product._id
  const hasSizes = Array.isArray(product?.variants) && product.variants.length > 0
  const sizeKey = hasSizes ? selectedSize?.toLowerCase() || "default" : "default"
  const productId = hasSizes ? `${product._id}-${sizeKey}` : `${product._id}`
  const cartItem = items.find((item) => item.productId === productId)
  const inCartExactQuantity = cartItem?.quantity === currentQuantity

  // Static data that doesn't come dynamically
  const addonsProductss = [
    {
      name: "CANDEL NAME",
      price: 450,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "CANDEL NAME",
      price: 450,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "CANDEL NAME",
      price: 450,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "CANDEL NAME",
      price: 450,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // ✅ Sizes from API (with fallback)
  const sizes =
    product?.variants?.length > 0
      ? product.variants.map((v) => v.size.charAt(0).toUpperCase() + v.size.slice(1))
      : ["Small", "Medium", "Large", "Extra Large"]

  // ✅ Dynamic Gift Set Options
  const giftSetOptions =
    product?.giftSetOptions?.length > 0
      ? product.giftSetOptions.map((option) => ` ${option}`)
      : ["* with Balloons 3pcs", "* with Cardamom Bergamot Candle", "* with Cardamom Bergamot Candle & Balloons"]

  // ✅ Care Instructions (fallback)
  const careInstructions = product?.careInstructions
    ? product.careInstructions.split("\n").filter(Boolean)
    : [
        "Trim stems at a 45-degree angle and place them in a clean vase with water.",
        "Remove wilted flowers and leaves promptly.",
        "Change water every two days and re-trim stems for longer freshness.",
      ]

  const deliveryInformation = product?.deliveryInformation
    ? product.deliveryInformation.split("\n").filter(Boolean)
    : [
        "Orders placed before 4 PM are eligible for same-day delivery in major metro cities.",
        "We offer standard, fixed-time, and midnight delivery options to suit every occasion.",
        "The delivery team ensures the bouquet is handled with utmost care to preserve freshness.",
        "You'll receive real-time tracking updates once your order is dispatched.",
        "In rare cases of high demand or remote locations, delivery time may slightly vary.",
        "Please ensure recipient's availability to avoid missed deliveries.",
        "Personalized message cards are included free with every order.",
      ]

  useEffect(() => {
    setCurrentQuantity(1)
  }, [product._id])

  const handleSwiper = (swiper) => {
    setThumbsSwiper(swiper)
  }

  useEffect(() => {
    const pid = product?.id || product?._id
    const matched = items.some((item) => item.productId === pid && item.quantity === currentQuantity)
    setInCartExact(matched)
  }, [items, product, currentQuantity])

  useEffect(() => {
    if (hasSizes && product.variants.length > 0) {
      const defaultVariant = product.variants[0]
      setSelectedSize(defaultVariant.size.charAt(0).toUpperCase() + defaultVariant.size.slice(1))
      setSelectedVariant(defaultVariant)
    }
  }, [product])

  const handleAddToCart = () => {
    const selectedSizeKey = selectedSize?.toLowerCase() || "default"
    const productId = `${product._id}-${selectedSizeKey}`
    const existingItem = items.find((item) => item.id === productId)
    const newQuantity = existingItem ? existingItem.quantity + currentQuantity : currentQuantity

    addItem(
      {
        ...product,
        id: productId, // Unique per variant
        productId,
        size: selectedSize,
        price: selectedVariant?.price ?? product.price,
        quantity: newQuantity,
      },
      currentQuantity, // this tells react-use-cart to add this many more
    )

    toast(`${product.name} (${currentQuantity}) added to cart`)
  }

  const inCart = items.some((item) => item.productId === productId)

  const handleBuyNow = () => {
    if (!product) {
      toast("Product information is missing")
      return
    }

    setIsProcessing(true)

    try {
      addItem(
        {
          ...product,
          id: productId, // 👈 important: unique ID for cart
          productId,
          price: selectedVariant?.price ?? product.price,
          size: selectedVariant?.size ?? selectedSize,
          quantity: 1,
        },
        1,
      )

      setTimeout(() => {
        window.location.href = "/checkout"
      }, 500)
    } catch (error) {
      console.error("Error during Buy Now process:", error)
      toast("Failed to process. Please try again.")
      setIsProcessing(false)
    }
  }

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1)
    }
  }

  const handleIncreaseQuantity = () => {
    setCurrentQuantity(currentQuantity + 1)
  }

  useEffect(() => {
    console.log("Cart Items:", items)
  }, [items])

  const handleAddToWishlist = () => {
    const productId = product._id || product.id
    if (isProductInWishlist) {
      removeFromWishlist(productId)
      toast(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast(`${product.name} added to wishlist`)
    }
  }

  const handleActiveTab = (tab) => {
    setActiveTab(tab)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const selectedCategorySlugs = Object.keys(selectedAddOns).filter((key) => selectedAddOns[key])

  useEffect(() => {
    if (addons.length && !activeAddOnCategoryId) {
      setActiveAddOnCategoryId(addons[0]._id)
    }
  }, [addons])

  const filteredAddOnProducts = addonsProducts.filter((product) => product.category?._id === activeAddOnCategoryId)

  useEffect(() => {
    setCurrentQuantity(1)
  }, [product._id])

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setRecLoading(true)
        setRecError(null)
        const productName = product?.name || ""
        const query = productName ? `?productNames=${encodeURIComponent(productName)}` : ""
        const response = await axiosInstance.get(`/products/recommended${query}`)
        setRecommendedProducts(response.data)
      } catch (error) {
        console.error("Failed to fetch recommended products:", error)
        setRecError("Failed to load recommended products. Please try again.")
      } finally {
        setRecLoading(false)
      }
    }

    fetchRecommendedProducts()
  }, [product])

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const variant = product.variants.find((v) => v.size.toLowerCase() === selectedSize.toLowerCase())
      setSelectedVariant(variant)
    }
  }, [selectedSize, product])

  useEffect(() => {
    setCurrentQuantity(1)
  }, [product._id])

  useEffect(() => {
    const fetchRecommendedProducts = async () => {}
    fetchRecommendedProducts()
  }, [product])

  const handleRecAddToCart = (recProduct, e) => {
    e.stopPropagation()
    addItem(
      {
        ...recProduct,
        id: recProduct._id,
        productId: recProduct._id,
        price: recProduct.price,
        quantity: 1,
      },
      1,
    )
    toast(`${recProduct.name} added to cart`)
  }

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "No description available."
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  // Handle popup opening with correct slide
  const handleImageClick = (index) => {
    console.log("Image clicked", index)
    setActiveIndex(index)
    setOpenPopupImg(true)
  }

  // Effect to handle popup swiper slide when popup opens
  useEffect(() => {
    if (openPopupImg && popupSwiperRef.current) {
      // Small delay to ensure swiper is fully mounted
      const timer = setTimeout(() => {
        popupSwiperRef.current?.slideTo(activeIndex, 0)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [openPopupImg, activeIndex])

  // Handle keyboard events for popup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (openPopupImg && e.key === "Escape") {
        setOpenPopupImg(false)
      }
    }

    if (openPopupImg) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [openPopupImg])

  // Add these state variables at the top with other useState declarations
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentThumbSlide, setCurrentThumbSlide] = useState(0)

  // Add these custom navigation handlers before the return statement
  const handleMainNext = () => {
    if (mainSwiperRef.current && currentSlide < mediaItems.length - 1) {
      const nextSlide = currentSlide + 1
      mainSwiperRef.current.slideTo(nextSlide)
      setCurrentSlide(nextSlide)
    }
  }

  const handleMainPrev = () => {
    if (mainSwiperRef.current && currentSlide > 0) {
      const prevSlide = currentSlide - 1
      mainSwiperRef.current.slideTo(prevSlide)
      setCurrentSlide(prevSlide)
    }
  }

  const handleThumbNext = () => {
    if (thumbsSwiper && currentThumbSlide < mediaItems.length - (isMobile ? 2 : 4)) {
      const nextSlide = currentThumbSlide + 1
      thumbsSwiper.slideTo(nextSlide)
      setCurrentThumbSlide(nextSlide)
    }
  }

  const handleThumbPrev = () => {
    if (thumbsSwiper && currentThumbSlide > 0) {
      const prevSlide = currentThumbSlide - 1
      thumbsSwiper.slideTo(prevSlide)
      setCurrentThumbSlide(prevSlide)
    }
  }

  const handlePopupNext = () => {
    if (popupSwiperRef.current && activeIndex < mediaItems.length - 1) {
      const nextIndex = activeIndex + 1
      popupSwiperRef.current.slideTo(nextIndex)
      setActiveIndex(nextIndex)
    }
  }

  const handlePopupPrev = () => {
    if (popupSwiperRef.current && activeIndex > 0) {
      const prevIndex = activeIndex - 1
      popupSwiperRef.current.slideTo(prevIndex)
      setActiveIndex(prevIndex)
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span>Home</span>
          <span>{">"}</span>
          <span>Product Category Listing</span>
          <span>{">"}</span>
          <span className="text-gray-900">Product Details Page</span>
        </div>
      </div>

      <div className="product-detail default text-black">
        <div className="featured-product">
          <div className="container flex justify-between gap-y-6 flex-wrap">
            <div className="list-img md:w-1/2 md:pr-[45px] w-full">
              {/* MAIN SWIPER */}
              <div className="relative">
                <Swiper
                  onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                  slidesPerView={1}
                  spaceBetween={0}
                  speed={300}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Thumbs]}
              className="mainSwiper overflow-hidden"
              loop={false}
              allowTouchMove={false}
              noSwiping={true}
              noSwipingClass="swiper-slide"
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              centeredSlides={false}
              watchSlidesProgress={true}
            >
              {mediaItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    {/* Search icon at top-right */}
                    <button
                      className="absolute top-3 right-3 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                      onClick={() => handleImageClick(index)}
                      aria-label="View image"
                      type="button"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      {/* Or use: <Search size={20} /> if lucide-react is imported */}
                    </button>
                    <div onClick={() => handleImageClick(index)}>
                      {item.endsWith(".mp4") ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={product.thumbnail}
                          className="w-full aspect-[3/4] object-cover"
                        >
                          <source src={item} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={item || "/placeholder.svg"}
                          alt={`product-image-${index}`}
                          width={1000}
                          height={1333}
                          className="w-full object-cover cursor-pointer aspect-[3/4]"
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* REMOVE the main swiper left/right navigation buttons below */}
            {/* ...delete the two divs with className="swiper-button-prev-main" and "swiper-button-next-main"... */}
          </div>


              {/* THUMBNAILS */}
              <div className="mt-4 relative">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  slidesPerView={4}
                  spaceBetween={12}
                  watchSlidesProgress
                  modules={[Navigation, Thumbs]}
                  className="thumbsSwiper"
                  breakpoints={{
                    640: { slidesPerView: 4 },
                    480: { slidesPerView: 3 },
                    0: { slidesPerView: 2 },
                  }}
                  allowTouchMove={false} // Disable touch to prevent multi-slide issues
                  noSwiping={true}
                  noSwipingClass="swiper-slide"
                  onSlideChange={(swiper) => setCurrentThumbSlide(swiper.activeIndex)}
                >
                  {mediaItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`cursor-pointer transition-opacity ${
                          index === currentSlide ? "opacity-100" : "opacity-60 hover:opacity-80"
                        }`}
                        onClick={() => {
                          mainSwiperRef.current?.slideTo(index)
                          setCurrentSlide(index)
                        }}
                      >
                        {item.endsWith(".mp4") ? (
                          <div className="relative aspect-[3/4] w-full overflow-hidden ">
                            <Image
                              src={product.thumbnail || "/placeholder.svg"}
                              width={500}
                              height={500}
                              alt={`thumb-video-${index}`}
                              className="w-full h-full object-cover"
                            />
                            <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
                          </div>
                        ) : (
                          <Image
                            src={item || "/placeholder.svg"}
                            alt={`thumb-${index}`}
                            width={500}
                            height={500}
                            className="w-full aspect-[3/4] object-cover "
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Always show arrows when there are more items than visible */}
              
                {mediaItems.length > (isMobile ? 2 : 4) && (
                  <>
                    <div
                      className="swiper-button-prev-thumb custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group"
                      onClick={handleThumbPrev}
                      style={{
                        opacity: currentThumbSlide === 0 ? 0.8 : 1,
                        pointerEvents: currentThumbSlide === 0 ? "none" : "auto",
                      }}
                    >
                      <Image
                        src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A00.404Z-arrow_left_without_white_glow.png"
                        alt="Previous"
                        width={14}
                        height={14}
                        className=" transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
                      />
                    </div>
                    <div
                      className="swiper-button-next-thumb custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group"
                      onClick={handleThumbNext}
                      style={{
                        opacity: currentThumbSlide >= mediaItems.length - (isMobile ? 2 : 4) ? 0.5 : 1,
                        pointerEvents: currentThumbSlide >= mediaItems.length - (isMobile ? 2 : 4) ? "none" : "auto",
                      }}
                    >
                      <Image
                        src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A55.700Z-arrow_right_without_white_glow.png"
                        alt="Next"
                        width={14}
                        height={14}
                        className=" transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* POPUP VIEW */}
              {openPopupImg && (
                <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center">
                  <button
                    className="absolute top-4 right-4 z-50 p-2 hover:bg-white/10  transition-colors"
                    onClick={() => setOpenPopupImg(false)}
                  >
                    <X className="text-white" size={28} />
                  </button>

                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Swiper
                      onSwiper={(swiper) => (popupSwiperRef.current = swiper)}
                      slidesPerView={1}
                      spaceBetween={0}
                      speed={300}
                      initialSlide={activeIndex}
                      loop={false}
                      modules={[Navigation]}
                      className="popupSwiper max-w-4xl w-full h-full"
                      allowTouchMove={false} // Disable touch to prevent multi-slide issues
                      noSwiping={true}
                      noSwipingClass="swiper-slide"
                      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                      {mediaItems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full aspect-[3/4] overflow-hidden  cursor-pointer">
                            {item.endsWith(".mp4") ? (
                              <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                poster={product.thumbnail}
                              >
                                <source src={item} type="video/mp4" />
                              </video>
                            ) : (
                              <Image
                                src={item || "/placeholder.svg"}
                                alt={`product-image-${index}`}
                                width={1000}
                                height={1333}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {mediaItems.length > 1 && (
                      <>
                        <div
                          className="swiper-button-prev-popup absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                          onClick={handlePopupPrev}
                          style={{
                            opacity: activeIndex === 0 ? 0.5 : 1,
                            pointerEvents: activeIndex === 0 ? "none" : "auto",
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                          </svg>
                        </div>
                        <div
                          className="swiper-button-next-popup absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                          onClick={handlePopupNext}
                          style={{
                            opacity: activeIndex === mediaItems.length - 1 ? 0.5 : 1,
                            pointerEvents: activeIndex === mediaItems.length - 1 ? "none" : "auto",
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-gray-200"></div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <ArrowClockwise size={18} />
                    <div className="font-medium">Delivery & Return</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Question size={18} />
                    <div className="font-medium">Ask A Question</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Timer size={18} />
                  <div className="font-medium">Estimated Delivery:</div>
                  <div className="text-gray-500">According To Your Order</div>
                </div>

                <div className="flex items-center gap-1">
                  <Eye size={18} />
                  <div className="font-medium">TBD</div>
                  <div className="text-gray-500">people viewing this product right now!</div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="font-medium">Product Code:</div>
                  <div className="text-gray-500">{product?.sku}</div>
                </div>
              </div>

              <div className="mt-7">
                <div className="pt-6 pb-4 px-4 border border-gray-300  relative">
                  <div className="text-lg font-semibold px-5 bg-white absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    Guaranteed safe checkout
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/tmprvsweas2.webp"
                      width={600}
                      height={80}
                      alt="All Payment Methods"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500 font-semibold uppercase">{product?.brand}</div>
                  <div className="text-3xl font-bold mt-1">{product?.name?.toUpperCase() || "PRODUCT NAME"}</div>
                </div>
                {isClient && (
                  <div
                    className={`w-12 h-12 flex items-center justify-center border border-gray-300 cursor-pointer duration-300 hover:bg-black hover:text-white ${
                      isProductInWishlist ? "bg-black" : ""
                    }`}
                    onClick={handleAddToWishlist}
                    aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={24}
                      className={isProductInWishlist ? "text-white fill-current" : "text-red-800"}
                      color={isProductInWishlist ? "red" : "green"}
                    />
                  </div>
                )}
                
              </div>

              <div className="flex items-center mt-3">
                <Rate currentRate={0} size={14} />
                <span className="text-sm text-gray-500 ml-2">({reviews?.length || 0} Reviews)</span>
              </div>

              {/* Pricing, Discount, Quantity, Add to Cart – INLINE */}
              <div className="flex flex-wrap items-center gap-4 mt-5 border-b border-gray-200 pb-6">
                {/* Price */}
                <div className="text-2xl font-bold text-black">
                  <ServerPriceDisplay amount={selectedVariant?.price ?? product.price} />
                </div>

                {/* MRP */}
                {product?.mrp && product?.mrp > product?.price && (
                  <div className="text-base text-gray-500 line-through">
                    <ServerPriceDisplay amount={selectedVariant?.mrp ?? product.mrp} />
                  </div>
                )}

                {/* Discount Badge */}
                {product?.mrp && percentSale > 0 && (
                  <div className="text-xs font-semibold bg-green-500 px-2 py-0.5 rounded-full text-black">
                    -{percentSale}%
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="p-2 flex items-center justify-between border border-gray-300 w-[120px] flex-shrink-0">
                  <Minus
                    size={16}
                    onClick={handleDecreaseQuantity}
                    className={`cursor-pointer ${currentQuantity <= 1 ? "opacity-50 pointer-events-none" : ""}`}
                  />
                  <div className="text-sm font-semibold">{currentQuantity}</div>
                  <Plus size={16} onClick={handleIncreaseQuantity} className="cursor-pointer" />
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={inCartExactQuantity}
                  className={`py-2 px-4 text-sm flex items-center gap-2 border border-black transition-all duration-300 ${
                    inCartExactQuantity
                      ? "bg-green-50 cursor-not-allowed opacity-70"
                      : "hover:bg-black hover:text-white"
                  }  `}
                >
                  {inCartExactQuantity ? (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      Added
                    </>
                  ) : (
                    "Add To Cart"
                  )}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={isProcessing}
                  className="py-2 px-4 text-sm bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <CircleNotch size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>

              {typeof product?.redeemPoints === "number" && product?.redeemPoints > 0 && (
                <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-300 p-3  shadow-sm">
                  <span className="text-yellow-700 font-semibold text-base">
                    🎁 Redeem with <span className="text-lg font-bold">{product?.redeemPoints} Points</span>
                  </span>
                  <span className="ml-auto text-sm text-red-500 font-medium ">Order Fast!</span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mt-4 mb-6">
                {product?.description ||
                  "Indulge in the exquisite beauty of our Pink Perfection flower arrangement, featuring the Gerbera Pink and the Candy Pink Rose, creating a captivating display of pink hues. Indulge in the exquisite beauty of our Pink Perfection flower arrangement, featuring the Gerbera Pink and the Candy Pink Rose, creating a captivating display of pink hues, and the Candy Pink Rose, creating a captivating display of pink hues."}
              </p>

              {/* Gift Set Options */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Gift Set options include:</h3>
                <div className="space-y-1">
                  {giftSetOptions
                    .join(" ")
                    .split(".")
                    .filter((option) => option.trim() !== "")
                    .map((option, index) => (
                      <p key={index} className="text-gray-600">
                        * {option.trim()}.
                      </p>
                    ))}
                </div>
              </div>

              {/* Size Selection */}
              {hasSizes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Select size:</h3>
                  <div className="flex space-x-2">
                    {product.variants.map((variant) => {
                      const size = variant.size.charAt(0).toUpperCase() + variant.size.slice(1)
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border  transition-colors ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              <div className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar">
                {addons.map((addon) => {
                  const isActive = activeAddOnCategoryId === addon._id
                  return (
                    <motion.button
                      key={addon._id}
                      onClick={() => setActiveAddOnCategoryId(addon._id)}
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ scale: 1.03 }}
                      className={`px-4 py-2 border  whitespace-nowrap flex items-center space-x-2 transition-colors duration-200 ${
                        isActive ? "bg-black text-white border-black" : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <span>{addon.name}</span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isActive ? "down" : "right"}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>

              <motion.div
                key={activeAddOnCategoryId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-6 relative"
              >
                <div className="relative">
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={isMobile ? 1.2 : 4}
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".custom-swiper-next",
                      prevEl: ".custom-swiper-prev",
                    }}
                    className="w-full"
                  >
                    {filteredAddOnProducts.map((product, index) => (
                      <SwiperSlide key={index}>
                        <div className="border  p-3 text-center">
                          <div className="aspect-square relative bg-gray-100  mb-2 overflow-hidden">
                            <Image
                              src={product.thumbnail || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                          <div className="flex justify-center">
                            <ServerPriceDisplay amount={product.price} />
                          </div>
                          <button
                            className="w-full bg-black text-white text-xs py-1 px-2  flex items-center justify-center space-x-1 gap-1"
                            onClick={() => {
                              addItem(
                                {
                                  ...product,
                                  id: product._id,
                                  productId: product._id,
                                  quantity: 1,
                                  price: product.price,
                                },
                                1,
                              )
                              toast(`${product.name} added to cart`)
                            }}
                          >
                            ADD TO CART
                            <ShoppingBag size={15} />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Arrows */}
                  <div className="custom-swiper-prev absolute -left-10 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-black">
                    <ChevronLeft size={40} />
                  </div>
                  <div className="custom-swiper-next absolute -right-10 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-black">
                    <ChevronRight size={40} />
                  </div>
                </div>
              </motion.div>

              {/* Expandable Sections */}
              <div className="space-y-4 mt-6">
                {/* DELIVERY INFORMATION */}
                <div className="border  overflow-hidden">
                  <button
                    onClick={() => toggleSection("delivery")}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all duration-200 ${
                      expandedSections.delivery ? "bg-gray-100 font-bold" : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`text-sm tracking-wide ${expandedSections.delivery ? "text-black" : "text-gray-700"}`}
                    >
                      DELIVERY INFORMATION
                    </span>
                    {expandedSections.delivery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.delivery && (
                    <div className="px-4 pb-4 pt-2 text-sm text-gray-600 border-t border-dashed border-gray-300 animate-fade-in">
                      {deliveryInformation.map((instruction, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {instruction}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* CARE INSTRUCTIONS */}
                <div className="border  overflow-hidden">
                  <button
                    onClick={() => toggleSection("care")}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all duration-200 ${
                      expandedSections.care ? "bg-gray-100 font-bold" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-sm tracking-wide ${expandedSections.care ? "text-black" : "text-gray-700"}`}>
                      CARE INSTRUCTIONS
                    </span>
                    {expandedSections.care ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSections.care && (
                    <div className="px-4 pb-4 pt-2 text-sm text-gray-600 border-t border-dashed border-gray-300 animate-fade-in">
                      {careInstructions.map((instruction, index) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {instruction}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 uppercase">
                {product?.color?.length > 0 && (
                  <div>
                    <span className="font-bold">Color:</span> {product.color.join(", ")}
                  </div>
                )}
                {product?.occasion?.length > 0 && (
                  <div>
                    <span className="f font-bold">Occasion:</span> {product.occasion.join(", ")}
                  </div>
                )}
                {product?.flowerType && (
                  <div>
                    <span className="font-bold">Flower Type:</span> {product.flowerType}
                  </div>
                )}
                {product?.fragranceLevel && (
                  <div>
                    <span className="font-bold">Fragrance:</span> {product.fragranceLevel}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reviews productId={product._id} reviews={reviews} />
      <RecommendedProductsSlider title="More Related Product's" products={recommendedProducts} />
      <Testimonial data={testimonial} />
      <BestSellerSection data={feed} limit={10} />
      <FAQSection faqs={faqs} />
    </>
  )
}

export default ProductDetail
