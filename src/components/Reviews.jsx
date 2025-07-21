import { useState } from "react";
import { StarIcon, X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

// Simple Modal Component
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white shadow-xl max-w-lg w-full relative p-6 border border-gray-200">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default function Reviews({ productId, reviews, setReviews }) {
    const [count, setCount] = useState(0);
    const [hoverCount, setHoverCount] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(5);

    // Average rating and star distribution
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : 0;

    const starCounts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((r) => r.rating === star).length
    );
    const starPercents = starCounts.map((count) =>
        reviews.length ? Math.round((count / reviews.length) * 100) : 0
    );

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
            setTitle("");
            setDescription("");
            setCount(0);
            setHoverCount(0);
            setShowModal(false);
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

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Customers Say</h3>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Reviews List */}
                <div className="basis-0 grow min-w-0 md:w-[700px]">
                    {reviews.length === 0 ? (
                        <div className="text-center py-16 px-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 flex items-center justify-center">
                                <StarIcon className="h-10 w-10 text-[#3096a5] fill-[#3096a5]" />
                            </div>
                            <p className="text-xl text-gray-600 mb-2">No reviews yet!</p>
                            <p className="text-gray-500">Be the first to share your experience with this product.</p>
                        </div>
                    ) : (
                        <>
                            <div
                                className="divide-y divide-gray-100 bg-white shadow border border-gray-200 transition-all duration-500"
                                style={{
                                    overflow: "hidden",
                                    maxHeight: `${visibleReviews * 180}px`, // Adjust 180 if your review card is taller/shorter
                                }}
                            >
                                {reviews.slice(0, visibleReviews).map((review, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                                                    {(review.userName || "A").charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "fill-[#3096a5] text-[#3096a5]" : "fill-gray-200 text-gray-200"}`}
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
                            {/* Read more / Collapse controls */}
                            <div className="mt-4 flex gap-4 items-center">
                                {visibleReviews < reviews.length && (
                                    <button
                                        className="text-[#3096a5] underline text-sm font-semibold transition-colors duration-200"
                                        onClick={() => setVisibleReviews(v => Math.min(v + 3, reviews.length))}
                                    >
                                        Read more
                                    </button>
                                )}
                                {reviews.length > 5 && visibleReviews > 5 && (
                                    <button
                                        className="text-[#3096a5] underline text-sm font-semibold transition-colors duration-200"
                                        onClick={() => setVisibleReviews(5)}
                                    >
                                        Collapse
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Amazon-style summary */}
                <div className="w-full md:w-[340px] flex-shrink-0">
                    <div className="bg-white shadow border border-gray-200 p-6 sticky top-48">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Customer reviews</h4>
                        <div className="flex items-center mb-2">
                            <span className="text-2xl font-bold text-[#3096a5] mr-2">{averageRating}</span>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-[#3096a5] text-[#3096a5]" : "fill-gray-200 text-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-gray-600 mb-4">{reviews.length} global ratings</div>
                        {/* Star bars */}
                        <div className="space-y-1 mb-6">
                            {[5, 4, 3, 2, 1].map((star, idx) => (
                                <div key={star} className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700 w-10">{star} star</span>
                                    <div className="flex-1 h-3 bg-gray-200">
                                        <div
                                            className="h-3 bg-[#3096a5]"
                                            style={{ width: `${starPercents[idx]}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700 w-8 text-right">{starPercents[idx]}%</span>
                                </div>
                            ))}
                        </div>
                        {/* Write review button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full mt-2 py-2 border border-gray-300 text-gray-900 font-semibold hover:bg-gray-100 transition"
                        >
                            Write a product review
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for writing a review */}
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <h4 className="text-2xl font-bold text-gray-900 mb-2 text-center">Write a Review</h4>
                <p className="text-gray-600 mb-6 text-center">Share your experience with other customers</p>
                <form onSubmit={submitReview} className="space-y-6">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Your Rating</label>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="group relative">
                                    <StarIcon
                                        className={`h-10 w-10 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                                            count >= index + 1 || hoverCount >= index + 1
                                                ? "fill-[#3096a5] text-[#3096a5] drop-shadow-sm"
                                                : "fill-gray-200 text-gray-200 hover:fill-gray-300 hover:text-gray-300"
                                        }`}
                                        onClick={() => setCount(index + 1)}
                                        onMouseEnter={() => setHoverCount(index + 1)}
                                        onMouseLeave={() => setHoverCount(count)}
                                    />
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        <div className="bg-gray-900 text-white text-xs px-3 py-2 whitespace-nowrap">
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
                                className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
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
                                className="w-full min-h-[120px] border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none  transition-all duration-200 hover:border-gray-400 resize-none"
                                required
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center px-8 py-3 bg-black text-white font-semibold   transition-all  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:bg-gray-800 "
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
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
            </Modal>
        </div>
    );
}