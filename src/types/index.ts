export interface BusinessInfo {
  name: string
  tagline: string
  address: {
    street: string
    area: string
    city: string
    postcode: string
    country: string
    full: string
  }
  phone: string
  email: string
  website: string
  instagram: string
  coordinates: {
    lat: number
    lng: number
  }
  openingHours: OpeningHours
  priceRange: string
  rating: number
  reviewCount: number
}

export interface OpeningHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  open: string
  close: string
  closed: boolean
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  dietary?: DietaryInfo[]
  popular?: boolean
  new?: boolean
  image?: string
}

export interface DietaryInfo {
  type: 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'contains-nuts'
  label: string
  icon: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'interior' | 'exterior' | 'food' | 'drinks' | 'retail' | 'team'
  width: number
  height: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    instagram?: string
    linkedin?: string
  }
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  source: 'google' | 'tripadvisor' | 'yelp' | 'direct'
  verified: boolean
}

export interface RetailProduct {
  id: string
  name: string
  description: string
  price: number
  category: 'coffee' | 'wine' | 'pantry' | 'merchandise' | 'gift'
  image: string
  inStock: boolean
  featured?: boolean
}

export interface SEOMetadata {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article'
  twitterCard: 'summary_large_image'
  structuredData?: Record<string, unknown>
}

export interface PageProps {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}