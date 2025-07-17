"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Search, Heart, ShoppingBag, X,UserCircle } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import WishlistProducts from "../cart/WishlistProducts"
import ShoppingCart from "../cart/ShoppingCart"
import useWishlistStore from "@/store/wishlistStore"
import { useCart } from "react-use-cart"
import { useRouter } from "next/navigation";
import GetAQuotePopup from "../GetAQuotePopup"

const TopNav = ({ announcements = [], isScrolled = false }) => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [language, setLanguage] = useState("EN")
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { wishlist } = useWishlistStore()
  const wishlistCount = wishlist.length
  const { totalUniqueItems } = useCart()
  const [searchInput, setSearchInput] = useState("");
const router = useRouter();


  useEffect(() => {
    if (announcements.length <= 1) return
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [announcements.length])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"))
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <div
      className={`
      w-full py-3 px-4 transition-all duration-300
      ${isScrolled ? "text-gray-400 bg-white  " : "text-white bg-transparent"}
    `}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">
        {/* Left Section */}
        <div className="flex items-center gap-4 z-10">
          {/* Search Bar */}
          <div className="relative">
         <form onSubmit={handleSearchSubmit} className="relative">
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Search..."
    className={`border rounded-full pl-4 pr-10 py-1 text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300
      ${isScrolled
        ? "bg-gray-50 border-gray-300 text-gray-400 placeholder-gray-500"
        : "bg-white/20 placeholder-white text-white border-white/30 backdrop-blur-md"
      }`}
  />
  <button type="submit">
    <Search
      className={`absolute right-2 top-1/2 -translate-y-1/2 transition-colors duration-300
        ${isScrolled ? "text-gray-500" : "text-white opacity-70"}
      `}
      size={16}
    />
  </button>
</form>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span
              className={`
                cursor-pointer transition-colors duration-300
                ${isScrolled ? "hover:text-pink-600 text-gray-400" : "hover:text-pink-300 text-white"}
              `}
              onClick={toggleLanguage}
            >
              {language === "EN" ? "AR" : "EN"}
            </span>
          </div>
        </div>

        {/* Center Logo */}
        <div
          className={`
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300
          ${isScrolled ? "mt-[3rem]" : "mt-[3rem] scale-100"}
        `}
        >
          <Image
src={
  isScrolled
    ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-08T05%3A06%3A25.597Z-elvora.png"
    : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-07T08%3A06%3A24.198Z-elvora2.png"
}            width={260}
            height={80}
            alt="Logo"
            className="drop-shadow-md transition-transform duration-300"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 z-10">
        <GetAQuotePopup />


          {/* Wishlist Drawer */}
          <Drawer direction="right" open={wishlistOpen} onOpenChange={setWishlistOpen}>
            <DrawerTrigger asChild>
              <button
                onClick={() => setWishlistOpen(true)}
                className={`
                  relative transition-colors duration-300
                  ${isScrolled ? "text-gray-400 hover:text-pink-600" : "text-white hover:text-pink-400"}
                `}
              >
               <div className="relative">
  <Heart size={30} className="relative z-10" />
  {wishlistCount > 0 && (
    <span className="absolute top-[1px] left-[0.5px] text-[14px] font-bold text-red-500  h-7 w-7 rounded-full flex items-center justify-center z-20">
      +{wishlistCount}
    </span>
  )}
</div>
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-full sm:w-[400px] md:w-[500px] ml-auto">
              <div className="h-full flex flex-col">
                <div className="p-4 flex items-center justify-between border-b">
                  <h2 className="text-xl font-semibold">Wishlist</h2>
                  <Button variant="ghost" size="icon" onClick={() => setWishlistOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <WishlistProducts />
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Cart Drawer */}
          <Drawer direction="right" open={cartOpen} onOpenChange={setCartOpen}>
            <DrawerTrigger asChild>
              <button
                onClick={() => setCartOpen(true)}
                className={`
                  relative transition-colors duration-300
                  ${isScrolled ? "text-gray-400 hover:text-green-600" : "text-white hover:text-green-400"}
                `}
              >
                <ShoppingBag size={30} />
                {totalUniqueItems > 0 && (
  <span className="absolute top-[5px] right-[-0.3rem] h-4 w-4 bg-blue-300 text-white text-[14px] font-bold flex items-center justify-center border border-white p-0 rounded-sm">
    {totalUniqueItems}
  </span>
)}
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-full sm:w-[400px] ml-auto">
              <ShoppingCart onClose={() => setCartOpen(false)} />
            </DrawerContent>
            <button
  onClick={() => router.push("/account")} // Update this path if needed
  className={`
    transition-colors duration-300
    ${isScrolled ? "text-gray-400 hover:text-blue-600" : "text-white hover:text-blue-400"}
  `}
>
  <UserCircle size={30} />
</button>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default TopNav
