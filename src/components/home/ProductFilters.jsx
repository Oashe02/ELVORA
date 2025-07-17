"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFilters({
  facets,
  onApplyFilters,
  clearFilters,
  localFilters,
  setLocalFilters,
}) {
  const [filters, setFilters] = useState({
    q: localFilters.q || "",
    categories: localFilters.categories || [],
    manufacturers: localFilters.manufacturers || [],
    makes: localFilters.makes || [],
    models: localFilters.models || [],
    minPrice: localFilters.minPrice || facets?.priceRange?.minPrice || 0,
    maxPrice: localFilters.maxPrice || facets?.priceRange?.maxPrice || 50000,
  });

  useEffect(() => {
    setFilters({
      q: localFilters.q || "",
      categories: localFilters.categories || [],
      manufacturers: localFilters.manufacturers || [],
      makes: localFilters.makes || [],
      models: localFilters.models || [],
      minPrice: localFilters.minPrice || facets?.priceRange?.minPrice || 0,
      maxPrice: localFilters.maxPrice || facets?.priceRange?.maxPrice || 50000,
    });
  }, [localFilters, facets]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (filterType, value, applyImmediately = false) => {
    setFilters((prev) => {
      const currentValues = [...prev[filterType]];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      const updatedFilters = {
        ...prev,
        [filterType]: newValues,
      };
      if (applyImmediately) {
        setLocalFilters(updatedFilters);
        onApplyFilters(updatedFilters);
      }
      return updatedFilters;
    });
  };

  const handlePriceChange = (values) => {
    const [min, max] = values;
    if (min <= max) {
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }));
    }
  };

  const handleApplyFilters = (e) => {
    e?.preventDefault();
    if (filters.minPrice <= filters.maxPrice) {
      setLocalFilters(filters);
      onApplyFilters(filters);
    }
  };

  const handleClearFilters = (e) => {
    e?.preventDefault();
    const clearedFilters = {
      q: filters.q,
      categories: [],
      manufacturers: [],
      makes: [],
      models: [],
      minPrice: facets?.priceRange?.minPrice || 0,
      maxPrice: facets?.priceRange?.maxPrice || 50000,
    };
    setFilters(clearedFilters);
    setLocalFilters(clearedFilters);
    clearFilters();
  };

  const renderFacetSection = (facetKey, title) => {
    if (!facets || !facets[facetKey] || facets[facetKey].length === 0) {
      return null;
    }

    const idKeyMap = {
      categories: "categoryId",
      makes: "makeId",
      models: "modelId",
      manufacturers: "manufacturerId",
    };

    const idKey = idKeyMap[facetKey] || `${facetKey.slice(0, -1)}Id`;

    // Sort options alphabetically by name
    const sortedOptions = [...facets[facetKey]].sort((a, b) => a.name.localeCompare(b.name));

    return (
      <AccordionItem value={facetKey} className="border-none">
        <AccordionTrigger className="text-base font-semibold text-gray-800 hover:text-blue-600 py-2">
          {title}
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <div className="space-y-3 max-h-60 overflow-y-auto pr-3">
            {sortedOptions
              .filter((item) => item[idKey] && item.name)
              .map((item) => {
                const value = item[idKey];
                const label = item.name;
                return (
                  <label
                    key={value}
                    className="flex items-center cursor-pointer text-sm text-gray-700 hover:text-gray-900 transition"
                  >
                    <Checkbox
                      id={`${facetKey}-${value}`}
                      checked={filters[facetKey].includes(value)}
                      onCheckedChange={() => handleCheckboxChange(facetKey, value, false)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    />
                    <Label htmlFor={`${facetKey}-${value}`} className="text-sm font-normal">
                      {label.charAt(0).toUpperCase() + label.slice(1)} ({item.count})
                    </Label>
                  </label>
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const isFilterActive = Object.entries(filters).some(
    ([key, value]) =>
      (Array.isArray(value) && value.length > 0) ||
      (key === "minPrice" && value > (facets?.priceRange?.minPrice || 0)) ||
      (key === "maxPrice" && value < (facets?.priceRange?.maxPrice || 50000)),
  );

  return (
    <form
      onSubmit={handleApplyFilters}
      className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        {isFilterActive && (
          <button
            onClick={handleClearFilters}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            <X className="h-4 w-4 mr-1" /> Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              id="search"
              name="q"
              value={filters.q}
              onChange={handleInputChange}
              placeholder="Search Flowers.."
              className="pl-10 h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {facets?.priceRange && (
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">Price Range</Label>
            <div className="px-2">
              <Slider
                min={0}
                max={Math.ceil(facets.priceRange.maxPrice * 1.1)}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceChange}
                step={10}
                minStepsBetweenThumbs={1}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>AED {filters.minPrice.toLocaleString()}</span>
                <span>AED {filters.maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <Separator className="bg-gray-200" />

        <Accordion type="multiple" className="space-y-2">
          {renderFacetSection("categories", "Categories")}
        </Accordion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition"
          >
            Apply Filters
          </Button>
          {isFilterActive && (
            <Button
              type="button"
              onClick={handleClearFilters}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg py-2 transition"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
