"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 bg-white text-black font-sans antialiased">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 items-center">
        {/* Image Area */}
        <div>
          <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-md">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full object-cover object-center rounded-3xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col justify-center py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {testimonials[active].name}
            </h3>
            <p className="text-base text-gray-500 mb-6">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-gray-800 leading-relaxed font-medium">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(6px)", opacity: 0, y: 8 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Controls */}
          <div className="flex gap-4 pt-10">
            <button
              onClick={handlePrev}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition"
            >
              <IconArrowLeft className="h-5 w-5 text-gray-700 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition"
            >
              <IconArrowRight className="h-5 w-5 text-gray-700 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
