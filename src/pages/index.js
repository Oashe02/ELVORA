"use client";
import { REVALIDATE_TIME } from "@/utils/constant";

import axiosInstance from "@/lib/axiosInstance";
import SliderOne from "@/components/home/SliderOne";
import Collection from "@/components/home/Collection";
import TabFeatures from "@/components/home/TabFeatures";
import Banner from "@/components/home/Banner";
import Benefit from "@/components/home/Benefit";
import Testimonial from "@/components/home/Testimonial";
import Instagram from "@/components/home/Instagram";
import ModalNewsletter from "@/components/Modal/ModalNewsletter";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import CouponModal from "@/components/Modal/CouponModal";
import Makes from "@/components/home/Makes";
import CarModels from "@/components/home/CarModels";
import Manufacturers from "@/components/home/Manufacturers";
import VolvoPartsHero from "@/components/home/volvo-parts"
import Layout from "@/components/layouts/Layout";
import LatestProduct from "@/components/home/LatestProducts";
import BestSellerProduct from "@/components/home/BestSeller";
import FragranceBlog from "@/components/home/FragranceBlog"
import FAQSection from '@/components/faq-section'
import BestSellerSection from "@/components/BestSellerSection";
import Achievements from "@/components/home/Achievement";



const title = "Buy Fresh Flowers Online in UAE | Luxury Bouquets from Elvora.ae";

const description =
  "Order premium fresh flowers online from Elvora.ae. Same-day delivery in Dubai, Sharjah, Abu Dhabi & across the UAE. Explore our luxury floral arrangements for every occasion.";

const keywords =
  "buy flowers online UAE, fresh flower delivery Dubai, luxury flower bouquets UAE, Elvora flowers, same day flower delivery, online flower shop UAE";

const canonicalUrl = "https://elvora.ae/";


const openGraph = {
  type: "website",
  locale: "en_AE",
  url: canonicalUrl,
  title,
  description,
  site_name: "Elvora Flowers UAE",
  images: [
    {
      url: "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T12%3A23%3A22.622Z-side-view-bouquet-colorful-roses-pink-color-alstroemeria-flowers-gift-box-black-table+%281%29.jpg",
      width: 1200,
      height: 630,
      alt: "Buy Fresh Flowers Online in UAE - Elvora",
    },
    {
      url: "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T12%3A23%3A22.622Z-side-view-bouquet-colorful-roses-pink-color-alstroemeria-flowers-gift-box-black-table+%281%29.jpg",
      width: 1200,
      height: 630,
      alt: "Luxury Flower Bouquet from Elvora",
    },
  ],
};

const twitter = {
  cardType: "summary_large_image",
  site: "@elvoraflowers",
  handle: "@elvoraflowers",
  title,
  description,
  image: openGraph.images[0].url,
};




const breadcrumbs = [
  { position: 1, name: "Home", item: canonicalUrl },
  { position: 2, name: "Shop", item: `${canonicalUrl}shop` },
  { position: 3, name: "Occasions", item: `${canonicalUrl}shop/occasions` },
  {
    position: 4,
    name: "Romantic Roses Bouquet",
    item: `${canonicalUrl}product/romantic-roses`,
  },
];


const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
      name: title,
      isPartOf: { "@id": `${canonicalUrl}#website` },
      about: { "@id": `${canonicalUrl}#organization` },
      primaryImageOfPage: {
        "@id": openGraph.images[0].url,
      },
      image: openGraph.images,
      thumbnailUrl: openGraph.images[0].url,
      datePublished: "2024-01-01T00:00:00+00:00",
      dateModified: "2025-06-25T00:00:00+00:00",
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
      inLanguage: "en-AE",
      potentialAction: {
        "@type": "SearchAction",
        target: `${canonicalUrl}search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${canonicalUrl}#organization`,
      name: "Elvora Flowers",
      url: canonicalUrl,
      sameAs: [
        "https://www.facebook.com/elvoraflowers",
        "https://twitter.com/elvoraflowers",
        "https://www.instagram.com/elvoraflowers",
      ],
      telephone: "+971 50 987 6543",
      email: "support@elvora.ae",
      address: {
        streetAddress: "Flower Lane, Al Barsha",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "",
        addressCountry: "AE",
      },
      geo: {
        latitude: 25.2048,
        longitude: 55.2708,
      },
      hasMap:
        "https://www.google.com/maps?q=Flower+Lane,+Al+Barsha,+Dubai,+UAE",
    },
    {
      "@type": "Product",
      "@id": `${canonicalUrl}product/romantic-roses`,
      name: "Romantic Roses Bouquet",
      url: `${canonicalUrl}product/romantic-roses`,
      image: openGraph.images[1].url,
      description:
        "Shop our Romantic Roses Bouquet – handcrafted with love and delivered fresh across the UAE. Perfect for anniversaries, proposals, and special moments.",
      sku: "FLOWER-ROMANTIC-001",
      brand: {
        "@type": "Brand",
        name: "Elvora Flowers",
      },
      offers: {
        "@type": "Offer",
        url: `${canonicalUrl}product/romantic-roses`,
        priceCurrency: "AED",
        price: "179",
        availability: "https://schema.org/InStock",
        validFrom: "2025-06-25",
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
      name: "Do you offer same-day flower delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer same-day flower delivery across Dubai, Sharjah, and Abu Dhabi for orders placed before 5 PM.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize my flower bouquet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! You can customize flower arrangements based on your occasion or preferences. Just chat with our floral designers.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of flowers do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide variety including roses, lilies, tulips, orchids, sunflowers, and seasonal blooms.",
      },
    },
    {
      "@type": "Question",
      name: "Is delivery available across all Emirates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver flowers across all Emirates in the UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a personal message or card?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can include a personalized message with every flower bouquet during checkout.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept Visa, MasterCard, and Cash on Delivery across UAE orders.",
      },
    },
  ],
};



