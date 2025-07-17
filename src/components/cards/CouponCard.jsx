"use client"
import { useState } from "react"
import { Calendar, Check, Copy, DollarSign, Info, ShoppingBag, Tag, Truck } from "lucide-react"
import PropTypes from "prop-types"
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";


const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getCouponIcon = () => {
    switch (coupon.type) {
      case "percentage":
        return <Tag className="h-6 w-6" />
      case "fixed":
        return <DollarSign className="h-6 w-6" />
      case "free_shipping":
        return <Truck className="h-6 w-6" />
      case "buy_x_get_y":
        return <ShoppingBag className="h-6 w-6" />
      default:
        return <Tag className="h-6 w-6" />
    }
  }

  const getDiscountText = () => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}% OFF`
      case "fixed":
        return `$${coupon.value.toFixed(2)} OFF`
      case "free_shipping":
        return "FREE SHIPPING"
      case "buy_x_get_y":
        return `BUY ${coupon.buyXQuantity} GET ${coupon.getYQuantity}`
      default:
        return "SPECIAL OFFER"
    }
  }

  return (
    <div className="coupon-card bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          {getCouponIcon()}
          <span className="font-bold text-lg">{getDiscountText()}</span>
        </div>
        {coupon.minPurchaseAmount > 0 && (
          <div className="text-xs bg-white text-black px-2 py-1 rounded-lg">
           Min. <ServerPriceDisplay  amount={coupon.minPurchaseAmount.toFixed(2)}/>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
          <div className="flex">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-white rounded-full -mb-2 mx-1"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-3">{coupon.description || "Special discount offer"}</h3>

        <div
          onClick={handleCopyCode}
          className="bg-gray-100 p-3 rounded-lg mb-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
        >
          <span className="font-mono font-bold">{coupon.code}</span>
          <span className="text-sm flex items-center">
            {copied ? (
              <>
                <Check size={16} className="mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-1" />
                Copy Code
              </>
            )}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-black" />
            <span>Valid until: {formatDate(coupon.expiryDate)}</span>
          </div>
          {coupon.usageLimit > 0 && (
            <div className="flex items-center">
              <Info size={16} className="mr-2 text-black" />
              <span>Limited to {coupon.usageLimit} uses</span>
            </div>
          )}
          {coupon.perCustomerLimit > 0 && (
            <div className="flex items-center">
              <Info size={16} className="mr-2 text-black" />
              <span>Limit {coupon.perCustomerLimit} per customer</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleCopyCode}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          {copied ? "Code Copied!" : "Use This Coupon"}
        </button>
      </div>
    </div>
  )
}

CouponCard.propTypes = {
  coupon: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.number,
    minPurchaseAmount: PropTypes.number,
    expiryDate: PropTypes.string,
    usageLimit: PropTypes.number,
    perCustomerLimit: PropTypes.number,
    description: PropTypes.string,
    buyXQuantity: PropTypes.number,
    getYQuantity: PropTypes.number,
  }).isRequired,
}

export default CouponCard
