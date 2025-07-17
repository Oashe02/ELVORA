// import { useState } from "react";
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { ChevronRight } from "lucide-react";
// import Link from "next/link";

// export default function FAQsPage({ faqs }) {
// 	const [openFAQ, setOpenFAQ] = useState(null);

// 	const toggleFAQ = (index) => {
// 		setOpenFAQ(openFAQ === index ? null : index);
// 	};
// 	console.log("FAQs Data from Faq Page:", faqs);

// 	return (
// 		<>
// 			{/* <Navbar /> */}
// 			<div className="bg-white">
// 				{/* Hero Section */}
// 				<div className="relative h-[300px] md:h-[400px] lg:h-[550px] w-full overflow-hidden">
// 					<div className="absolute inset-0 bg-gradient-to-r from-[#8B4513]/80 to-[#D4B996]/60 z-10" />
// 					<Image
// 						src="/images/moring_desert.jpg"
// 						alt="Dubai Desert Dunes"
// 						fill
// 						className="object-cover"
// 						priority
// 					/>
// 					<motion.div
// 						className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4"
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ duration: 0.8 }}
// 					>
// 						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-center">
// 							Frequently Asked Questions
// 						</h1>
// 						<p className="text-xl md:text-2xl max-w-2xl text-center">
// 							Everything you need to know about your Dunes to Downtown
// 						</p>
// 					</motion.div>
// 				</div>

// 				{/* Main Content - Side by Side Layout */}
// 				<div className="container mx-auto px-4 py-12 md:py-16">
// 					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
// 						{/* Left Side - Image */}
// 						<motion.div
// 							className="w-full lg:w-2/5"
// 							initial={{ opacity: 0, x: -50 }}
// 							animate={{ opacity: 1, x: 0 }}
// 							transition={{ duration: 0.8 }}
// 						>
// 							<div className="lg:sticky lg:top-24">
// 								<div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
// 									<Image
// 										src="/images/jeep.jpg"
// 										alt="Dubai Desert"
// 										fill
// 										className="object-cover"
// 									/>
// 									<div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/80 to-transparent" />
// 									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
// 										<h2 className="text-xl md:text-2xl font-bold mb-2">
// 											Explore Dunes to Downtown
// 										</h2>
// 										<p className="mb-4">
// 											Discover the beauty and adventure of Dubai's magnificent
// 											desert landscape
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						</motion.div>

// 						{/* Right Side - FAQs */}
// 						<div className="w-full lg:w-3/5">
// 							<h2 className="text-3xl md:text-4xl font-bold mb-8 lg:mb-10">
// 								Frequently Asked Questions
// 							</h2>

// 							<div className="space-y-4">
// 								<Accordion type="single" collapsible className="w-full">
// 									{faqs.map((faq, index) => (
// 										<AccordionItem
// 											key={faq._id || index}
// 											value={`item-${index}`}
// 											className="border border-gray-200 rounded-lg shadow-sm mb-4"
// 										>
// 											<AccordionTrigger className="px-5 py-4 hover:bg-gray-50 transition-colors text-left">
// 												<span className="font-medium text-lg">
// 													{faq.question}
// 												</span>
// 											</AccordionTrigger>
// 											<AccordionContent className="px-5 py-4">
// 												<p className="text-gray-600">{faq.answer}</p>
// 											</AccordionContent>
// 										</AccordionItem>
// 									))}
// 								</Accordion>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Call to Action */}
// 				<motion.div
// 					className="container mx-auto px-4 py-12 md:py-16"
// 					initial={{ opacity: 0, y: 30 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8 }}
// 					viewport={{ once: true }}
// 				>
// 					<div className="max-w-4xl mx-auto bg-gradient-to-r from-[#E5D3B3] to-[#D4B996] p-6 md:p-12 rounded-2xl shadow-xl">
// 						<div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
// 							<div className="md:w-1/2">
// 								<h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-4">
// 									Still have questions?
// 								</h3>
// 								<p className="text-[#5D4037] mb-6">
// 									Our team is ready to assist you with any additional questions
// 									you might have about your Dunes to Downtown
// 								</p>
// 								<Link href="contact-us">
// 									<Button className="bg-[#8B4513] hover:bg-[#A68A64] text-white px-6 py-2 h-auto text-lg">
// 										Contact Us
// 									</Button>
// 								</Link>
// 							</div>
// 							<div className="w-full md:w-1/2">
// 								<div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden">
// 									<Image
// 										src="/images/moring_desert.jpg"
// 										alt="Contact Us"
// 										fill
// 										className="object-cover"
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</motion.div>
// 			</div>
// 			{/* <Footer /> */}
// 		</>
// 	);
// }

// // Server-side data fetching for SEO optimization
// export async function getStaticProps() {
// 	try {
// 		// API URLs
// 		const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// 		if (!NEXT_PUBLIC_BASE_URL) {
// 			throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");
// 		}

// 		// Fetch all data
// 		const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/public/all`);
// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch /api/public/all: ${response.status}`);
// 		}
// 		const data = await response.json();

