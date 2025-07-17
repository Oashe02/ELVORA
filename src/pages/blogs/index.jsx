import Link from "next/link";
import { BASE_URL, BLOGS_API } from "../../utils/api";
import dayjs from "dayjs";
import { KEY_NAME, SITE_NAME, WEBSITE_URL } from "@/utils/constant";
import Head from "next/head";
import { ArticleJsonLd } from "next-seo";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import { BlogCard } from "@/components/BlogCard";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance"; 

const Blogs = ({ blogPosts, announcements, products, categories }) => {
  function addBlogJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Blogs | ${SITE_NAME}",
        "description": "Explore the latest blogs from ${SITE_NAME}, the premier ${SITE_NAME}. Stay updated with the latest trends and advancements in ${SITE_NAME}.",
        "url": "${WEBSITE_URL}/blogs/",
        "provider": {
          "@type": "Organization",
          "name": "${SITE_NAME}",
          "url": "${WEBSITE_URL}"
        },
        "mainEntity": {
          "@type": "Blog",
          "name": "${SITE_NAME} Blogs",
          "description": "Stay updated with the latest blogs and articles from ${SITE_NAME}, covering trends, advancements, and insights in ${SITE_NAME}."
        }
      }`,
    };
  }

  // Breadcrumbs for the Blogs page
  const breadcrumbs = [
    { position: 1, name: "Home", item: WEBSITE_URL },
    { position: 2, name: "Blogs", item: `${WEBSITE_URL}/blogs` },
  ];

  return (
    <>
      <Head>
        <title>Blogs | ${SITE_NAME}</title>
        <meta
          name="description"
          content={`Explore the latest blogs from ${SITE_NAME}, the premier ${SITE_NAME}. Stay updated with the latest trends and advancements in ${SITE_NAME}.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addBlogJsonLd()}
          key="blog-jsonld"
        />
      </Head>

      {/* SEO Wrapper for the Blogs Page */}
      <SeoWrapper
        title={`Blogs | ${SITE_NAME}`}
        description={`Explore the latest blogs from ${SITE_NAME}, the premier ${SITE_NAME}. Stay updated with the latest trends and advancements in ${SITE_NAME}.`}
        canonicalUrl={`${WEBSITE_URL}/blogs`}
        keywords={`${SITE_NAME}, blogs, cleaning services, trends, advancements`}
        openGraph={{
          type: "website",
          locale: "en_GB",
          url: `${WEBSITE_URL}/blogs`,
          title: `Blogs | ${SITE_NAME}`,
          description: `Explore the latest blogs from ${SITE_NAME}, the premier ${SITE_NAME}. Stay updated with the latest trends and advancements in ${SITE_NAME}.`,
          site_name: SITE_NAME,
          images: [
            {
              url: `${WEBSITE_URL}/best-cleaning-services-in-qatar.jpg`,
              width: 1200,
              height: 630,
              alt: "Blogs Cover Image",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@HegyQatar",
          title: `Blogs | ${SITE_NAME}`,
          description: `Explore the latest blogs from ${SITE_NAME}, the premier ${SITE_NAME}. Stay updated with the latest trends and advancements in ${SITE_NAME}.`,
          image: `${WEBSITE_URL}/best-cleaning-services-in-qatar.jpg`,
        }}
        breadcrumbs={breadcrumbs}
        jsonLdSchema={addBlogJsonLd()}
      >
        {/* Pass announcements, products, and categories to Layout */}
        <Layout announcements={announcements} products={products} categories={categories}>
          <section className="relative z-10 w-full">
            {/* Header Section */}
            <div className="relative flex h-72 w-full items-center justify-center overflow-hidden bg-black text-4xl font-bold uppercase text-white md:hidden md:h-96 md:text-6xl">
              <div className="circle-gradient-six"></div>
              <span className="z-50 w-full text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Blogs
              </span>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 lg:px-16 lg:py-20">
              {blogPosts.map((post) => (
                <>
                  {/* Article JSON-LD for Each Blog Post */}
                  <ArticleJsonLd
                    type="BlogPosting"
                    url={`${WEBSITE_URL}/blogs/${post.slug}`}
                    title={post.title}
                    images={[post.mainImageUrl]}
                    datePublished={post.createdAt}
                    dateModified={post.updatedAt}
                    authorName={"Controlshift"}
                    description={post.subtitle}
                  />

                  {/* Render the Blog Card */}
                  <BlogCard key={post._id} {...post} />
                </>
              ))}
            </div>
          </section>
        </Layout>
      </SeoWrapper>
    </>
  );
};

// Fetch blogs, announcements, products, and categories server-side with getServerSideProps
export const getServerSideProps = async () => {
  try {
    // Fetch all required data concurrently
    const [blogsRes, announcementsRes, productsRes, categoriesRes] = await Promise.all([
      fetch(`${BASE_URL}${BLOGS_API}/${KEY_NAME}`),
      axiosInstance.get("/announcements"),
      axiosInstance.get("/products?featured=true"),
      axiosInstance.get("/categories?status=active"),
    ]);

    // Parse blogs data
    const blogsData = await blogsRes.json();

    // Extract and map the blogs data
    const blogPosts = blogsData.payload.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      date: dayjs(blog.createdAt).format("DD/MM/YYYY"),
      description: blog.subtitle || "",
      imageUrl: blog.thumbnailUrl || "/default-thumbnail.jpg",
      slug: blog.slug,
      mainImageUrl: blog.thumbnailUrl || "/default-thumbnail.jpg", // For ArticleJsonLd
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt || blog.createdAt,
    }));

    // Extract announcements, products, and categories
    const announcements = announcementsRes.data?.announcements || [];
    const products = productsRes.data?.products || [];
    const categories = categoriesRes.data?.categories || [];

    return {
      props: {
        blogPosts,
        announcements,
        products,
        categories,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps (Blogs):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    // Return empty arrays in case of error to prevent page crash
    return {
      props: {
        blogPosts: [],
        announcements: [],
        products: [],
        categories: [],
      },
    };
  }
};

export default Blogs;