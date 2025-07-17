
// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import Image from "next/image";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const CustomPrevArrow = ({ onClick }) => (
//   <div
//     className="absolute left-0 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
//     onClick={onClick}
//   >
//     <Image
//       src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A58%3A10.808Z-back.png"
//       alt="Previous"
//       width={28}
//       height={28}
//       className="bg-white rounded-full shadow opacity-80 hover:opacity-100 transition"
//     />
//   </div>
// );

// const CustomNextArrow = ({ onClick }) => (
//   <div
//     className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
//     onClick={onClick}
//   >
//     <Image
//       src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A59%3A01.528Z-front.png"
//       alt="Next"
//       width={28}
//       height={28}
//       className="opacity-60 hover:opacity-100 transition"
//     />
//   </div>
// );


// const Collection = ({ activeCategoriesString }) => {
//   const [isClient, setIsClient] = useState(false);
//   let activeCategories = [];

//   try {
//     activeCategories = JSON.parse(activeCategoriesString || "[]");
//   } catch (error) {
//     console.error("Failed to parse activeCategoriesString:", error);
//   }

//   const validCategories = activeCategories.filter(
//     (category) =>
//       category &&
//       category._id &&
//       category.name &&
//       category.slug &&
//       category.thumbnail &&
//       category.shortDescription &&
//       category.status === "active"
//   );

//   const categories = [...validCategories].sort(
//     (a, b) => (b.priority || 0) - (a.priority || 0)
//   );

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsClient(true);
//     }
//   }, []);

//   if (!isClient || categories.length === 0) return null;

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     arrows: true,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: { slidesToShow: 6, slidesToScroll: 2 },
//       },
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 4, slidesToScroll: 2 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 3, slidesToScroll: 1 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 2, slidesToScroll: 1 },
//       },
//     ],
//   };

//   return (
// <section className="py-14 bg-white relative overflow-visible">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-xl md:text-2xl font-serif tracking-wider uppercase text-gray-900 border-b border-gray-300 w-max pb-1 mb-10"
//         >
//           Categories
//         </motion.h2>
//         <div className="relative">

//         <Slider {...settings}>
//           {categories.map((cat, index) => (
//             <div key={cat._id || index} className="px-2">
//               <Link href={`/category/${cat.slug}`}>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="flex flex-col items-center group"
//                 >
//                   <div
//                     className="w-44 h-40    bg-gray-300 rounded-sm overflow-hidden bg-center bg-cover group-hover:shadow-lg transition-all duration-300"
//                     style={{ backgroundImage: `url(${cat.thumbnail})` }}
//                   />
//                   <p className="text-xs text-center font-semibold text-gray-800 mt-2 group-hover:text-black tracking-wide uppercase">
//                     {cat.name}
//                   </p>
//                 </motion.div>
//               </Link>
//             </div>
//           ))}
//         </Slider>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Collection;

"use client"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Collection = ({ activeCategoriesString }) => {
  const [isClient, setIsClient] = useState(false)

  let activeCategories = []
  try {
    activeCategories = JSON.parse(activeCategoriesString || "[]")
  } catch (error) {
    console.error("Failed to parse activeCategoriesString:", error)
  }

  const validCategories = activeCategories.filter(
    (category) =>
      category &&
      category._id &&
      category.name &&
      category.slug &&
      category.thumbnail &&
      category.shortDescription &&
      category.status === "active",
  )

  const categories = [...validCategories].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)
    }
  }, [])

  if (!isClient || categories.length === 0) return null

  return (
    <section className="py-14 bg-white relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-serif tracking-wider uppercase text-gray-900 border-b border-green-300 w-max pb-1 mb-10"
        >
          Categories
        </motion.h2>

        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={6}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="categories-swiper"
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={cat._id || index}>
                <Link href={`/category/${cat.slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 10 },
                    }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className="w-36 h-48 bg-gray-300  overflow-hidden bg-center bg-cover group-hover:shadow-xl transition-all duration-500 transform  group-hover:-translate-y-2 relative"
                      style={{ backgroundImage: `url(${cat.thumbnail})` }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                      {/* Hover overlay with subtle gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-xs text-center font-semibold text-gray-800 mt-3 group-hover:text-pink-600 tracking-wide uppercase transition-colors duration-300">
                      {cat.name}
                    </p>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 hover:shadow-xl transition-all duration-300 hover:rounded-lg hover:scale-110 group">
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A58%3A10.808Z-back.png"
              alt="Previous"
              width={40}
              height={40}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div className="custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer  p-3  hover:shadow-xl  hover:rounded-lg transition-all duration-300 hover:scale-110 group">
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A59%3A01.528Z-front.png"
              alt="Next"
              width={40}
              height={40}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .categories-swiper .swiper-slide {
          height: auto;
        }
        
        .custom-prev:hover,
        .custom-next:hover {
          transform: translateY(-50%) scale(1.1);
        }
        
        .custom-prev:active,
        .custom-next:active {
          transform: translateY(-50%) scale(0.95);
        }
      `}</style>
    </section>
  )
}

export default Collection
