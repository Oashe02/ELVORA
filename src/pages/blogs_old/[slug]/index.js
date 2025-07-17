import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils"; // Assuming you have a utils file with formatDate function
import { REVALIDATE_TIME, SITE_NAME, WEBSITE_URL } from "@/utils/constant";
import SeoWrapper from "@/components/blocks/SeoWrapper";

// Generate static paths for all blog posts
export async function getStaticPaths() {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const res = await fetch(`${apiUrl}/api/public/blog`);
		const data = await res.json();

		// Create paths for each blog post using their IDs
		const paths = data.data.map((post) => ({
			params: { slug: post.slug },
		}));

		return {
			paths,
			fallback: "blocking", // Show a loading state while new pages are being generated
		};
	} catch (error) {
		console.error("Error generating static paths:", error);
		return {
			paths: [],
			fallback: "blocking",
		};
	}
}

// Fetch data for a specific blog post
export async function getStaticProps({ params }) {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

		// Fetch the current blog post
		const postRes = await fetch(`${apiUrl}/api/public/blog/${params.slug}`);
		const postData = await postRes.json();
		if (!postData) {
			return {
				notFound: true, // Return 404 page if blog post not found
			};
		}

		// Fetch related posts (all posts except current one)
		const allPostsRes = await fetch(`${apiUrl}/api/public/blog`);
		const allPostsData = await allPostsRes.json();

		// // Filter out the current post and get 3 related posts
		const relatedPosts = allPostsData.data
			.filter((post) => post.slug !== params.slug)
			.slice(0, 3);

		return {
			props: {
				post: postData,
				relatedPosts,
			},
			revalidate: REVALIDATE_TIME, // Revalidate every hour
		};
	} catch (error) {
		console.error("Error fetching blog post:", error);
		return {
			notFound: true,
		};
	}
}

