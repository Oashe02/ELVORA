"use client";
import { Gavel, Shield, AlertCircle, Mail, Phone, MapPin, ClipboardCheck } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "Terms of Service | Nuaim's Perfume | Legal Agreement";
const description =
  "Review Nuaim's Perfume Terms of Service governing your use of our website and services. Understand your rights and responsibilities when shopping with us.";
const canonicalUrl = "https://thenuaimsperfume.com/terms-of-service";
const keywords =
  "terms of service, terms and conditions, legal agreement, nuaims perfume terms, website terms";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Nuaim's Perfume",
  images: [
    {
      url: "https://thenuaimsperfume.com/_next/image?url=%2Fassets%2Fterms.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Nuaim's Perfume Terms of Service",
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
  { position: 2, name: "Terms of Service", item: canonicalUrl },
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

export default function TermsOfServicePage({ announcements, products, categories }) {
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
                Terms of Service
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
                These Terms of Service govern your use of The Nuaim's Perfume website and services. Please read them carefully.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: June 12, 2025
              </p>
            </div>

            {/* Policy Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Gavel className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Legal Agreement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  By using our site or services, you agree to be bound by these Terms of Service and our other policies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">User Responsibilities</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You must comply with all applicable laws and refrain from prohibited uses of our services.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <AlertCircle className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Changes & Updates</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We may update these terms periodically. Continued use after changes constitutes acceptance.
                </p>
              </div>
            </div>

            {/* Terms of Service Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Overview</h2>
                <p className="text-gray-600 mb-4">
                  This website is operated by The Nuaim's Perfume. By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
                <p className="text-gray-600">
                  We may update these Terms from time to time. The current version will always be available on this page. Your continued use after changes constitutes acceptance.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">1. Online Store Terms</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      By agreeing to these Terms, you represent that you are at least the age of majority in your jurisdiction.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      You may not use our products for any illegal or unauthorized purpose.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      You must not transmit any malicious code or violate any laws in your use of our services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">2. General Conditions</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We reserve the right to refuse service to anyone for any reason at any time.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      You agree not to reproduce, duplicate, copy, sell, or exploit any portion of our services without express written permission.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">3. Accuracy of Information</h2>
                <p className="text-gray-600">
                  We are not responsible if information on our site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon without consulting primary sources of information.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">4. Modifications to Service</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      Prices for our products are subject to change without notice.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We reserve the right to modify or discontinue the Service without notice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">5. Products & Services</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We reserve the right to limit sales of our products to any person, region or jurisdiction.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We cannot guarantee that your computer monitor's display of product colors will be accurate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">6. Billing & Account Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We reserve the right to refuse or limit any order you place with us.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      You agree to provide current, complete and accurate purchase and account information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">7. Third-Party Tools & Links</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We may provide access to third-party tools "as is" without any warranties.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600">
                      We are not responsible for examining or evaluating third-party materials or websites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">8. User Comments & Feedback</h2>
                <p className="text-gray-600">
                  We may use any comments or feedback you submit without restriction. You agree that your comments will not violate any third-party rights or contain unlawful material.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">9. Personal Information</h2>
                <p className="text-gray-600">
                  Your submission of personal information is governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">10. Prohibited Uses</h2>
                <p className="text-gray-600 mb-4">
                  You are prohibited from using the site for any unlawful purpose, to violate intellectual property rights, to harass others, to submit false information, to transmit viruses, or for any obscene or immoral purpose.
                </p>
                <p className="text-gray-600">
                  We reserve the right to terminate your use of the Service for violating any prohibited uses.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">11. Disclaimer of Warranties</h2>
                <p className="text-gray-600 mb-4">
                  We do not guarantee that your use of our Service will be uninterrupted, timely, secure or error-free.
                </p>
                <p className="text-gray-600">
                  The Service is provided 'as is' and 'as available' without any warranties or conditions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">12. Limitation of Liability</h2>
                <p className="text-gray-600">
                  In no case shall The Nuaim's Perfume be liable for any direct, indirect, incidental, punitive or consequential damages arising from your use of the Service.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">13. Indemnification</h2>
                <p className="text-gray-600">
                  You agree to indemnify and hold harmless The Nuaim's Perfume from any claim arising from your breach of these Terms.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">14. Governing Law</h2>
                <p className="text-gray-600">
                  These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">Questions About Our Terms?</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                  Contact us for any questions regarding these Terms of Service:
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
                    Contact Legal Team
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
    console.error("Error in getStaticProps (TermsOfServicePage):", {
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