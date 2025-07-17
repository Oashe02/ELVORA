
"use client";
import { Shield, Package, Mail } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "Return Policy | Nuaim's Perfume | Returns & Refunds";
const description =
  "Learn about Nuaim's Perfume return policy. Understand the process for returning premium perfumes and fragrances, including eligibility, conditions, and refund procedures.";
const canonicalUrl = "https://thenuaimsperfume.com/return-policy";
const keywords =
  "return policy, nuaims perfume returns, refund policy, fragrance returns, perfume exchange";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Nuaim's Perfume",
  images: [
    {
      url: "https://thenuaimsperfume.com/_next/image?url=%2Fassets%2Freturns.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Nuaim's Perfume Return Policy",
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
  { position: 2, name: "Return Policy", item: canonicalUrl },
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

export default function ReturnPolicyPage({ announcements, products, categories }) {
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
                Return Policy
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
                At Nuaim's Perfume, we want you to be completely satisfied with your purchase. This Return Policy outlines the process for returning or exchanging our premium perfumes and fragrances.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: June 12, 2025
              </p>
            </div>

            {/* Return Highlights */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Hassle-Free Returns</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Return unopened products within 30 days for a refund or exchange, subject to our conditions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Package className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Damaged or Defective Items</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Contact us within 7 days for replacements or refunds on damaged or defective products.
                </p>
              </div>
            </div>

            {/* Return Policy Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Eligibility for Returns</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  To be eligible for a return or exchange, the following conditions must be met:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Timeframe:</strong> Returns must be initiated within 30 days of the delivery date.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Condition:</strong> Products must be unopened, unused, and in their original packaging with all seals intact.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Proof of Purchase:</strong> A valid order number or receipt is required to process returns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Non-Returnable Items</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Certain items are not eligible for return due to hygiene and safety concerns:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Opened or used perfumes and fragrances.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Gift cards or promotional items.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Products marked as non-returnable at the time of purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Return Process</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  To initiate a return, follow these steps:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Contact Us:</strong> Email us at contact@thenuaimsperfume.com or call +971564451624 with your order number and reason for return.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Receive Instructions:</strong> We will provide a return authorization and shipping instructions.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Ship the Product:</strong> Package the item securely and ship it to the provided address within 7 days of authorization.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Inspection:</strong> Once received, we will inspect the product and process your refund or exchange within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Refunds</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  If your return is approved, we will process a refund as follows:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Refund Method:</strong> Refunds will be issued to the original payment method or as store credit, at your preference.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Timing:</strong> Refunds typically appear in your account within 7-14 business days, depending on your payment provider.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Shipping Costs:</strong> Original shipping costs are non-refundable, and return shipping costs are the customer’s responsibility unless the return is due to our error.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Damaged or Defective Products</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  If you receive a damaged or defective product, please contact us within 7 days of delivery:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      We will provide a prepaid return label for damaged or defective items.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Upon inspection, we will offer a replacement or full refund, including original shipping costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Exchanges</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  If you wish to exchange a product for a different fragrance:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Follow the standard return process to return the original product.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Place a new order for the desired fragrance, subject to availability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">International Returns</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  For international orders, the same return policies apply, but additional shipping costs and customs duties may be incurred, which are the customer’s responsibility. Please contact us for specific instructions on international returns.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Changes to This Policy</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  We may update this Return Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our services constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us About Returns</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                  If you have questions about our Return Policy or need assistance with a return, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> contact@thenuaimsperfume.com</p>
                  <p><strong>Phone:</strong> +971564451624</p>
                  <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
                </div>
                <div className="mt-6">
                  <a
                    href="mailto:contact@thenuaimsperfume.com"
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    Contact Our Team
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
    console.error("Error in getStaticProps (ReturnPolicyPage):", {
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
