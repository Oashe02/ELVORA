"use client";

import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

export default function RecommendedProducts({ cartItems = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetchRecommendedProducts();
  }, [cartItems]); // Re-fetch when cartItems change

const fetchRecommendedProducts = async () => {
  try {
    setLoading(true);
    // Construct query string from cart item names
    const productNames = cartItems.map((item) => item.name).join(",");
    const query = productNames ? `?productNames=${encodeURIComponent(productNames)}` : "";
    const response = await axiosInstance.get(`/products/recommended${query}`);
    setProducts(response.data);
  } catch (error) {
    console.error("Failed to fetch recommended products:", error);
  } finally {
    setLoading(false);
  }
};

const handleAddToCart = (product) => {
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

  if (loading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-full">
              <div className="w-full pt-[100%] bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded mt-4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {products.map((product) => (
          <Card
            key={product._id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
          >
            <div className="relative w-full pt-[100%] bg-gray-50">
              <div className="absolute inset-0">
                <Image
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-900">
                  <ServerPriceDisplay amount={product.price?.toFixed(2) || "0.00"} />
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    <ServerPriceDisplay amount={product.mrp.toFixed(2)} />
                  </span>
                )}
              </div>

              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-black text-white hover:bg-gray-800 mt-auto"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}