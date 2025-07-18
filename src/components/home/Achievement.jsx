"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Achievements = () => {
  const stats = [
    { value: 500, label: "CLIENTS" },
    { value: 700, label: "EVENTS" },
    { value: 550, label: "5 STARS RATING" },
    { value: 900, label: "COLLECTIONS" },
  ];

  return (
    <section className="bg-[#ececec] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12">
          <h3 className="text-[24.7px] uppercase font-[400] text-black font-[century] inline-block border-b-[2px] border-[#3096a5] leading-[1px] tracking-[0.05em] pb-4">
            Achievements
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, index) => (
            <CounterBox
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterBox = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.4 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / 60;

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / 60);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-black"
    >
      <h4 className="text-[32px]   mb-1">{count}+</h4>
      <p className="uppercase text-[16px] tracking-widest font-bold">{label}</p>
    </motion.div>
  );
};

export default Achievements;
