// import React, { useRef, useEffect, useState } from "react";
// import { register } from "swiper/element/bundle";
// import "swiper/css";
// import Product from "./Product/Product";
// import { useSettingStore } from "@/store/useSettingStore";

// const TabFeatures = ({
//   start,
//   limit,
//   products,
//   hideSoldProducts = false,
//   title,
// }) => {
//   const swiperElRef = useRef(null);
//   const settings = useSettingStore((state) => state.settings);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsClient(true);
//       setWindowWidth(window.innerWidth);

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       register();

//       const swiperEl = swiperElRef.current;

//       const swiperParams = {
//         slidesPerView: 1.2,
//         spaceBetween: 12,
//         grabCursor: true,
//         loop: products.length > 4,
//         breakpoints: {
//           400: { slidesPerView: 1.5, spaceBetween: 12 },
//           576: { slidesPerView: 2, spaceBetween: 12 },
//           768: { slidesPerView: 3, spaceBetween: 16 },
//           1024: { slidesPerView: 4, spaceBetween: 20 },
//           1280: { slidesPerView: 4, spaceBetween: 24 },
//         },
//       };

//       if (windowWidth >= 1280) {
//         swiperParams.slidesPerView = 4;
//       }

//       Object.assign(swiperEl, swiperParams);
//       swiperEl.initialize();
//     }
//   }, [products.length, windowWidth, isClient]);

//   const handlePrev = () => {
//     if (swiperElRef.current) {
//       swiperElRef.current.swiper.slidePrev();
//     }
//   };

//   const handleNext = () => {
//     if (swiperElRef.current) {
//       swiperElRef.current.swiper.slideNext();
//     }
//   };

//   return (
//     <>
//       <div className="relative w-full bg-white overflow-hidden">
//         <div className="tab-features-block md:pt-20 pt-10 max-w-7xl mx-auto px-4 relative z-10">
//           <div className="text-center mb-6 md:mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-black">
//               {title || "Products"}
//             </h2>
//             <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-2 rounded"></div>
//           </div>

//           {/* Navigation arrows */}
//           <button
//             onClick={handlePrev}
//             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
//               hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300
//               absolute top-[calc(50%+80px)] -translate-y-1/2 left-2 md:left-4 z-10"
//             aria-label="Previous slide"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-700"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           </button>

//           <button
//             onClick={handleNext}
//             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
//               hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300
//               absolute top-[calc(50%+80px)] -translate-y-1/2 right-2 md:right-4 z-10"
//             aria-label="Next slide"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-700"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           </button>

//           {/* Swiper container */}
//           <div
//             className={`list-product ${hideSoldProducts ? "hide-product-sold" : ""} relative overflow-visible`}
//           >
//             <swiper-container
//               ref={swiperElRef}
//               class="makes-swiper w-full"
//               init="false"
//             >
//               {products.slice(start, limit).map((prd, index) => (
//                 <swiper-slide
//                   key={index}
//                   className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[340px]"
//                 >
//                   <div className="p-1 md:p-2 h-full">
//                     <Product product={prd} type="grid" />
//                   </div>
//                 </swiper-slide>
//               ))}
//             </swiper-container>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .list-product .swiper-container {
//           overflow: visible;
//           position: relative;
//         }

//         .list-product swiper-slide {
//           height: auto;
//         }

//         .list-product swiper-slide:hover .product-img,
//         .list-product swiper-slide:hover .product-image,
//         .list-product .product-item:hover .product-img,
//         .list-product .product-item:hover .product-image {
//           opacity: 1 !important;
//           visibility: visible !important;
//           display: block !important;
//           transform: none !important;
//         }

//         .list-product swiper-slide,
//         .list-product .product-item {
//           transition: all 0.3s ease;
//         }

//         .list-product swiper-slide:hover,
//         .list-product .product-item:hover {
//           transform: translateY(-5px);
//         }

//         .list-product button {
//           top: calc(50% + 80px);
//           transform: translateY(-50%);
//           z-index: 10;
//         }

