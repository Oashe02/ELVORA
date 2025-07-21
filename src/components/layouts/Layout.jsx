"use client"
import { useEffect, useState } from "react"
import Footer from "./Footer"
import ModernNavbar from "../home/NavBar"
import TopNav from "../blocks/TopNavOne"
import SliderOne from "../home/SliderOne"
import Breadcrumb from "../global/Breadcrumb";

const Layout = ({ children, announcements, categories, products, banners }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100) // Adjust threshold as needed
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-40 pointer-events-none" />

      <SliderOne bannersString={JSON.stringify(banners)} />

      {/* Navigation Container */}
      <div
        className={`
        ${isScrolled ? "fixed" : "absolute"} 
        top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}
      `}
      >
        <TopNav announcements={announcements} isScrolled={isScrolled}  />
        <ModernNavbar activeCategoriesString={JSON.stringify(categories)} isScrolled={isScrolled} />
      </div>

      {/* Add padding to prevent content jump when nav becomes fixed */}
      <div className={`${isScrolled } transition-all duration-300`}>
      <Breadcrumb />
        {children}
        </div>

      <Footer categories={categories} products={products} />
    </main>
  )
}

export default Layout
