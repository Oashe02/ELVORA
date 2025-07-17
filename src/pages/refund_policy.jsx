"use client";
import { Package, RefreshCw, Shield, Mail, Phone, MapPin } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "Refund Policy | Nuaim's Perfume | Returns & Refunds";
const description =
  "Review Nuaim's Perfume refund and return policy. Learn about our 30-day return policy, eligibility requirements, and refund process for your perfume purchases.";
const canonicalUrl = "https://thenuaimsperfume.com/refund-policy";
const keywords =
  "refund policy, return policy, perfume returns, money back guarantee, nuaims perfume refund";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Nuaim's Perfume",
  images: [
    {
      url: "https://thenuaimsperfume.com/_next/image?url=%2Fassets%2Frefund.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Nuaim's Perfume Refund Policy",
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
  { position: 2, name: "Refund Policy", item: canonicalUrl },
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

export default function RefundPolicyPage({ announcements, products, categories }) {
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
                Refund Policy
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
                At The Nuaim's Perfume, your satisfaction is important to us. If for any reason you are not completely satisfied with your purchase, you may return eligible items within 30 days of the invoice date.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: June 12, 2025
              </p>
            </div>

            {/* Policy Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Package className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">30-Day Returns</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Return eligible items within 30 days of purchase for a full refund (excluding shipping fees).
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <RefreshCw className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Original Condition</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Items must be unopened, unused, and in their original packaging to qualify for return.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Quality Inspection</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All returns are inspected before refunds are processed to ensure they meet our return criteria.
                </p>
              </div>
            </div>

            {/* Refund Policy Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Eligibility for Returns</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Items must be unopened, unused, and in their original, sealed packaging.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Returns must be made within 30 days of the invoice date.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      A full refund will be issued, excluding shipping and gift-wrapping fees.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      If your original order included a free gift, it must also be returned in its original, unused condition to receive a full refund.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Return Process</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">How to Initiate a Return</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                        <p className="text-gray-600 text-base leading-relaxed">
                          Contact us before sending your package by emailing <a href="mailto:contact@thenuaimsperfume.com" className="text-blue-600 hover:underline">contact@thenuaimsperfume.com</a> or calling <a href="tel:+971523122627" className="text-blue-600 hover:underline">+971 52 312 2627</a>
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                        <p className="text-gray-600 text-base leading-relaxed">
                          Follow the return instructions provided by our customer service team.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">What to Include in Your Return Package</h3>
                    <div className="text-gray-600 text-base leading-relaxed pl-4">
                      • Full Name<br />
                      • Street Address<br />
                      • City, State, Zip Code, Country<br />
                      • Phone Number<br />
                      • Email Address<br />
                      • Original Order Confirmation Number or Invoice Number<br />
                      • Reason for Return
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Important Return Conditions</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Shipping charges are non-refundable for returns, unclaimed, undeliverable, or refused packages, unless the return is due to a shipping error on our part.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Customers are responsible for the cost of return shipping.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      We are not responsible for lost, stolen, or incorrectly addressed return packages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Refund Processing</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      All returns will be subject to inspection by our quality control team.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Refunds will be processed to your original payment method within 10 business days of receiving your return.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      If your return does not meet our return criteria, it may be rejected or disposed of at your request.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us About Returns</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                  For any questions or further assistance regarding returns and refunds, please reach out to us:
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
                      <p className="text-gray-600">516, zubaidi building, hor al anz east, Al qiyada Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href="mailto:contact@thenuaimsperfume.com"
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    Contact Returns Team
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
    console.error("Error in getStaticProps (RefundPolicyPage):", {
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