//         @media (max-width: 768px) {
//           .list-product button {
//             display: none;
//           }

//           .list-product swiper-slide {
//             width: 85% !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default TabFeatures;




// import React, { useEffect, useState } from "react";
// import Product from "./Product/Product";
// import { useSettingStore } from "@/store/useSettingStore";

// const TabFeatures = ({
//   start,
//   limit,
//   products,
//   hideSoldProducts = false,
//   title,
// }) => {
//   const settings = useSettingStore((state) => state.settings);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsClient(true);
//       setWindowWidth(window.innerWidth);

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   return (
//     <>
//       <div className="relative w-full bg-white overflow-hidden">
//         <div className="tab-features-block md:pt-20 pt-10 max-w-7xl mx-auto px-4 relative z-10">
//           <div className="text-center mb-6 md:mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-black">
//               {title || "Products"}
//             </h2>
//             <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-2 rounded"></div>
//           </div>

//           {/* Grid container */}
//           <div
//             className={`list-product ${hideSoldProducts ? "hide-product-sold" : ""} relative`}
//           >
//             <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {products.slice(start, limit).map((prd, index) => (
//                 <div key={index} className="p-1 md:p-2 h-full">
//                   <Product product={prd} type="grid" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .list-product .grid {
//           display: grid;
//           width: 100%;
//         }

//         .list-product .product-item {
//           transition: all 0.3s ease;
//         }

//         .list-product .product-item:hover {
//           transform: translateY(-5px);
//         }

//         .list-product .product-item:hover .product-img,
//         .list-product .product-item:hover .product-image {
//           opacity: 1 !important;
//           visibility: visible !important;
//           display: block !important;
//           transform: none !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default TabFeatures;












// import React, { useEffect, useState } from "react";
// import Product from "./Product/Product";
// import { useSettingStore } from "@/store/useSettingStore";

// const TabFeatures = ({
//   start,
//   limit,
//   products,
//   hideSoldProducts = false,
//   title,
// }) => {
//   const settings = useSettingStore((state) => state.settings);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsClient(true);
//       setWindowWidth(window.innerWidth);

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   return (
//     <>
//       <div className="relative w-full bg-white overflow-hidden">
//         <div className="tab-features-block md:pt-20 pt-10 max-w-7xl mx-auto px-4 relative z-10">
//           <div className="text-center mb-6 md:mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-black">
//               {title || "Products"}
//             </h2>
//             <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-2 rounded"></div>
//           </div>

//           {/* Grid container */}
//           <div
//             className={`list-product ${hideSoldProducts ? "hide-product-sold" : ""} relative`}
//           >
//             <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {products.slice(start, limit).map((prd, index) => (
//                 <div key={index} className="p-1 md:p-2 h-full">
//                   <Product product={prd} type="grid" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .list-product .grid {
//           display: grid;
//           width: 100%;
//         }

//         .list-product .product-item {
//           transition: all 0.3s ease;
//         }

//         @media (min-width: 768px) {
//           .list-product .product-item:hover {
//             transform: translateY(-5px);
//           }

//           .list-product .product-item:hover .product-img,
//           .list-product .product-item:hover .product-image {
//             opacity: 1 !important;
//             visibility: visible !important;
//             display: block !important;
//             transform: none !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default TabFeatures;


// import React, { useEffect, useState } from "react";
// import Product from "./Product/Product";
// import { useSettingStore } from "@/store/useSettingStore";

// const LatestProduct = ({
//   start,
//   limit,
//   products,
//   hideSoldProducts = false,
//   title,
//   staticMode = true, // New prop to toggle static/dynamic mode
// }) => {
//   const settings = useSettingStore((state) => state.settings);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [isClient, setIsClient] = useState(false);




//   const staticPerfumes = [
//     {
//       "_id": "684d265f5bdd400ebdea65c2",
//       "name": "Floral Essence Eau de Parfum",
//       "slug": "floral-essence-eau-de-parfum",
//       "sku": "PF-FE-2025",
//       "barcode": "739085123457",
//       "brand": "Luxe Fragrance",
//       "googleProductCategory": "Category: Beauty > Fragrances > Women's Perfumes",
//       "yearFrom": 2023,
//       "yearTo": 2025,
//       "scentType": "floral",
//       "gender": "women",
//       "concentration": "eau de parfum",
//       "oemNumbers": [
//         "PF123456"
//       ],
//       "manufacturerPartNumbers": [
//         "LFP-FE-25"
//       ],
//       "manufacturer": [
//         "68417c2a36cecef2a24fbaa1"
//       ],
//       "makeId": [
//         "68414f0218a9ea883d6c28da"
//       ],
//       "modelId": [
//         "6841661a36cecef2a24fba92"
//       ],
//       "category": "683456d3091bbcbfe06a4345",
//       "mrp": 75,
//       "price": 60,
//       "costPrice": 40,
//       "stock": 50,
//       "sold": 0,
//       "lowStockThreshold": 10,
//       "shortDescription": "A delicate floral eau de parfum for women, launched in 2023.",
//       "description": "Floral Essence Eau de Parfum combines notes of jasmine, rose, and lily for a timeless, elegant scent. Perfect for daily wear.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:31:30.763Z-women_perfum.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:31:30.763Z-women_perfum.jpg",
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:31:30.763Z-women_perfum.jpg",
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:31:30.763Z-women_perfum.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ]
//       ,
//       "tax": 0,
//       "priority": 12,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "floral",
//         "women",
//         "eau-de-parfum"
//       ],
//       "dimensions": {
//         "length": 8,
//         "width": 8,
//         "height": 15,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.3,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 60,
//           "stock": 30
//         },
//         {
//           "size": "100ml",
//           "price": 90,
//           "stock": 20
//         }
//       ],
//       "seo": {
//         "title": "Floral Essence Eau de Parfum – Luxe Fragrance",
//         "description": "Discover Floral Essence Eau de Parfum for women. Elegant floral notes with fast delivery across UAE.",
//         "keywords": [
//           "floral perfume, eau de parfum women, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Jasmine, Bergamot",
//         "heartNotes": "Rose, Lily",
//         "baseNotes": "Sandalwood, Vanilla",
//         "longevity": "6-8 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-14T07:35:59.490Z",
//       "updatedAt": "2025-06-23T06:33:53.238Z",
//       "__v": 0,
//       "metadata": {}
//     },
//     {
//       "_id": "684d23725bdd400ebdea6571",
//       "name": "Ocean Breeze Eau de Toilette",
//       "slug": "ocean-breeze-eau-de-toilette",
//       "sku": "PF-OB-2025",
//       "barcode": "739085123456",
//       "brand": "Luxe Fragrance",
//       "googleProductCategory": "Category: Beauty > Fragrances > Men's Perfumes",
//       "yearFrom": 2022,
//       "yearTo": 2025,
//       "scentType": "aquatic",
//       "gender": "men",
//       "concentration": "eau de toilette",
//       "oemNumbers": [
//         "PF123457",
//         "PF123458"
//       ],
//       "manufacturerPartNumbers": [
//         "LFP-OB-22"
//       ],
//       "manufacturer": [
//         "6841854936cecef2a24fbad8"
//       ],
//       "makeId": [
//         "68414f0218a9ea883d6c28da"
//       ],
//       "modelId": [
//         "68415ae036cecef2a24fba54"
//       ],
//       "category": "68344d4e12e7fb53d2bc3028",
//       "mrp": 65,
//       "price": 50,
//       "costPrice": 35,
//       "stock": 40,
//       "sold": 0,
//       "lowStockThreshold": 10,
//       "shortDescription": "A refreshing aquatic eau de toilette for men, launched in 2022.",
//       "description": "Ocean Breeze Eau de Toilette offers crisp marine notes with citrus and cedarwood for a vibrant, masculine scent.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:32:54.884Z-ocean.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:32:54.884Z-ocean.jpg",
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:32:54.884Z-ocean.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ]
//       ,
//       "tax": 0,
//       "priority": 11,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "aquatic",
//         "men",
//         "eau-de-toilette"
//       ],
//       "dimensions": {
//         "length": 7,
//         "width": 7,
//         "height": 14,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.25,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 50,
//           "stock": 25
//         },
//         {
//           "size": "100ml",
//           "price": 75,
//           "stock": 15
//         }
//       ],
//       "seo": {
//         "title": "Ocean Breeze Eau de Toilette – Luxe Fragrance",
//         "description": "Shop Ocean Breeze Eau de Toilette for men. Crisp aquatic scent with fast shipping in Dubai.",
//         "keywords": [
//           "ocean breeze perfume, eau de toilette men, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Marine Accord, Lemon",
//         "heartNotes": "Lavender, Geranium",
//         "baseNotes": "Cedarwood, Amber",
//         "longevity": "5-7 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-14T07:23:30.336Z",
//       "updatedAt": "2025-06-23T06:33:53.612Z",
//       "__v": 0,
//       "metadata": {}
//     },
//     {
//       "_id": "6848375d3fa53794c460a679",
//       "name": "Midnight Oud Eau de Parfum",
//       "slug": "midnight-oud-eau-de-parfum",
//       "sku": "PF-MO-2025",
//       "barcode": "123456789021",
//       "brand": "Luxe Fragrance",
//       "yearFrom": 2024,
//       "yearTo": 2025,
//       "scentType": "oud",
//       "gender": "unisex",
//       "concentration": "eau de parfum",
//       "oemNumbers": [],
//       "manufacturerPartNumbers": [],
//       "manufacturer": [
//         "6841854936cecef2a24fbad8",
//         "684183b336cecef2a24fbace"
//       ],
//       "makeId": [
//         "684152a218a9ea883d6c2984"
//       ],
//       "modelId": [
//         "6841661a36cecef2a24fba92"
//       ],
//       "category": "68344cdc12e7fb53d2bc301e",
//       "mrp": 120,
//       "price": 100,
//       "costPrice": 80,
//       "stock": 30,
//       "sold": 0,
//       "lowStockThreshold": 5,
//       "shortDescription": "A luxurious oud-based eau de parfum for unisex use, launched in 2024.",
//       "description": "Midnight Oud Eau de Parfum blends rich oud with saffron and patchouli for a bold, sophisticated scent.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:25:53.058Z-unisex.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:25:53.058Z-unisex.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ]
//       ,
//       "tax": 0,
//       "priority": 10,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "oud",
//         "unisex",
//         "eau-de-parfum"
//       ],
//       "dimensions": {
//         "length": 9,
//         "width": 9,
//         "height": 16,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.35,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 100,
//           "stock": 20
//         },
//         {
//           "size": "100ml",
//           "price": 150,
//           "stock": 10
//         }
//       ],
//       "seo": {
//         "title": "Midnight Oud Eau de Parfum 2024",
//         "description": "Buy luxurious Midnight Oud Eau de Parfum for unisex. Rich oud scent with fast delivery.",
//         "keywords": [
//           "midnight oud perfume, unisex fragrance, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Saffron, Bergamot",
//         "heartNotes": "Oud, Rose",
//         "baseNotes": "Patchouli, Musk",
//         "longevity": "8-10 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-10T13:47:09.197Z",
//       "updatedAt": "2025-06-23 ",
//       "metadata": {}
//     },
//     {
//       "_id": "6848352f3fa53794c460a646",
//       "name": "Citrus Glow Eau de Cologne",
//       "slug": "citrus-glow-eau-de-cologne",
//       "sku": "PF-CG-2025",
//       "barcode": "123456789020",
//       "brand": "Luxe Fragrance",
//       "yearFrom": 2023,
//       "yearTo": 2025,
//       "scentType": "citrus",
//       "gender": "unisex",
//       "concentration": "eau de cologne",
//       "oemNumbers": [],
//       "manufacturerPartNumbers": [],
//       "manufacturer": "6841854936cecef2a24fbad8",
//       "makeId": "684150c818a9ea883d6c290f",
//       "modelId": "68415ae036cecef2a24fba54",
//       "category": "68344cdc12e7fb53d2bc301e",
//       "mrp": 50,
//       "price": 40,
//       "costPrice": 25,
//       "stock": 60,
//       "sold": 0,
//       "lowStockThreshold": 10,
//       "shortDescription": "A vibrant citrus eau de cologne for unisex use, launched in 2023.",
//       "description": "Citrus Glow Eau de Cologne offers a zesty blend of lemon, orange, and grapefruit for a refreshing everyday scent.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:50:44.595Z-oceanblue.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:50:44.595Z-oceanblue.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ]
//       ,
//       "tax": 0,
//       "priority": 9,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "citrus",
//         "unisex",
//         "eau-de-cologne"
//       ],
//       "dimensions": {
//         "length": 6,
//         "width": 6,
//         "height": 12,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.2,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 40,
//           "stock": 40
//         },
//         {
//           "size": "100ml",
//           "price": 60,
//           "stock": 20
//         }
//       ],
//       "seo": {
//         "title": "Citrus Glow Eau de Cologne 2023-2025",
//         "description": "Shop Citrus Glow Eau de Cologne for unisex. Zesty citrus scent with fast shipping.",
//         "keywords": [
//           "citrus glow perfume, eau de cologne unisex, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Lemon, Orange",
//         "heartNotes": "Grapefruit, Neroli",
//         "baseNotes": "Musk, Cedar",
//         "longevity": "4-6 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-10T13:37:51.657Z",
//       "updatedAt": "2025-06-23T06:33:54.320Z",
//       "__v": 0
//     },
//     {
//       "_id": "684833223fa53794c460a62c",
//       "name": "Velvet Rose Eau de Parfum",
//       "slug": "velvet-rose-eau-de-parfum",
//       "sku": "PF-VR-2025",
//       "barcode": "123456789019",
//       "brand": "Luxe Fragrance",
//       "yearFrom": 2022,
//       "yearTo": 2025,
//       "scentType": "floral",
//       "gender": "women",
//       "concentration": "eau de parfum",
//       "oemNumbers": [],
//       "manufacturerPartNumbers": [],
//       "manufacturer": "684183b336cecef2a24fbace",
//       "makeId": "68414f0218a9ea883d6c28da",
//       "modelId": "684155a818a9ea883d6c2997",
//       "category": "682ff96d35c69e4434392a0f",
//       "mrp": 85,
//       "price": 70,
//       "costPrice": 50,
//       "stock": 45,
//       "sold": 0,
//       "lowStockThreshold": 10,
//       "shortDescription": "A rich floral eau de parfum for women, launched in 2022.",
//       "description": "Velvet Rose Eau de Parfum combines lush rose with amber and musk for a luxurious feminine scent.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:51:55.759Z-rosy.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:51:55.759Z-rosy.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ]
//       ,
//       "tax": 0,
//       "priority": 8,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "floral",
//         "women",
//         "eau-de-parfum"
//       ],
//       "dimensions": {
//         "length": 8,
//         "width": 8,
//         "height": 15,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.3,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 70,
//           "stock": 30
//         },
//         {
//           "size": "100ml",
//           "price": 100,
//           "stock": 15
//         }
//       ],
//       "seo": {
//         "title": "Velvet Rose Eau de Parfum 2022-2025",
//         "description": "Shop Velvet Rose Eau de Parfum for women. Luxurious floral scent with fast delivery.",
//         "keywords": [
//           "velvet rose perfume, eau de parfum women, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Rose, Peony",
//         "heartNotes": "Jasmine, Violet",
//         "baseNotes": "Amber, Musk",
//         "longevity": "7-9 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-10T13:29:06.639Z",
//       "updatedAt": "2025-06-23T06:33:54.568Z",
//       "__v": 0
//     },
//     {
//       "_id": "684830a33fa53794c460a612",
//       "name": "Woody Spice Eau de Toilette",
//       "slug": "woody-spice-eau-de-toilette",
//       "sku": "PF-WS-2025",
//       "barcode": "123456789018",
//       "brand": "Luxe Fragrance",
//       "yearFrom": 2023,
//       "yearTo": 2025,
//       "scentType": "woody",
//       "gender": "men",
//       "concentration": "eau de toilette",
//       "oemNumbers": [],
//       "manufacturerPartNumbers": [],
//       "manufacturer": "6841800e36cecef2a24fbac4",
//       "makeId": "684150c818a9ea883d6c290f",
//       "modelId": "6841619036cecef2a24fba62",
//       "category": "683456d3091bbcbfe06a4345",
//       "mrp": 55,
//       "price": 45,
//       "costPrice": 30,
//       "stock": 80,
//       "sold": 0,
//       "lowStockThreshold": 15,
//       "shortDescription": "A bold woody eau de toilette for men, launched in 2023.",
//       "description": "Woody Spice Eau de Toilette blends cedarwood, black pepper, and vetiver for a warm, masculine fragrance.",
//       "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:29:23.955Z-seasonal.jpg",
//       "images": [
//         "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:29:23.955Z-seasonal.jpg"
//       ],
//       "videos": [
//         "https://ik.imagekit.io/6ljbxids8/bridal-perfume-2023-11-27-05-34-55-utc.mp4?updatedAt=1750744785121"
//       ],