export default function BlogDetail({ post, relatedPosts }) {
	// Format the published date
	const publishedDate = post.publishedAt
		? formatDate(new Date(post.publishedAt))
		: "Publication date not available";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${WEBSITE_URL}/blog/${post.slug}/#blogpost`,
		headline: post.title || "Dubai Travel Guide",
		description:
			post.excerpt?.slice(0, 160) ||
			`Explore travel tips and insights about Dubai adventures with ${SITE_NAME}.`,
		datePublished: post.publishedAt || "2023-01-01T00:00:00+00:00",
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
		image: post.featuredImage || `${WEBSITE_URL}/assets/blog-default.jpg`,
		url: `${WEBSITE_URL}/blog/${post.slug}`,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${WEBSITE_URL}/blog/${post.slug}`,
		},
		keywords:
			post.tags?.join(", ") ||
			"dubai travel, desert safari, quad biking, city sightseeing",
		articleSection: post.categories?.join(", ") || "Travel",
		relatedLink: relatedPosts.map((relatedPost) => ({
			"@type": "BlogPosting",
			headline: relatedPost.title,
			url: `${WEBSITE_URL}/blog/${relatedPost.slug}`,
			image:
				relatedPost.featuredImage || `${WEBSITE_URL}/assets/blog-default.jpg`,
		})),
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
				{
					"@type": "ListItem",
					position: 3,
					name: post.title,
					item: `${WEBSITE_URL}/blog/${post.slug}`,
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
				name: "What can I learn from the Dunes to Downtown blog posts?",
				acceptedAnswer: {
					"@type": "Answer",
					text: `The ${SITE_NAME} blog offers insights on Dubai travel, including tips for desert safaris, quad biking, dune buggy tours, city sightseeing, and cultural experiences like Global Village and Dubai Frame visits.`,
				},
			},
			{
				"@type": "Question",
				name: "Are the blog posts useful for planning a Dubai desert safari?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes, our blog posts provide detailed guides on planning Dubai desert safaris, covering what to expect, what to wear, and how to choose between evening or sunrise experiences.",
				},
			},
			{
				"@type": "Question",
				name: "Do the blog posts offer advice for first-time visitors to Dubai?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Absolutely, the blog includes tips for first-time visitors, highlighting must-see attractions like Global Village, Dubai Frame, and practical advice for activities like quad biking and city tours.",
				},
			},
			{
				"@type": "Question",
				name: "How can I stay updated with new blog posts from Dunes to Downtown?",
				acceptedAnswer: {
					"@type": "Answer",
					text: `Subscribe to the ${SITE_NAME} newsletter or follow us on social media (@dunestodowntown) to get updates on new blog posts about Dubai travel and adventures.`,
				},
			},
		],
	};

	return (
		<div className="min-h-screen flex flex-col">
			<SeoWrapper
				title={`${post.title} | ${SITE_NAME} Blog`}
				description={
					post.excerpt?.slice(0, 160) ||
					`Discover travel tips and insights about Dubai adventures with ${SITE_NAME}. Learn about desert safaris, quad biking, and more.`
				}
				canonicalUrl={`${WEBSITE_URL}/blog/${post.slug}`}
				keywords={`${SITE_NAME}, ${post.tags?.join(", ") || "dubai travel, desert safari, quad biking, city sightseeing"}, dubai travel blog, dubai adventure guide, travel tips dubai`}
				articleJsonLd={[jsonLd, faqSchema]}
				openGraph={{
					type: "article",
					locale: "en_AE",
					url: `${WEBSITE_URL}/blog/${post.slug}`,
					title: `${post.title} | ${SITE_NAME} Blog`,
					description:
						post.excerpt?.slice(0, 160) ||
						`Explore travel tips and insights about Dubai with ${SITE_NAME}.`,
					site_name: SITE_NAME,
					images: [
						{
							url:
								post.featuredImage || `${WEBSITE_URL}/assets/blog-default.jpg`,
							width: 1200,
							height: 630,
							alt: post.title,
						},
						{
							url: `${WEBSITE_URL}/assets/desert-safari.jpeg`,
							width: 1200,
							height: 630,
							alt: "Dubai Desert Safari - Dunes to Downtown",
						},
					],
					article: {
						published_time: post.publishedAt || "2023-01-01T00:00:00+00:00",
						modified_time: post.updatedAt || "2025-04-25T00:00:00+00:00",
						section: post.categories?.[0] || "Travel",
						tag: post.tags || ["dubai travel", "adventure"],
					},
				}}
				twitter={{
					cardType: "summary_large_image",
					site: "@dunestodowntown",
					handle: "@dunestodowntown",
					title: `${post.title} | ${SITE_NAME} Blog`,
					description:
						post.excerpt?.slice(0, 140) ||
						`Discover Dubai travel tips with ${SITE_NAME}. #DubaiTravel`,
					image: post.featuredImage || `${WEBSITE_URL}/assets/blog-default.jpg`,
				}}
			>
				{/* <Navbar /> */}
				<main className="flex-grow mt-[6rem] md:mt-[10rem]">
					{/* Breadcrumb */}
					<div className="border-b border-gray-200">
						<div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
							<div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
								<Link href="/" className="hover:text-amber-500">
									Home
								</Link>
								<ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
								<Link href="/blogs" className="hover:text-amber-500">
									See the Latest Our Blog!
								</Link>
								<ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
								<span className="truncate">{post.title}</span>
							</div>
						</div>
					</div>

					<div className="relative">
						<div className="bg-gray-100 absolute top-0 left-0 w-full h-[75%] z-0"></div>

						<div className="relative z-10 max-w-[90rem] mx-auto px-4">
							<div className="text-center py-16 md:py-24">
								<h1 className="text-3xl md:text-5xl font-bold mb-4">
									{post.title}
								</h1>
							</div>

							<div className="relative w-full mb-12">
								<div className="relative h-[400px] sm:h-[500px] md:h-[700px] w-full overflow-hidden rounded-lg shadow-xl">
									<Image
										src={post.featuredImage || "/blogs/blog1.png"}
										alt={post.title}
										fill
										className="object-cover"
										priority
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
						<div className="prose max-w-none">
							<p className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg">
								{post.excerpt}
							</p>

							<article
								className="prose prose-lg max-w-none text-gray-800"
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>

							{(post.categories?.length > 0 || post.tags?.length > 0) && (
								<div className="mt-8 pt-6 border-t border-gray-200">
									{post.categories?.length > 0 && (
										<div className="mb-4">
											<h4 className="text-sm font-semibold text-gray-500 mb-2">
												Categories:
											</h4>
											<div className="flex flex-wrap gap-2">
												{post.categories.map((category, index) => (
													<span
														key={index}
														className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
													>
														{category}
													</span>
												))}
											</div>
										</div>
									)}

									{post.tags?.length > 0 && (
										<div className="mb-8">
											<h4 className="text-sm font-semibold text-gray-500 mb-3">
												Tags:
											</h4>
											<div className="flex flex-wrap gap-2">
												{post.tags.map((tag, index) => (
													<span
														key={index}
														className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition duration-200 cursor-pointer"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					{relatedPosts.length > 0 && (
						<div className="bg-white py-12 md:py-16">
							<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
								{/* Previous link */}
								<div className="mb-10 border-t border-b border-gray-200 py-4">
									<Link
										href="/blogs"
										className="inline-flex items-center text-gray-800 hover:text-amber-500"
									>
										<span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white mr-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M19 12H5M12 19l-7-7 7-7" />
											</svg>
										</span>
										Previous
									</Link>
								</div>
								<div className="text-center mb-10">
									<p className="text-amber-500 font-semibold mb-1">
										Travel Blog
									</p>
									<h2 className="text-3xl font-bold">Latest Articles</h2>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
									{relatedPosts.map((relatedPost) => (
										<div key={relatedPost._id} className="overflow-hidden">
											<Link
												href={`/blogs/${relatedPost.slug}`}
												className="block relative"
											>
												<div className="relative h-48 sm:h-56 md:h-64 w-full mb-4">
													<Image
														src={
															relatedPost.featuredImage || "/blogs/blog1.png"
														}
														alt={relatedPost.title}
														fill
														className="object-cover rounded-lg"
													/>
													<div className="absolute bottom-0 left-0 m-3">
														<div className="inline-block bg-gray-800 text-white text-xs px-3 py-1 rounded">
															{relatedPost.publishedAt
																? formatDate(new Date(relatedPost.publishedAt))
																: "April 7, 2023"}
														</div>
													</div>
												</div>
											</Link>
											<div>
												<h3 className="text-lg font-bold mb-2">
													{relatedPost.title}
												</h3>
												<p className="text-gray-600 text-sm mb-3 line-clamp-2">
													{relatedPost.excerpt}
												</p>
												<Link
													href={`/blogs/${relatedPost.slug}`}
													className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-amber-500"
												>
													Read More
													<svg
														width="24"
														height="12"
														viewBox="0 0 24 12"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="ml-1"
													>
														<path
															d="M23.5303 6.53033C23.8232 6.23744 23.8232 5.76256 23.5303 5.46967L18.7574 0.696699C18.4645 0.403806 17.9896 0.403806 17.6967 0.696699C17.4038 0.989593 17.4038 1.46447 17.6967 1.75736L21.9393 6L17.6967 10.2426C17.4038 10.5355 17.4038 11.0104 17.6967 11.3033C17.9896 11.5962 18.4645 11.5962 18.7574 11.3033L23.5303 6.53033ZM0 6.75H23V5.25H0V6.75Z"
															fill="currentColor"
														/>
													</svg>
												</Link>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</main>

				{/* <Footer /> */}
			</SeoWrapper>
		</div>
	);
}
