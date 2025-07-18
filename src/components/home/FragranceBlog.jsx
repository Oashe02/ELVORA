"use client";

import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const blogs = [
  {
    title: "SAME DAY ON MARRAIGE CERMONY",
    location: "DELIVERED IN ABU DHABI",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T18%3A26%3A44.025Z-blog_image1.png",

  },
  {
    title: "ON TIME ON BIRTHDAY PARTY",
    location: "DELIVERED IN AL AIN",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T18%3A27%3A17.982Z-blog_image2.png",

  },
  {
    title: "GENDER REVEAL PARTY",
    location: "DELIVERED IN RAS AL KHAIMA",
    date: "MAY 22, 2025",
    image:  "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T18%3A27%3A52.941Z-blog_image3.png",

  },
  {
    title: "SAME DAY ON ENGAGEMENT PARTY",
    location: "DELIVERED IN DUBAI",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T18%3A28%3A26.250Z-blog_image4.png",

  },
  {
    title: "ON TIME ON BIRTHDAY PARTY",
    location: "DELIVERED IN AL AIN",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T10%3A17%3A50.433Z-orchids.jpg",

  },
  {
    title: "SAME DAY ON ENGAGEMENT PARTY",
    location: "DELIVERED IN DUBAI",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T12%3A24%3A15.544Z-basket-with-different-flowers-placed-desk.jpg",

  },
 


];

const PrevArrow = ({ onClick }) => (
  <div
    className="custom-prev absolute -left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group mt-[-4.5rem]"
    onClick={onClick}
  >
    <Image
      src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A00.404Z-arrow_left_without_white_glow.png"
      alt="Previous"
      width={40}
      height={40}
      className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
    />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="custom-next absolute -right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 group  mt-[-4.5rem]"
    onClick={onClick}
  >
    <Image
      src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T11%3A35%3A55.700Z-arrow_right_without_white_glow.png"
      alt="Next"
      width={40}
      height={40}
      className="opacity-90 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#3096a5]"
    />
  </div>
);


const BlogSlider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };
  

  if (!mounted) return null; // Prevent SSR

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-[24.7px] uppercase font-[400] text-black font-[century] inline-block border-b-[1.8px] border-[#3096a5] leading-[1px] tracking-[0.05em] pb-5 mb-4">
          Our Blogs
        </h3>
        <div className="relative">

        <Slider {...settings}>
          {blogs.map((blog, index) => (
            <div key={index} className="px-2">
              <div className="bg-white text-left">
                <div className="w-full h-[180px] relative overflow-hidden ">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-[17px]  text-gray-800 tracking-wide uppercase">
                    {blog.title}
                  </h4>
                  <p className="text-[17px] text-gray-500 uppercase mb-1">
                    {blog.location}
                  </p>
                  <p className="text-[14px] text-gray-500 mb-2">{blog.date}</p>
                  <button className="text-[13px] text-black tracking-wider uppercase hover:underline">
                    Read More &gt;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