// 		// Fetch featured items
// 		const featuredResponse = await fetch(
// 			`${NEXT_PUBLIC_BASE_URL}/api/public/featured-items`,
// 		);
// 		if (!featuredResponse.ok) {
// 			throw new Error(
// 				`Failed to fetch /api/public/featured-items: ${featuredResponse.status}`,
// 			);
// 		}
// 		const featuredData = await featuredResponse.json();

// 		return {
// 			props: {
// 				featuredItems: featuredData?.data || [],
// 				banners: data?.banners || [],
// 				categories: data?.categories || [],
// 				activities: data?.activities || [],
// 				testimonials: data?.testimonials || [],
// 				faqs: data?.faqs || [],
// 				blogPosts: data?.blogPosts || [],
// 				memories: data?.gallery || [],
// 				popularActivities: data?.popularActivities || [],
// 			},
// 			revalidate: 3600, // Re-fetch data every hour
// 		};
// 	} catch (error) {
// 		console.error("Error in getStaticProps:", error.message);

// 		return {
// 			props: {
// 				featuredItems: [],
// 				banners: [],
// 				categories: [],
// 				activities: [],
// 				testimonials: [],
// 				faqs: [],
// 				blogPosts: [],
// 				memories: [],
// 				popularActivities: [],
// 				error: error.message, // This can help for debugging in development
// 			},
// 			revalidate: 3600,
// 		};
// 	}
// }



import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FAQsPage({ faqs }) {
	const [openFAQ, setOpenFAQ] = useState(null);

	const toggleFAQ = (index) => {
		setOpenFAQ(openFAQ === index ? null : index);
	};

	return (
		<>
			<div className="bg-white">
				{/* Hero Section */}
				<div className="relative h-[300px] md:h-[400px] lg:h-[550px] w-full overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-[#6D4C41]/80 to-[#D7CCC8]/60 z-10" />
					<Image
						src="/images/perfume-banner.jpg" // Replace with your own perfume banner image
						alt="Perfume Banner"
						fill
						className="object-cover"
						priority
					/>
					<motion.div
						className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-center">
							Frequently Asked Questions
						</h1>
						<p className="text-xl md:text-2xl max-w-2xl text-center">
							Everything you need to know about our perfumes and fragrance care
						</p>
					</motion.div>
				</div>

				{/* Main Content - FAQs */}
				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
						{/* Left Image Section */}
						<motion.div
							className="w-full lg:w-2/5"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<div className="lg:sticky lg:top-24">
								<div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
									<Image
										src="/images/perfume-bottle.jpg" // Replace with perfume-themed image
										alt="Luxury Perfume"
										fill
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#6D4C41]/80 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
										<h2 className="text-xl md:text-2xl font-bold mb-2">
											Discover Your Signature Scent
										</h2>
										<p className="mb-4">
											Explore our collection of luxury fragrances for every
											mood and moment
										</p>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Right FAQs Section */}
						<div className="w-full lg:w-3/5">
							<h2 className="text-3xl md:text-4xl font-bold mb-8 lg:mb-10">
								Perfume FAQs
							</h2>

							<div className="space-y-4">
								<Accordion type="single" collapsible className="w-full">
									{faqs.map((faq, index) => (
										<AccordionItem
											key={faq._id || index}
											value={`item-${index}`}
											className="border border-gray-200 rounded-lg shadow-sm mb-4"
										>
											<AccordionTrigger className="px-5 py-4 hover:bg-gray-50 transition-colors text-left">
												<span className="font-medium text-lg">
													{faq.question}
												</span>
											</AccordionTrigger>
											<AccordionContent className="px-5 py-4">
												<p className="text-gray-600">{faq.answer}</p>
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</div>
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<motion.div
					className="container mx-auto px-4 py-12 md:py-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="max-w-4xl mx-auto bg-gradient-to-r from-[#EFEBE9] to-[#D7CCC8] p-6 md:p-12 rounded-2xl shadow-xl">
						<div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
							<div className="md:w-1/2">
								<h3 className="text-2xl md:text-3xl font-bold text-[#4E342E] mb-4">
									Still have questions?
								</h3>
								<p className="text-[#5D4037] mb-6">
									Reach out to our perfume experts for personalized
									recommendations and support.
								</p>
								<Link href="/contact-us">
									<Button className="bg-[#6D4C41] hover:bg-[#8D6E63] text-white px-6 py-2 h-auto text-lg">
										Contact Us
									</Button>
								</Link>
							</div>
							<div className="w-full md:w-1/2">
								<div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden">
									<Image
										src="/images/perfume-contact.jpg" // Replace with another perfume image
										alt="Contact Support"
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
}



export async function getStaticProps() {
	try {
		const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
		if (!NEXT_PUBLIC_BASE_URL) {
			throw new Error("NEXT_PUBLIC_BASE_URL is not defined.");
		}

		// Fetch only active FAQs
		const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/faq?isActive=true`);
		if (!response.ok) {
			throw new Error(`Failed to fetch /faq: ${response.status}`);
		}

		const data = await response.json();

		return {
			props: {
				faqs: data?.faqs || [],
			},
			revalidate: 3600,
		};
	} catch (error) {
		console.error("Error fetching FAQs for public page:", error.message);
		return {
			props: {
				faqs: [],
			},
			revalidate: 3600,
		};
	}
}
