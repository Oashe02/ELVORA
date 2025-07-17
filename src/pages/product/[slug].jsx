"use client";

import { REVALIDATE_TIME } from "@/utils/constant";
import {
	NextSeo,
	ProductJsonLd,
	FAQPageJsonLd,
	BreadcrumbJsonLd,
	WebPageJsonLd,
	LocalBusinessJsonLd,
} from "next-seo";
import ProductDetail from "@/components/home/Product/Details";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

export async function getStaticPaths() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/public/products`,
		);
		const data = await res.json();

		if (!data?.success) {
			return { paths: [], fallback: "blocking" };
		}

		const paths = data.products
			.filter((d) => typeof d.slug === "string" && d.slug.trim() !== "")
			.map((d) => ({
				params: { slug: encodeURIComponent(d.slug) },
			}));

		return {
			paths,
			fallback: "blocking",
		};
	} catch (error) {
		console.error("Error fetching paths:", error);
		return { paths: [], fallback: "blocking" };
	}
}

export async function getStaticProps({ params }) {
	try {
	  const slug = decodeURIComponent(params.slug);
  
	  const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/public/product/${slug}`
	  );
	  const data = await res.json();
  
	  if (!res.ok || !data?.product) {
		return { notFound: true };
	  }
  
	  const [
		announcementsRes,
		reviewRes,
		categoriesRes,
		bannersRes,
		addonsRes,
		addonsProductsRes,
		faqsRes, 
		testimonialRes,
		feedRes
	  ] = await Promise.all([
		axiosInstance.get("/announcements"),
		axiosInstance.get(`/review/product/${data.product._id}`),
		axiosInstance.get("/categories?status=active"),
		axiosInstance.get("/banners?status=active"),
		axiosInstance.get("/addons?status=active"),
		axiosInstance.get("/addons-product?status=active"),
		axiosInstance.get("/faq?isActive=true"), 
		axiosInstance.get("/review/public?page=1&limit=20&status=approved"),
		axiosInstance.get("/feed/public?page=1&limit=10&status=active"),
	  ]);
  
	  return {
		props: {
		  data: data.product,
		  announcements: announcementsRes.data?.announcements || [],
		  reviews: reviewRes.data?.reviews || [],
		  categories: categoriesRes.data?.categories || [],
		  banners: bannersRes.data?.banners || [],
		  addons: addonsRes.data?.addons || [],
		  addonsProducts: addonsProductsRes.data?.products ?? [],
		  faqs: faqsRes.data || [],
		  testimonial: testimonialRes.data.reviews || [],
		  feed: feedRes.data.posts || [],
		},
		revalidate: REVALIDATE_TIME,
	  };
	} catch (error) {
	  console.error("Error fetching product detail page:", error);
	  return { notFound: true };
	}
  }
  

