"use client";
import { useState } from "react";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import Layout from "@/components/layouts/Layout";

export default function ContactUs({ announcements, products, categories }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/contact", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout announcements={announcements} products={products} categories={categories}>
      <SeoWrapper
        title="Contact Us - Thenuaims Perfume"
        description="Get in touch with Thenuaims Perfume for inquiries about our premium fragrances and services."
        canonicalUrl="https://thenuaimsperfume.com/contact"
      >
        <div className="container mx-auto px-4 pt-24 pb-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <div className="flex max-lg:flex-col gap-y-10">
            <div className="lg:w-2/3 lg:pr-4">
              <h3 className="text-xl font-semibold mb-3">Drop Us A Line</h3>
              <p className="text-gray-600 mb-6">
                Use the form below to get in touch with our fragrance team.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                  <div>
                    <input
                      className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="name"
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="email"
                      type="email"
                      placeholder="Your Email *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="message"
                      rows={4}
                      placeholder="Your Message *"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg text-white ${isSubmitting
                        ? "bg-gray-400 cursor-wait"
                        : "bg-blue-600 hover:bg-blue-700"
                      } transition-colors duration-300`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/3 lg:pl-4">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Our Store</h3>
                <p className="text-gray-600">
                  Thenuaims Perfume, Dubai, United Arab Emirates
                </p>
                <p className="text-gray-600 mt-3">
                  Contact: <span className="whitespace-nowrap">+971564451624</span>
                </p>
                <p className="text-gray-600 mt-1">
                  Email: <span className="whitespace-nowrap">contact@thenuaimsperfume.com</span>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Open Hours</h3>
                <p className="text-gray-600">
                  Mon - Fri: <span className="whitespace-nowrap">8:00am - 6:00pm GST</span>
                </p>
                <p className="text-gray-600 mt-3">
                  Saturday: <span className="whitespace-nowrap">9:00am - 4:00pm GST</span>
                </p>
                <p className="text-gray-600 mt-3">
                  Sunday: <span className="whitespace-nowrap">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SeoWrapper>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [announcementsRes, productsRes, categoriesRes] = await Promise.all([
      axiosInstance.get("/announcements"),
      axiosInstance.get("/products?featured=true"),
      axiosInstance.get("/categories?status=active"),
    ]);

    return {
      props: {
        announcements: announcementsRes.data?.announcements || [],
        products: productsRes.data?.products || [],
        categories: categoriesRes.data?.categories || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps (AboutUsPage):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    return {
      props: {
        announcements: [],
        products: [],
        categories: [],
      },
      revalidate: 3600,
    };
  }
}