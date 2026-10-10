'use client'

import { Container, Section } from '@/components/ui/Layout'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GALLERY_IMAGES, BUSINESS_INFO } from '@/lib/constants'
import { Camera, Expand, MapPin, Search, Filter, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'interior', label: 'Interior', icon: Camera },
  { id: 'exterior', label: 'Exterior', icon: MapPin },
  { id: 'food', label: 'Food', icon: Camera },
  { id: 'drinks', label: 'Drinks', icon: Camera },
  { id: 'retail', label: 'Retail', icon: Camera },
  { id: 'team', label: 'Team', icon: Camera },
] as const

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
  width: number
  height: number
}

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'exterior' | 'food' | 'drinks' | 'retail' | 'team'>('all')
  const [lightboxOpen, setLightboxOpen] = useState<GalleryImage | null>(null)

  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory)

  return (
    <>
      <GalleryHero />
      <GalleryContent
        images={filteredImages}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onImageClick={setLightboxOpen}
      />
      {lightboxOpen && (
        <Lightbox
          image={lightboxOpen}
          onClose={() => setLightboxOpen(null)}
        />
      )}
    </>
  )
}

function GalleryHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden" aria-labelledby="gallery-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">Photo Gallery</Badge>
          <h1 id="gallery-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            Inside Strelitzia
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            A glimpse of our space, the food we make, the coffee we brew, and the faces behind the counter.
          </p>
        </div>
      </Container>
    </section>
  )
}

type CategoryId = 'all' | 'interior' | 'exterior' | 'food' | 'drinks' | 'retail' | 'team'

function GalleryContent({
  images,
  activeCategory,
  setActiveCategory,
  onImageClick,
}: {
  images: typeof GALLERY_IMAGES
  activeCategory: CategoryId
  setActiveCategory: (cat: CategoryId) => void
  onImageClick: (img: typeof GALLERY_IMAGES[0]) => void
}) {
  return (
    <Section aria-labelledby="gallery-content-heading">
      <Container>
        <div className="mb-10 animate-fade-in">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`gallery-panel-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-fast',
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary'
                )}
              >
                {cat.icon && <cat.icon className="h-4 w-4" aria-hidden="true" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="gallery-panel"
          role="tabpanel"
          aria-label="Gallery images"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4"
        >
          {images.map((image, index) => (
            <figure
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-xl bg-secondary-100 group cursor-pointer"
              onClick={() => onImageClick(image)}
              onKeyDown={(e) => e.key === 'Enter' && onImageClick(image)}
              tabIndex={0}
              role="button"
              aria-label={`View ${image.alt} in full size`}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 transition-transform duration-500 group-hover:scale-105">
                <span className="text-body text-text-muted">Image: {image.alt}</span>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-body-sm opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                {image.alt}
              </figcaption>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </div>
            </figure>
          ))}

          {images.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
              <p className="text-body text-text-secondary">No images in this category yet</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

function Lightbox({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Full size image: ${image.alt}`}
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-fast"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh]">
        <div className="aspect-auto max-h-[80vh] bg-gradient-to-br from-primary-100 to-secondary-200 rounded-xl overflow-hidden">
          <span className="text-body text-text-muted">Full size: {image.alt}</span>
        </div>
        <p className="mt-4 text-center text-white/80 text-body">{image.alt}</p>
      </div>

      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-fast hidden md:block"
        onClick={(e) => e.stopPropagation()}
        aria-label="Previous image"
      >
        <Camera className="h-6 w-6 rotate-180" aria-hidden="true" />
      </button>
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-fast hidden md:block"
        onClick={(e) => e.stopPropagation()}
        aria-label="Next image"
      >
        <Camera className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}