//       "tax": 0,
//       "priority": 8,
//       "status": "active",
//       "featured": true,
//       "tags": [
//         "woody",
//         "men",
//         "eau-de-toilette"
//       ],
//       "dimensions": {
//         "length": 7,
//         "width": 7,
//         "height": 14,
//         "unit": "cm"
//       },
//       "weight": {
//         "value": 0.25,
//         "unit": "kg"
//       },
//       "variants": [
//         {
//           "size": "50ml",
//           "price": 45,
//           "stock": 50
//         },
//         {
//           "size": "100ml",
//           "price": 65,
//           "stock": 30
//         }
//       ],
//       "seo": {
//         "title": "Woody Spice Eau de Toilette 2023-2025",
//         "description": "Buy Woody Spice Eau de Toilette for men. Warm woody scent with fast shipping.",
//         "keywords": [
//           "woody spice perfume, eau de toilette men, luxe fragrance"
//         ]
//       },
//       "specifications": {
//         "topNotes": "Black Pepper, Bergamot",
//         "heartNotes": "Cedarwood, Nutmeg",
//         "baseNotes": "Vetiver, Patchouli",
//         "longevity": "5-7 hours"
//       },
//       "relatedProducts": [],
//       "allowBackorders": false,
//       "createdAt": "2025-06-10T13:18:27.803Z",
//       "updatedAt": "2025-06-23T06:33:55.111Z",
//       "__v": 0
//     }
//   ]

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsClient(true);
//       setWindowWidth(window.innerWidth);

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   // Determine which products to display
//   const displayProducts = staticMode
//     ? staticPerfumes.slice(start, limit)
//     : products.slice(start, limit);

