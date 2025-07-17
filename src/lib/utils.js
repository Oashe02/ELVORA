import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { logger } from "@/utils/logger";
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const NAV_ITEMS = [
	{ label: "Home", href: "/" },
	{ label: "Activities", href: "/activities" },
	{ label: "Holidays", href: "/holidays" },
	{ label: "Staycations", href: "/staycations" },
	{ label: "Contact Us", href: "/contact-us" },
];
export const getLowestPrice = (accommodations) => {
	if (!accommodations || accommodations.length === 0)
		return { original: 0, discounted: 0 };

	let priceTitle = "per night";
	let lowestOriginal = Number.POSITIVE_INFINITY;
	let lowestDiscounted = Number.POSITIVE_INFINITY;

	accommodations.forEach((acc) => {
		if (acc.pricePerPerson < lowestOriginal) {
			lowestOriginal = acc.pricePerPerson;
			priceTitle = acc.priceTitle;
		}

		const discountedPrice =
			acc.discounts && acc.discounts[0]
				? acc.discounts[0].discountedPrice
				: acc.pricePerPerson;
		if (discountedPrice < lowestDiscounted) {
			lowestDiscounted = discountedPrice;
		}
	});
	console.log({ lowestOriginal, priceTitle });

	return {
		original: lowestOriginal === Number.POSITIVE_INFINITY ? 0 : lowestOriginal,
		discounted:
			lowestDiscounted === Number.POSITIVE_INFINITY ? 0 : lowestDiscounted,
		priceTitle,
	};
};

// export function formatDate(dateString) {
// 	return new Date(dateString).toLocaleDateString("en-US", {
// 		year: "numeric",
// 		month: "short",
// 		day: "numeric",
// 	});
// }

export function generateSlug(title) {
	console.log({ title });

	// Convert to lowercase, remove special characters, and replace spaces with dashes
	let slug = title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove special characters
		.replace(/\s+/g, "-"); // Replace spaces with dashes
	console.log({ slug });

	return slug;
}

/**
 * Format a price to a currency string
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} - The formatted price
 */
export function formatPrice(price, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(price);
}

export const formatBookingStatus = (status) => {
	if (!status) {
		return <Badge variant="outline">N/A</Badge>;
	}

	const formatted = status.charAt(0).toUpperCase() + status.slice(1);

	// Map status to shadcn badge variants
	const variantMap = {
		pending: "warning",
		confirmed: "default",
		cancelled: "destructive",
		completed: "success",
	};

	// Get the appropriate variant or use "secondary" as fallback
	const variant = variantMap[status.toLowerCase()] || "secondary";

	return (
		<Badge
			variant={variant}
			className="hover:opacity-80 transition-opacity cursor-default"
		>
			{formatted}
		</Badge>
	);
};
export const formatPaymentStatus = (status) => {
	if (!status) {
		return <Badge variant="outline">N/A</Badge>;
	}

	const formatted = status.charAt(0).toUpperCase() + status.slice(1);

	// Map status to shadcn badge variants
	const variantMap = {
		pending: "warning",
		refunded: "destructive",
		failed: "destructive",
		completed: "success",
		paid: "success",
	};

	// Get the appropriate variant or use "secondary" as fallback
	const variant = variantMap[status.toLowerCase()] || "secondary";
	logger.log("Payment Status:", status, "Variant : ", variant);

	return (
		<Badge
			variant={variant}
			className="hover:opacity-80 transition-opacity cursor-default text-white"
		>
			{formatted}
		</Badge>
	);
};

export const createRoomTravelerMapping = (rooms, travelers) => {
	const mapping = [];
	let travelerIndex = 0;

	for (let i = 0; i < rooms.length; i++) {
		const room = rooms[i];
		const roomCapacity = room.adults + room.children;
		const roomTravelers = [];

		// Assign travelers to this room until we've filled its capacity
		for (let j = 0; j < roomCapacity && travelerIndex < travelers.length; j++) {
			roomTravelers.push(travelers[travelerIndex]);
			travelerIndex++;
		}

		mapping.push({
			roomNumber: room.id,
			adults: room.adults,
			children: room.children,
			travelers: roomTravelers,
		});
	}

	return mapping;
};

/**
 * Format a date to a string
 * @param {Date|string} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - The formatted date
 */
export function formatDate(date, options = {}) {
	const defaultOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return new Intl.DateTimeFormat("en-US", {
		...defaultOptions,
		...options,
	}).format(new Date(date));
}

/**
 * Slugify a string
 * @param {string} text - The text to slugify
 * @returns {string} - The slugified text
 */
export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

/**
 * Truncate a string to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - The maximum length
 * @returns {string} - The truncated text
 */
export function truncate(text, length = 100) {
	if (!text) return "";
	if (text.length <= length) return text;
	return text.substring(0, length) + "...";
}

/**
 * Get the initials from a name
 * @param {string} name - The name to get initials from
 * @returns {string} - The initials
 */
export function getInitials(name) {
	if (!name) return "";
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase();
}

/**
 * Calculate the total price including taxes and fees
 * @param {number} basePrice - The base price
 * @param {number} taxPercentage - The tax percentage
 * @param {number} fees - Additional fees
 * @returns {number} - The total price
 */
export function calculateTotalPrice(basePrice, taxPercentage = 0, fees = 0) {
	const tax = (basePrice * taxPercentage) / 100;
	return basePrice + tax + fees;
}

/**
 * Check if a date is within a range
 * @param {Date|string} date - The date to check
 * @param {Date|string} startDate - The start date of the range
 * @param {Date|string} endDate - The end date of the range
 * @returns {boolean} - Whether the date is within the range
 */
export function isDateInRange(date, startDate, endDate) {
	const checkDate = new Date(date);
	const start = new Date(startDate);
	const end = new Date(endDate);

	return checkDate >= start && checkDate <= end;
}

/**
 * Calculate the number of nights between two dates
 * @param {Date|string} checkIn - The check-in date
 * @param {Date|string} checkOut - The check-out date
 * @returns {number} - The number of nights
 */
export function calculateNights(checkIn, checkOut) {
	const start = new Date(checkIn);
	const end = new Date(checkOut);
	const diffTime = Math.abs(end - start);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays;
}

export function formatPriceServer(amount, currency = "AED") {
	const decimalPlaces = 2;
	const locale = "en-US";

	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	});
	let formatted = formatter.format(amount);

	formatted = formatted.replace(/(\D)(\d)/, "$1 $2"); // e.g., "$1000" => "$ 1000"
	formatted = formatted.replace(/(\d)(\D)$/, "$1 $2"); // e.g., "1000€" => "1000 €"

	return formatted;
}

// export function formatPriceOnlyServer(amount, locale = "en-US") {
// 	const decimalPlaces = 2;

// 	const formatter = new Intl.NumberFormat(locale, {
// 		minimumFractionDigits: decimalPlaces,
// 		maximumFractionDigits: decimalPlaces,
// 	});

// 	return formatter.format(amount); // e.g., 1234.5 => "1,234.50"
// }
export function formatPriceOnlyServer(amount, locale = "en-AE") {
	const isInteger = Number.isInteger(amount);
  
	const formatter = new Intl.NumberFormat(locale, {
	
	  minimumFractionDigits: isInteger ? 0 : 2,
	  maximumFractionDigits: 2,
	});
  
	return formatter.format(amount); // e.g., 499 => "AED 499", 499.5 => "AED 499.50"
  }
  
