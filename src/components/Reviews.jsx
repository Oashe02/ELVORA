// import { useState, useEffect } from "react";
// import { StarIcon } from "lucide-react";
// import { toast } from "sonner";
// import axiosInstance from "@/lib/axiosInstance";

// export default function Reviews({ productId, reviews, setReviews }) {
// 	const [count, setCount] = useState(0);
// 	const [hoverCount, setHoverCount] = useState(0);
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);

// 	async function submitReview(e) {
// 		e.preventDefault();
// 		if (!count || count <= 0 || count > 5) {
// 			return toast.error("Please select a rating between 1 and 5.");
// 		}
// 		if (!title) {
// 			return toast.error("Please provide a title for your review.");
// 		}
// 		if (!description) {
// 			return toast.error("Please provide a description for your review.");
// 		}

// 		setIsLoading(true);
// 		try {
// 			const response = await axiosInstance.post("/review", {
// 				productId,
// 				rating: count,
// 				title,
// 				comment: description,
// 			});
// 			toast.success("Thank you for your review!");
// 			// setReviews([...reviews, response.data]);
// 			setTitle("");
// 			setDescription("");
// 			setCount(0);
// 			setHoverCount(0);
// 		} catch (error) {
// 			console.error("Error submitting review:", error);
// 			if (error.response?.status === 401) {
// 				toast.error("Please log in to submit a review.");
// 			} else {
// 				toast.error(error.response?.data?.error || "Failed to submit review.");
// 			}
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}
// 	return (
// 		<div className="mt-7 w-full rounded-lg bg-white p-4 shadow-md sm:p-6">
// 			<h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
// 			{reviews.length === 0 ? (
// 				<p>No reviews yet! Be the first to share your experience.</p>
// 			) : (
// 				<div className="space-y-4 mb-6">
// 					{reviews.map((review, index) => (
// 						<div
// 							key={index}
// 							className="border-b border-gray-200 pb-4 last:border-b-0"
// 						>
// 							<div className="flex items-center gap-2 mb-2">
// 								{[...Array(5)].map((_, i) => (
// 									<StarIcon
// 										key={i}
// 										className={`h-5 w-5 ${
// 											i < review.rating
// 												? "fill-yellow-400 text-yellow-400"
// 												: "fill-gray-200 text-gray-200"
// 										}`}
// 									/>
// 								))}
// 								<span className="text-sm text-gray-500">
// 									by {review.userName || "Anonymous"}
// 								</span>
// 							</div>
// 							<h4 className="font-medium text-lg">{review.title}</h4>
// 							<p className="text-gray-600">{review.comment}</p>
// 						</div>
// 					))}
// 				</div>
// 			)}

// 			<form onSubmit={submitReview} className="flex flex-col gap-y-4">
// 				<h4 className="text-lg font-semibold">Write a Review</h4>
// 				<div className="flex items-center gap-x-2">
// 					{[...Array(5)].map((_, index) => (
// 						<div key={index} className="group relative">
// 							<StarIcon
// 								className={`h-8 w-8 cursor-pointer ${
// 									count >= index + 1 || hoverCount >= index + 1
// 										? "fill-yellow-400 text-yellow-400"
// 										: "fill-gray-200 text-gray-200"
// 								}`}
// 								onClick={() => setCount(index + 1)}
// 								onMouseEnter={() => setHoverCount(index + 1)}
// 								onMouseLeave={() => setHoverCount(count)}
// 							/>
// 							<span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-black p-2 text-sm text-white group-hover:block">
// 								{["Poor", "Bad", "OK", "Good", "Excellent"][index]}
// 							</span>
// 						</div>
// 					))}
// 				</div>

// 				<input
// 					type="text"
// 					placeholder="Review Title"
// 					value={title}
// 					onChange={(e) => setTitle(e.target.value)}
// 					className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
// 					required
// 				/>

// 				<textarea
// 					placeholder="Write your review here..."
// 					value={description}
// 					onChange={(e) => setDescription(e.target.value)}
// 					className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
// 					required
// 				/>

// 				<button
// 					type="submit"
// 					disabled={isLoading}
// 					className="flex w-32 items-center justify-center rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
// 				>
// 					{isLoading ? "Submitting..." : "Submit Review"}
// 				</button>
// 			</form>
// 		</div>
// 	);
// }



