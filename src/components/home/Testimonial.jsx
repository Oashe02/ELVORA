// "use client";

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const StarBox = () => (
//   <div className="w-8 h-8 bg-black/80 flex items-center justify-center">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="#fff"
//       viewBox="0 0 24 24"
//       className="w-5.5 h-5.5"
//     >
//       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//     </svg>
//   </div>
// );

// const TickBox = () => (
//   <div className="w-7 h-7 flex items-center justify-center mb-[1rem] ml-[1rem]">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="#b5b5b5"
//       viewBox="0 0 24 24"
//       className="w-4.5 h-4.5"
//     >
//       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//     </svg>
//   </div>
// );

// const TestimonialSlider = ({ data = [], limit = 10 }) => {
//   const reviews = data.slice(0, limit);


//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3500,
//     responsive: [
//       { breakpoint: 1280, settings: { slidesToShow: 4 } },
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <section className="bg-[#e9e9e9] py-10">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Title */}
//         <div className="text-center mb-10">
//           <h2 className="text-black font-medium text-2xl tracking-[0.2em] uppercase">
//             WHAT OUR CUSTOMERS SAYING
//           </h2>
//         </div>

//         {/* Slider */}
//         <Slider {...settings}>
//           {reviews.map((item, idx) => (
//             <div key={idx} className="px-3 w-[320px]">
//               <div className="bg-[#e9e9e9] h-full min-h-[220px] flex flex-col text-left px-4">
//                 {/* Stars + Verified */}
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex gap-1">
//                     {[...Array(item.rating)].map((_, i) => (
//                       <StarBox key={i} />
//                     ))}
//                   </div>
//                   {item.verified && (
//                     <div className="flex items-center justify-end text-xs text-gray-700 mt-[0.3rem]">
//                       <div className="flex items-center">
//                         <TickBox />
//                         <span className="text-[10px] tracking-wide">VERIFIED</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Name */}
//                 <h4 className="text-sm font-medium text-gray-800 mb-2 uppercase">
//                   {item.userName}
//                 </h4>

//                 {/* Comment */}
//                 <p className="text-xs text-gray-700 leading-snug mb-3 uppercase">
//                   {item.comment}
//                 </p>

//                 {/* Footer (title as sub-comment) */}
//                 <p className="text-xs font-medium text-gray-700 mt-[2rem] uppercase">
//                   {item.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSlider;

"use client"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Image from "next/image"

// Styles
import "swiper/css"
import "swiper/css/navigation"

const StarBox = () => (
  <div className="w-6 h-6 bg-black/80 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  </div>
)

const TickBox = () => (
  <div className="w-6 h-6 flex items-center justify-center mb-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#b5b5b5"
      viewBox="0 0 24 24"
      className="w-4.5 h-4.5"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  </div>
)

const TestimonialSlider = ({ data = [], limit = 10 }) => {
  const [isClient, setIsClient] = useState(false)
  const reviews = data.slice(0, limit)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !reviews.length) return null

  return (
    <section className="bg-[#e9e9e9] py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-black font-medium text-2xl tracking-[0.2em] uppercase">
            WHAT OUR CUSTOMERS SAYING
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          slidesPerGroup={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1 },
            640: { slidesPerView: 2, slidesPerGroup: 1 },
            1024: { slidesPerView: 3, slidesPerGroup: 1 },
            1280: { slidesPerView: 4, slidesPerGroup: 1 },
          }}
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx} className="px-2">
              <div className="bg-[#e9e9e9] h-full min-h-[220px] flex flex-col text-left px-4 py-3">
                {/* Rating & Verified */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <StarBox key={i} />
                    ))}
                  </div>
                  {item.verified && (
                    <div className="flex items-center text-xs text-gray-700 mt-[0.3rem]">
                      <TickBox />
                      <span className="text-[10px] tracking-wide">VERIFIED</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h4 className="text-sm font-medium text-gray-800 mb-2 uppercase">
                  {item.userName}
                </h4>

                {/* Comment */}
                <p className="text-xs text-gray-700 leading-snug mb-3 uppercase">
                  {item.comment}
                </p>

                {/* Footer Title */}
                <p className="text-xs font-medium text-gray-700 mt-auto uppercase">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="custom-prev absolute -left-1 ml-[2.5rem] top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 hover:shadow-xl hover:scale-110 hover:rounded-lg transition duration-300 group">
          <Image
            src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A58%3A10.808Z-back.png"
            alt="Previous"
            width={40}
            height={40}
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <div className="custom-next absolute -right-1 mr-[2.5rem] top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 hover:shadow-xl hover:rounded-lg hover:scale-110 transition duration-300 group">
          <Image
            src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-12T07%3A59%3A01.528Z-front.png"
            alt="Next"
            width={40}
            height={40}
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      <style jsx global>{`
        .swiper-slide {
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

export default TestimonialSlider

