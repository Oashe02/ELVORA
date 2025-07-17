// import Image from "next/image"
// import { BASE_URL, BLOGS_API, BLOGS_SINGLE_API } from "@/utils/api"
// import dayjs from "dayjs"
// import { remark } from "remark"
// import html from "remark-html"
// import { KEY_NAME, REVALIDATE_TIME, SITE_NAME, WEBSITE_URL } from "@/utils/constant"
// import SeoWrapper from "@/components/blocks/SeoWrapper";
// import { ArticleJsonLd } from "next-seo"
// import { BlogCard } from "@/components/BlogCard"
// import Layout from "@/components/layouts/Layout";
// import { CalendarDays, Clock, User } from "lucide-react"

// const BlogPostPage = ({ post, contentHtml, moreBlogs }) => {
//   const JSONDATA = {
//     "@context": "https://schema.org/",
//     "@type": "BlogPosting",
//     "@id": `${WEBSITE_URL}/blogs/${post?.slug}`,
//     mainEntityOfPage: `${WEBSITE_URL}/blogs/${post?.slug}`,
//     headline: `${post?.title}`,
//     description: `${post?.subtitle}`,
//     datePublished: `${post?.createdAt}`,
//     dateModified: `${post?.updatedAt}`,
//     author: {
//       "@type": "Organization",
//       name: "Controlshift",
//       url: `${WEBSITE_URL}`,
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Cleaning Service",
//       logo: {
//         "@type": "ImageObject",
//         url: `${post?.mainImageUrl}`,
//         width: 600,
//         height: 60,
//       },
//     },
//     image: {
//       "@type": "ImageObject",
//       url: `${post?.mainImageUrl}`,
//       width: 1200,
//       height: 630,
//     },
//     url: `${WEBSITE_URL}/blogs/${post?.slug}`,
//     keywords: `${post?.tags?.join(", ")}`,
//     wordCount: `${contentHtml?.length}`,
//     commentCount: 0,
//     interactionStatistic: {
//       "@type": "InteractionCounter",
//       interactionType: { "@type": "http://schema.org/LikeAction" },
//       userInteractionCount: `${post?.likes}`,
//     },
//     video: {
//       "@type": "VideoObject",
//       url: `${post?.videoUrl}`,
//     },
//     mainEntity: {
//       "@type": "CreativeWork",
//       "@id": `${WEBSITE_URL}`,
//     },
//   }

//   const twitter = {
//     cardType: "summary_large_image",
//     site: `@${SITE_NAME}`,
//     title: post?.title,
//     description: post.description,
//     image: `${WEBSITE_URL}/cleaning-services-qatar.webp`,
//   }

//   const openGraph = {
//     type: "website",
//     locale: "en_GB",
//     url: "${WEBSITE_URL}/",
//     title: post?.title,
//     description: post.description,
//     site_name: "Cleaning Services Qatar",
//     images: [
//       {
//         url: `${WEBSITE_URL}/cleaning-services-qatar.webp`,
//         width: 1200,
//         height: 630,
//         alt: "Professional Cleaning Services in Qatar",
//       },
//     ],
//   }

//   const breadcrumbs = [
//     { position: 1, name: "Home", item: `${WEBSITE_URL}/` },
//     { position: 2, name: "Blogs", item: `${WEBSITE_URL}/blogs` },
//     {
//       position: 3,
//       name: post.title,
//       item: `${WEBSITE_URL}/blogs/${post?.slug}`,
//     },
//   ]

//   const readingTime = Math.ceil(contentHtml.split(" ").length / 200) // Rough estimate: 200 words per minute

//   return (
//     <SeoWrapper
//       title={post?.title}
//       description={post.description}
//       canonicalUrl={`${WEBSITE_URL}/blogs/${post?.slug}`}
//       keywords={post?.tags?.join(", ")}
//       openGraph={openGraph}
//       twitter={twitter}
//       breadcrumbs={breadcrumbs}
//       jsonLdSchema={JSONDATA}
//     >
//       <Layout>
//         <ArticleJsonLd
//           type="BlogPosting"
//           url={`${WEBSITE_URL}/blogs/${post?.slug}`}
//           title={post?.title}
//           images={[post?.mainImageUrl]}
//           datePublished={`${post?.createdAt}`}
//           dateModified={`${post?.updatedAt}`}
//           authorName={"Controlshift"}
//           description={post?.subtitle}
//         />

//         {/* Hero Section with Image Background */}
//         <div className="relative h-[50vh] w-full">
//           <div className="absolute inset-0">
//             <Image
//               src={post?.mainImageUrl || "/placeholder.svg"}
//               alt={post?.title}
//               layout="fill"
//               objectFit="cover"
//               className="brightness-[0.6]"
//               priority
//             />
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
//           <div className="relative flex h-full items-end">
//             <div className="container mx-auto px-4 ">
//               <div className="max-w-3xl">
//                 <h1 className="mb-7 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{post?.title}</h1>
//                 <p className="text-lg text-gray-200">{post?.subtitle}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white">
//           <div className="container mx-auto px-4">
//             <div className="mx-auto max-w-3xl">
//               {/* Author and Date Info */}
//               <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 py-6 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <User size={16} className="text-gray-400" />
//                   <a href="https://controlshift.ae" className="font-medium text-primary hover:underline">
//                     Controlshift
//                   </a>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CalendarDays size={16} className="text-gray-400" />
//                   <span>{dayjs(post?.createdAt).format("MMMM D, YYYY")}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock size={16} className="text-gray-400" />
//                   <span>{readingTime} min read</span>
//                 </div>
//                 {post?.tags && post.tags.length > 0 && (
//                   <div className="ml-auto flex flex-wrap gap-2">
//                     {post.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Blog Content */}
//               <section className="prose prose-lg max-w-none py-10 lg:prose-xl">
//                 <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
//               </section>

