"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Collection = ({ activeCategoriesString }) => {
  const [isClient, setIsClient] = useState(false);

  let activeCategories = [];
  try {
    activeCategories = JSON.parse(activeCategoriesString || "[]");
  } catch (error) {
    console.error("Failed to parse activeCategoriesString:", error);
  }

  const validCategories = activeCategories.filter(
    (category) =>
      category &&
      category._id &&
      category.name &&
      category.slug &&
      category.thumbnail &&
      category.shortDescription &&
      category.status === "active"
  );

  const categories = [...validCategories].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient || categories.length === 0) return null;

  return (
    <section className="py-14 bg-white relative overflow-visible">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">
        <h2 className="text-[35px] uppercase font-[400] text-black mb-8 font-[century] inline-block border-b-[1.8px] border-[#3096a5] leading-[1px] pb-6 tracking-[0.05em] ml-[2rem]">
          Categories
        </h2>

        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={7}
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
                slidesPerView: 7,
                spaceBetween: 24,
              },
            }}
            className="categories-swiper"
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={cat._id || index} className="!w-[167px]">
                <Link href={`/category/${cat.slug}`}>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div
                      className="w-[167px] h-[235px] bg-gray-300 overflow-hidden bg-center bg-cover relative"
                      style={{ backgroundImage: `url(${cat.thumbnail})` }}
                    >
                      <div className="absolute inset-0 bg-black/0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-100" />
                    </div>
                    <p className="text-md text-center font-extrabold text-black mt-3 tracking-wide uppercase">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {/* Custom Navigation Arrows with Glow Hover Effect */}
<div className="custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group">
  <Image
    src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A00.404Z-arrow_left_without_white_glow.png"
    alt="Previous"
    width={40}
    height={40}
    className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
  />
</div>

<div className="custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group">
  <Image
    src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A55.700Z-arrow_right_without_white_glow.png"
    alt="Next"
    width={40}
    height={40}
    className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5] "
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
  );
};

export default Collection;
