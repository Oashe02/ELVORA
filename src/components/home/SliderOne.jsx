"use client";
import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import { usePathname } from "next/navigation";


const SliderOne = ({ bannersString  }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();
  const isProductDetailPage =
  pathname?.startsWith("/product") || pathname?.startsWith("/cart-listing-page") || pathname?.startsWith("/checkout");
  let parsedBanners = [];
  try {
    parsedBanners = JSON.parse(bannersString || "[]");
  } catch (error) {
    console.error("Failed to parse bannersString:", error);
  }

  const validBanners = parsedBanners.filter(
    (banner) =>
      banner &&
      banner._id &&
      banner.title &&
      banner.description &&
      banner.url
  );
  
  const activeBanners = [...validBanners]
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .slice(0, 2);


// console.log("Raw bannersString:", bannersString);
// console.log("Parsed Banners:", parsedBanners);
// console.log("Valid Banners:", validBanners);
// console.log("Active Banners:", activeBanners);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  if (activeBanners.length === 0) {
    return (
      <div className="relative xl:h-[600px] lg:h-[550px] md:h-[500px] sm:h-[450px] h-[350px] w-full flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg sm:text-xl">No banners available</p>
      </div>
    );
  }

  

  return (
<div
  className={`relative w-full overflow-hidden ${
    isProductDetailPage ? "h-[400px] md:h-[450px] lg:h-[500px]" : "h-[100vh]"
  }`}
>
      {/* Right-side floating WhatsApp & Call icons */}
      <div
  className={`absolute right-6 z-50 flex flex-col space-y-4 transition-all duration-300 ${
    isProductDetailPage
      ? "bottom-12 top-auto transform-none"
      : "top-1/2 transform -translate-y-1/2"
  }`}
>
{/* WhatsApp Icon */}
<a
  href="https://wa.me/#"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:scale-105 transition duration-300"
  aria-label="WhatsApp"
>
  <img
    src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T15%3A54%3A43.385Z-Vector%20Smart%20Object%20%281%29.png"
    alt="WhatsApp"
    className="w-36 h-36 object-contain"
  />
</a>

{/* Phone Call Icon */}
<a
  href="tel:#"
  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:scale-105 transition duration-300"
  aria-label="Call"
>
  <img
    src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T15%3A55%3A29.820Z-Vector%20Smart%20Objecttt.png"
    alt="Call"
    className="w-36 h-36 object-contain"
  />
</a>

</div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={activeBanners.length > 1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation, EffectFade]}
        className="relative w-full h-full cursor-default"
        effect="fade"
        autoplay={{ delay: 5000 }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
     {activeBanners.map((banner, index) => (
  <SwiperSlide key={banner._id} className="h-full w-full">
    <div className="relative w-full h-full">
      <div className="absolute inset-0 w-full h-full">
        {banner.videos?.length > 0 ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => console.error("Video failed to load:", e)}
          >
            <source src={banner.videos[0]} type="video/mp4" />
          </video>
        ) : (
          <img
            src={banner.thumbnail}
            alt={banner.title}
            className="w-full h-full object-cover"
            onError={(e) => console.error("Thumbnail failed to load:", e)}
          />
        )}

        {/* overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div> */}

        {/* content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${banner._id}`}
                  className="lg:col-span-7 text-left text-white z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate={activeIndex === index ? "visible" : "hidden"}
                >
                  {/* {banner.name && (
                    <motion.p
                      variants={badgeVariants}
                      className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6"
                    >
                      {banner.name}
                    </motion.p>
                  )} */}
                  {/* <motion.h1
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-8 tracking-tight"
                    style={{
                      textShadow:
                        "0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)",
                    }}
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-2xl font-light"
                    style={{
                      textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                    }}
                  >
                    {banner.description}
                  </motion.p>
                  {banner.url && (
                    <motion.div variants={itemVariants}>
                      <Link
                        href={banner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center bg-white/10 backdrop-blur-md hover:bg-white hover:text-black text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 border border-white/20 hover:border-white/50 shadow-2xl"
                      >
                        <span className="mr-3">EXPLORE NOW</span>
                        <svg
                          className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  )} */}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}

      </Swiper>

      {/* Pagination Dots */}
      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10" />

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 16px;
          height: 16px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          opacity: 1;
          margin: 0 8px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-weight: 900;
        }
      `}</style>
    </div>
  );
};

export default SliderOne;
