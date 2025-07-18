"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#f2f3f4] text-gray-800">
      {/* Newsletter Banner with Image */}
      <div className="relative w-full h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden bg-white mt-6  ">
  {/* Left Side */}
  <div className="absolute left-0 top-0 w-1/2 h-full bg-#fff group">
    <div
      className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T13%3A35%3A19.979Z-bouquet-pink-roses-close-up-generative-ai.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/60 group-hover:bg-black/30 transition duration-300"></div>
      <h3 className="text-white text-4xl md:text-5xl tracking-wide font-light mb-6 z-10 text-center">
        FOR ALL THE <br /> LATEST NEWS
      </h3>
    </div>
  </div>

  {/* Right Side */}
  <div className="absolute right-0 top-0 w-1/2 h-full group">
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center relative px-4"
      style={{
        backgroundImage:
          "url('https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-01T13%3A35%3A19.979Z-bouquet-pink-roses-close-up-generative-ai.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/60 group-hover:bg-black/30 transition duration-300"></div>

      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 z-10">
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL"
          className="px-4 py-3 w-full sm:w-96 text-sm uppercase tracking-wider border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#2b2e39] text-white px-6 py-3 uppercase tracking-widest hover:bg-black transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
</div>



      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          {/* Footer Columns */}
          {[
            {
              title: "Menu",
              links: ["Home", "About Us", "Blogs", "Contact Us"],
            },
            {
              title: "Categories",
              links: [
                "Special Events",
                "Fresh Flowers",
                "Orchids",
                "Life Roses",
                "Faux Flowers",
                "Bouquet",
              ],
            },
            {
              title: "Information",
              links: [
                "Terms & Conditions",
                "Privacy Policy",
                "Return & Refund Policy",
                "Shipping & Delivery",
              ],
            },
            {
              title: "Support",
              links: ["FAQ", "Support", "Track Order", "Gift Cards"],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="uppercase font-semibold mb-4 text-sm tracking-wider border-b border-gray-400">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-10 pt-3 flex flex-col md:flex-row items-center justify-between gap-6 text-sm ">
          {/* Social */}
          <div className="text-center md:text-left mt-[10rem]">
            <p className="uppercase text-xs font-medium mb-2 text-gray-400">Visit Our Social Platform</p>
            <div className="flex gap-3 justify-center md:justify-start">
              {["facebook", "youtube", "instagram", "linkedin", "whatsapp", "amazon"].map(
                (platform, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-600 transition"
                  >
                    <Image
                      src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${platform}.svg`}
                      alt={platform}
                      width={16}
                      height={16}
                      className="invert"
                    />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Center Logo */}
          <div className="text-center">
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-08T05%3A06%3A25.597Z-elvora.png"
              alt="Elvora"
              width={200}
              height={100}
              className="mx-auto "
            />
            <p className="text-gray-400 text-md mt-[4rem]">
             Copyright &copy; 2025 www.elvora.ae. All rights reserved.
            </p>
          </div>

          {/* Payments */}
          <div className="text-center md:text-right mt-[10rem]">
            <p className="uppercase text-xs font-medium mb-2 text-gray-400">Secure Ordering and Transactions</p>
            <Image
              src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-07-18T19%3A01%3A03.935Z-Layer%2014.png"
              alt="Payments"
              width={240}
              height={90}
              className="object-contain mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
