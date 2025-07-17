"use client";
import { AlertCircle, ShoppingBag, RefreshCw, Phone, Mail, Clock, ArrowRight, Home } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/layouts/Layout";


const title = "Order Failed | Volvo Parts Hub | Genuine Volvo Parts & Accessories";
const description =
  "We're sorry, there was an issue processing your order at Volvo Parts Hub. Please try again or contact our support team for assistance.";
const canonicalUrl = "https://volvopartshub.com/fail";
const keywords =
  "volvo parts, genuine volvo parts, volvo accessories, order failed, volvo parts hub";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Volvo Parts Hub",
  images: [
    {
      url: "https://volvopartshub.com/_next/image?url=%2Fassets%2Ffail.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Order Failed - Volvo Parts Hub",
    },
  ],
};

const twitter = {
  cardType: "summary_large_image",
  site: "@volvopartshub",
  handle: "@volvopartshub",
  title,
  description,
  image: openGraph.images[0].url,
};

const breadcrumbs = [
  { position: 1, name: "Home", item: "https://volvopartshub.com/" },
  { position: 2, name: "Order Failed", item: canonicalUrl },
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
      name: title,
      isPartOf: { "@id": "https://volvopartshub.com/#website" },
      about: { "@id": "https://volvopartshub.com/#organization" },
      primaryImageOfPage: {
        "@id": openGraph.images[0].url,
      },
      image: {
        "@id": openGraph.images[0].url,
      },
      thumbnailUrl: openGraph.images[0].url,
      datePublished: "2023-01-01T00:00:00+00:00",
      dateModified: "2025-06-02T00:00:00+00:00",
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
      "@id": "https://volvopartshub.com/#organization",
      name: "Volvo Parts Hub",
      url: "https://volvopartshub.com/",
      sameAs: [
        "https://www.facebook.com/volvopartshub",
        "https://twitter.com/volvopartshub",
        "https://www.instagram.com/volvopartshub",
      ],
      telephone: "+1-800-555-1234",
      email: "support@volvopartshub.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Auto Lane",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33101",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.76168,
        longitude: -80.19179,
      },
    },
  ],
};

export default function FailPage({ announcements }) {
  return (
        <Layout announcements={announcements}>

    <SeoWrapper
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
      keywords={keywords}
      openGraph={openGraph}
      twitter={twitter}
      breadcrumbs={breadcrumbs}
      jsonLdSchema={jsonLdSchema}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Main Error Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
                <div className="relative bg-white rounded-full p-6 shadow-lg">
                  <AlertCircle className="h-20 w-20 text-red-500" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              We encountered an issue while processing your order. Don't worry - this happens sometimes, and we're here to help you get back on track.
            </p>
            
            {/* Status indicator */}
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-sm font-medium">
              <AlertCircle className="h-4 w-4 mr-2" />
              Order Processing Failed
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Try these options to resolve the issue and complete your order.
              </p>
              
              <div className="space-y-4">
                <a
                  href="/checkout"
                  className="group flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 mr-3" />
                    Retry Your Order
                  </div>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="/"
                  className="group flex items-center justify-between w-full bg-gray-100 text-gray-800 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                >
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-3" />
                    Back to Home
                  </div>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="/products"
                  className="group flex items-center justify-between w-full bg-green-50 text-green-800 px-6 py-4 rounded-xl font-semibold hover:bg-green-100 transition-all duration-200 border border-green-200"
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    Browse Products
                  </div>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our support team is standing by to help you complete your order and answer any questions you might have.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-2 mr-4 flex-shrink-0 mt-1">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <a href="tel:+18005551234" className="text-blue-600 hover:text-blue-700 font-medium">
                      +1-800-555-1234
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri 8AM-8PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-lg p-2 mr-4 flex-shrink-0 mt-1">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                    <a href="mailto:support@volvopartshub.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      support@volvopartshub.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Response within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-lg p-2 mr-4 flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available on our website</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Issues & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Issues</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Check your payment method, ensure sufficient funds, or try a different card. Contact your bank if the issue persists.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Network Timeout</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Slow internet connection may have caused the failure. Please check your connection and try again.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Item Availability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Some items in your cart may no longer be available. Review your cart and update quantities if needed.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Address Verification</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ensure your billing and shipping addresses are correct and properly formatted for delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Trust & Security */}
          <div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Security is Our Priority</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rest assured that no charges were processed for this failed order. Your payment information remains secure, 
              and you can safely retry your purchase when you're ready.
            </p>
          </div>
          
        </div>
      </div>
    </SeoWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const announcementsRes = await axiosInstance.get("/announcements");
    return {
      props: {
        announcements: announcementsRes.data.announcements || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching announcements:", error.message);
    return {
      props: {
        announcements: [],
      },
    };
  }
}