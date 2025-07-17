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
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T10%3A19%3A21.196Z-life+roses.jpg",

  },
  {
    title: "ON TIME ON BIRTHDAY PARTY",
    location: "DELIVERED IN AL AIN",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T10%3A17%3A50.433Z-orchids.jpg",

  },
  {
    title: "GENDER REVEAL PARTY",
    location: "DELIVERED IN RAS AL KHAIMA",
    date: "MAY 22, 2025",
    image:  "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T10%3A15%3A42.828Z-special+event.jpg",

  },
  {
    title: "SAME DAY ON ENGAGEMENT PARTY",
    location: "DELIVERED IN DUBAI",
    date: "MAY 22, 2025",
    image:   "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T12%3A24%3A15.544Z-basket-with-different-flowers-placed-desk.jpg",

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

const BlogSlider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
        <h3 className="text-2xl font-serif tracking-widest text-gray-800 uppercase mb-1">
          Our Blogs
        </h3>
        <div className="w-36 h-[2px] bg-green-600 mb-10"></div>

        <Slider {...settings}>
          {blogs.map((blog, index) => (
            <div key={index} className="px-2">
              <div className="bg-white text-left">
                <div className="w-full h-[220px] relative overflow-hidden rounded-sm">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-[17px] font-semibold text-gray-800 tracking-wide uppercase">
                    {blog.title}
                  </h4>
                  <p className="text-[17px] text-gray-600 uppercase mb-1">
                    {blog.location}
                  </p>
                  <p className="text-[14px] text-gray-500 mb-2">{blog.date}</p>
                  <button className="text-[13px] text-gray-700 tracking-wider uppercase hover:underline">
                    Read More &gt;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BlogSlider;