export default function ProductDetailPage({
	data: product,
	announcements,
	reviews,
	banners,
	categories,
	addonsProducts,
	addons,
	faqs,
	feed,
	testimonial


}) {
	// console.log("Product Data:", addonsProducts, addons);

	// const metaDescription = `${product?.name} in ${product?.city}, ${product?.country}. Book now for an unforgettable experience starting at AED ${Math.min(...(product?.accommodations?.map((a) => a.price) || [0]))}. ${product?.shortDescription || ""}`;
	const metaDescription = `${product?.name} `;
	const keywords = [
		product?.name?.toLowerCase(),
		`holiday in ${product?.city}`,
		`things to do in ${product?.city}`,
		`travel to ${product?.country}`,
		...(product?.keywords?.map((k) => k.toLowerCase()) || []),
		"holiday packages",
		"vacation deals",
		"travel experiences",
	]
		.filter(Boolean)
		.join(", ");
	const currentUrl = `https://dunestodowntown.com/holidays/${product?.slug}`;

	const productSchema = {
		"@context": "https://schema.org",
		"@type": "Product",
		"@id": `https://dunestodowntown.com/holidays/${product?.slug}`,
		name: product?.name,
		sku: product?._id,
		category: "Holiday Packages",
		description: product?.shortDescription || product?.name,
		brand: {
			"@type": "Brand",
			name: "Royal Smart Lifestyle",
		},
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "AED",
			lowPrice: Math.min(
				...(product?.accommodations?.map((a) => a.price) || [0]),
			).toString(),
			highPrice: Math.max(
				...(product?.accommodations?.map((a) => a.price) || [0]),
			).toString(),
			offerCount: product?.accommodations?.length || 1,
			availability: "https://schema.org/InStock",
			url: `https://dunestodowntown.com/holidays/${product?.slug}`,
		},
		image: [product?.mainBanner, ...(product?.images || [])]
			.slice(0, 4)
			.filter(Boolean),
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: product?.rating?.value || "4.5",
			reviewCount: product?.rating?.count || "10",
		},
		review:
			product?.reviews?.slice(0, 2).map((review) => ({
				"@type": "Review",
				author: { "@type": "Person", name: review.author || "Anonymous" },
				datePublished: review.date || new Date().toISOString(),
				reviewBody: review.comment,
				reviewRating: { "@type": "Rating", ratingValue: review.rating || "4" },
			})) || [],
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: `What is included in the ${product?.name} package?`,
				acceptedAnswer: {
					"@type": "Answer",
					text:
						product?.inclusions?.join(", ") ||
						"The package includes accommodations, select activities, and transportation as specified in the package details.",
				},
			},
			{
				"@type": "Question",
				name: "Can I customize this holiday package?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes, you can customize your package by selecting different accommodations or adding extra activities during booking. Contact our support for tailored options.",
				},
			},
			{
				"@type": "Question",
				name: "What is the cancellation policy for this package?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Cancellations can be made up to 7 days before departure for a full refund, subject to terms. Check the booking details or contact support.",
				},
			},
			{
				"@type": "Question",
				name: `What activities are available in ${product?.city}?`,
				acceptedAnswer: {
					"@type": "Answer",
					text:
						product?.activities?.join(", ") ||
						`Explore a variety of activities in ${product?.city}, including sightseeing, adventure tours, and cultural experiences.`,
				},
			},
		],
	};

	const localBusinessSchema = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Royal Smart Lifestyle Meeting Point",
		address: {
			"@type": "PostalAddress",
			streetAddress: product?.location?.address || "Unknown",
			addressLocality: product?.city || "Unknown",
			addressCountry: product?.country || "Unknown",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: product?.location?.coordinates[1] || 0,
			longitude: product?.location?.coordinates[0] || 0,
		},
		description: `Meeting point for ${product?.name} holiday package in ${product?.city}, ${product?.country}.`,
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://dunestodowntown.com/",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Holidays",
				item: "https://dunestodowntown.com/holidays",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: product?.name,
				item: currentUrl,
			},
		],
	};

	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: `${product?.name} | Royal Smart Lifestyle`,
		description: metaDescription,
		url: currentUrl,
		datePublished: product?.createdAt || "2025-01-01T00:00:00Z",
		dateModified: product?.updatedAt || new Date().toISOString(),
		primaryImageOfPage: product?.mainBanner || "/placeholder.svg",
		publisher: {
			"@type": "Organization",
			name: "Royal Smart Lifestyle",
			logo: {
				"@type": "ImageObject",
				url: "https://dunestodowntown.com/logo.png",
			},
		},
	};

	return (
		<div className="holiday-details-page">
			<NextSeo
				title={`${product?.name} | Royal Smart Lifestyle`}
				description={metaDescription}
				canonical={currentUrl}
				openGraph={{
					url: currentUrl,
					title: `${product?.name} | Royal Smart Lifestyle`,
					description: metaDescription,
					images: [
						{
							url: product?.mainBanner || "/placeholder.svg",
							width: 1200,
							height: 630,
							alt: `${product?.name} in ${product?.city}`,
							type: "image/jpeg",
						},
						...(product?.images?.slice(0, 2).map((img) => ({
							url: img,
							width: 800,
							height: 600,
							alt: `${product?.name} Image`,
						})) || []),
					],
					siteName: "Royal Smart Lifestyle",
					type: "website",
					locale: "en_AE",
				}}
				twitter={{
					handle: "@RoyalSmartLife",
					site: "@RoyalSmartLife",
					cardType: "summary_large_image",
				}}
				additionalMetaTags={[
					{ name: "keywords", content: keywords },
					{ name: "robots", content: "index, follow" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
				]}
			/>
			<ProductJsonLd {...productSchema} />
			<FAQPageJsonLd {...faqSchema} />
			<BreadcrumbJsonLd {...breadcrumbSchema} />
			<WebPageJsonLd {...webPageSchema} />
			<LocalBusinessJsonLd {...localBusinessSchema} />
			<Layout announcements={announcements} categories={categories} banners={banners}>
				<main className="pt-16 bg-white pb-16">
				<ProductDetail
  productData={product}
  reviews={reviews}
  addons={addons}
  addonsProducts={addonsProducts}
  faqs={faqs}
  feed={feed}
  testimonial={testimonial}

/>				</main>
			</Layout>
		</div>
	);
}
