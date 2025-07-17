// import React from "react";
// import { ArrowRight, Settings, Star, Shield } from "lucide-react";
// import Link from "next/link";

// const VolvoPartsHero = () => {
//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

//         {/* Left Side - Image */}
//         <div className="relative">
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <img
//               src="https://d33609liqwio9r.cloudfront.net/2025-06-17T14:11:32.730Z-photo_6235669434752682639_w.jpg"
//               alt="Volvo aerial view"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Dark overlay for better text contrast */}
//           <div className="absolute inset-0 bg-black/30"></div>

//           {/* Subtle gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60"></div>
//         </div>

//         {/* Right Side - Content */}
//         <div className="relative flex items-center justify-center px-8 lg:px-16 py-16">
//           {/* Background subtle pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute top-20 right-20 w-32 h-32 border border-white rounded-full"></div>
//             <div className="absolute bottom-32 right-32 w-16 h-16 border border-white rounded-full"></div>
//             <div className="absolute top-1/2 right-8 w-8 h-8 bg-white rounded-full"></div>
//           </div>

//           <div className="relative z-10 max-w-xl">
//             {/* Brand Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full mb-8">
//               <Settings className="w-4 h-4" />
//               <span className="text-sm font-medium">Genuine Volvo Parts</span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-6">
//               Shop Parts and Accessories
//               <span className="block text-gray-300 mt-2">
//                 designed for your Volvo
//               </span>
//             </h1>

//             <h2 className="text-2xl lg:text-3xl font-light text-gray-400 mb-8">
//               the car designed around you.
//             </h2>

//             {/* Description */}
//             <p className="text-lg text-gray-300 leading-relaxed mb-8">
//               Designed around you is more than a tagline. It is the central philosophy of Volvo, and nowhere is that philosophy more evident than in our Genuine Parts, Accessories and Lifestyle Collection.
//             </p>

//             <p className="text-base text-gray-400 leading-relaxed mb-12">
//               You know that nothing can replace an authentic Volvo part. We also invite you to experience thoughtful accessories that fulfill your needs and goods that delight your senses as well.
//             </p>

//             {/* Feature Icons */}
//             <div className="flex gap-8 mb-12">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
//                   <Star className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-sm">Authentic Quality</h3>
//                   <p className="text-gray-400 text-xs">Genuine parts</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
//                   <Shield className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-sm">Guaranteed Fit</h3>
//                   <p className="text-gray-400 text-xs">Perfect compatibility</p>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link href="/">
//                 <button className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 group">
//                   <span>Shop Now</span>
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </Link>
//               <Link href="/Search">
//                 <button className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-gray-600 font-medium hover:border-white transition-colors duration-300">
//                   <span>Find My Parts</span>
//                 </button>
//               </Link>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VolvoPartsHero;





import React from "react";

const PerfumeHero = () => {
  return (
    <div className="h-[60vh] bg-black text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

        {/* Left Side - Image */}
        <div className="relative h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://d33609liqwio9r.cloudfront.net/2025-06-24T11:34:11.138Z-heroimage.jpg"
              alt="Luxury perfume bottle"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Right Side - Content */}
        <div className="relative flex items-center justify-start px-8 lg:px-12 py-8 bg-black">
          <div className="relative z-10 w-full max-w-md">
            {/* Small category text */}
            <div className="mb-4">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Women Collection</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-normal leading-tight mb-6 text-white">
              Explore Our Fragrance Categories<br />
              and Find Your Perfect Scent Today!
            </h1>

            {/* Description Section */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-medium">
                DESCRIPTION
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Dive into our diverse selection of fragrances tailored for<br />
                every mood. Whether you prefer floral, woody, or<br />
                something unique, we have something special for you.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-white font-medium mb-2 text-sm">Floral Scents</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Delicate and romantic fragrances<br />
                  that evoke the beauty of blooming<br />
                  flowers.
                </p>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2 text-sm">Woody Aromas</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rich and earthy scents that bring<br />
                  warmth and depth to your fragrance<br />
                  collection.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors duration-300 rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeHero;