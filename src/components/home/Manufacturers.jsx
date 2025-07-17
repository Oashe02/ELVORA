import React, { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import Link from "next/link";

const Manufacturers = ({ activeManufacturersString }) => {
  const swiperElRef = useRef(null);
  const activeManufacturers = JSON.parse(activeManufacturersString || "[]");

  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      register();

      const swiperEl = swiperElRef.current;

      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 24,
        grabCursor: true,
        loop: activeManufacturers.length > 4,
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 20 },
          480: { slidesPerView: 2, spaceBetween: 24 },
          640: { slidesPerView: 2, spaceBetween: 28 },
          768: { slidesPerView: 3, spaceBetween: 32 },
          1024: { slidesPerView: 4, spaceBetween: 36 },
          1280: { slidesPerView: 4, spaceBetween: 40 },
        },
      };

      if (windowWidth >= 1280) {
        swiperParams.slidesPerView = 4;
      }

      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
  }, [activeManufacturers.length, windowWidth, isClient]);

  const handlePrev = () => {
    if (swiperElRef.current) {
      swiperElRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperElRef.current) {
      swiperElRef.current.swiper.slideNext();
    }
  };

  const handleManufacturerClick = (manufacturer) => {
    console.log(`Navigating to manufacturer: ${manufacturer.slug}`);
  };

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "No description available.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Top Manufacturers
          </h2>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
            hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200
            absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
            hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200
            absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Swiper container */}
        <div className="relative overflow-visible">
          <swiper-container
            ref={swiperElRef}
            className="manufacturers-swiper w-full"
            init="false"
          >
            {activeManufacturers.map((manufacturer, idx) => (
              <swiper-slide
                key={idx}
                className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[340px]"
              >
                <div
                  className="group cursor-pointer transition-all duration-300 h-full"
                  onClick={() => handleManufacturerClick(manufacturer)}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 w-full flex flex-col h-full">
                    {/* Sale Badge */}
                    {manufacturer.isOnSale && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Main Image */}
                    <div className="relative h-[280px] sm:h-[310px] md:h-[340px] lg:h-[360px] overflow-hidden bg-gray-100">
                      <img
                        src={manufacturer.thumbnail || "/placeholder-image.jpg"}
                        alt={manufacturer.name || "Product Image"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-10">
                        <Link href={`/manufacturer/${manufacturer?.slug}`}>
                          <button className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                            Quick View
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Color Options */}
                    {manufacturer.colors?.length > 0 && (
                      <div className="absolute bottom-[100px] left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-10">
                        <div className="flex space-x-2">
                          {manufacturer.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                              style={{ backgroundColor: color.hex || color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="p-6 flex flex-col justify-start space-y-3 mt-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
                        {manufacturer.name || "Unnamed Manufacturer"}
                      </h3>
                      <p className="text-base text-gray-600 line-clamp-2">
                        {truncateDescription(manufacturer.shortDescription, 30)}
                      </p>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </section>
  );
};

export default Manufacturers;
