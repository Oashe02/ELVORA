// "use client";

// import React from "react";
// import Image from "next/image";
// import { Heart, ShoppingBag } from "lucide-react";
// import Link from "next/link";
// import ServerPriceDisplay from "../blocks/ServerPriceDisplay";

// const calculateDiscount = (mrp, price) => {
//   const m = parseFloat(mrp);
//   const p = parseFloat(price);
//   if (!m || !p || m <= p) return null;
//   const discount = ((m - p) / m) * 100;
//   return Math.round(discount);
// };

// const DynamicProductGrid = ({ title, products = [],showViewMore = true  }) => {
//   return (
//     <section className="py-12 px-4 bg-white font-sans">
//       <div className="max-w-6xl mx-auto">
//         {/* Section Title */}
//         <h2 className="text-[20px] md:text-[26px] uppercase font-[500] tracking-[0.2em] text-gray-800 mb-6 font-serif inline-block border-b-2 border-green-600 pb-1">
//           {title}
//         </h2>

//         {/* Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => {
//             const discount = calculateDiscount(product.mrp, product.price);
//             return (
//               <Link
//                 key={index}
//                 href={`/product/${product.slug}`}
//                 className="relative group overflow-hidden transition-all block"
//               >
//                 {/* Image & Heart Icon */}
//                 <div className="relative w-full h-96 overflow-hidden cursor-pointer border-gray-200 border-2 group">
//                   <div className="absolute inset-0 transition-all duration-700 ease-in-out transform group-hover:scale-105 group-hover:rotate-[0.5deg] group-hover:brightness-110">
//                     <Image
//                       src={product.thumbnail}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Heart Icon */}
//                   <button
//                     type="button"
//                     className="absolute top-2 right-2 z-10"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <Heart size={16} className="text-gray-300 hover:text-red-500" />
//                   </button>

//                   {/* Overlay Text */}
//                   <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[11px] text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wide font-medium">
//                     VIEW PRODUCT
//                   </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-3 flex items-start justify-between">
//                   <div className="text-left">
//                     <h3 className="text-[14px] font-semibold text-gray-900 tracking-wide mb-1 uppercase">
//                       {product.name}
//                     </h3>

//                     {/* Price Block */}
//                     <div className="flex items-center gap-2 text-sm">
//                       <ServerPriceDisplay
//                         amount={product.price}
//                         className="font-bold text-gray-600 text-sm"
//                       />
//                       {/* Uncomment for MRP & Discount:
//                       {product.mrp && product.mrp !== product.price && (
//                         <>
//                           <ServerPriceDisplay
//                             amount={product.mrp}
//                             className="line-through text-gray-400 text-xs"
//                           />
//                           {discount && (
//                             <span className="text-red-500 text-[11px] font-medium">
//                               ({discount}% OFF)
//                             </span>
//                           )}
//                         </>
//                       )} */}
//                     </div>
//                   </div>

//                   {/* Cart Icon */}
//                   <button
//                     type="button"
//                     className="hover:text-gray-300 p-[6px] transition"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <ShoppingBag
//                       size={24}
//                       className="text-gray-700 hover:text-green-300 transition"
//                     />
//                   </button>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* View More Button */}
//         {showViewMore && (
//   <div className="mt-10 flex justify-center">
//     <Link
//       href="#"
//       className="inline-block bg-gray-200 text-black px-6 py-2 text-sm tracking-wide font-medium rounded hover:bg-gray-700 transition hover:cursor-pointer"
//     >
//       VIEW MORE PRODUCTS &gt;
//     </Link>
//   </div>
// )}
//       </div>
//     </section>
//   );
// };

// export default DynamicProductGrid;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ServerPriceDisplay from "../blocks/ServerPriceDisplay";
import { useCart } from "react-use-cart";
import useWishlistStore from "@/store/wishlistStore";
import { toast } from "sonner";

const calculateDiscount = (mrp, price) => {
  const m = parseFloat(mrp);
  const p = parseFloat(price);
  if (!m || !p || m <= p) return null;
  const discount = ((m - p) / m) * 100;
  return Math.round(discount);
};

