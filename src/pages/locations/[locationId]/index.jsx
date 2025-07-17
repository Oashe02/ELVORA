// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Clock, Shield, UserCheck, MapPin, ChevronRight,Building,Sunrise,Users,Calendar } from "lucide-react"
// import { LocationSelector } from "../../../components/_locationNavbar/location-selector"
// import locationsData from "../../../components/Home/Data/locations.json"
// import SeoWrapper from "@/components/SeoWrapper"
// import Layout from "../../../components/Layout"

// // Generate paths for all locations (for sitemap and static generation)
// export const getStaticPaths = async () => {
//   const paths = locationsData.locations.map((location) => ({
//     params: { locationId: location.id },
//   }))

//   return { paths, fallback: "blocking" }
// }

// // Fetch data for each location at build time
// export const getStaticProps = async ({ params }) => {
//   const locationId = params?.locationId
//   const location = locationsData.locations.find((loc) => loc.id === locationId)

//   if (!location) {
//     return { notFound: true }
//   }

//   return {
//     props: {
//       location,
//       allLocations: locationsData.locations,
//     },
//     // Revalidate pages every 24 hours (optional)
//     revalidate: 86400,
//   }
// }

// export default function LocationPage({ location: initialLocation, allLocations }) {
//   const [currentLocation, setCurrentLocation] = useState(initialLocation)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const [openFAQ, setOpenFAQ] = useState(null)
//   const [hoveredCard, setHoveredCard] = useState(null)

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index)
//   }

//   // Handle location change from URL
//   useEffect(() => {
//     setCurrentLocation(initialLocation)
//   }, [initialLocation])

//   const handleLocationChange = (locationId) => {
//     const newLocation = allLocations.find((loc) => loc.id === locationId)
//     if (newLocation) {
//       setIsTransitioning(true)

//       // Update URL without page reload
//       window.history.pushState({}, "", `/locations/${locationId}`)

//       setTimeout(() => {
//         setCurrentLocation(newLocation)
//         setIsTransitioning(false)
//       }, 300)
//     }
//   }

//   // Enhanced SEO Configuration with location-focused keywords
//   const locationTitle = currentLocation.title.toLowerCase().includes("dubai")
//     ? currentLocation.title
//     : `${currentLocation.title} Dubai`

//   const title = `Desert Adventures in ${locationTitle} | Quad Biking & Dune Buggy Tours`
//   const description = currentLocation.description
//     ? currentLocation.description.length > 160
//       ? currentLocation.description.substring(0, 157) + "..."
//       : currentLocation.description
//     : `Experience thrilling desert adventures in ${locationTitle}. Book your quad biking or dune buggy tour with us today!`

//   const canonicalUrl = `https://dunestodowntown.com//locations/${currentLocation.id}`

//   const keywords = `${currentLocation.title.toLowerCase()}, desert safari ${currentLocation.name.toLowerCase()}, quad biking ${currentLocation.name.toLowerCase()}, dune buggy ${currentLocation.name.toLowerCase()}, desert adventure ${currentLocation.name.toLowerCase()}, dubai desert tours, ${currentLocation.name.toLowerCase()} tourism`

//   const openGraph = {
//     type: "website",
//     locale: "en_AE",
//     url: canonicalUrl,
//     title,
//     description,
//     site_name: "Adventure Time Tourism Dubai",
//     images: [
//       {
//         url:
//           currentLocation.image || "https://dunestodowntown.com//_next/image?url=%2Fassets%2Fbuggy2.jpg&w=750&q=75",
//         width: 1200,
//         height: 630,
//         alt: `Adventure Time Tourism Dubai - ${locationTitle}`,
//       },
//     ],
//   }

//   const twitter = {
//     cardType: "summary_large_image",
//     site: "@dunebuggytourdubai",
//     handle: "@dunebuggytourdubai",
//     title,
//     description,
//     image: currentLocation.image || "https://dunestodowntown.com//_next/image?url=%2Fassets%2Fbuggy2.jpg&w=750&q=75",
//   }

