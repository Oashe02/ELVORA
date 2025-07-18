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
      ${isScrolled ? "mt-[3rem] py-4" : "mt-[3rem] py-4"}
    `}
>
  <ul
    className={`
        flex w-full max-w-[1600px] justify-center gap-[7rem] px-4 text-[14px] font-bold uppercase tracking-wide transition-colors duration-300
        ${isScrolled ? "text-gray-800" : "text-white"}
      `}
  >
    <li >
      <Link
        href="/"
        className={`
            relative group flex items-center  py-2 px-1 transition-all duration-300
            ${isScrolled ? "hover:text-gray-800" : "hover:text-white"}
          `}
      >
        Menu 01
        <span className="transition-transform duration-300 transform rotate-0 group-hover:rotate-90">
          &gt;
        </span>
        <span
  className={`absolute bottom-[0px] left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${isScrolled ? "bg-gray-800" : "bg-white"}`}
/>
      </Link>
    </li>

    <div
  onMouseEnter={() => setShowMegaMenu(true)}
  onMouseLeave={() => setShowMegaMenu(false)}
  className="relative"
>
  <li className="relative cursor-pointer group list-none">
    <span
      className={`
        relative group flex items-center py-2 transition-all duration-300 text-[14px] font-bold
        ${isScrolled ? "hover:text-gray-800" : "hover:text-gray-200"}
      `}
    >
      Menu 02
      <span className="transition-transform duration-300 transform rotate-0 group-hover:rotate-90">
        &gt;
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 group-hover:w-full transition-all duration-300"></span>
    </span>
  </li>

  {showMegaMenu && (
    <div
      className="absolute left-6/4 ml-[20rem] top-[1.5rem] mt-4 w-[1540px]   transform -translate-x-1/2 bg-white/95 backdrop-blur-sm overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50 shadow-xl"
    >
      <div className="flex gap-6 px-8 py-6 ">
        {/* Left Column */}
        <div className="w-[240px] space-y-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <p
              key={i}
              className={`text-sm text-gray-800 border-b border-gray-200 py-1 px-2 hover:bg-gray-100 cursor-pointer ${
                i === 1 ? "font-bold border-black" : ""
              }`}
            >
              {i === 1 ? "SEASONAL CATEGORY 02" : `CATEGORY 0${i + 1}`}
            </p>
          ))}
        </div>

        {/* Middle Column */}
        <div className="w-[240px] space-y-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <p
              key={i}
              className={`text-sm text-gray-800 border-b border-gray-200 py-1 px-2 hover:bg-gray-100 cursor-pointer ${
                i === 2 ? "font-bold border-black" : ""
              }`}
            >
              {i === 2 ? "SEASONAL CATEGORY 02" : `CATEGORY 0${i + 1}`}
            </p>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">
            SEASONAL CATEGORY IMAGE HERE
          </h3>
          <div className="w-full h-[250px] relative overflow-hidden">
            <img
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T15%3A10%3A33.625Z-Layer%20614.png"
              alt="Seasonal Category"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )}
</div>


    {["Menu 03", "Menu 04", "Menu 05", "Menu 06"].map((menu, idx) => (
  <li key={idx} >
    <Link
      href="#"
      className={`
        relative group flex items-center py-2 transition-all duration-300
        ${isScrolled ? "hover:text-gray-800" : "hover:text-gray-200"}
      `}
    >
      {menu}
      <span className="transition-transform duration-300 transform rotate-0 group-hover:rotate-90">
        &gt;
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 group-hover:w-full transition-all duration-300"></span>
    </Link>
  </li>
))}

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
                  ? "bg-gradient-to-r from-[#3096a5] to-[#3096a5] text-white"
                  : "bg-gradient-to-r from-[#3096a5] to-[#3096a5] text-white"
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
                className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#3096a5] rounded-lg transition-all duration-300"
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
                    className="flex items-center gap-3 py-2 px-4 text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#3096a5] rounded-lg transition-all duration-300"
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
                className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#3096a5] rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#3096a5] rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-3 px-4 text-gray-400 font-semibold hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-[#3096a5] rounded-lg transition-all duration-300"
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
