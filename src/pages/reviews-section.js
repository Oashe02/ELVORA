"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, ChevronDown, Filter } from "lucide-react"

export default function ReviewsSection() {
  const [selectedFilter, setSelectedFilter] = useState("Recommended")
  const [selectedTravelerType, setSelectedTravelerType] = useState("All")
  const [selectedRating, setSelectedRating] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Arlene McCoy",
      date: "2 October 2023",
      rating: 4,
      comment:
        "The tour was very well organized. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private.",
      avatar: "/images/avatar.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Arlene McCoy",
      date: "2 October 2023",
      rating: 4,
      comment:
        "The tour was very well organized. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private.",
      avatar: "/images/avatar.jpg",
      verified: true,
    },
    {
      id: 3,
      name: "Arlene McCoy",
      date: "2 October 2023",
      rating: 5,
      comment:
        "The tour was very well organized. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private.",
      avatar: "/images/avatar.jpg",
      verified: true,
    },
  ]

  // Calculate average rating
  const averageRating = 4.5
  const totalReviews = 854

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-2xl ${i < rating ? "text-amber-400" : "text-gray-200"}`}>
          ★
        </span>
      ))
  }

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-[85%] mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-800 mb-2">Rating & Reviews</h2>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
            <div className="flex">{renderStars(Math.floor(averageRating))}</div>
          </div>
          <p className="text-gray-500 text-sm">{totalReviews} Reviews</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="relative min-w-[150px]">
            <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white cursor-pointer">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm">Filtering:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{selectedFilter}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="relative min-w-[150px]">
            <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white cursor-pointer">
              <span className="text-sm">Traveler type</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>

          <div className="relative min-w-[120px]">
            <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white cursor-pointer">
              <span className="text-sm">Rating</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>

          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here"
                className="w-full border rounded-md px-3 py-2 pl-9 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

          {/* Reviews card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-start gap-3 mb-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                    {review.verified && (
                      <svg
                        className="h-4 w-4 text-teal-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">2 October 2012</p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? "text-amber-400" : "text-gray-200"}`}>
                      ★
                    </span>
                  ))}
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