//   const breadcrumbs = [
//     { position: 1, name: "Home", item: "https://dunestodowntown.com//" },
//     { position: 2, name: "Locations", item: "https://dunestodowntown.com//locations" },
//     { position: 3, name: locationTitle, item: canonicalUrl },
//   ]

//   // Generate FAQ data from categories and services
//   const faqData = [
//     {
//       question: `What activities are available in ${currentLocation.name}?`,
//       answer: `In ${currentLocation.name}, we offer various activities including ${currentLocation.categories.join(", ")}. Our most popular tours include morning and evening desert safaris, dune buggy adventures, and quad biking experiences.`,
//     },
//     {
//       question: `What services do you provide for desert tours in ${currentLocation.name}?`,
//       answer: `For our ${currentLocation.name} desert tours, we provide ${currentLocation.services.join(", ")}. All our tours are led by experienced guides who prioritize your safety and enjoyment.`,
//     },
//     {
//       question: `When is the best time to visit ${currentLocation.name} for desert adventures?`,
//       answer: `The best time to visit ${currentLocation.name} for desert adventures is during the winter months (October to March) when temperatures are more moderate. However, we offer early morning and evening tours year-round to avoid the midday heat during summer.`,
//     },
//     {
//       question: `Do I need prior experience for quad biking or dune buggy tours in ${currentLocation.name}?`,
//       answer: `No prior experience is necessary for our quad biking or dune buggy tours in ${currentLocation.name}. Our guides provide comprehensive safety briefings and driving instructions before each tour. We offer options suitable for beginners with gentler routes.`,
//     },
//   ]

//   const faqs = [
//     {
//       question: "What is the minimum age requirement for dune buggy tours?",
//       answer:
//         "The minimum age to drive a dune buggy is 16 years with a valid driving license. Passengers must be at least 5 years old. Children between 5-15 years can ride as passengers with an adult.",
//     },
//     {
//       question: "Do I need prior experience to drive a dune buggy?",
//       answer:
//         "No prior experience is necessary. Our guides provide a comprehensive safety briefing and driving instructions before the tour begins. We offer tours suitable for beginners with gentler routes and smaller dunes.",
//     },
//     {
//       question: "What should I wear for a dune buggy tour?",
//       answer:
//         "We recommend comfortable clothing that covers your arms and legs to protect from sun and sand. Closed shoes are mandatory. We provide helmets, goggles, and face masks to protect from dust and sand.",
//     },
//     {
//       question: "Are your dune buggy tours available year-round?",
//       answer:
//         "Yes, we operate tours throughout the year. However, during the summer months (June-August), we recommend morning or evening tours to avoid the extreme midday heat. Winter (November-March) offers the most pleasant weather conditions.",
//     },
//     {
//       question: "Do you offer hotel pickup and drop-off?",
//       answer:
//         "Yes, we provide complimentary pickup and drop-off services from most hotels and residences in Dubai. For locations in other emirates, additional transportation fees may apply.",
//     },
//     {
//       question: "What's included in the Dubai Morning Desert Safari?",
//       answer:
//         "Our Dubai Morning Desert Safari includes dune bashing in a 4x4 vehicle, sandboarding, camel riding, and a traditional Arabic breakfast. The tour typically runs from 8:00 AM to 12:00 PM, offering cooler temperatures and beautiful morning light for photography.",
//     },
//     {
//       question: "What can I expect from the Jabel Jais High Mountain Sightseeing Tour?",
//       answer:
//         "The Jabel Jais High Mountain Sightseeing Tour takes you to the UAE's highest peak. You'll experience breathtaking views, cooler mountain temperatures, and the world's longest zipline (optional). The tour includes transportation, guided commentary, and photo stops at scenic viewpoints.",
//     },
//   ]

