import {
  DefaultSeo,
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SocialProfileJsonLd,
} from "next-seo"
import { twitterConfig, organizationConfig, localBusinessConfig, metaConfig } from "./seoConfig"

const SeoWrapper = ({
  title,
  description,
  canonicalUrl,
  keywords,
  openGraph,
  breadcrumbs,
  faq,
  jsonLdSchema,
  children,
}) => {
  return (
    <>
      {/* Default SEO Configuration */}
      <DefaultSeo
        title={title || metaConfig.title}
        description={description || metaConfig.description}
        canonical={canonicalUrl || "https://dunestodowntown.com/"}
        additionalMetaTags={[
          {
            name: "keywords",
            content: keywords || metaConfig.keywords,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1, maximum-scale=5",
          },
          { name: "format-detection", content: "telephone=no" },
          { name: "geo.region", content: "AE-DU" },
          { name: "geo.placename", content: "Dubai" },
          { name: "robots", content: "index, follow" },
        ]}
        openGraph={{
          type: "website",
          locale: "en_AE",
          url: canonicalUrl || "https://dunestodowntown.com/",
          site_name: "Dunes to Downtown Dubai",
          title: title || metaConfig.title,
          description: description || metaConfig.description,
          images: [
            {
              url: "https://dunestodowntown.com/_next/image?url=%2Fassets%2Fcover.jpg&w=1200&q=75",
              width: 1200,
              height: 630,
              alt: "Dubai Adventure Tours - Dunes to Downtown",
            },
          ],
          ...openGraph,
        }}
        twitter={twitterConfig}
      />

      {/* Organization JSON-LD */}
      <OrganizationJsonLd
        {...{
          ...organizationConfig,
          name: "Dunes to Downtown Dubai",
          url: "https://dunestodowntown.com/",
          logo: "https://dunestodowntown.com/_next/image?url=%2Fassets%2Fcover.jpg&w=1200&q=75",
          description:
            "Experience the ultimate Dubai adventure with Dunes to Downtown. From thrilling desert safaris to city tours, we offer memorable experiences across the UAE.",
        }}
      />

      {/* Local Business JSON-LD */}
      <LocalBusinessJsonLd
        {...{
          ...localBusinessConfig,
          name: "Dunes to Downtown Dubai",
          description:
            "Experience the ultimate Dubai adventure with Dunes to Downtown. From thrilling desert safaris to city tours, we offer memorable experiences across the UAE.",
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
        }}
      />

      {/* Breadcrumb JSON-LD */}
      {breadcrumbs && <BreadcrumbJsonLd itemListElements={breadcrumbs} />}

      <SocialProfileJsonLd
        type="Organization"
        name="Dunes to Downtown Dubai"
        url="https://dunestodowntown.com/"
        sameAs={[
          "https://www.facebook.com/dunestodowntown",
          "https://twitter.com/dunestodubai",
          "https://www.instagram.com/dunestodowntown",
        ]}
      />

      {/* FAQ JSON-LD */}
      {faq ? (
        <FAQPageJsonLd mainEntity={faq} />
      ) : (
        <FAQPageJsonLd
          mainEntity={[
            {
              questionName: "What kind of tours does Dunes to Downtown offer?",
              acceptedAnswerText:
                "We offer a wide range of experiences in Dubai, from desert safaris and dune buggy rides to city tours and cultural explorations.",
            },
            {
              questionName: "How can I book a tour with Dunes to Downtown?",
              acceptedAnswerText:
                "You can book directly on our website or contact our team via email at booking@dunestodowntown.com or by calling +971 55 534 6567.",
            },
            {
              questionName: "Where is your office located?",
              acceptedAnswerText:
                "Our office is located at ALBAHAR Building, Al Khabeesi, Dubai, UAE.",
            },
            {
              questionName: "What are your working hours?",
              acceptedAnswerText:
                "We are open from Monday to Friday, 8:00 AM to 5:00 PM.",
            },
          ]}
        />
      )}

      {/* Custom JSON-LD Schema */}
      {jsonLdSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      )}
      {children}
    </>
  )
}

export default SeoWrapper
