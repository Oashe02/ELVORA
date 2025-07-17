// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Banner = () => {
//   return (
//     <div className="banner-block style-one flex w-full gap-4">
//       {/* First Banner */}
//       <Link
//         href="/shop/breadcrumb-img"
//         className="banner-item relative block w-1/2 overflow-hidden group"
//         aria-label="Shop Best Sellers"
//       >
//         <div className="banner-img relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
//           <Image
//             src="https://d33609liqwio9r.cloudfront.net/2025-05-26T16:50:32.296Z-pexels-paduret-1476318%20(1).jpg"
//             fill
//             sizes="50vw"
//             alt="Best Sellers Banner"
//             priority={true}
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         </div>
//         <div className="banner-content absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
//           <h2 className="heading2 text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">
//             Best Sellers
//           </h2>
//           <div className="mt-4">
//             <span className="text-white text-lg font-medium underline underline-offset-4 hover:text-gray-200 transition-colors duration-300">
//               Shop Now
//             </span>
//           </div>
//         </div>
//       </Link>

//       {/* Second Banner */}
//       <Link
//         href="/shop/breadcrumb-img"
//         className="banner-item relative block w-1/2 overflow-hidden group"
//         aria-label="Shop New Arrivals"
//       >
//         <div className="banner-img relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
//           <Image
//             src="https://d33609liqwio9r.cloudfront.net/2025-05-26T16:52:06.376Z-pexels-cottonbro-7565157.jpg"
//             fill
//             sizes="50vw"
//             alt="New Arrivals Banner"
//             priority={true}
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         </div>
//         <div className="banner-content absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
//           <h2 className="heading2 text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">
//             New Arrivals
//           </h2>
//           <div className="mt-4">
//             <span className="text-white text-lg font-medium underline underline-offset-4 hover:text-gray-200 transition-colors duration-300">
//               Shop Now
//             </span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Banner;






import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="banner-block style-one flex w-full gap-4">
      {/* Second Banner (New Arrivals) */}
      <Link
        href="/shop/breadcrumb-img"
        className="banner-item relative block w-1/2 overflow-hidden group"
        aria-label="Shop Best Sellers"
      >
        <div className="banner-img relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="https://d33609liqwio9r.cloudfront.net/2025-06-24T10:04:45.842Z-best_seller.jpg"
            fill
            sizes="50vw"
            alt="Best Sellers Banner"
            priority={true}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="banner-content absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
          <h2 className="heading2 text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">
            Best Sellers
          </h2>
          <div className="mt-4">
            <span className="text-white text-lg font-medium underline underline-offset-4 hover:text-gray-200 transition-colors duration-300">
              Shop Now
            </span>
          </div>
        </div>
      </Link>

      {/* First Banner (Best Sellers) */}
      <Link
        href="/shop/breadcrumb-img"
        className="banner-item relative block w-1/2 overflow-hidden group"
        aria-label="Shop New Arrivals"
      >
        <div className="banner-img relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="https://d33609liqwio9r.cloudfront.net/2025-06-24T10:05:57.601Z-new_arrivel.jpg"
            fill
            sizes="50vw"
            alt="New Arrivals Banner"
            priority={true}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="banner-content absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
          <h2 className="heading2 text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">
               New Arrivals
          </h2>
          <div className="mt-4">
            <span className="text-white text-lg font-medium underline underline-offset-4 hover:text-gray-200 transition-colors duration-300">
              Shop Now
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Banner;