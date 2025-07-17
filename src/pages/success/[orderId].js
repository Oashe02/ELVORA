"use client";
import React, { useEffect, useState, useRef } from "react";
import { useCart } from "react-use-cart";
import {
  CheckCircle,
  ShoppingBag,
  Truck,
  Mail,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

const SuccessPage = ({ announcements = [], orderId: initialOrderId }) => {
  const { emptyCart } = useCart();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get orderId from router query or props, with fallback
  const orderId = router.query.orderId || initialOrderId || null;

  const hasFetched = useRef(false);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!orderId) {
        setError("No order ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.post(`/orders/order-fullfill`, {
          orderId,
        });

        if (response.data && response.data.order) {
          setOrder(response.data.order);
          toast.success("Order placed successfully!");

          // Safe cart clearing with error handling
          try {
            emptyCart();
            if (typeof window !== "undefined") {
              localStorage.removeItem("react-use-cart");
            }
          } catch (cartError) {
            console.warn("Failed to clear cart:", cartError);
          }
        } else {
          setError("No order found with this ID.");
        }
      } catch (err) {
        console.error("Order fetch error:", err);
        setError("Could not retrieve order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have an orderId and haven't fetched yet
    if (orderId && !hasFetched.current) {
      hasFetched.current = true;
      getOrderDetails();
    } else if (!orderId) {
      setLoading(false);
      setError("No order ID provided.");
    }
  }, [orderId, emptyCart]);

  // Loading state
  if (loading) {
    return (
      <Layout announcements={announcements}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout announcements={announcements}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full text-center p-8 bg-white shadow-lg rounded-2xl">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Order Not Found
            </h1>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Fragrances
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // No order state
  if (!order) {
    return (
      <Layout announcements={announcements}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">No order data available.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Fragrances
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const title = `Order #${order.orderId} Confirmed | Parfum Elegance`;
  const description = `Thank you for your order! Your purchase of luxurious fragrances has been successfully processed. Order ID: ${order.orderId}.`;
  const canonicalUrl = `https://parfumelegance.com/success/${order.orderId}`;

  return (
    <Layout announcements={announcements}>
      <SeoWrapper
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
      >
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Order Confirmation Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse" />
              <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
                Thank You, {order?.profile?.firstName || "Customer"}{" "}
                {order?.profile?.lastName || ""}!
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Your fragrance order has been placed successfully.
              </p>
              <p className="text-md text-gray-500 mt-1">
                Order ID:{" "}
                <span className="font-semibold text-gray-800">#{order.orderId}</span>
              </p>
              <p className="text-md text-gray-500 mt-1">
                Order Date:{" "}
                <span className="font-semibold text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-md text-gray-500 mt-1">
                Order Status:{" "}
                <span className="font-semibold text-gray-800 capitalize">
                  {order.status}
                </span>
              </p>
              <p className="text-md text-gray-500 mt-1">
                Payment Method:{" "}
                <span className="font-semibold text-gray-800 capitalize">
                  {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                </span>
              </p>
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              {order?.products && order.products.length > 0 ? (
                <>
                  <ul className="divide-y divide-gray-200">
                    {order.products.map((item, index) => (
                      <li
                        key={item?._id || index}
                        className="py-4 flex items-center"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          {item.product?.thumbnail ? (
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.name || "Product Image"}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
                            />
                          ) : (
                            <ShoppingBag className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-semibold text-gray-800">
                            {item.product?.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            SKU: {item.product?.sku || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity || 1}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: <ServerPriceDisplay amount={item.price?.toFixed(2)} currency={order.currency} />
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          <ServerPriceDisplay amount={(item.price * item.quantity).toFixed(2)} currency={order.currency} />
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-md text-gray-700">
                      <span>Subtotal</span>
                      <span><ServerPriceDisplay amount={order.subtotal?.toFixed(2)} currency={order.currency} /></span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-md text-green-600 mt-2">
                        <span>Discount ({order.couponCode})</span>
                        <span>- <ServerPriceDisplay amount={order.discount?.toFixed(2)} currency={order.currency} /></span>
                      </div>
                    )}
                    <div className="flex justify-between text-md text-gray-700 mt-2">
                      <span>Tax ({order.taxRate}%)</span>
                      <span><ServerPriceDisplay amount={order.tax?.toFixed(2)} currency={order.currency} /></span>
                    </div>
                    <div className="flex justify-between text-md text-gray-700 mt-2">
                      <span>Shipping</span>
                      <span><ServerPriceDisplay amount={order.shippingCharge?.toFixed(2)} currency={order.currency} /></span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4">
                      <span>Total</span>
                      <span><ServerPriceDisplay amount={order.total?.toFixed(2)} currency={order.currency} /></span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  No fragrances found in this order.
                </p>
              )}
            </div>

            {/* Shipping and Support Info */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <Truck className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shipping To
                  </h2>
                </div>
                <div className="text-gray-700 space-y-1">
                  <p>
                    {order?.profile?.firstName || ""}{" "}
                    {order?.profile?.lastName || ""}
                  </p>
                  {order?.profile?.address && <p>{order.profile.address}</p>}
                  <p>
                    {order?.profile?.emirate && `${order.profile.emirate}, `}
                    {order?.profile?.country || "Country not specified"}
                  </p>
                  {order?.profile?.phone && (
                    <p>Phone: {order.profile.phone}</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <Mail className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Need Help?
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">Questions about your fragrance order? Contact us at:</p>
                <a
                  href="mailto:contact@thenuaimsperfume.com"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  contact@thenuaimsperfume.com
                </a>
                <p className="mt-4 text-gray-700">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <button
                onClick={() => router.push("/")}
                className="group inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Browse More Fragrances
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </SeoWrapper>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { orderId } = params || {};

  try {
    const announcementsRes = await axiosInstance.get("/announcements");
    return {
      props: {
        announcements: announcementsRes.data?.announcements || [],
        orderId: orderId || null,
      },
    };
  } catch (error) {
    console.error("Error fetching announcements:", error.message);
    return {
      props: {
        announcements: [],
        orderId: orderId || null,
      },
    };
  }
}

export default SuccessPage;