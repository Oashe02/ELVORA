"use client"

import { useState, useEffect } from "react"
import { X, Copy, Tag } from "lucide-react"

const CouponModal = ({ coupons }) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const coupon = coupons && coupons.length > 0 ? coupons[0] : null

  useEffect(() => {
    if (coupon) {
      setTimeout(() => {
        setOpen(true)
      }, 3000)
    }
  }, [coupon])

  const handleCopyCode = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!open || !coupon) return null

  const discountDisplay =
    coupon.type === "percentage"
      ? `${coupon.value}% OFF`
      : coupon.type === "fixed"
        ? `AED ${coupon.value} OFF`
        : coupon.type === "free_shipping"
          ? "Free Shipping"
          : coupon.type === "buy_x_get_y"
            ? coupon.value
            : ""

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div className="container px-2 sm:px-4">
        <div
          className="relative max-w-sm sm:max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {/* Header */}
          <div className="bg-black text-white text-center py-3 sm:py-4">
            <h2 className="text-base sm:text-lg font-semibold">SPECIAL OFFER</h2>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 text-center space-y-4 sm:space-y-6">
            {/* Discount Display */}
            <div>
              <div className="text-2xl sm:text-4xl font-black text-black mb-1 sm:mb-2">
                {discountDisplay}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                {coupon.minPurchaseAmount > 0 ? (
                  <>On orders above AED {coupon.minPurchaseAmount}</>
                ) : (
                  "On all orders"
                )}
                {coupon.firstPurchaseOnly && " • First purchase only"}
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600 font-medium">COUPON CODE</span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-black tracking-wide font-mono">
                {coupon.code}
              </div>
            </div>

            {/* Validity */}
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium">Valid until: </span>
              {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? "COPIED!" : "COPY COUPON CODE"}
            </button>
          </div>

          {/* Success Message */}
          {copied && (
            <div className="absolute inset-x-0 bottom-3 mx-3 sm:bottom-4 sm:mx-4">
              <div className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-center animate-in slide-in-from-bottom-2 duration-300">
                ✓ Coupon code copied successfully!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default CouponModal
