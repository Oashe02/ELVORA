import React from "react";
import { Truck, Headphones, Shield } from "lucide-react";

const Benefit = ({ props = "" }) => {
  const benefits = [
    {
      icon: <Truck className="w-8 h-8" aria-label="Free Delivery Icon" />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones className="w-8 h-8" aria-label="Customer Service Icon" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <Shield className="w-8 h-8" aria-label="Money Back Guarantee Icon" />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 relative">
        <div className={`benefit-block ${props}`}>
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-base md:text-xl font-semibold text-black mb-2 tracking-wide">
              WHY CHOOSE US
            </h2>
            <p className="text-[11px] md:text-sm text-gray-600 font-medium tracking-wide">
              Our Delicious, Limited-Edition Collection
            </p>
          </div>

          <div className="list-benefit flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-item flex-1 flex flex-col items-center text-center p-5 md:p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4 hover:scale-105 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-xs md:text-sm font-semibold text-black mb-2 tracking-wide leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-[11px] md:text-xs text-gray-600 leading-normal">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