//   return (
//     <>
//       <div className="relative w-full bg-white overflow-hidden">
//         <div className="tab-features-block md:pt-20 pt-10 max-w-7xl mx-auto px-4 relative z-10">
//           <div className="text-center mb-6 md:mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-black">
//               {title || "PRODUCTS"}
//             </h2>
//           </div>

//           {/* Grid container */}
//           <div
//             className={`list-product ${hideSoldProducts ? "hide-product-sold" : ""} relative`}
//           >
//             <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {displayProducts.map((prd, index) => (
//                 <div key={index} className="p-1 h-full">
//                   <Product product={prd} type="grid" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .list-product .grid {
//           display: grid;
//           width: 100%;
//         }

//         .list-product .product-item {
//           transition: all 0.3s ease;
//           height: 100%; /* Ensure uniform height */
//         }

//         /* Reduced card height */
//         .list-product .product-card {
//           height: 320px !important; /* Reduced from original */
//         }

//         .list-product .product-image-container {
//           height: 180px !important; /* Reduced image height */
//         }

//         @media (min-width: 768px) {
//           .list-product .product-item:hover {
//             transform: translateY(-5px);
//           }

//           .list-product .product-item:hover .product-img,
//           .list-product .product-item:hover .product-image {
//             opacity: 1 !important;
//             visibility: visible !important;
//             display: block !important;
//             transform: none !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default LatestProduct;






