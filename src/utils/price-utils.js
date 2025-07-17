/**
 * Utility functions for price calculations and formatting
 */

/**
 * Calculates the lowest price for a staycation based on room types and discount periods
 * @param {Object} staycation - The staycation object
 * @returns {Object} - Object containing originalPrice and finalPrice
 */
export const calculateLowestPrice = (staycation) => {
	if (!staycation) {
		return { originalPrice: 0, finalPrice: 0 };
	}

	// Default to the base price if available
	let lowestOriginalPrice = staycation.price || 0;

	// Check if there are room types with different prices
	if (staycation.roomTypes && staycation.roomTypes.length > 0) {
		// Find the lowest priced room type
		const lowestPricedRoom = staycation.roomTypes.reduce(
			(lowest, room) => {
				return room.price < lowest.price ? room : lowest;
			},
			{ price: Number.POSITIVE_INFINITY },
		);

		if (lowestPricedRoom.price < Number.POSITIVE_INFINITY) {
			lowestOriginalPrice = lowestPricedRoom.price;
		}
	}

	// Apply the discount if available
	let lowestFinalPrice = lowestOriginalPrice;
	if (staycation.discount && staycation.discount > 0) {
		lowestFinalPrice =
			lowestOriginalPrice - lowestOriginalPrice * (staycation.discount / 100);
	}

	// Check if there are special discount periods with better rates
	if (staycation.discountPeriods && staycation.discountPeriods.length > 0) {
		staycation.discountPeriods.forEach((period) => {
			if (period.discountPercentage && period.discountPercentage > 0) {
				const discountedPrice =
					lowestOriginalPrice -
					lowestOriginalPrice * (period.discountPercentage / 100);
				if (discountedPrice < lowestFinalPrice) {
					lowestFinalPrice = discountedPrice;
				}
			}
		});
	}

	return {
		originalPrice: lowestOriginalPrice,
		finalPrice: lowestFinalPrice,
	};
};

/**
 * Formats a price value as currency
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
};

/**
 * Calculates the total price for a booking
 * @param {Object} params - Parameters for calculation
 * @param {number} params.basePrice - The base price per night
 * @param {number} params.discountPercentage - Discount percentage (0-100)
 * @param {Array} params.rooms - Array of room objects with adults and children counts
 * @param {number} params.nights - Number of nights
 * @param {number} params.taxRate - Tax rate as decimal (default: 0.1 for 10%)
 * @returns {Object} - Object containing subtotal, taxes, and total
 */
export const calculateTotalBookingPrice = ({
	basePrice,
	discountPercentage = 0,
	rooms = [],
	nights = 1,
	taxRate = 0.1,
}) => {
	// Calculate discounted price per night
	const discountedPrice = basePrice - basePrice * (discountPercentage / 100);

	// Calculate rooms total
	const roomsTotal = rooms.reduce((total, room) => {
		// Adults pay full price, children pay half price
		return (
			total +
			discountedPrice * room.adults +
			discountedPrice * 0.5 * room.children
		);
	}, 0);

	// Calculate subtotal (rooms × nights)
	const subtotal = roomsTotal * nights;

	// Calculate taxes
	const taxes = subtotal * taxRate;

	// Calculate total
	const total = subtotal + taxes;

	return {
		subtotal,
		taxes,
		total,
	};
};