//   const adventures = [
//     {
//       id: 1,
//       title: "Global Village & Dubai Frame tour Package",
//       description:
//         "Experience the cultural diversity at Global Village and visit the iconic Dubai Frame in one comprehensive tour package. Explore pavilions representing different countries, enjoy international cuisine, and witness spectacular views of old and new Dubai from the Frame's observation deck.",
//       linkText: "Learn more about this tour",
//       icon: "🏙️",
//       position: "left",
//     },
//     {
//       id: 2,
//       title: "Hotel Pick-Up and Drop-Off Service in Dubai City",
//       description:
//         "Enjoy the convenience of our hotel pick-up and drop-off service throughout Dubai city. Our professional drivers will collect you from your accommodation and return you safely after your tour or adventure, ensuring a hassle-free experience from start to finish.",
//       linkText: "Explore our transport services",
//       icon: "🚗",
//       position: "right",
//     },
//     {
//       id: 3,
//       title: "Dubai City Airport Pickup & Drop Off Service",
//       description:
//         "Start and end your Dubai adventure smoothly with our airport transfer service. Our drivers will meet you at the airport arrivals hall and transport you to your hotel, and will collect you from your accommodation for your departure, ensuring timely and comfortable transfers.",
//       linkText: "Book airport transfers",
//       icon: "✈️",
//       position: "left",
//     },
//     {
//       id: 4,
//       title: "Dubai Sunrise Desert Safari Package",
//       description:
//         "Experience the tranquility of the desert at dawn with our Sunrise Desert Safari. Watch the sun rise over the golden dunes, enjoy a traditional breakfast, and participate in activities like camel riding and sandboarding in the cool morning hours.",
//       linkText: "Discover Sunrise Safari details",
//       icon: "🌅",
//       position: "right",
//     },
//     {
//       id: 5,
//       title: "Dunes to Down Town",
//       description:
//         "Our Dunes to Downtown tour offers the perfect blend of desert adventure and city exploration. Begin with an exhilarating desert safari experience, then transition to a guided tour of Dubai's urban attractions, providing a comprehensive Dubai experience in a single day.",
//       linkText: "Book Dunes to Downtown",
//       icon: "🏜️",
//       position: "left",
//     },
//     {
//       id: 6,
//       title: "Lapita Hotel and Resort",
//       description:
//         "Enhance your Dubai adventure with a stay at the Polynesian-themed Lapita Hotel and Resort. Located within Dubai Parks and Resorts, this luxury accommodation offers easy access to theme parks, exceptional dining, and relaxing spa facilities, perfect for families and couples.",
//       linkText: "Explore Lapita packages",
//       icon: "🏨",
//       position: "right",
//     },
//   ]

//   const jsonLdSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "WebPage",
//         "@id": canonicalUrl,
//         url: canonicalUrl,
//         name: title,
//         description: description,
//         datePublished: "2023-01-01T00:00:00+00:00",
//         dateModified: new Date().toISOString(),
//         isPartOf: { "@id": "https://dunestodowntown.com//#website" },
//         about: { "@id": "https://dunestodowntown.com//#organization" },
//         primaryImageOfPage: {
//           "@id":
//             currentLocation.image || "https://dunestodowntown.com//_next/image?url=%2Fassets%2Fbuggy2.jpg&w=750&q=75",
//         },
//         inLanguage: "en-AE",
//       },
//       {
//         "@type": "TouristAttraction",
//         name: locationTitle,
//         description: currentLocation.description,
//         url: canonicalUrl,
//         isAccessibleForFree: false,
//         address: {
//           "@type": "PostalAddress",
//           addressLocality: currentLocation.name,
//           addressRegion: "Dubai",
//           addressCountry: "AE",
//         },
//         geo: {
//           "@type": "GeoCoordinates",
//           latitude: 24.9595002,
//           longitude: 55.6199372,
//         },
//         image:
//           currentLocation.image || "https://dunestodowntown.com//_next/image?url=%2Fassets%2Fbuggy2.jpg&w=750&q=75",
//         touristType: ["Adventure Traveler", "Thrill Seeker", "Desert Explorer"],
//       },
//       {
//         "@type": "Organization",
//         "@id": "https://dunestodowntown.com//#organization",
//         name: "Adventure Time Tourism Dubai",
//         url: "https://dunestodowntown.com//",
//         sameAs: [
//           "https://www.facebook.com/dunebuggytourdubai",
//           "https://twitter.com/dunebuggytourdubai",
//           "https://www.instagram.com/dunebuggytourdubai",
//         ],
//         telephone: "+97152 8860094",
//         email: "adventuretimetourismuae@gmail.com",
//         address: {
//           "@type": "PostalAddress",
//           streetAddress: "Dubai Desert",
//           addressLocality: "Dubai",
//           addressRegion: "Dubai",
//           addressCountry: "AE",
//         },
//       },
//       {
//         "@type": "FAQPage",
//         mainEntity: faqData.map((faq) => ({
//           "@type": "Question",
//           name: faq.question,
//           acceptedAnswer: {
//             "@type": "Answer",
//             text: faq.answer,
//           },
//         })),
//       },
//     ],
//   }

