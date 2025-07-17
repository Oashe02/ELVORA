"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import SeoWrapper from "@/components/blocks/SeoWrapper";
import Layout from "@/components/layouts/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown";
import { SlidersHorizontal, ArrowDownUp, X } from "lucide-react";
import ProductFilters from "@/components/home/ProductFilters";
import Product from "@/components/home/Product/Product";
import DynamicProductGrid from "@/components/home/TabFeatures";

export default function Search({
  announcements,
  searchResults: initialSearchResults,
  totalDocs: initialTotalDocs,
  totalPages: initialTotalPages,
  page: initialPage,
  initialQuery,
  banners,
  categories,
}) {
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Normalize initialQuery to handle query vs q parameter
  const normalizedQuery = initialQuery?.q
    ? initialQuery
    : { q: initialQuery?.query || "", ...initialQuery };

  // State management
  const [searchTerm, setSearchTerm] = useState(normalizedQuery.q || "");
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentSearchesVisible, setRecentSearchesVisible] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(initialSearchResults || []);
  const [totalDocs, setTotalDocs] = useState(initialTotalDocs || 0);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [page, setPage] = useState(initialPage || 1);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [error, setError] = useState(null);
  const [facets, setFacets] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Initialize local filters
  const [localFilters, setLocalFilters] = useState({
    q: normalizedQuery.q || "",
    categories: normalizedQuery.category ? normalizedQuery.category.split(",") : [],
    manufacturers: normalizedQuery.manufacturer ? normalizedQuery.manufacturer.split(",") : [],
    makes: normalizedQuery.make ? normalizedQuery.make.split(",") : [],
    models: normalizedQuery.model ? normalizedQuery.model.split(",") : [],
    minPrice: parseFloat(normalizedQuery.minPrice) || 0,
    maxPrice: parseFloat(normalizedQuery.maxPrice) || 50000,
    sortBy: normalizedQuery.sortBy || "relevance",
  });

  // Load recent searches from localStorage
  useEffect(() => {
    const recentSearchesFromStorage = localStorage.getItem("recentSearches");
    if (recentSearchesFromStorage) {
      setRecentSearches(JSON.parse(recentSearchesFromStorage));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRecentSearchesVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch autocomplete suggestions
  const fetchAutocompleteSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}&limit=10`);
        setAutocompleteResults(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch autocomplete suggestions:", error);
        setAutocompleteResults([]);
        setError("Failed to load suggestions. Please try again.");
      }
    } else {
      setAutocompleteResults([]);
    }
  };

  // Handle input change for search
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setLocalFilters((prev) => ({ ...prev, q: query }));
    if (query) {
      fetchAutocompleteSuggestions(query);
      setRecentSearchesVisible(false);
    } else {
      setRecentSearchesVisible(true);
    }
  };

  // Handle recent search deletion
  const handleDeleteSearch = (search) => {
    const updatedRecentSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
    setRecentSearchesVisible(true);
  };

  // Handle search submission
  const handleSubmit = async (e, query = searchTerm) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const updatedRecentSearches = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));

      const updatedFilters = { ...localFilters, q: query, page: 1 };
      setLocalFilters(updatedFilters);

      const apiFilters = {
        q: updatedFilters.q,
        // category: updatedFilters.categories.join(","),
        categories: updatedFilters.categories.join(","),

        manufacturer: updatedFilters.manufacturers.join(","),
        make: updatedFilters.makes.join(","),
        model: updatedFilters.models.join(","),
        minPrice: updatedFilters.minPrice,
        maxPrice: updatedFilters.maxPrice,
        page: updatedFilters.page,
        limit: 20,
        sortBy: updatedFilters.sortBy,
      };
      Object.entries(apiFilters).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          delete apiFilters[key];
        }
      });


      const queryString = new URLSearchParams(apiFilters).toString();
      const response = await axiosInstance.get(`/products/search?${queryString}`);

      setSearchResults(response.data.results || []);
      setTotalDocs(response.data.total || 0);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.page || 1);

      router.push(`/search?${queryString}`, undefined, { shallow: true });
      setRecentSearchesVisible(false);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setTotalDocs(0);
      setTotalPages(1);
      setPage(1);
      setError("Failed to load search results. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch sidebar filters
  const getFilters = async () => {
    try {
      const queryString = new URLSearchParams({ q: searchTerm || "all" }).toString();
      const response = await axiosInstance.get(`/products/sidebar-filters?${queryString}`);
      setFacets(response.data.facets || {});

      if (response.data.facets?.priceRange) {
        setLocalFilters((prev) => ({
          ...prev,
          minPrice: prev.minPrice || response.data.facets.priceRange.minPrice || 0,
          maxPrice: prev.maxPrice || response.data.facets.priceRange.maxPrice || 50000,
        }));
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
      setFacets(null);
      setError("Failed to load filter options.");
    }
  };





  // Apply filters
  const applyFilter = async (newFilters) => {
    setIsSearching(true);
    setIsOpenDrawer(false);
    setError(null);

    const updatedFilters = { ...localFilters, ...newFilters, page: 1 };
    setLocalFilters(updatedFilters);
    setSearchTerm(updatedFilters.q);

    const apiFilters = {
      q: updatedFilters.q,
      categories: updatedFilters.categories.join(","),

      manufacturer: updatedFilters.manufacturers.join(","),
      make: updatedFilters.makes.join(","),
      model: updatedFilters.models.join(","),
      minPrice: updatedFilters.minPrice,
      maxPrice: updatedFilters.maxPrice,
      page: updatedFilters.page,
      limit: 20,
      sortBy: updatedFilters.sortBy,
    };
    Object.entries(apiFilters).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete apiFilters[key];
      }
    });


    const queryString = new URLSearchParams(apiFilters).toString();

    try {
      const response = await axiosInstance.get(`/products/search?${queryString}`);
      setSearchResults(response.data.results || []);
      setTotalDocs(response.data.total || 0);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.page || 1);

      router.push(`/search?${queryString}`, undefined, { shallow: true });
    } catch (error) {
      console.error("Error applying filters:", error);
      setSearchResults([]);
      setTotalDocs(0);
      setTotalPages(1);
      setPage(1);
      setError("Failed to apply filters. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    const clearedFilters = {
      q: searchTerm,
      categories: [],
      manufacturers: [],
      makes: [],
      models: [],
      minPrice: facets?.priceRange?.minPrice || 0,
      maxPrice: facets?.priceRange?.maxPrice || 50000,
      sortBy: "relevance",
    };
    setLocalFilters(clearedFilters);
    setSearchTerm(clearedFilters.q);
    applyFilter(clearedFilters);
  };

  // Change page
  const changePage = (pgnum) => {
    setPage(pgnum);
    window.scrollTo({ top: 0, behavior: "smooth" });
    applyFilter({ ...localFilters, page: pgnum });
  };

  // Fetch filters and initial results
  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q);
      setLocalFilters((prev) => ({ ...prev, q: router.query.q }));
      applyFilter({ ...localFilters, q: router.query.q });
    }
  }, [router.query.q]);


  // Window width
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);


   const renderSearchResults = () => {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Search Results - {searchTerm}
            </h2>
            <p className="text-gray-600 mt-2">{totalDocs} products found</p>
          </div>

      
          {searchResults.length === 0 ? (
 <div className="text-center py-12 bg-white rounded-lg shadow-sm">
 <p className="text-lg font-medium text-gray-700">No products found{searchTerm ? ` for "${searchTerm}"` : ""}</p>
 <p className="text-gray-500 mt-2">Try different keywords or browse categories</p>
 <Link href="/categories" className="mt-4 inline-block text-blue-600 hover:underline">
   Browse Categories
 </Link>
</div>) : (
  <DynamicProductGrid  products={searchResults}  showViewMore={false}/>
)}
        </div>
      </section>
    );
  };


  // Check if any filters are applied
  const isFilterActive = Object.entries(localFilters).some(
    ([key, value]) =>
      (Array.isArray(value) && value.length > 0) ||
      (key === "minPrice" && value > (facets?.priceRange?.minPrice || 0)) ||
      (key === "maxPrice" && value < (facets?.priceRange?.maxPrice || 50000)),
  );

  const FilterComponent = ({ isDrawer }) => (
    <div
      className={`${isDrawer ? "z-50 block px-3 pb-32 md:hidden" : "hidden md:block"} sticky top-32 w-full md:min-w-[18rem] md:max-w-[18rem] md:mr-6`}
    >
      <div className="flex items-center justify-between mb-4">
        {isDrawer && <X onClick={() => setIsOpenDrawer(false)} className="sm:hidden h-6 w-6 text-gray-600" />}
      </div>
      {facets && (
        <ProductFilters
          facets={facets}
          onApplyFilters={applyFilter}
          clearFilters={handleClearFilters}
          localFilters={localFilters}
          setLocalFilters={setLocalFilters}
        />
      )}
    </div>
  );



 





  return (
    <Layout announcements={announcements} banners={banners} categories={categories}
   >
      <SeoWrapper
        title="Search Products - Volvo Parts UAE"
        description="Search for Volvo auto parts and products in the UAE. Find the best automotive solutions."
        canonicalUrl="https://volvopartsuae.com/search"
      >

<div className="w-full min-h-screen bg-gradient-to-b from-pink-50 via-white to-white pt-32 pb-12">
          <div className="max-w-screen-2xl mx-auto px-4 lg:flex lg:gap-8">
            <FilterComponent isDrawer={false} />
            <div className="w-full">
              {error && (
                <div className="text-center py-4 bg-red-100 text-red-800 border border-red-300 rounded-xl shadow-sm mb-6">
                  {error}
                </div>
              )}
<div className="sticky top-24 bg-white rounded-xl shadow-md p-6 mb-6 z-20 border border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-gray-700">
                    <span className="hidden md:block text-sm font-medium">
                      Showing {Math.min(page * 20, totalDocs)} of {totalDocs} results
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsOpenDrawer(true)}
                      className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      <SlidersHorizontal size={16} /> Filters
                    </button>
                    {isOpenDrawer && (
                      <div className="fixed inset-0 z-[55] flex flex-col bg-black/70 backdrop-blur-sm animate-[fadeIn_200ms]">
                        <div onClick={() => setIsOpenDrawer(false)} className="h-[25vh] w-full"></div>
                        <div className="no-scrollbar h-[75vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl">
                          <FilterComponent isDrawer={true} />
                        </div>
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                        <ArrowDownUp size={16} /> Sort By
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                        <DropdownMenuItem
                          onClick={() => {
                            setLocalFilters((prev) => ({ ...prev, sortBy: "relevance" }));
                            applyFilter({ ...localFilters, sortBy: "relevance" });
                          }}
                          className={`px-4 py-2 text-sm ${localFilters.sortBy === "relevance" ? "text-blue-600 font-semibold" : "text-gray-700"} hover:bg-gray-100`}
                        >
                          Relevance
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setLocalFilters((prev) => ({ ...prev, sortBy: "price_low_to_high" }));
                            applyFilter({ ...localFilters, sortBy: "price_low_to_high" });
                          }}
                          className={`px-4 py-2 text-sm ${localFilters.sortBy === "price_low_to_high" ? "text-blue-600 font-semibold" : "text-gray-700"} hover:bg-gray-100`}
                        >
                          Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setLocalFilters((prev) => ({ ...prev, sortBy: "price_high_to_low" }));
                            applyFilter({ ...localFilters, sortBy: "price_high_to_low" });
                          }}
                          className={`px-4 py-2 text-sm ${localFilters.sortBy === "price_high_to_low" ? "text-blue-600 font-semibold" : "text-gray-700"} hover:bg-gray-100`}
                        >
                          High to Low
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <section className="space-y-8 transition-all duration-300 ease-in-out">
                {isSearching ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <p className="text-lg font-medium text-gray-700">Searching...</p>
                    </div>
                  </div>
                ) : (
                  renderSearchResults()
                )}
                {searchResults && searchResults.length > 0 && (
                  <div className="flex justify-center my-8">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changePage(page <= 1 ? 1 : page - 1)}
                        disabled={page === 1}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-green-50 transition-all"
                        >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Previous
                      </button>
                      {[...Array(totalPages).keys()]
                        .slice(Math.max(page - 2, 0), Math.max(page - 2, 0) + 3)
                        .map((_, index) => (
                          <button
                            key={index}
                            onClick={() => changePage(index + Math.max(page - 2, 0) + 1)}
                            className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${page === index + Math.max(page - 2, 0) + 1
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                              }`}
                          >
                            {index + Math.max(page - 2, 0) + 1}
                          </button>
                        ))}
                      {totalPages > 3 && page < totalPages - 2 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      {totalPages > 3 && (
                        <button
                          onClick={() => changePage(totalPages)}
                          className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${page === totalPages
                              ? "bg-green-600 text-white shadow-md"

                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                          {totalPages}
                        </button>
                      )}
                      <button
                        onClick={() => changePage(page >= totalPages ? totalPages : page + 1)}
                        disabled={page === totalPages}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-green-50 transition-all"
                        >
                        Next
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </SeoWrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const query = context.query || {};
  const normalizedQuery = {
    q: query.q || query.query || "",
    ...query,
  };

  try {
    const [announcementsRes, bannersRes, categoriesRes] = await Promise.all([
      axiosInstance.get("/announcements"),
      axiosInstance.get("/banners?status=active"),
      axiosInstance.get("/categories?status=active"),

    ]);

    let searchResults = [];
    let totalDocs = 0;
    let totalPages = 1;
    let page = 1;

    if (normalizedQuery.q) {
      const queryParams = {
        q: normalizedQuery.q,
        category: normalizedQuery.category,
        manufacturer: normalizedQuery.manufacturer,
        make: normalizedQuery.make,
        model: normalizedQuery.model,
        minPrice: normalizedQuery.minPrice,
        maxPrice: normalizedQuery.maxPrice,
        page: normalizedQuery.page || 1,
        limit: 20,
        sortBy: normalizedQuery.sortBy,
      };

      Object.keys(queryParams).forEach((key) => {
        if (!queryParams[key] || queryParams[key].length === 0) {
          delete queryParams[key];
        }
      });

      const queryString = new URLSearchParams(queryParams).toString();
      const searchRes = await axiosInstance.get(`/products/search?${queryString}`);
      searchResults = searchRes.data.results || [];
      totalDocs = searchRes.data.total || 0;
      totalPages = searchRes.data.totalPages || 1;
      page = searchRes.data.page || 1;
    }

    return {
      props: {
        announcements: announcementsRes.data.announcements || [],
        banners: bannersRes.data.banners || [],
        categories: categoriesRes.data.categories || [],
        searchResults,
        totalDocs,
        totalPages,
        page,
        initialQuery: normalizedQuery,
      },
    }
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error.message);
    return {
      props: {
        announcements: [],
        banners: [], 
        categories:[],// return empty fallback
        searchResults: [],
        totalDocs: 0,
        totalPages: 1,
        page: 1,
        initialQuery: normalizedQuery,
      },
    };
  }
}