import React, { useEffect, useState } from "react";

const Product = ({ product, type }) => {
  return (
    <div className="product-item bg-white group cursor-pointer h-full flex flex-col min-w-[200px]">
      <div className="product-image-container relative overflow-hidden bg-gray-50 flex-shrink-0" style={{ height: '280px' }}>
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="product-info p-4 flex-grow flex flex-col justify-between items-center">
        <div className="text-center">
          <h3 className="product-name text-sm font-medium text-gray-900 mb-1 line-clamp-2 uppercase tracking-wide">
            {product.name.replace(/Eau de (Parfum|Toilette|Cologne)/gi, '').trim()}
          </h3>
          <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">
            BEST PERFUME
          </p>
        </div>
        
        <div className="product-price-section text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              AED {product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.mrp}
              </span>
            )}
          </div>
          
          <div className="product-actions space-y-2">
            <button className="w-full bg-white text-black border-2 text-sm py-2 px-4 hover:bg-gray-800 transition-colors">
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BestSellerProduct = ({
  start = 0,
  limit = 6,
  products,
  hideSoldProducts = false,
  title,
  staticMode = true,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const staticPerfumes = [
    {
      "_id": "684d265f5bdd400ebdea65c2",
      "name": "Floral Essence Eau de Parfum",
      "slug": "floral-essence-eau-de-parfum",
      "sku": "PF-FE-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:31:30.763Z-women_perfum.jpg",
    },
    {
      "_id": "684d23725bdd400ebdea6571",
      "name": "Ocean Breeze Eau de Toilette",
      "slug": "ocean-breeze-eau-de-toilette",
      "sku": "PF-OB-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:32:54.884Z-ocean.jpg",
    },
    {
      "_id": "6848375d3fa53794c460a679",
      "name": "Midnight Oud Eau de Parfum",
      "slug": "midnight-oud-eau-de-parfum",
      "sku": "PF-MO-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:25:53.058Z-unisex.jpg",
    },
    {
      "_id": "6848352f3fa53794c460a646",
      "name": "Citrus Glow Eau de Cologne",
      "slug": "citrus-glow-eau-de-cologne",
      "sku": "PF-CG-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:50:44.595Z-oceanblue.jpg",
    },
    {
      "_id": "684833223fa53794c460a62c",
      "name": "Velvet Rose Eau de Parfum",
      "slug": "velvet-rose-eau-de-parfum",
      "sku": "PF-VR-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:51:55.759Z-rosy.jpg",
    },
    {
      "_id": "684830a33fa53794c460a612",
      "name": "Woody Spice Eau de Toilette",
      "slug": "woody-spice-eau-de-toilette",
      "sku": "PF-WS-2025",
      "brand": "Luxe Fragrance",
      "mrp": 390,
      "price": 290,
      "thumbnail": "https://d33609liqwio9r.cloudfront.net/2025-06-24T09:29:23.955Z-seasonal.jpg",
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const displayProducts = staticMode
    ? staticPerfumes.slice(start, start + limit)
    : products?.slice(start, start + limit) || [];

  return (
    <div className="relative w-full bg-white overflow-hidden py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section - Exact Match */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-wide">
            BEAST SELLER
          </h2>
        </div>

        {/* Products Grid - 4 columns with adjusted gap */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {displayProducts.map((product, index) => (
            <div key={product._id || index} className="w-full">
              <Product product={product} type="grid" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BestSellerProduct;