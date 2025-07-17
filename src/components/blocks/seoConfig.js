export const twitterConfig = {
	handle: "@dunestodubai",
	site: "@dunestodubai",
	cardType: "summary_large_image",
  }
  
  export const organizationConfig = {
	legalName: "Dunes to Downtown Dubai",
	url: "https://dunestodowntown.com/",
	logo: "https://dunestodowntown.com/_next/image?url=%2Fassets%2Fcover.jpg&w=1200&q=75",
	contactPoint: {
	  telephone: "+971 55 534 6567",
	  contactType: "customer service",
	  areaServed: ["Dubai", "UAE"],
	  availableLanguage: "en",
	  email: "booking@dunestodowntown.com",
	},
	sameAs: [
	  "https://www.facebook.com/dunestodowntown",
	  "https://twitter.com/dunestodubai",
	  "https://www.instagram.com/dunestodowntown",
	],
	images: [
	  "https://dunestodowntown.com/_next/image?url=%2Fassets%2Fcover.jpg&w=1200&q=75",
	],
  }
  
  export const localBusinessConfig = {
	type: "LocalBusiness",
	name: "Dunes to Downtown Dubai",
	description:
	  "Experience the ultimate Dubai adventure with Dunes to Downtown. From thrilling desert safaris and dune buggy tours to immersive city excursions, we offer unforgettable experiences across the UAE.",
	url: "https://dunestodowntown.com/",
	telephone: "+971 55 534 6567",
	address: {
	  streetAddress: "Office, ALBAHAR Building, Al Khabeesi",
	  addressLocality: "Dubai",
	  addressRegion: "Dubai",
	  postalCode: "",
	  addressCountry: "AE",
	},
	geo: {
	  latitude: "25.276987",
	  longitude: "55.296249",
	},
	areaServed: [
	  {
		geoMidpoint: {
		  latitude: "25.276987",
		  longitude: "55.296249",
		},
		geoRadius: "50000",
	  },
	],
	priceRange: "$$",
	openingHours: [
	  {
		opens: "08:00",
		closes: "17:00",
		dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	  },
	],
  }
  
  export const seoKeywords = {
	primary: [
	  "Desert Safari Dubai",
	  "Dune Buggy Dubai",
	  "Quad Biking Dubai",
	  "ATV Rental Dubai",
	  "Dubai City Tours",
	  "Dunes to Downtown",
	],
	secondary: [
	  "Best desert safari in Dubai",
	  "Dubai dune buggy tours",
	  "Quad biking in the desert",
	  "Adventure tours Dubai",
	  "Dubai city sightseeing",
	],
	local: [
	  "Dubai Desert Safari",
	  "ATV tours Al Khabeesi",
	  "Dune buggy near Al Khabeesi",
	  "Downtown Dubai tours",
	  "Dubai adventure experiences",
	],
  }
  
  export const metaConfig = {
	title: "Desert Safari & Dune Buggy Dubai | Dunes to Downtown UAE",
	description:
	  "Experience the ultimate desert adventure in Dubai with Dunes to Downtown. Enjoy thrilling dune buggy rides, ATV tours, and immersive city excursions. Book your Dubai desert safari today!",
	keywords: [
	  ...seoKeywords.primary,
	  ...seoKeywords.secondary,
	  ...seoKeywords.local,
	].join(", "),
  }
  