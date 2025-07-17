import Link from "next/link";
import { ChevronRight } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { SITE_NAME, WEBSITE_URL } from "../../utils/constant";
import SeoWrapper from "@/components/blocks/SeoWrapper";

// Fetch blog posts at build time
export async function getStaticProps() {
	try {
		// Use absolute URL with environment variable
		const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const res = await fetch(`${apiUrl}/api/public/blog`);
		const data = await res.json();

		return {
			props: {
				blogPosts: data.data || [],
			},
			// Revalidate every hour
			revalidate: 3600,
		};
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		return {
			props: {
				blogPosts: [],
			},
			revalidate: 60, // Try again sooner if there was an error
		};
	}
}

export default function Blogs({ blogPosts }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${WEBSITE_URL}/blog/#webpage`,
		name: `Travel Blog | ${SITE_NAME}`,
		description: `Discover expert travel tips, adventure guides, and Dubai destination insights on the ${SITE_NAME} blog. Learn about desert safaris, quad biking, city sightseeing, and more.`,
		url: `${WEBSITE_URL}/blog/`,
		datePublished: "2023-01-01T00:00:00+00:00",
		dateModified: "2025-04-25T00:00:00+00:00",
		provider: {
			"@type": "Organization",
			"@id": `${WEBSITE_URL}/#organization`,
			name: SITE_NAME,
			url: WEBSITE_URL,
			telephone: "+971 55 534 6567",
			email: "booking@dunestodowntown.com",
			sameAs: [
				"https://www.facebook.com/dunestodowntown",
				"https://twitter.com/dunestodowntown",
				"https://www.instagram.com/dunestodowntown",
			],
		},
		mainEntity: {
			"@type": "Blog",
			name: `${SITE_NAME} Travel Blog`,
			description: `Get the latest travel advice, tips for Dubai desert safaris, quad biking adventures, and city sightseeing tours from the ${SITE_NAME} blog.`,
			blogPost: blogPosts.slice(0, 3).map((post) => ({
				"@type": "BlogPosting",
				"@id": `${WEBSITE_URL}/blog/${post.slug}/#blogpost`,
				headline: post.title || "Travel Guide",
				description:
					post.shortDescription?.slice(0, 160) ||
					"Discover travel tips and adventure guides for Dubai.",
				datePublished: post.createdAt || "2023-01-01T00:00:00+00:00",
				dateModified: post.updatedAt || "2025-04-25T00:00:00+00:00",
				author: {
					"@type": "Organization",
					name: SITE_NAME,
				},
				publisher: {
					"@type": "Organization",
					name: SITE_NAME,
					logo: {
						"@type": "ImageObject",
						url: `${WEBSITE_URL}/assets/logo.png`,
						width: 200,
						height: 60,
					},
				},
				image: post.mainBanner || `${WEBSITE_URL}/assets/blog-default.jpg`,
				url: `${WEBSITE_URL}/blog/${post.slug}`,
			})),
		},
		breadcrumb: {
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: WEBSITE_URL,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: `${WEBSITE_URL}/blog/`,
				},
			],
		},
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "What topics does the Dunes to Downtown blog cover?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "The Dunes to Downtown blog covers travel tips, adventure guides, and destination insights, including Dubai desert safaris, quad biking, dune buggy tours, city sightseeing, and cultural experiences like Global Village and Dubai Frame visits.",
				},
			},
			{
				"@type": "Question",
				name: "How often is the Dunes to Downtown blog updated?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "The blog is regularly updated with fresh content on travel trends, adventure activities, and Dubai travel guides to help you plan your perfect trip.",
				},
			},
			{
				"@type": "Question",
				name: "Can I find tips for planning a Dubai desert safari on the blog?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes, the blog offers detailed guides on planning Dubai desert safaris, including what to expect, what to wear, and how to choose the best evening or sunrise safari experience.",
				},
			},
			{
				"@type": "Question",
				name: "Does the blog provide advice for first-time visitors to Dubai?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Absolutely, the blog includes tips for first-time visitors, covering must-see attractions like Global Village, Dubai Frame, and practical advice for activities like quad biking and city sightseeing tours.",
				},
			},
		],
	};
	return (
		<div className="min-h-screen flex flex-col">
			<SeoWrapper
				title={`Dubai Travel Blog | ${SITE_NAME}`}
				description={`Discover expert travel tips, adventure guides, and Dubai destination insights on the ${SITE_NAME} blog. Learn about desert safaris, quad biking, city sightseeing, and more to plan your perfect trip.`}
				canonicalUrl={`${WEBSITE_URL}/blog`}
				keywords={`${SITE_NAME}, dubai travel blog, dubai travel guide, desert safari tips, quad biking dubai, dune buggy dubai, dubai city sightseeing, global village dubai, dubai frame tour, adventure travel dubai, travel tips dubai`}
				articleJsonLd={[jsonLd, faqSchema]}
				openGraph={{
					type: "website",
					locale: "en_AE",
					url: `${WEBSITE_URL}/blog`,
					title: `Dubai Travel Blog | ${SITE_NAME}`,
					description: `Explore expert travel advice and guides on the ${SITE_NAME} blog, covering Dubai desert safaris, quad biking, city tours, and more. Plan your adventure today!`,
					site_name: SITE_NAME,
					images: [
						{
							url: `${WEBSITE_URL}/assets/blog-cover-image.jpg`,
							width: 1200,
							height: 630,
							alt: "Dunes to Downtown Dubai Travel Blog",
						},
						{
							url: `${WEBSITE_URL}/assets/desert-safari.jpeg`,
							width: 1200,
							height: 630,
							alt: "Dubai Desert Safari Guide - Dunes to Downtown",
						},
					],
				}}
				twitter={{
					cardType: "summary_large_image",
					site: "@dunestodowntown",
					handle: "@dunestodowntown",
					title: `Dubai Travel Blog | ${SITE_NAME}`,
					description: `Read the latest travel tips and guides on the ${SITE_NAME} blog, from Dubai desert safaris to city tours. #DubaiTravel`,
					image: `${WEBSITE_URL}/assets/blog-cover-image.jpg`,
				}}
			>
				{/* <Navbar /> */}

				<main className="flex-grow mt-[6rem] md:mt-[10rem]">
					{/* Breadcrumb */}
					<div className="border-b border-gray-200">
						<div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
							<div className="flex items-center text-sm text-gray-500">
								<Link href="/" className="hover:text-amber-500">
									Home
								</Link>
								<ChevronRight className="h-4 w-4 mx-1" />
								<span>See the Latest Our Blog!</span>
							</div>
						</div>
					</div>

					{/* Blog Title Section */}
					<div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8">
						<h1 className="text-3xl md:text-4xl font-bold">
							See the Latest Our Blog!
						</h1>
					</div>

					{/* Blog Posts Grid */}
					<div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-16">
						{blogPosts && blogPosts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{/* {blogPosts.map((post) => (
									<BlogCard key={post._id} post={post} />
								))} */}
							</div>
						) : (
							<div className="text-center py-12">
								<h3 className="text-xl font-semibold mb-2">
									No blog posts found
								</h3>
							</div>
						)}
					</div>
				</main>

				{/* <Footer /> */}
			</SeoWrapper>
		</div>
	);
}
