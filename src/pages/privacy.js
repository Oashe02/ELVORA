"use client";
import { Shield, Eye, Lock, UserCheck, Globe, Mail } from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";

const title = "Privacy Policy | Nuaim's Perfume | Data Protection & Privacy";
const description =
  "Read Nuaim's Perfume's comprehensive privacy policy. Learn how we collect, use, and protect your personal information when you shop for premium perfumes and fragrances.";
const canonicalUrl = "https://thenuaimsperfume.com/privacy-policy";
const keywords =
  "privacy policy, data protection, perfume privacy, personal information, data security, nuaims perfume privacy";

const openGraph = {
  type: "website",
  locale: "en_US",
  url: canonicalUrl,
  title,
  description,
  site_name: "Nuaim's Perfume",
  images: [
    {
      url: "https://thenuaimsperfume.com/_next/image?url=%2Fassets%2Fprivacy.jpg&w=750&q=75",
      width: 1200,
      height: 630,
      alt: "Nuaim's Perfume Privacy Policy",
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
  { position: 2, name: "Privacy Policy", item: canonicalUrl },
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

export default function PrivacyPolicyPage({ announcements, products, categories }) {
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
                Privacy Policy
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
                This Privacy Policy describes how The Nuaim's Perfume (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from thenuaimsperfume.com (the "Site") or otherwise communicate with us.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: June 12, 2025
              </p>
            </div>

            {/* Privacy Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Data Protection</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We implement comprehensive security measures to protect your information and comply with applicable data protection laws.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <Eye className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Transparency</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We clearly explain what information we collect and how we use it to provide and improve our Services.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <UserCheck className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Your Rights</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You have control over your personal data, including rights to access, correct, delete, and restrict processing.
                </p>
              </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Information We Collect</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Information You Provide Directly</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-3">
                      Information that you directly submit to us through our Services may include:
                    </p>
                    <div className="text-gray-600 text-base leading-relaxed pl-4">
                      • Contact details including your name, address, phone number, and email<br />
                      • Order information including billing address, shipping address, payment confirmation<br />
                      • Account information including username, password, and security details<br />
                      • Customer support information and communications with us<br />
                      • Survey responses, reviews, and other user-generated content
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Automatically Collected Information</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-3">
                      We automatically collect certain information about your interaction with the Services ("Usage Data"):
                    </p>
                    <div className="text-gray-600 text-base leading-relaxed pl-4">
                      • Device information, browser type, and IP address<br />
                      • Pages visited, time spent on site, and navigation paths<br />
                      • Shopping behavior and product interactions<br />
                      • Cookies and similar tracking technologies data
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Information from Third Parties</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-3">
                      We may obtain information about you from third parties, including:
                    </p>
                    <div className="text-gray-600 text-base leading-relaxed pl-4">
                      • Service providers who collect information on our behalf<br />
                      • Payment processors who collect payment information<br />
                      • Marketing and advertising partners<br />
                      • Social media platforms when you interact with our content
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">How We Use Your Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Providing Products and Services:</strong> To process payments, fulfill orders, manage your account, arrange shipping, and handle returns/exchanges.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Marketing and Advertising:</strong> To send promotional communications and show you relevant advertisements for products or services.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Security and Fraud Prevention:</strong> To detect, investigate or take action regarding possible fraudulent or illegal activity.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Service Improvement:</strong> To provide customer support, improve our Services, and develop new features.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Legal Compliance:</strong> To comply with legal obligations, enforce our terms, and protect our rights and the rights of others.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">How We Disclose Information</h2>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  We may disclose your personal information in the following circumstances:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Service Providers:</strong> With vendors who perform services on our behalf (IT, payments, analytics, customer support, shipping).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Business Partners:</strong> With marketing partners to provide services and advertise to you.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>With Your Consent:</strong> When you direct us to share information with third parties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Cookies and Tracking Technologies</h2>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  We use Cookies and similar technologies to power and improve our Site and Services:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Essential Cookies</h4>
                      <p className="text-gray-600 text-sm">Required for basic website functionality and security</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Performance Cookies</h4>
                      <p className="text-gray-600 text-sm">Help us understand how visitors use our website</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Eye className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Functional Cookies</h4>
                      <p className="text-gray-600 text-sm">Enable enhanced functionality and personalization</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <UserCheck className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-1">Marketing Cookies</h4>
                      <p className="text-gray-600 text-sm">Used to deliver relevant advertisements</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-6">
                  You can control cookie settings through your browser preferences or our cookie consent banner. Note that blocking cookies may impact your user experience.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Your Privacy Rights</h2>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Access/Know</h4>
                    <p className="text-gray-600 text-sm">Request access to personal information we hold about you</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Delete</h4>
                    <p className="text-gray-600 text-sm">Request deletion of your personal information</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Correct</h4>
                    <p className="text-gray-600 text-sm">Request correction of inaccurate information</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Portability</h4>
                    <p className="text-gray-600 text-sm">Request transfer of your data to another service</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Opt-out</h4>
                    <p className="text-gray-600 text-sm">Opt-out of marketing communications and sales</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">Restrict Processing</h4>
                    <p className="text-gray-600 text-sm">Request limitation on how we use your data</p>
                  </div>
                </div>

                <p className="text-gray-600 text-base mt-6">
                  To exercise these rights, please contact us using the information below. We may need to verify your identity before processing your request.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">International Data Transfers</h2>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Your information may be transferred to and processed in countries other than your own, including the United Arab Emirates and other locations where our service providers operate.
                </p>

                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-black mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 text-base leading-relaxed">
                    We implement appropriate safeguards for international data transfers, including standard contractual clauses where required by applicable law.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Children's Privacy</h2>

                <p className="text-gray-600 text-base leading-relaxed">
                  Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will delete that information promptly.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Changes to This Policy</h2>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. When we do, we will post the revised policy and update the "Last updated" date.
                </p>

                <p className="text-gray-600 text-base leading-relaxed">
                  Your continued use of our Services after any changes constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us About Privacy</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                  If you have questions about this privacy policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> contact@thenuaimsperfume.com</p>
                  <p><strong>Phone:</strong> +971 52 312 2627</p>
                  <p><strong>Address:</strong> 516, zubaidi building, hor al anz east, Al qiyada, Dubai, United Arab Emirates</p>
                </div>
                <div className="mt-6">
                  <a
                    href="mailto:contact@thenuaimsperfume.com"
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                  >
                    Contact Privacy Team
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
    console.error("Error in getStaticProps (PrivacyPolicyPage):", {
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