const DynamicProductGrid = ({ title, products = [], showViewMore = true }) => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToCartMap, setAddedToCartMap] = useState({});



  useEffect(() => {
    setIsClient(true);
  }, []);

  const isProductInWishlist = (id) => wishlist.some((item) => item.id === id || item._id === id);

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    const productId = product._id || product.id;

    if (isProductInWishlist(productId)) {
      removeFromWishlist(productId);
      toast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({ ...product, id: productId });
      toast(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
    const defaultSize = hasVariants ? "medium" : undefined;
  
    let selectedPrice = product.price;
  
    if (hasVariants) {
      const mediumVariant = product.variants.find((v) => v.size === "medium");
      if (mediumVariant) {
        selectedPrice = mediumVariant.price;
      }
    }
  
    addItem({
      id: product._id,
      ...product,
      size: defaultSize,
      price: selectedPrice, // this now aligns with the price shown
    });
  
    toast.success(`${product.name} added to cart`);
  };
  

  return (
    <section className="py-12 px-4 bg-white font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
<h2 className="text-[35px] uppercase font-[400]  text-black mb-6 font-[century] inline-block border-b-[1.8px] border-[#3096a5] leading-[1px] pb-6">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const discount = calculateDiscount(product.mrp, product.price);
            const inWishlist = isProductInWishlist(product._id);
            const isAdded = addedToCartMap[product._id];


            return (
              <Link
                key={index}
                href={`/product/${product.slug}`}
                className="relative group overflow-hidden transition-all block"
              >
                {/* Image & Heart Icon */}
                <div className="relative w-full h-96 overflow-hidden cursor-pointer border-gray-400 border-2 group">
                <div className="absolute inset-0 overflow-hidden">
  {/* Image with zoom and brightness effect */}
  <div className="absolute inset-0 transition-all duration-1000 ease-in-out transform group-hover:scale-105 group-hover:brightness-110">
    <Image
      src={product.thumbnail}
      alt={product.name}
      fill
      className="object-cover"
    />
  </div>

  {/* Soft gray overlay on hover */}
  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />
</div>

                  {/* Heart Icon */}
                  {isClient && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); 
                        handleWishlistToggle(e, product);
                      }}                      
                    >
                     <img
  src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T12%3A52%3A27.461Z-hearth.png"
  alt="Wishlist"
  className="w-[26px] h-[26px] transition-transform duration-300 hover:scale-110"
/>

                    </button>
                  )}

                  {/* Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20 text-white text-[18px] tracking-[0.05em] text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium">
  VIEW PRODUCT
</div>

                </div>

                {/* Product Info */}
                <div className="p-3 flex items-start justify-between">
                  <div className="text-left">
                  <h3 className="text-[14.93px] font-extrabold text-black  mb-1 uppercase">
  {/* {product.name} */} PRODUCT NAME 
</h3>


                    {/* Price Block */}
                    <div className="flex items-center gap-2 text-sm">
                    {(() => {
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;

  if (hasVariants) {
    const mediumVariant = product.variants.find((v) => v.size === "medium") || product.variants[0]; // fallback to first variant
    return (
      <ServerPriceDisplay
        amount={mediumVariant?.price}
        className=" text-gray-400 text-[16px]"
      />
    );
  } else {
    return (
      <ServerPriceDisplay
        amount={product.price}
        className="text-gray-400 text-[16px]"
      />
    );
  }
})()}
                      {/* MRP & Discount Logic (optional) */}
                      {/* {product.mrp && product.mrp !== product.price && (
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
  className="relative p-[6px] transition"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(e, product);
    setAddedToCartMap((prev) => ({
      ...prev,
      [product._id]: true,
    }));
  }}
  
>
<img
  src={
    isAdded
      ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T10%3A43%3A25.180Z-cart%20green.png"
      : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T10%3A17%3A30.203Z-cart%2B.png"
  }
  alt="Cart Icon"
  className="w-[17px] h-[27px] transition-transform duration-300"
/>
</button>



                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        {showViewMore && (
          <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="inline-block bg-[#949494] text-gray-200 px-6 py-2 text-base tracking-[0.05em] font-medium  hover:bg-[#3096a5] transition hover:cursor-pointer"
          >
            VIEW MORE PRODUCTS &nbsp; &gt;
          </Link>
        </div>
        )}
        </div>
        
    </section>
  );
};

export default DynamicProductGrid;
