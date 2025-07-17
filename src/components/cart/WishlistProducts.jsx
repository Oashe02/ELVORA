"use client";

import { useCart } from "react-use-cart";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useWishlistStore from "@/store/wishlistStore";
import { toast } from "sonner";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

export default function WishlistProducts() {
  const { addItem } = useCart();
  const { wishlist, removeFromWishlist } = useWishlistStore();

  const handleAddToCart = (product) => {
    addItem({ id: product._id, ...product });
    removeFromWishlist(product._id);
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Image src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-14T11%3A50%3A03.214Z-empty.jpg" width={100} height={100} alt="Empty" className="mb-4 rounded-xl" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-6 max-w-md">Start adding items you love to keep track of them!</p>
        <Button className="bg-black text-white hover:bg-gray-500 px-6 py-3">Explore Now</Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-center text-xl font-semibold text-gray-700 mb-4 border-b pb-2">MY FAVOURITES</h2>

      <div className="grid grid-cols-1 gap-4">
        {wishlist.map((product) => (
          <div key={product._id} className="flex items-start gap-4 border-b pb-4">
            {/* Image and Remove */}
            <div className="relative w-24 h-24 shrink-0">
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover "
              />
              <Button
                onClick={() => handleRemoveFromWishlist(product._id, product.name)}
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 bg-white shadow-md p-1 border border-gray-400"
              >
                <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-500 " />
              </Button>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.shortDescription}</p>
              <ul className="text-xs text-gray-600 space-y-0.5 mb-3">

              {product.redeemPoints && (
    <li className="text-pink-600 font-semibold">
      Redeem Points: {product.redeemPoints}
    </li>
  )}                <li>Color: {product.color}</li>
                <li>Fragrance Level: {product.fragranceLevel}</li>
                <li>Flower Type: {product.flowerType}</li>
              </ul>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">
                  <ServerPriceDisplay amount={product.price.toFixed(2)} />
                </span>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="text-xs bg-gray-500 text-white hover:bg-black px-4"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" /> ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button className="bg-gray-500 text-white hover:bg-black px-6 py-2 rounded-none text-sm font-medium">
          SEE ALL MY FAVOURITES
        </Button>
      </div>
    </div>
  );
}
