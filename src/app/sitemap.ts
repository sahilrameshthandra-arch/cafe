import { MetadataRoute } from 'next'
import { BUSINESS_INFO } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://strelitzia515.co.uk'

  const routes = [
    '',
    '/menu',
    '/about',
    '/gallery',
    '/shop',
    '/visit',
    '/privacy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}