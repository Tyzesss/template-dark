import {
  absoluteUrl,
  EMAIL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  MAPS_URL,
  PHONE_E164,
  SITE_CITY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  ADDRESS_STREET,
  ADDRESS_CITY,
  ADDRESS_POSTAL,
  COMPANY_LEGAL_NAME,
  siteBaseUrl,
} from "@/lib/site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE_NAME,
    legalName: COMPANY_LEGAL_NAME,
    description: SITE_DESCRIPTION,
    url: siteBaseUrl(),
    image: absoluteUrl(SITE_OG_IMAGE),
    telephone: PHONE_E164,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_CITY,
      postalCode: ADDRESS_POSTAL,
      addressCountry: "PL",
    },
    areaServed: {
      "@type": "City",
      name: ADDRESS_CITY,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [MAPS_URL],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_RATING,
      reviewCount: GOOGLE_REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "$$",
    knowsAbout: ["Montaż klimatyzacji", "Serwis klimatyzacji", SITE_CITY],
  };
}

export const LOCAL_BUSINESS_JSON_LD = JSON.stringify(localBusinessJsonLd());
