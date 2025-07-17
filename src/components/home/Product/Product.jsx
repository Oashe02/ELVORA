"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { useRouter } from "next/navigation";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

const Product = ({ product, style, productCount }) => {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(
      {
        ...product,
        id: product._id,
        productId: product._id,
        price: product.price,
        quantity: 1,
      },
      1
    );
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    router.push(`/product/${product.slug}`);
  };

  const percentSale = product.mrp
    ? Math.floor(100 - (product.price / product.mrp) * 100)
    : 0;

  const getCardClasses = () => {
    if (productCount <= 3) {
      return "w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[400px]";
    } else if (productCount === 4) {
      return "w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]";
    } else if (productCount === 5) {
      return "w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px]";
    } else {
      return "w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px]";
    }
  };


  const getImageHeight = () => {
  if (productCount <= 3) {
    return "h-[220px] sm:h-[260px] md:h-[300px]";
  } else if (productCount === 4) {
    return "h-[200px] sm:h-[240px]";
  } else if (productCount === 5) {
    return "h-[180px] sm:h-[220px] md:h-[240px]";
  } else {
    return "h-[160px] sm:h-[200px]";
  }
};


  return (
    <div
      className={`product-item group ${style} ${getCardClasses()}`}
      style={style}
    >
      <div className="product-main cursor-pointer block" onClick={handleViewDetail}>
        <div className="product-thumb bg-white relative overflow-hidden rounded-2xl group">
          {product.new && (
            <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-10">
              New
            </div>
          )}

          {product.sale && (
            <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-10">
              Sale
            </div>
          )}

          <div className={`product-img w-full ${getImageHeight()} relative`}>
            <Image
              src={product?.thumbnail}
              width={500}
              height={500}
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
            />
            <div className="overlay-buttons absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20 rounded-2xl">
              <button
                onClick={handleViewDetail}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-100 transition-all duration-200"
              >
                View Detail
              </button>
              <button
                onClick={handleAddToCart}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-black bg-opacity-90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white hover:bg-opacity-100 transition-all duration-200"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className="product-infor mt-4 lg:mb-7 px-1">
          <div className={`product-name text-black duration-300 cursor-pointer ${
            productCount <= 3 ? 'text-lg sm:text-xl font-semibold' : 'text-base font-medium'
          }`}>
            {product.name}
          </div>

          <div className="product-price-block flex items-center gap-2 flex-wrap mt-2">
            <div className={`product-price text-black ${
              productCount <= 3 ? 'text-lg sm:text-xl font-bold' : 'text-base font-semibold'
            }`}>
              <ServerPriceDisplay amount={product.price} />
            </div>

            {percentSale > 0 && (
              <>
                <div className={`product-origin-price text-secondary2 ${
                  productCount <= 3 ? 'text-base' : 'text-sm'
                }`}>
                  <del>
                    <ServerPriceDisplay amount={product.mrp} />
                  </del>
                </div>
                <div className={`product-sale text-black font-medium bg-green px-2 py-1 inline-block rounded-full ${
                  productCount <= 3 ? 'text-sm' : 'text-xs'
                }`}>
                  -{percentSale}%
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;