//   return (
//     <SeoWrapper
//       title={title}
//       description={description}
//       canonicalUrl={canonicalUrl}
//       keywords={keywords}
//       openGraph={openGraph}
//       twitter={twitter}
//       breadcrumbs={breadcrumbs}
//       faq={faqData}
//       jsonLdSchema={jsonLdSchema}
//     >
//       <Layout>
//         <main>
//           <section
//             className="relative bg-cover bg-center py-24"
//             style={{ backgroundImage: `url(${currentLocation.image})` }}
//           >
//             <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//             <div className="container mx-auto relative z-10 text-center text-white">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentLocation.title}</h1>
//               <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{currentLocation.description}</p>
//               <Link href="/contact-us">
//                 <button className="bg-[#c19a6b] hover:bg-[#a67c52] text-white font-bold py-3 px-8 rounded-full transition-colors">
//                   Book Now
//                 </button>
//               </Link>
//             </div>
//           </section>

//           <LocationSelector
//             locations={allLocations}
//             activeLocation={currentLocation.id}
//             onLocationChange={handleLocationChange}
//           />

//           <section className="py-12 px-4">
//             <div
//               className={`container mx-auto transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
//             >
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
//                   <Image
//                     src={currentLocation.image || "/placeholder.svg"}
//                     alt={`${currentLocation.title} landscape`}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     priority
//                   />
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <MapPin className="h-5 w-5 text-[#d2691e]" />
//                     <h2 className="text-2xl font-bold text-[#8b4513]">{currentLocation.name}</h2>
//                   </div>
//                   <p className="text-[#a67c52] mb-6">{currentLocation.description}</p>

//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold text-[#8b4513] mb-3">Popular Tour Categories:</h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       {currentLocation.categories.map((category, index) => (
//                         <div key={index} className="flex items-center gap-2 bg-[#f5e6cb] p-3 rounded-lg">
//                           <div className="h-2 w-2 rounded-full bg-[#d2691e]"></div>
//                           <span className="text-sm text-[#a67c52]">{category}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-[#8b4513] mb-3">Services Available:</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                       <div className="flex items-center gap-2 bg-[#f5e6cb] p-3 rounded-lg">
//                         <Clock className="h-5 w-5 text-[#d2691e]" />
//                         <span className="text-sm text-[#a67c52]">{currentLocation.services[0]}</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-[#f5e6cb] p-3 rounded-lg">
//                         <Shield className="h-5 w-5 text-[#d2691e]" />
//                         <span className="text-sm text-[#a67c52]">{currentLocation.services[1]}</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-[#f5e6cb] p-3 rounded-lg">
//                         <UserCheck className="h-5 w-5 text-[#d2691e]" />
//                         <span className="text-sm text-[#a67c52]">{currentLocation.services[2]}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <Link href="/contact-us">
//                       <button className="bg-[#c19a6b] hover:bg-[#a67c52] text-white py-3 px-6 rounded-lg transition-colors">
//                         Book a Tour Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Featured Tours */}
//           {/* <section className="py-12 bg-[#f8f0e3]">
//             <div
//               className={`container mx-auto transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
//             >
//               <h2 className="text-2xl font-bold text-[#8b4513] mb-8 text-center">
//                 Featured Tours in {currentLocation.name}
//               </h2>

