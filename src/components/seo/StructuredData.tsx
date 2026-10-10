'use client'

import { BUSINESS_INFO } from '@/lib/constants'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: BUSINESS_INFO.name,
    description: 'Neighbourhood café, specialty coffee & deli on Kingsland Road, Dalston. Fresh deli sandwiches, seasonal salads, buttery pastries & specialty coffee from independent UK roasters.',
    url: BUSINESS_INFO.website,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: 'England',
      postalCode: BUSINESS_INFO.address.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.coordinates.lat,
      longitude: BUSINESS_INFO.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday'],
        opens: '07:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday', 'Friday'],
        opens: '07:30',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '££',
    servesCuisine: ['Coffee', 'Mediterranean', 'Deli', 'Breakfast', 'Brunch'],
    paymentAccepted: 'Cash, Credit Card, Contactless',
    currenciesAccepted: 'GBP',
    hasMenu: `${BUSINESS_INFO.website}/menu`,
    menu: `${BUSINESS_INFO.website}/menu`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.rating,
      reviewCount: BUSINESS_INFO.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.instagram.replace('@', '')}`,
    ],
    image: [
      `${BUSINESS_INFO.website}/images/og-default.jpg`,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}