"use client";

import React from "react";
import useSWR from "swr";
import { Instagram, AlertCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const Instagrams = () => {
  const { data, error, isLoading } = useSWR("/feed?limit=10&status=active", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  const posts = data?.posts || [];
  const activePosts = posts.filter(
    (post) => post.media && post.media.length > 0 && post.media[0].type === "image"
  );

  return (
    <div className="instagram-block py-20 bg-white relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            INSTAGRAM #PARFUM
          </h2>
        </div>

        {/* Instagram Posts Grid */}
        <div className="instagram-grid">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4 border border-gray-200">
                <Loader2 className="text-gray-600 animate-spin" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                Loading Instagram Posts
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Fetching the latest content from our feed...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 border border-red-200">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                Unable to Load Posts
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                We're having trouble connecting to Instagram right now
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gray-900 text-white rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          ) : activePosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {activePosts.map((post) => (
                <div
                  key={post.id}
                  className="instagram-post aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={post.media[0].url}
                      alt={post.caption || "Instagram post"}
                      className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    />
                    {/* Instagram overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Instagram className="text-white w-6 md:w-8 h-6 md:h-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4 border border-gray-200">
                <Instagram className="text-gray-600" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                No Posts Available
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Check back soon for new content from our Instagram feed
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm md:text-base font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg"
              >
                <Instagram size={18} />
                Visit Our Instagram
              </a>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {activePosts.length > 0 && (
          <div className="text-center mt-16">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm md:text-lg font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Instagram size={20} />
              Follow Us on Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instagrams;
