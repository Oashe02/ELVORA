
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
{/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#ffff] via-[#dfdfdf] to-[#7c7c7c] z-10"></div> */}

      <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">
        {/* Left Section */}
        <div className="flex items-center gap-4 z-10">
          {/* Search Bar */}
          <div className="relative ml-4">
  <form onSubmit={handleSearchSubmit} className="relative">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className={`w-[144.95px] h-[33.42px] border rounded-full pl-4 pr-8 text-sm outline-none focus:ring-2 focus:text-[#3096a5] transition-all duration-300
        ${isScrolled
          ? "bg-black bg-opacity-20 placeholder-white text-white backdrop-blur-md"
          : "bg-white bg-opacity-20 placeholder-white text-white backdrop-blur-md"
        }`}
    />
    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
      <img
        src={
          isScrolled
            ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T12%3A21%3A17.088Z-Screv.png"
            : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T09%3A38%3A54.922Z-Vector%20Smart%20Object.png"
        }
        alt="search icon"
        className="w-[21px] h-[23px] transition-opacity duration-300"
      />
    </button>
  </form>
</div>



          {/* Language Switch */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span
              className={`
                cursor-pointer transition-colors duration-300
                ${isScrolled ? "hover:text-[#3096a5] text-gray-800" : "hover:text-[#3096a5] text-white"}
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
          ${isScrolled ? "mt-[2rem]" : "mt-[2rem] scale-100"}
        `}
        >
          <Image
src={
  isScrolled
    ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-08T05%3A06%3A25.597Z-elvora.png"
    : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T07%3A45%3A41.859Z-logo_size.png"
}            width={206}
            height={101}
            alt="Logo"
            className="drop-shadow-md transition-transform duration-300"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 z-10 pr-4 md:pr-8 lg:pr-10">
        <GetAQuotePopup isScrolled={isScrolled} />


          {/* Wishlist Drawer */}
          <Drawer direction="right" open={wishlistOpen} onOpenChange={setWishlistOpen}>
            <DrawerTrigger asChild>
            <button
  onClick={() => setWishlistOpen(true)}
  className={`relative transition-colors duration-300
    ${isScrolled ? "text-gray-400 hover:text-[#3096a5]" : "text-white hover:text-[#3096a5]"}
  `}
>
  <div className="relative">
  <img
  src={
    isScrolled
      ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T12%3A52%3A27.461Z-hearth.png"
      : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T10%3A04%3A56.470Z-Hearth.png"
  }
  alt="wishlist"
  className="w-[27px] h-[26px] object-contain relative z-10 transition-all duration-300"
/>

    {wishlistCount > 0 && (
      <span className="absolute top-[-1.5px] right-[1.5px] text-[14px] font-extrabold text-red-500 h-7 w-7 rounded-full flex items-center justify-center z-20">
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
 {/* User Icon First */}
 <button
    onClick={() => router.push("/account")}
    className={`
      transition-colors duration-300
      ${isScrolled ? "text-gray-400 hover:text-[#3096a5]" : "text-white hover:text-[#3096a5]"}
    `}
  >
    <img
      src={
        isScrolled
          ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T12%3A53%3A39.001Z-userd.png"
          : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T10%3A21%3A37.471Z-User.png"
      }
      alt="User Icon"
      className="w-[16px] h-[26px] object-contain transition-all duration-300"
    />
  </button>
          {/* Cart Drawer */}
          <Drawer direction="right" open={cartOpen} onOpenChange={setCartOpen}>
 

  {/* Cart Icon */}
  <DrawerTrigger asChild>
    <button
      onClick={() => setCartOpen(true)}
      className={`
        relative transition-colors duration-300
        ${isScrolled ? "text-gray-400 hover:text-[#3096a5]" : "text-white hover:text-[#3096a5]"}
      `}
    >
      <img
        src={
          isScrolled
            ? "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T12%3A54%3A22.637Z-Cart.png"
            : "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-17T10%3A20%3A58.590Z-Cart.png"
        }
        alt="Cart Icon"
        className="w-[17px] h-[27px] object-contain transition-all duration-300 "
      />
      {totalUniqueItems > 0 && (
        <span className="absolute top-[9px] right-[-0.7rem] h-4 w-4 bg-[#3096a5] text-white text-[14px] font-bold flex items-center justify-center p-0 ml-4">
          {totalUniqueItems}
        </span>
      )}
    </button>
  </DrawerTrigger>

  {/* FIX: Added ml-auto to push the content to the right */}
  <DrawerContent className="h-full w-full sm:w-[400px] ml-auto">
    <ShoppingCart onClose={() => setCartOpen(false)} />
  </DrawerContent>
</Drawer>


        </div>
      </div>
    </div>
  )
}
export default TopNav;