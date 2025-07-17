import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { X, Trash, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";
import { toast } from "sonner";

const ShoppingCart = ({ onClose }) => {
  const { items, removeItem, cartTotal, totalItems, emptyCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(300);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          emptyCart();
          toast("Your cart has expired and has been cleared.", {
            style: { background: "#fee2e2", color: "#b91c1c" },
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [items.length, emptyCart]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      await router.push("/checkout");
      setIsProcessing(false);
    } catch (error) {
      console.error("Error navigating to checkout:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden w-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="hover:bg-gray-100 rounded-full h-8 w-8 p-0"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-sm">
              Start adding items you love!
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {items.map((item) => (
              <div key={item.id || item._id} className="flex border-b pb-4">
                <div className="w-24 h-24 relative mr-4">
                  <img
                    src={item.thumbnail || item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.shortDescription || "Add some details of the selected product"}
                      </p>
                      <ul className="text-xs text-gray-600 mb-2 space-y-1">
                        {item.size && <li>Size: {item.size}</li>}
                        {item.color && <li>Color: {item.color}</li>}
                        {item.fragranceLevel && <li>Fragrance: {item.fragranceLevel}</li>}
                        {item.flowerType && <li>Flower Type: {item.flowerType}</li>}
                        {item.redeemPoints && (
                          <li className="text-pink-600 font-semibold">
                            Redeem Points: {item.redeemPoints}
                          </li>
                        )}
                      </ul>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-8 border border-gray-300 flex items-center justify-center text-sm">
                          {item.quantity || 1}
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                          <ServerPriceDisplay amount={Number(item.price).toFixed(2)} />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              <ServerPriceDisplay amount={cartTotal.toFixed(2)} />
            </span>
          </div>

          <Button
            className="w-full bg-gray-500 hover:bg-gray-800 text-white h-12 font-medium text-base rounded transition-all duration-200"
            disabled={isProcessing}
            onClick={handleCheckout}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Circle size={20} className="animate-spin" /> Processing...
              </span>
            ) : (
              "CHECK OUT"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
