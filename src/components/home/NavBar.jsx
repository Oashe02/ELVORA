"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function ModernNavbar({ activeCategoriesString, isScrolled = false }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true)
    try {
      const parsed = JSON.parse(activeCategoriesString || "[]")
      const filtered = parsed.filter(
        (c) => c && c._id && c.name && c.slug && c.thumbnail && c.shortDescription && c.status === "active",
      )
      const sorted = [...filtered].sort((a, b) => (b.priority || 0) - (a.priority || 0))
      setCategories(sorted)
      setHoveredCategory(sorted[0] || null)
    } catch (error) {
      console.error("Failed to parse activeCategoriesString:", error)
    }
  }, [activeCategoriesString])

  if (!isClient || categories.length === 0) return null

  return (
    <header className="z-50 relative">
      <div className="relative">
        {/* Desktop Navigation */}
        <nav
          className={`
          hidden lg:flex justify-center transition-all duration-300
          ${isScrolled ? "mt-[5rem] py-4" : "mt-[5rem] py-4"}
        `}
        >
          <ul
            className={`
            flex w-full max-w-[1600px] justify-between px-12 text-base font-bold uppercase tracking-wide transition-colors duration-300
            ${isScrolled ? "text-gray-400" : "text-white"}
          `}
          >
            <li className="pl-4">
              <Link
                href="/"
                className={`
                relative group py-2 px-1 transition-all duration-300
                ${isScrolled ? "hover:text-pink-600" : "hover:text-pink-600"}
              `}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
              className="relative cursor-pointer group"
            >
              <span
                className={`
                relative py-2 px-1 transition-all duration-300
                ${isScrolled ? "hover:text-pink-600" : "hover:text-pink-600"}
              `}
              >
                Category
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </span>
              {showMegaMenu && (
                <div className="absolute ml-[24rem] transform -translate-x-1/2 top-full mt-2 w-[1200px] bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50 shadow-xl border border-gray-200">
                  <div className="flex">
                    {/* Categories List */}
                    <div className="w-100 p-8">
                      <div className="grid grid-cols-2 gap-1">
                        {categories.map((category, idx) => (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredCategory(category)}
                            className="group cursor-pointer p-3 rounded-lg hover:bg-gradient-to-r transition-all duration-300"
                          >
                            <Link
                              href={`/category/${category.slug}`}
                              className="block text-sm font-medium text-gray-700 group-hover:text-gray-600 transition-colors duration-300 group-hover:translate-x-1 transform border-b border-black/20 hover:cursor-pointer"
                            >
                              {category.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Category Image */}
                    <Link href={`/category/${hoveredCategory?.slug || ""}`} className="flex-1 p-6 block">
                      <div className="text-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider text-left">
                          {hoveredCategory?.name}
                        </h3>
                      </div>
                      <div className="relative h-80 w-full overflow-hidden group">
                        <Image
                          src={hoveredCategory?.thumbnail || "/placeholder.svg"}
                          alt={hoveredCategory?.name || "Category"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link
                href="#"
                className={`
                relative group py-2 px-1 transition-all duration-300
                ${isScrolled ? "hover:text-pink-600" : "hover:text-pink-600"}
              `}
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`
                relative group py-2 px-1 transition-all duration-300
                ${isScrolled ? "hover:text-pink-600" : "hover:text-pink-600"}
              `}
              >
                Blogs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li className="pr-4">
              <Link
                href="#"
                className={`
                relative group py-2 px-1 transition-all duration-300
                ${isScrolled ? "hover:text-pink-600" : "hover:text-pink-600"}
              `}
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex justify-end px-6 pb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
              ${
                isScrolled
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
              }
            `}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl animate-in slide-in-from-top-2 duration-300 z-40">
            <nav className="p-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div className="py-3 px-4 text-gray-400 font-semibold">Categories</div>
                  <div className="ml-4 space-y-2">
                    {categories.map((category, idx) => (
                      <Link
                        key={idx}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-3 py-2 px-4 text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm">
                          <Image
                            src={category.thumbnail || "/placeholder.svg"}
                            alt={category.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-600 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
