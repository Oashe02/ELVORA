"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import useIsProductDetailPage from "../utils/useIsProductDetailPage"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules" // <- Missing import

const BestSellerSection = ({ data = [], limit = 10 }) => {
  const feed = data.slice(0, limit)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [swiperReady, setSwiperReady] = useState(false)
  const isProductDetailPage = useIsProductDetailPage()

  // Create refs for custom navigation
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const openModal = (index) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)
  const prevItem = () => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : feed.length - 1))
  const nextItem = () => setSelectedIndex((prev) => (prev + 1) % feed.length)

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Instagram Diaries */}
        <div className="flex items-center justify-between mb-2">
          <div className="mb-6">
            <h3 className="text-[24.7px] uppercase font-[400] text-black font-[century] inline-block border-b-[1.8px] border-[#3096a5] leading-[1px] tracking-[0.05em] pb-6">
              Instagram Diaries
            </h3>
          </div>
          <p className="text-2xl tracking-wide text-gray-500 mr-[4rem]">@ELVORA.AE</p>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-12">
          {/* Custom Navigation Arrows */}
          <div
            ref={prevRef}
            className="custom-prev absolute -left-[3.5rem] top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group"
          >
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A00.404Z-arrow_left_without_white_glow.png"
              alt="Previous"
              width={40}
              height={40}
              className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
            />
          </div>
          <div
            ref={nextRef}
            className="custom-next absolute -right-[3.5rem] top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group"
          >
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A55.700Z-arrow_right_without_white_glow.png"
              alt="Next"
              width={40}
              height={40}
              className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
            />
          </div>

          {/* Swiper Gallery */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            onInit={() => setSwiperReady(true)}
            breakpoints={{
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {feed.map((item, index) => {
              const media = item.media?.[0]
              if (!media) return null

              return (
                <SwiperSlide key={item._id?.$oid || index}>
                  <div className="relative group overflow-hidden cursor-pointer" onClick={() => openModal(index)}>
                    {media.type === "image" ? (
                      <Image
                        src={media.url || "/placeholder.svg"}
                        alt={item.caption || `Instagram ${index}`}
                        width={300}
                        height={350}
                        className="object-cover w-full h-[260px] "
                      />
                    ) : (
                      <div className="relative w-full h-[260px] bg-black rounded-sm">
                        <video src={media.url} className="w-full h-full object-cover" muted playsInline />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Modal Viewer */}
        <AnimatePresence>
          {selectedIndex !== null && feed[selectedIndex]?.media?.[0] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-white  p-4 text-center"
              >
                <div className="relative w-full aspect-video bg-black  overflow-hidden">
                  {feed[selectedIndex].media[0].type === "image" ? (
                    <Image
                      src={feed[selectedIndex].media[0].url || "/placeholder.svg"}
                      alt="popup"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      muted
                      playsInline
                      src={feed[selectedIndex].media[0].url}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Text Info */}
                <div className="mt-4 space-y-2">
                  <p className="text-gray-800 text-lg font-semibold">{feed[selectedIndex].caption}</p>
                  <p className="text-gray-500 text-sm">Created by: {feed[selectedIndex].createdBy}</p>
                  <div className="flex justify-center flex-wrap gap-2 mt-2">
                    {feed[selectedIndex].tags?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs ">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute top-4 right-4 text-white cursor-pointer text-2xl" onClick={closeModal}>
                  ×
                </div>
                <div
                  className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-white text-3xl"
                  onClick={prevItem}
                >
                  ‹
                </div>
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-white text-3xl"
                  onClick={nextItem}
                >
                  ›
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Best Seller Section */}
        {!isProductDetailPage && (
          <div className="max-w-4xl mx-auto text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[24.7px] uppercase font-[400] text-black font-[century] inline-block border-b-[1.8px] border-[#3096a5] leading-[1px] tracking-[0.05em] pb-5 mb-4"
            >
              The Best Seller In UAE
            </motion.h2>
           <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[13px] md:text-[15px] text-gray-400 leading-loose space-y-6 text-justify"
            >
              <p>
                ÉLVORA has blossomed into the UAE's most trusted and beloved online flower shop, with a powerful
                presence across Dubai, Abu Dhabi, Sharjah, Al Ain, and Ras Al Khaimah. We proudly offer an unparalleled
                collection of over 500 stunning floral arrangements, expertly curated to suit every emotion, taste, and
                occasion. Each flower bouquet is a masterpiece, handcrafted using only the freshest, most vibrant blooms
                sourced from renowned growers, ensuring unrivalled beauty and longevity.
              </p>
              <p>
                As a top-rated florist in Dubai, we're known not just for our artistry but also for our lightning-fast
                flower delivery Dubai, offering both same-day and 60-minute service. With ÉLVORA, you never have to
                choose between speed and quality; you get both, always with the best flower delivery in Dubai.
              </p>
              <p>
                Each arrangement showcases our unwavering dedication, artistic flair, and attention to detail,
                establishing ÉLVORA as the preferred choice for flower delivery throughout Dubai and the UAE.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <button className="text-[18px] tracking-wide uppercase bg-gray-300 px-6 py-2 text-gray-800 hover:bg-[#3096a5] transition hover:cursor-pointer">
                Read More &gt;
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default BestSellerSection