//               {/* Share Section */}
//               <div className="my-10 flex flex-col items-center justify-center border-t border-b border-gray-200 py-8">
//                 <h3 className="mb-4 text-lg font-semibold">Share this article</h3>
//                 <div className="flex gap-4">
//                   <button className="rounded-full bg-[#1877F2] p-3 text-white transition hover:bg-opacity-90">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//                     </svg>
//                   </button>
//                   <button className="rounded-full bg-[#1DA1F2] p-3 text-white transition hover:bg-opacity-90">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
//                     </svg>
//                   </button>
//                   <button className="rounded-full bg-[#0A66C2] p-3 text-white transition hover:bg-opacity-90">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//                       <rect x="2" y="9" width="4" height="12"></rect>
//                       <circle cx="4" cy="4" r="2"></circle>
//                     </svg>
//                   </button>
//                   <button className="rounded-full bg-[#25D366] p-3 text-white transition hover:bg-opacity-90">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* More Blogs Section */}
//         <div className="bg-gray-50 py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">More Recent Articles</h2>
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {moreBlogs.map((post) => (
//                 <BlogCard key={post._id} {...post} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </Layout>
//      </SeoWrapper>
//   )
// }

// export default BlogPostPage

// // getStaticPaths implementation
// export const getStaticPaths = async () => {
//   const res = await fetch(`${BASE_URL}${BLOGS_API}/${KEY_NAME}`)
//   const data = await res.json()

//   const paths = data.payload.map((blog) => ({
//     params: { slug: blog?.slug },
//   }))

//   return {
//     paths,
//     fallback: "blocking",
//   }
// }

// // getStaticProps implementation
// export const getStaticProps = async (context) => {
//   const { slug } = context.params

//   // const post = blogPosts[slug];
//   const [res, res2] = await Promise.all([
//     fetch(`${BASE_URL}${BLOGS_SINGLE_API}/${slug}`),
//     fetch(`${BASE_URL}${BLOGS_API}/${KEY_NAME}`),
//   ])

//   const [data, data2] = await Promise.all([res.json(), res2.json()])

//   // const paths = data.payload.map((blog: any) => ({
//   // 	params: { slug: blog.slug },
//   // }));

//   if (!data || data?.error) {
//     return {
//       notFound: true,
//     }
//   }
//   const processedContent = await remark().use(html).process(data?.payload?.blogContent)
//   // console.log({ processedContent });

//   const contentHtml = processedContent.toString()
//   // console.log({ contentHtml });

//   return {
//     props: {
//       post: data?.payload,
//       contentHtml,
//       moreBlogs: data2?.payload.map((blog) => {
//         return {
//           _id: blog._id,
//           title: blog.title,
//           date: dayjs(blog.createdAt).format("DD/MM/YYYY"), // Format the date
//           description: blog.subtitle || "",
//           imageUrl: blog.thumbnailUrl || "/default-thumbnail.jpg", // Fallback for image
//           slug: blog.slug,
//         }
//       }),
//     },
//     revalidate: REVALIDATE_TIME,
//   }
// }


import Image from "next/image";
import { BASE_URL, BLOGS_API, BLOGS_SINGLE_API } from "@/utils/api";
import dayjs from "dayjs";
import { remark } from "remark";
import html from "remark-html";
import { KEY_NAME, REVALIDATE_TIME, SITE_NAME, WEBSITE_URL } from "@/utils/constant";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import { ArticleJsonLd } from "next-seo";
import { BlogCard } from "@/components/BlogCard";
import Layout from "@/components/layouts/Layout";
import { CalendarDays, Clock, User } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance"; // Import axiosInstance for API calls

const BlogPostPage = ({ post, contentHtml, moreBlogs, announcements, products, categories }) => {
  const JSONDATA = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "@id": `${WEBSITE_URL}/blogs/${post?.slug}`,
    mainEntityOfPage: `${WEBSITE_URL}/blogs/${post?.slug}`,
    headline: `${post?.title}`,
    description: `${post?.subtitle}`,
    datePublished: `${post?.createdAt}`,
    dateModified: `${post?.updatedAt}`,
    author: {
      "@type": "Organization",
      name: "Controlshift",
      url: `${WEBSITE_URL}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Cleaning Service",
      logo: {
        "@type": "ImageObject",
        url: `${post?.mainImageUrl}`,
        width: 600,
        height: 60,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${post?.mainImageUrl}`,
      width: 1200,
      height: 630,
    },
    url: `${WEBSITE_URL}/blogs/${post?.slug}`,
    keywords: `${post?.tags?.join(", ")}`,
    wordCount: `${contentHtml?.length}`,
    commentCount: 0,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "http://schema.org/LikeAction" },
      userInteractionCount: `${post?.likes}`,
    },
    video: {
      "@type": "VideoObject",
      url: `${post?.videoUrl}`,
    },
    mainEntity: {
      "@type": "CreativeWork",
      "@id": `${WEBSITE_URL}`,
    },
  };

  const twitter = {
    cardType: "summary_large_image",
    site: `@${SITE_NAME}`,
    title: post?.title,
    description: post.description,
    image: `${WEBSITE_URL}/cleaning-services-qatar.webp`,
  };

  const openGraph = {
    type: "website",
    locale: "en_GB",
    url: `${WEBSITE_URL}/blogs/${post?.slug}`, // Fixed URL to match the blog post
    title: post?.title,
    description: post.description,
    site_name: "Cleaning Services Qatar",
    images: [
      {
        url: `${WEBSITE_URL}/cleaning-services-qatar.webp`,
        width: 1200,
        height: 630,
        alt: "Professional Cleaning Services in Qatar",
      },
    ],
  };

  const breadcrumbs = [
    { position: 1, name: "Home", item: `${WEBSITE_URL}/` },
    { position: 2, name: "Blogs", item: `${WEBSITE_URL}/blogs` },
    {
      position: 3,
      name: post.title,
      item: `${WEBSITE_URL}/blogs/${post?.slug}`,
    },
  ];

  const readingTime = Math.ceil(contentHtml.split(" ").length / 200); // Rough estimate: 200 words per minute

  return (
    <SeoWrapper
      title={post?.title}
      description={post.description}
      canonicalUrl={`${WEBSITE_URL}/blogs/${post?.slug}`}
      keywords={post?.tags?.join(", ")}
      openGraph={openGraph}
      twitter={twitter}
      breadcrumbs={breadcrumbs}
      jsonLdSchema={JSONDATA}
    >
      <Layout announcements={announcements} products={products} categories={categories}>
        <ArticleJsonLd
          type="BlogPosting"
          url={`${WEBSITE_URL}/blogs/${post?.slug}`}
          title={post?.title}
          images={[post?.mainImageUrl]}
          datePublished={`${post?.createdAt}`}
          dateModified={`${post?.updatedAt}`}
          authorName={"Controlshift"}
          description={post?.subtitle}
        />

        {/* Hero Section with Image Background */}
        <div className="relative h-[50vh] w-full">
          <div className="absolute inset-0">
            <Image
              src={post?.mainImageUrl || "/placeholder.svg"}
              alt={post?.title}
              layout="fill"
              objectFit="cover"
              className="brightness-[0.6]"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="relative flex h-full items-end">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="mb-7 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{post?.title}</h1>
                <p className="text-lg text-gray-200">{post?.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Author and Date Info */}
              <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 py-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <a href="https://controlshift.ae" className="font-medium text-primary hover:underline">
                    Controlshift
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-gray-400" />
                  <span>{dayjs(post?.createdAt).format("MMMM D, YYYY")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>{readingTime} min read</span>
                </div>
                {post?.tags && post.tags.length > 0 && (
                  <div className="ml-auto flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <section className="prose prose-lg max-w-none py-10 lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </section>

              {/* Share Section */}
              <div className="my-10 flex flex-col items-center justify-center border-t border-b border-gray-200 py-8">
                <h3 className="mb-4 text-lg font-semibold">Share this article</h3>
                <div className="flex gap-4">
                  <button className="rounded-full bg-[#1877F2] p-3 text-white transition hover:bg-opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                     width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button className="rounded-full bg-[#1DA1F2] p-3 text-white transition hover:bg-opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </button>
                  <button className="rounded-full bg-[#0A66C2] p-3 text-white transition hover:bg-opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </button>
                  <button className="rounded-full bg-[#25D366] p-3 text-white transition hover:bg-opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Blogs Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">More Recent Articles</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {moreBlogs.map((post) => (
                <BlogCard key={post._id} {...post} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </SeoWrapper>
  );
};

export default BlogPostPage;

// getStaticPaths implementation
export const getStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}${BLOGS_API}/${KEY_NAME}`);
  const data = await res.json();

  const paths = data.payload.map((blog) => ({
    params: { slug: blog?.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// getStaticProps implementation
export const getStaticProps = async (context) => {
  const { slug } = context.params;

  try {
    // Fetch all required data concurrently
    const [singleBlogRes, allBlogsRes, announcementsRes, productsRes, categoriesRes] = await Promise.all([
      fetch(`${BASE_URL}${BLOGS_SINGLE_API}/${slug}`),
      fetch(`${BASE_URL}${BLOGS_API}/${KEY_NAME}`),
      axiosInstance.get("/announcements"),
      axiosInstance.get("/products?featured=true"),
      axiosInstance.get("/categories?status=active"),
    ]);

    // Parse blog data
    const [singleBlogData, allBlogsData] = await Promise.all([
      singleBlogRes.json(),
      allBlogsRes.json(),
    ]);

    if (!singleBlogData || singleBlogData?.error) {
      return {
        notFound: true,
      };
    }

    // Process blog content
    const processedContent = await remark()
      .use(html)
      .process(singleBlogData?.payload?.blogContent);
    const contentHtml = processedContent.toString();

    // Map more blogs data
    const moreBlogs = allBlogsData?.payload.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      date: dayjs(blog.createdAt).format("DD/MM/YYYY"),
      description: blog.subtitle || "",
      imageUrl: blog.thumbnailUrl || "/default-thumbnail.jpg",
      slug: blog.slug,
    }));

    // Extract announcements, products, and categories
    const announcements = announcementsRes.data?.announcements || [];
    const products = productsRes.data?.products || [];
    const categories = categoriesRes.data?.categories || [];

    return {
      props: {
        post: singleBlogData?.payload,
        contentHtml,
        moreBlogs,
        announcements,
        products,
        categories,
      },
      revalidate: REVALIDATE_TIME,
    };
  } catch (error) {
    console.error("Error in getStaticProps (BlogPostPage):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    return {
      notFound: true,
    };
  }
};