export default function Home({
  banners,
  products,
  categories,
  settings,
  announcements,
  coupons,
  latestProducts,
  featuredProducts,
  carModels,
  manufacturers,
  faqs,
  reviews,
  feed

}) {
  const { user, isAuthenticated } = useAuthStore();

  // console.log(faqs,">>>>>>>>>>>..faqs")


  return (
    <Layout announcements={announcements} categories={categories} products={products} carModels={carModels} banners={banners} NavCategories={categories}>
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
        <h1 className="hidden sr-only">Dubai City Floral – E-commerce Platform</h1>
        {/* <div id="header" className="relative w-full">
          <SliderOne bannersString={JSON.stringify(banners)} />
        </div> */}
        {/* <TabFeatures  products={products} /> */}
        <TabFeatures
  products={products.filter(p => !p.featured)}
  columns={5}
  title="SEASONAL COLLECTION"
  description="Explore our collection of products."
/>

        <Collection activeCategoriesString={JSON.stringify(categories)} />

                <Testimonial data={reviews} limit={10} />

        {/* <Banner /> */}
        {/* <Benefit props="md:py-20 py-10" /> */}

        {/* <TabFeatures
          products={latestProducts}
          columns={6}
          title="CHECK OUR LATEST PERFUMES"
          description="Discover our latest collection of perfumes. Shop now for the best deals on luxury fragrances."
        /> */}

        <TabFeatures
          products={featuredProducts}
          columns={6}
          title="SPRING SEASONAL COLLECTION"
        />
        <BestSellerSection data={feed} limit={10}/>
        {/* <Testimonial data={[]} limit={6} /> */}
        <FragranceBlog />
				<FAQSection  faqs={faqs}/>
        <Achievements/>
        {/* <Instagram /> */}
        {/* <CouponModal coupons={coupons} /> */}
      </SeoWrapper>
    </Layout>
  );
}

// Server-side data fetching for SEO optimization
export async function getStaticProps() {
  try {
    // API URLs
    const [
      bannersRes,
      featuredRes,
      latestRes,
      productsRes,
      categoriesRes,
      settingsRes,
      announcementsRes,
      couponsRes,
      makesRes,
      modelRes,
      manufacturersRes,
       faqsRes, 
       reviewsRes,
       feedRes
    ] = await Promise.all([
      axiosInstance.get("/banners?status=active&limit=10&page=1"),
      axiosInstance.get("/products?featured=true&limit=100"),
      axiosInstance.get("/products?latest=true&limit=100"),
      axiosInstance.get("/products?status=active&limit=100"),
      axiosInstance.get("/categories?status=active"),
      axiosInstance.get("/settings"),
      axiosInstance.get("/announcements"),
      axiosInstance.get("/public/coupons"),
      axiosInstance.get("/make?status=active"),
      axiosInstance.get("/model?status=active"),
      axiosInstance.get("/manufacturer?status=active"),
      axiosInstance.get("/faq?isActive=true"), 
      axiosInstance.get("/review/public?page=1&limit=20&status=approved"),
      axiosInstance.get("/feed/public?page=1&limit=10&status=active"),
      


    ]);
    // console.log({ faqsRes: faqsRes.data });

    return {
      props: {
        banners: bannersRes.data.banners,
        featuredProducts: featuredRes.data.products,
        latestProducts: latestRes.data.products,
        products: productsRes.data.products,
        productLatest: latestRes.data.products,
        categories: categoriesRes.data.categories,
        settings: settingsRes.data,
        announcements: announcementsRes.data.announcements,
        coupons: couponsRes.data.coupons,
        coupons: couponsRes.data.coupons,
        makes: makesRes.data.categories,
        carModels: modelRes.data.categories,
        manufacturers: manufacturersRes.data.categories,
        faqs: faqsRes.data || [],
        reviews: reviewsRes.data.reviews || [],
        feed: feedRes.data.posts || [],


      },
      revalidate: REVALIDATE_TIME, // Re-fetch data every hour
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);

    return {
      props: {
        banners: [],
        featuredProducts: [],
        latestProducts: [],
        products: [],
        categories: [],
        activities: [],
        testimonials: [],
        faqs: [],
        blogPosts: [],
        memories: [],
        popularActivities: [],
        popularStaycations: [],
        offerBanners: [],
        reviews: [],
        makes: [],
        carModels: [],
        manufacturers: [],
        featuredItems: [],
        activitiesPerCategory: null,
        faqs: [], 
        reviews: [], 
        feed: [], 
        

        error: error.message, // This can help for debugging in development
      },
      revalidate: REVALIDATE_TIME,
    };
  }
}