import { useState, useEffect } from "react";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function Reviews({ productId, reviews, setReviews }) {
	const [count, setCount] = useState(0);
	const [hoverCount, setHoverCount] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function submitReview(e) {
		e.preventDefault();
		if (!count || count <= 0 || count > 5) {
			return toast.error("Please select a rating between 1 and 5.");
		}
		if (!title) {
			return toast.error("Please provide a title for your review.");
		}
		if (!description) {
			return toast.error("Please provide a description for your review.");
		}

		setIsLoading(true);
		try {
			const response = await axiosInstance.post("/review", {
				productId,
				rating: count,
				title,
				comment: description,
			});
			toast.success("Thank you for your review!");
			// setReviews([...reviews, response.data]);
			setTitle("");
			setDescription("");
			setCount(0);
			setHoverCount(0);
		} catch (error) {
			console.error("Error submitting review:", error);
			if (error.response?.status === 401) {
				toast.error("Please log in to submit a review.");
			} else {
				toast.error(error.response?.data?.error || "Failed to submit review.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	// Calculate average rating
	const averageRating = reviews.length > 0 
		? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
		: 0;

	return (
		<div className="mt-8 w-full">
			{/* Header Section */}
			<div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-2xl p-6 border-b border-gray-100">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
						{reviews.length > 0 && (
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<StarIcon
											key={i}
											className={`h-5 w-5 ${
												i < Math.round(averageRating)
													? "fill-amber-400 text-amber-400"
													: "fill-gray-200 text-gray-200"
											}`}
										/>
									))}
								</div>
								<span className="text-lg font-semibold text-gray-700">{averageRating}</span>
								<span className="text-gray-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Reviews List */}
			<div className="bg-white rounded-none border-x border-gray-100">
				{reviews.length === 0 ? (
					<div className="text-center py-16 px-6">
						<div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
							<StarIcon className="h-10 w-10 text-gray-400" />
						</div>
						<p className="text-xl text-gray-600 mb-2">No reviews yet!</p>
						<p className="text-gray-500">Be the first to share your experience with this product.</p>
					</div>
				) : (
					<div className="divide-y divide-gray-100">
						{reviews.map((review, index) => (
							<div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
											{(review.userName || "A").charAt(0).toUpperCase()}
										</div>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-3 mb-2">
											<div className="flex items-center gap-1">
												{[...Array(5)].map((_, i) => (
													<StarIcon
														key={i}
														className={`h-4 w-4 ${
															i < review.rating
																? "fill-amber-400 text-amber-400"
																: "fill-gray-200 text-gray-200"
														}`}
													/>
												))}
											</div>
											<span className="text-sm font-medium text-gray-900">
												{review.userName || "Anonymous"}
											</span>
										</div>
										<h4 className="font-semibold text-lg text-gray-900 mb-2">{review.title}</h4>
										<p className="text-gray-700 leading-relaxed">{review.comment}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Write Review Form */}
			<div className="bg-gradient-to-br from-white to-gray-50 rounded-b-2xl p-6 border border-gray-100 border-t-0">
				<form onSubmit={submitReview} className="space-y-6">
					<div className="text-center mb-6">
						<h4 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h4>
						<p className="text-gray-600">Share your experience with other customers</p>
					</div>

					{/* Star Rating */}
					<div className="flex flex-col items-center gap-4">
						<label className="text-sm font-medium text-gray-700">Your Rating</label>
						<div className="flex items-center gap-2">
							{[...Array(5)].map((_, index) => (
								<div key={index} className="group relative">
									<StarIcon
										className={`h-10 w-10 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
											count >= index + 1 || hoverCount >= index + 1
												? "fill-amber-400 text-amber-400 drop-shadow-sm"
												: "fill-gray-200 text-gray-200 hover:fill-gray-300 hover:text-gray-300"
										}`}
										onClick={() => setCount(index + 1)}
										onMouseEnter={() => setHoverCount(index + 1)}
										onMouseLeave={() => setHoverCount(count)}
									/>
									<div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
										<div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
											{["Poor", "Fair", "Good", "Very Good", "Excellent"][index]}
											<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
										</div>
									</div>
								</div>
							))}
						</div>
						{count > 0 && (
							<p className="text-sm text-gray-600 animate-fade-in">
								You rated this {["Poor", "Fair", "Good", "Very Good", "Excellent"][count - 1].toLowerCase()}
							</p>
						)}
					</div>

					{/* Form Fields */}
					<div className="grid gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Review Title *
							</label>
							<input
								type="text"
								placeholder="Give your review a title..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Your Review *
							</label>
							<textarea
								placeholder="Tell others about your experience with this product..."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="w-full min-h-[120px] rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
								required
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-center pt-4">
						<button
							type="submit"
							disabled={isLoading}
							className="flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
						>
							{isLoading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-top-transparent mr-2"></div>
									Submitting...
								</>
							) : (
								<>
									<StarIcon className="h-4 w-4 mr-2" />
									Submit Review
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}