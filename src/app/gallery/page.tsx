import { Metadata } from 'next'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse photos of Strelitzia - our café interior, specialty coffee, fresh deli food, pastries, and retail selection.',
}

export default function GalleryPage() {
  return <GalleryClient />
}