"use client";
import { Truck, Clock, Gift, Globe, Mail, Phone, MapPin, CreditCard, Calendar } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "Shipping Policy | Nuaim's Perfume | Delivery Information";
const description =
  "Review Nuaim's Perfume shipping policy including processing times, delivery estimates, shipping costs, and order tracking for purchases within the UAE.";
const canonicalUrl = "https://thenuaimsperfume.com/shipping-policy";
const keywords =
  "shipping policy, delivery information, perfume shipping, UAE delivery, nuaims perfume shipping";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Nuaim's Perfume",
  images: [
    {
      url: "https://thenuaimsperfume.com/_next/image?url=%2Fassets%2Fshipping.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Nuaim's Perfume Shipping Policy",
    },
  ],
};

const twitter = {
  cardType: "summary_large_image",
  site: "@nuaims_perfume",
  handle: "@nuaims_perfume",
  title,
  description,
  image: openGraph.images[0].url,
};

const breadcrumbs = [
  { position: 1, name: "Home", item: "https://thenuaimsperfume.com/" },
  { position: 2, name: "Shipping Policy", item: canonicalUrl },
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
      name: title,
      isPartOf: { "@id": "https://thenuaimsperfume.com/#website" },
      about: { "@id": "https://thenuaimsperfume.com/#organization" },
      primaryImageOfPage: {
        "@id": openGraph.images[0].url,
      },
      image: {
        "@id": openGraph.images[0].url,
      },
      thumbnailUrl: openGraph.images[0].url,
      datePublished: "2023-01-01T00:00:00+00:00",
      dateModified: "2025-06-12T00:00:00+00:00",
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
  ],
};

export default function ShippingPolicyPage({ announcements, products, categories }) {
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
      >
        <div className="min-h-screen flex flex-col bg-white text-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow mt-24">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold tracking-tight text-black">
                Shipping Policy
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
                At The Nuaim's Perfume, we aim to provide a seamless and transparent shopping experience with delivery across the United Arab Emirates.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: June 12, 2025
              </p>
            </div>

            {/* Policy Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Truck className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Fast Processing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  0-2 business days processing, 5-10 business days delivery within UAE.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Gift className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Free shipping on all orders AED 1,500 and above. AED 15 for orders below.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Order Cut-off</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Orders after 5 PM (GST) process next business day. No weekend/holiday processing.
                </p>
              </div>
            </div>

            {/* Shipping Policy Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Shipping Costs & Delivery</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Shipping Cost</h4>
                      <p className="text-gray-600">
                        <span className="font-medium">Free Shipping:</span> Orders AED 1,500.00 and above<br />
                        <span className="font-medium">Standard Shipping:</span> AED 15 for orders below AED 1,500
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Processing Time</h4>
                      <p className="text-gray-600">
                        0–2 business days (Monday-Friday)<br />
                        Orders after 5 PM (GST) process next business day
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Transit Time</h4>
                      <p className="text-gray-600">
                        5 to 10 business days (Monday-Friday) within UAE
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Holiday Schedule</h4>
                      <p className="text-gray-600">
                        No processing on UAE public holidays<br />
                        Orders resume processing next business day
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Order Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Order Tracking</h3>
                    <p className="text-gray-600">
                      We provide order tracking so you can follow your package in real-time. A shipping confirmation email with tracking details will be sent once your order is dispatched.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Shipping Confirmation</h3>
                    <p className="text-gray-600">
                      You will receive a shipping confirmation email with tracking information as soon as your order leaves our facility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Currency Support</h3>
                    <p className="text-gray-600">
                      All prices are displayed in AED (United Arab Emirates Dirham) for orders within the UAE to ensure a clear and convenient shopping experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">International Shipping</h2>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    Currently, we only ship to customers within the United Arab Emirates. We are working on expanding our shipping capabilities to include international customers in the future. Please check back for updates.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Shipping Issues</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Shipping Delays</h3>
                    <p className="text-gray-600">
                      While we strive to meet delivery estimates, unforeseen circumstances may lead to delays. If you experience any delivery issues, please contact our customer support team for prompt assistance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Lost or Damaged Items</h3>
                    <p className="text-gray-600">
                      In case your order is lost or arrives damaged, contact us immediately. We will coordinate with the shipping provider to ensure a resolution—either by reshipping the items or issuing a refund.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Returns & Exchanges</h2>
                <p className="text-gray-600">
                  If you are not satisfied with your purchase, we offer returns and exchanges. Please see our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund and Return Policy</a> for more information.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Policy Updates</h2>
                <p className="text-gray-600">
                  We may update our shipping policy periodically to comply with regulations or improve our service. The most recent version will always be available on this page.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">Shipping Questions?</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                  Contact our customer support team for any shipping-related inquiries:
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Email</h4>
                      <p className="text-gray-600">contact@thenuaimsperfume.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Phone</h4>
                      <p className="text-gray-600">+971 52 312 2627</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Address</h4>
                      <p className="text-gray-600">516, Zubaidi Building, Hor Al Anz East, Al Qiyada, Dubai, UAE</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href="mailto:contact@thenuaimsperfume.com"
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    Contact Shipping Team
                  </a>
                </div>
              </div>
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

    return {
      props: {
        announcements: announcementsRes.data?.announcements || [],
        products: productsRes.data?.products || [],
        categories: categoriesRes.data?.categories || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps (ShippingPolicyPage):", {
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