//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//                   <div className="relative h-48">
//                     <Image src="/images/gallery/dunebashing.jpg" alt="Dubai Evening Desert Safari" fill className="object-cover" />
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-bold text-[#8b4513] mb-2">
//                       Dubai Evening Desert Safari with BBQ dinner Package
//                     </h4>
//                     <p className="text-sm text-[#a67c52] mb-3">
//                       Experience the magic of the desert at sunset followed by a traditional BBQ dinner.
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#d2691e] font-semibold">From AED 299</span>
//                       <Link href="/contact-us">
//                         <button className="bg-[#d2691e] text-white px-3 py-1 rounded-md text-sm">Book Now</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//                   <div className="relative h-48">
//                     <Image src="/images/gallery/atv.jpg" alt="Self-Drive Desert Buggy Tours" fill className="object-cover" />
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-bold text-[#8b4513] mb-2">Self-Drive Desert Buggy Tours in Dubai</h4>
//                     <p className="text-sm text-[#a67c52] mb-3">
//                       Take control and drive your own buggy through Dubai's magnificent desert dunes.
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#d2691e] font-semibold">From AED 349</span>
//                       <Link href="/contact-us">
//                         <button className="bg-[#d2691e] text-white px-3 py-1 rounded-md text-sm">Book Now</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//                   <div className="relative h-48">
//                     <Image
//                       src="/images/popular/dubaicity.png"
//                       alt="Dubai City Sightseeing tour"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-bold text-[#8b4513] mb-2">Dubai City Sightseeing tour Package</h4>
//                     <p className="text-sm text-[#a67c52] mb-3">
//                       Explore the iconic landmarks and attractions of Dubai city with our guided tour.
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#d2691e] font-semibold">From AED 399</span>
//                       <Link href="/contact-us">
//                         <button className="bg-[#d2691e] text-white px-3 py-1 rounded-md text-sm">Book Now</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section> */}

//           {/* Additional Content Section */}
//        <section className="py-20 px-4 bg-[#fdf6e9] relative">
//       {/* Background pattern */}
//       <div className="absolute inset-0 z-0">
//         <div
//           className="absolute inset-0"
//           style={{ backgroundImage: "radial-gradient(#d2691e20 1px, transparent 1px)", backgroundSize: "30px 30px" }}
//         ></div>
//       </div>

//       <div className="container mx-auto relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-[#8b4513] mb-4">Explore Our Desert Adventure Options</h2>
//           <div className="w-24 h-1 bg-[#d2691e] mx-auto mb-6"></div>
//           <p className="text-[#a67c52] max-w-2xl mx-auto">
//             Discover our range of exciting desert adventures and services designed to make your Dubai experience
//             unforgettable.
//           </p>
//         </div>

//         <div className="relative">
//           {/* Timeline line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#d2691e]"></div>

//           {/* Timeline content */}
//           <div className="relative z-10">
//             {adventures.map((adventure) => (
//               <div key={adventure.id} className="mb-16 relative">
//                 {/* Timeline dot */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 w-6 h-6 rounded-full bg-[#d2691e] border-4 border-[#fdf6e9] z-20"></div>

//                 <div className={`flex items-start ${adventure.position === "left" ? "flex-row" : "flex-row-reverse"}`}>
//                   {/* Empty space for alignment */}
//                   <div className="w-1/2"></div>

//                   {/* Content */}
//                   <div className={`w-1/2 ${adventure.position === "left" ? "pr-12 text-right" : "pl-12 text-left"}`}>
//                     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//                       <div className="flex items-center mb-4 justify-between">
//                         <div
//                           className={`w-12 h-12 rounded-full bg-[#f8f0e3] flex items-center justify-center text-2xl ${
//                             adventure.position === "left" ? "order-last ml-4" : "mr-4"
//                           }`}
//                         >
//                           {adventure.icon}
//                         </div>
//                         <h3 className="text-xl font-bold text-[#8b4513] flex-1">{adventure.title}</h3>
//                       </div>
//                       <p className="text-[#a67c52] mb-4">{adventure.description}</p>
//                       <Link
//                         href="#"
//                         className={`inline-flex items-center text-[#d2691e] font-medium hover:text-[#a0522d] transition-colors group ${
//                           adventure.position === "left" ? "flex-row-reverse" : ""
//                         }`}
//                       >
//                         {adventure.linkText}
//                         <ChevronRight
//                           className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
//                             adventure.position === "left" ? "mr-1 rotate-180 group-hover:-translate-x-1" : "ml-1"
//                           }`}
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-16 text-center relative z-10">
//           <Link href="/activities">
//             <button className="bg-[#d2691e] hover:bg-[#a0522d] text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center">
//               View All Adventures
//               <ChevronRight className="ml-2 h-5 w-5" />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>

//           {/* FAQ Section */}
//               <section className="py-16 px-4 md:px-8 bg-[#f8f0e3]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#8b4513] text-center mb-16">Frequently Asked Questions</h2>

//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           <div className="w-full lg:w-3/5">
//             {faqs.map((faq, index) => (
//               <div key={index} className="mb-6 border border-[#d2b48c] rounded-lg shadow-sm overflow-hidden">
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-[#fdf6e9] transition-colors"
//                   aria-expanded={openFAQ === index}
//                   aria-controls={`faq-answer-${index}`}
//                 >
//                   <div className="flex items-center">
//                     <span className="text-2xl mr-4 text-[#d2691e]">{openFAQ === index ? "−" : "+"}</span>
//                     <span className="font-medium text-lg text-[#8b4513]">{faq.question}</span>
//                   </div>
//                   <div className="bg-[#d2691e] rounded-full p-1 flex-shrink-0">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d={openFAQ === index ? "M19 9l-7 7-7-7" : "M12 4v16m8-8H4"}
//                       />
//                     </svg>
//                   </div>
//                 </button>
//                 <div
//                   id={`faq-answer-${index}`}
//                   className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                     openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="p-5 pt-0 bg-white">
//                     <p className="text-[#a67c52]">{faq.answer}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* View More Button */}
//             <div className="mt-8 text-center">
//               <Link href="/faq">
//                 <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#d2691e] shadow-sm hover:bg-[#a0522d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d2691e] transition-colors">
//                   View All FAQs
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 ml-2"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="w-full lg:w-2/5 relative hidden lg:block">
//             <div className="absolute -top-20 right-0">
//               <Image src="/images/Sun.png" alt="Sun" width={100} height={100} className="animate-pulse" />
//             </div>

//             <div className="relative h-[400px] w-full">
//               <div className="absolute inset-0">
//                 <Image src="/images/Date Palm.png" alt="Palm Trees" fill className="object-contain" />
//               </div>

//               <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
//                 <Image
//                   src="/images/Camel.png"
//                   alt="Camel"
//                   width={180}
//                   height={180}
//                   className="object-contain"
//                 />
//               </div>

//               <div className="absolute bottom-0 right-0">
//                 <Image
//                   src="/images/Tent.png"
//                   alt="Desert Tent"
//                   width={150}
//                   height={100}
//                   className="object-contain"
//                 />
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 h-[80px]">
//                 <div className="w-full h-full bg-amber-100/70 rounded-[50%] transform translate-y-1/2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//           {/* Call to Action */}
//           <section className="py-16 px-4 bg-[#8b4513] text-white">
//             <div className="container mx-auto text-center">
//               <h2 className="text-3xl font-bold mb-4">Ready for Your Desert Adventure?</h2>
//               <p className="text-xl mb-8 max-w-2xl mx-auto">
//                 Book your dune buggy tour today and experience the thrill of Dubai's magnificent desert landscape.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/contact-us">
//                   <button className="bg-[#d2691e] hover:bg-[#a0522d] text-white font-bold py-3 px-8 rounded-full transition-colors">
//                     Book Now
//                   </button>
//                 </Link>
//                 <Link href="/contact-us">
//                   <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#8b4513] text-white font-bold py-3 px-8 rounded-full transition-colors">
//                     Contact Us
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </section>
//         </main>
//       </Layout>
//     </SeoWrapper>
//   )
// }

import React from "react";

const Index = () => {
	return <div>Index</div>;
};

export default Index;
