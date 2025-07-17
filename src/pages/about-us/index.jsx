"use client";
import { Sprout, Palette, Users } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "About Us | The Nuaims Perfume | Authentic Branded Fragrances";
const description =
  "Discover the story of The Nuaims Perfume, Dubai's premier destination for authentic branded fragrances. Learn about our commitment to quality, craftsmanship, and creating signature scents.";
const canonicalUrl = "https://nuaimsperfume.com/about";
const keywords =
  "perfume, fragrances, authentic perfumes, Dubai perfumes, branded perfumes, The Nuaims Perfume, luxury scents, signature fragrances";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "The Nuaims Perfume",
  images: [
    {
      url: "https://d33609liqwio9r.cloudfront.net/2025-06-30T12:26:28.973Z-fremu_about%20(1).jpg",
      width: 1200,
      height: 630,
      alt: "About The Nuaims Perfume - Authentic Branded Fragrances",
    },
  ],
};

const twitter = {
  cardType: "summary_large_image",
  site: "@nuaimsperfume",
  handle: "@nuaimsperfume",
  title,
  description,
  image: openGraph.images[0].url,
};

const breadcrumbs = [
  { position: 1, name: "Home", item: "https://nuaimsperfume.com/" },
  { position: 2, name: "About Us", item: canonicalUrl },
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
      name: title,
      isPartOf: { "@id": "https://nuaimsperfume.com/#website" },
      about: { "@id": "https://nuaimsperfume.com/#organization" },
      primaryImageOfPage: {
        "@id": openGraph.images[0].url,
      },
      image: {
        "@id": openGraph.images[0].url,
      },
      thumbnailUrl: openGraph.images[0].url,
      datePublished: "2023-01-01T00:00:00+00:00",
      dateModified: "2025-07-01T00:00:00+00:00",
      description,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((breadcrumb) => ({
          "@type": "ListItem",
          position: breadcrumb.position,
          name: breadcrumb.name,
          item: breadcrumb.item,
        })),
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://nuaimsperfume.com/#organization",
      name: "The Nuaims Perfume",
      url: "https://nuaimsperfume.com/",
      sameAs: [
        "https://www.facebook.com/nuaimsperfume",
        "https://twitter.com/nuaimsperfume",
        "https://www.instagram.com/nuaimsperfume",
      ],
      telephone: "+971-4-555-5678",
      email: "support@nuaimsperfume.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dubai Mall, Fashion Avenue",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.2048,
        longitude: 55.2708,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971-4-555-5678",
        contactType: "customer service",
        email: "support@nuaimsperfume.com",
        availableLanguage: ["English", "Arabic"],
        areaServed: "UAE",
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are your perfumes authentic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, at The Nuaims Perfume, we sell only authentic branded products sourced directly from authorized distributors.",
      },
    },
    {
      "@type": "Question",
      name: "Where are you located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Nuaims Perfume is based in Dubai, UAE, embodying timeless elegance and modern sophistication.",
      },
    },
    {
      "@type": "Question",
      name: "What makes your fragrances special?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We craft signature scents that capture emotion and celebrate individuality, using premium ethically chosen ingredients with sustainable luxury packaging.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer personalized fragrance experiences?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every product is curated to connect emotionally and elevate everyday moments, whether it's a signature scent or a gift set.",
      },
    },
  ],
};

export default function AboutUsPage({ announcements, products, categories }) {
  console.log({ products, categories, announcements }, "from about us ");
  return (
    <Layout announcements={announcements} products={products} categories={categories}>
      <SeoWrapper
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        keywords={keywords}
        openGraph={openGraph}
        twitter={twitter}
        breadcrumbs={breadcrumbs}
        jsonLdSchema={jsonLdSchema}
        faq={faqSchema.mainEntity}
      >
        <div className="min-h-screen flex flex-col bg-white text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow mt-24">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold tracking-tight text-black mb-6">
                ABOUT US
              </h1>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
                At The Nuaims Perfume, we sell only authentic branded products for you. 
                You can purchase them at our shop.
              </p>
            </div>

            {/* Behind the Scene Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-8">
                BEHIND THE SCENE
              </h2>
            </div>

            {/* Section 1: Our Mission - Image Left, Content Right */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://d33609liqwio9r.cloudfront.net/2025-06-30T12:26:28.973Z-fremu_about%20(1).jpg" 
                  alt="The Nuaims Perfume Mission"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-black">OUR MISSION</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  At The Nuaims Perfume, our mission is to craft signature scents that capture 
                  emotion, celebrate individuality, and leave a lasting memory. We believe 
                  fragrance is deeply personal—an invisible expression of who you are. That's why 
                  every bottle is created with intention, elegance, and the art of fine perfumery.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  EXPLORE
                </button>
              </div>
            </div>

            {/* Section 2: Our Story - Content Left, Image Right */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
              <div className="space-y-6 lg:order-1">
                <h3 className="text-2xl font-bold text-black">OUR STORY</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  The Nuaims Perfume, based in Dubai, embodies timeless elegance and modern 
                  sophistication. Born from a passion for unique aromas, we craft bold yet 
                  graceful fragrances that resonate with authenticity. Every detail, from our 
                  exquisite ingredients to our sleek packaging, reflects our commitment to 
                  elevating the fragrance experience. It's not just a brand—it's a lifestyle 
                  for those who want to make an unforgettable impression.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  EXPLORE
                </button>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-xl lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="The Nuaims Perfume Story"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Section 3: Our Approach - Image Left, Content Right */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="The Nuaims Perfume Approach"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-black">OUR APPROACH</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We blend the tradition of master perfumery with a modern aesthetic, ensuring 
                  each fragrance is both timeless and trend-forward.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-black">Quality Ingredients:</h4>
                      <p className="text-gray-600">We source only premium, ethically chosen oils and essences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-black">Sustainable Luxury:</h4>
                      <p className="text-gray-600">Our packaging is sleek, recyclable, and designed with sustainability in mind.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-black">Personal Experience:</h4>
                      <p className="text-gray-600">Whether it's a signature scent or a gift set, every product is curated to connect emotionally and elevate everyday moments.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 font-medium italic">
                  We don't follow trends—we create moments that linger.
                </p>
                
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  EXPLORE
                </button>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold text-black mb-6">Experience The Nuaims Perfume</h2>
              <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover authentic branded fragrances that celebrate your individuality and create 
                lasting memories. Every bottle tells a story—what will yours be?
              </p>
              <a
                href="/"
                className="inline-block bg-black text-white px-10 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg"
              >
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
      </SeoWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [announcementsRes, productsRes, categoriesRes] = await Promise.all([
      axiosInstance.get("/announcements"),
      axiosInstance.get("/products?featured=true"),
      axiosInstance.get("/categories?status=active"),
    ]);

    // Log the raw responses for debugging
    console.log("Announcements Response:", announcementsRes.data);
    console.log("Products Response:", productsRes.data);
    console.log("Categories Response:", categoriesRes.data);

    return {
      props: {
        announcements: announcementsRes.data?.announcements || [],
        products: productsRes.data?.products || [],
        categories: categoriesRes.data?.categories || [],
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    // Log detailed error information
    console.error("Error in getStaticProps (AboutUsPage):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    return {
      props: {
        announcements: [],
        products: [],
        categories: [],
      },
      revalidate: 3600,
    };
  }
}