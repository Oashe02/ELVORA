"use client";

import { useEffect, useState } from "react";
import Product from "@/components/home/Product/Product";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/layouts/Layout";

export default function ProductsByCategoryPage({ products, categoryName, announcements }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setIsMobile(window.innerWidth < 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const title = `${categoryName} Perfumes | ScentHaven UAE`;
  const description = `Discover our exclusive collection of ${categoryName} perfumes in the UAE. Fast delivery across Dubai, Sharjah, and Abu Dhabi.`;
  const canonicalUrl = `https://scenthaven.ae/category/${encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, "-"))}`;
  const openGraph = {
    type: "website",
    locale: "en_AE",
    url: canonicalUrl,
    title,
    description,
    site_name: "ScentHaven UAE",
    images: [
      {
        url: "https://scenthaven.ae/assets/og-perfumes.jpg",
        width: 1200,
        height: 630,
        alt: `Luxury ${categoryName} Perfumes in UAE`,
      },
    ],
  };
  const twitter = {
    cardType: "summary_large_image",
    site: "@scenthavenuae",
    handle: "@scenthavenuae",
    title,
    description,
    image: openGraph.images[0].url,
  };

  return (
    <Layout announcements={announcements}>
      <SeoWrapper
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        openGraph={openGraph}
        twitter={twitter}
      >
        <div className="min-h-screen bg-white">
          <div className="tab-features-block md:pt-20 pt-10 max-w-7xl mx-auto px-4">
            {products.length > 0 ? (
              <div className="list-product md:mt-10 mt-6">
                {isClient && isMobile ? (
                  <div className="md:hidden overflow-x-auto scrollbar-hide">
                    {products.length === 1 ? (
                      <div className="flex justify-center">
                        <div className="flex-shrink-0 w-[calc(50vw-24px)] max-w-[180px]">
                          <Product product={products[0]} type="grid" productCount={products.length} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 pb-4" style={{ width: "max-content" }}>
                        {products.map((product, index) => (
                          <div key={index} className="flex-shrink-0 w-[calc(50vw-24px)] max-w-[180px]">
                            <Product product={product} type="grid" productCount={products.length} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <div className="grid md:grid-cols-6 md:gap-4">
                      {products.map((product, index) => (
                        <div key={index} className="p-1 md:p-2">
                          <Product product={product} type="grid" productCount={products.length} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-40 h-40 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Perfumes Found</h3>
                <p className="text-gray-600 text-lg">
                  We couldn't find any perfumes in this category at the moment.
                </p>
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none; /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }

          .list-product .flex {
            scroll-behavior: smooth;
          }

          .list-product .product-item {
            transition: all 0.3s ease;
          }

          .list-product .product-item:hover {
            transform: translateY(-5px);
          }

          .list-product .product-item:hover .product-img,
          .list-product .product-item:hover .product-image {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            transform: none !important;
          }

          .list-product .grid {
            display: grid;
            width: 100%;
          }

          @media (min-width: 768px) {
            .list-product .grid.md\\:grid-cols-6 .product-item {
              width: 100%;
              max-width: 260px;
            }
          }

          @media (min-width: 1024px) {
            .list-product .grid.md\\:grid-cols-6 .product-item {
              width: 100%;
              max-width: 260px;
            }
          }

          @media (min-width: 1280px) {
            .list-product .grid.md\\:grid-cols-6 .product-item {
              width: 100%;
              max-width: 260px;
            }
          }
        `}</style>
      </SeoWrapper>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await axiosInstance.get("/categories");
    const paths = data.categories.map((category) => ({
      params: { slug: category.slug },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Error fetching categories for static paths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const [productsResponse, announcementsResponse] = await Promise.all([
      axiosInstance.get(`/public/product-by-category/${encodeURIComponent(slug)}`),
      axiosInstance.get("/announcements"),
    ]);

    const products = productsResponse.data.products || [];
    const categoryName = productsResponse.data.categoryName || "Category";
    const announcements = announcementsResponse.data.announcements || [];

    return {
      props: {
        products,
        categoryName,
        announcements,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching data for category ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}