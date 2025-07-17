"use client";
import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b pb-4">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center justify-between w-full text-left text-gray-800 font-medium py-3"
            >
              {item.question}
              {isOpen ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
            {isOpen && (
              <div className="pt-2">
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function FaqSection({ faqs = [] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 10);
  const mid = Math.ceil(visibleFaqs.length / 2);
  const left = visibleFaqs.slice(0, mid);
  const right = visibleFaqs.slice(mid);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-left tracking-wide font-serif">
        F. A. Q’s
      </h2>
      <div className="w-36 h-[2px] bg-green-600 mt-2"></div>

      <p className="text-left text-gray-500 max-w-6xl mb-6 mt-3">
        We are dedicated to offering you the finest flower delivery service experience. If you don’t find the answer to your question here, please don’t hesitate to contact us via phone or email.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Accordion items={left} />
        <Accordion items={right} />
      </div>

      {/* Show More Button */}
      {!showAll && faqs.length > 10 && (
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <button className="text-[14px] tracking-wide uppercase bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-500 transition hover:cursor-pointer">
        View More FAQs&gt;
        </button>
      </motion.div>
      )}
    </section>
  );
}
