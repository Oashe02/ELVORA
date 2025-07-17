"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ServerPriceDisplay from "../components/blocks/ServerPriceDisplay";

const calculateDiscount = (mrp, price) => {
  const m = parseFloat(mrp);
  const p = parseFloat(price);
  if (!m || !p || m <= p) return null;
  return Math.round(((m - p) / m) * 100);
};

const RecommendedProductsSlider = ({ title = "You May Also Like", products = [] }) => {
  return (
    <section className="py-12 px-4 bg-white font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[20px] md:text-[26px] uppercase font-[500] tracking-[0.2em] text-gray-800 mb-6 font-serif inline-block border-b-2 border-green-600 pb-1">
          {title}
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={20}
          loop
        >
          {products.map((product, index) => {
            const discount = calculateDiscount(product.mrp, product.price);
            return (
              <SwiperSlide key={index}>
                <Link
                  href={`/product/${product.slug}`}
                  className="relative group block overflow-hidden  shadow hover:shadow-lg transition-all"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-3 flex items-start justify-between">
                  <div className="text-left">
                    <h3 className="text-[14px] font-semibold text-gray-900 tracking-wide mb-1 uppercase">
                      {product.name}
                    </h3>

                    {/* Price Block */}
                    <div className="flex items-center gap-2 text-sm">
                      <ServerPriceDisplay
                        amount={product.price}
                        className="font-bold text-gray-600 text-sm"
                      />
                      {/* Uncomment for MRP & Discount:
                      {product.mrp && product.mrp !== product.price && (
                        <>
                          <ServerPriceDisplay
                            amount={product.mrp}
                            className="line-through text-gray-400 text-xs"
                          />
                          {discount && (
                            <span className="text-red-500 text-[11px] font-medium">
                              ({discount}% OFF)
                            </span>
                          )}
                        </>
                      )} */}
                    </div>
                  </div>

                  {/* Cart Icon */}
                  <button
                    type="button"
                    className="hover:text-gray-300 p-[6px] transition"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ShoppingBag
                      size={24}
                      className="text-gray-700 hover:text-green-300 transition"
                    />
                  </button>
                </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default RecommendedProductsSlider;
