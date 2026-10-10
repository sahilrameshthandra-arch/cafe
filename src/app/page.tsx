import { Metadata } from 'next'
import { Container, Section } from '@/components/ui/Layout'
import { Button, LinkButton } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BUSINESS_INFO, MENU_CATEGORIES, GALLERY_IMAGES, TEAM_MEMBERS, NAV_ITEMS } from '@/lib/constants'
import { Coffee, MapPin, Phone, Mail, Clock, ArrowRight, Check, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Neighbourhood Café, Specialty Coffee & Deli | Dalston, London',
  description: 'Strelitzia is a neighbourhood café and deli on Kingsland Road, Dalston. Specialty coffee from independent roasters, fresh deli sandwiches, salads, pastries & curated retail.',
}

function formatHours(hours: typeof BUSINESS_INFO.openingHours.monday) {
  if (hours.closed) return 'Closed'
  return `${hours.open} – ${hours.close}`
}

function getCurrentDayHours() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
  const today = days[new Date().getDay()]
  return BUSINESS_INFO.openingHours[today]
}

export default function HomePage() {
  const currentHours = getCurrentDayHours()
  const isOpen = !currentHours.closed

  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <FeaturedMenuSection />
      <AboutPreviewSection />
      <GalleryPreviewSection />
      <VisitSection />
      <NewsletterSection />
    </>
  )
}

function HeroSection() {
  const currentHours = getCurrentDayHours()
  const isOpen = !currentHours.closed

  return (
    <section className="relative min-h-[90vh] sm:min-h-[100vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-30" aria-hidden="true" />
      </div>

      <Container className="relative z-10 section-lg pb-20">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up stagger-1">
            <Coffee className="h-3 w-3 mr-1" aria-hidden="true" />
            Now Open Daily from 7:30am
          </Badge>

          <h1
            id="hero-heading"
            className="heading-display text-balance mb-6 animate-slide-up stagger-2"
          >
            Neighbourhood Café,{' '}
            <span className="gradient-text">Specialty Coffee</span>{' '}
            & Deli
          </h1>

          <p className="text-body-lg text-text-secondary mb-10 max-w-xl animate-slide-up stagger-3">
            Fresh deli sandwiches, seasonal salads, buttery pastries & specialty coffee
            from independent UK roasters. Curated wines, olive oil & pantry staples to take home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-4">
            <LinkButton size="lg" href="/menu" className="group">
              View Menu
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
            <LinkButton size="lg" variant="outline" href="/visit" className="group">
              <MapPin className="h-5 w-5 mr-1" aria-hidden="true" />
              Get Directions
            </LinkButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-body-sm text-text-muted animate-fade-in stagger-5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{formatHours(currentHours)} {isOpen ? '• Open now' : '• Closed'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span>{BUSINESS_INFO.rating} ({BUSINESS_INFO.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  )
}

function ValuePropsSection() {
  const values = [
    {
      icon: Coffee,
      title: 'Specialty Coffee',
      description: 'Rotating single origins from independent UK roasters. Espresso, filter & seasonal drinks crafted with care.',
    },
    {
      icon: Check,
      title: 'Fresh Daily',
      description: 'Sandwiches, salads & hot dishes made fresh each morning. Pastries baked in-house from real butter.',
    },
    {
      icon: Star,
      title: 'Curated Retail',
      description: 'Coffee beans, natural wines, Greek olive oil, thyme honey & gifts. Quality products you\'ll love at home.',
    },
    {
      icon: Coffee,
      title: 'Neighbourhood Heart',
      description: 'A warm welcome on Kingsland Road since 2021. Community-focused, dog-friendly & always ready for a chat.',
    },
  ]

  return (
    <Section className="bg-background" aria-labelledby="values-heading">
      <Container>
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="values-heading" className="heading-h2 mb-4">
            Why People Come Back
          </h2>
          <p className="text-body-lg text-text-secondary">
            Four pillars that define the Strelitzia experience
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={value.title} variant="hover" className="text-center p-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 mb-4">
                <value.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="heading-h4 mb-2">{value.title}</h3>
              <p className="text-body text-text-secondary">{value.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function FeaturedMenuSection() {
  const featuredCategories = MENU_CATEGORIES.slice(0, 3)

  return (
    <Section aria-labelledby="menu-heading">
      <Container>
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 id="menu-heading" className="heading-h2 mb-2">Our Menu</h2>
            <p className="text-body text-text-secondary">Something for every moment of your day</p>
          </div>
          <LinkButton variant="ghost" href="/menu" className="group">
              View Full Menu
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
        </header>

        <div className="space-y-12">
          {featuredCategories.map((category, catIndex) => (
            <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${catIndex * 150}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="heading-h3">{category.name}</h3>
                {category.description && (
                  <span className="text-body-sm text-text-muted">{category.description}</span>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.slice(0, 3).map((item, itemIndex) => (
                  <MenuItemCard key={item.id} item={item} index={itemIndex} />
                ))}
              </div>

              {category.items.length > 3 && (
                <div className="mt-6 text-center">
                  <LinkButton variant="ghost" size="sm" href={`/menu#${category.id}`} className="group">
                      View all {category.items.length} {category.name.toLowerCase()} items
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </LinkButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function MenuItemCard({ item, index }: { item: typeof MENU_CATEGORIES[0]['items'][0]; index: number }) {
  return (
    <Card variant="hover" className="p-4 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="heading-h4 truncate">{item.name}</h4>
              {item.popular && (
                <Badge variant="accent" className="shrink-0">Popular</Badge>
              )}
              {item.new && (
                <Badge variant="primary" className="shrink-0">New</Badge>
              )}
            </div>
            <p className="text-body-sm text-text-secondary line-clamp-2">{item.description}</p>
          </div>
          <span className="text-body font-medium text-text-primary shrink-0 whitespace-nowrap">
            {item.price.toFixed(2).replace('.00', '')}
          </span>
        </div>

        {item.dietary && item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Dietary information">
            {item.dietary.map((d) => (
              <Badge key={d.type} variant="outline" className="text-xs">
                {d.icon} {d.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

function AboutPreviewSection() {
  return (
    <Section className="bg-secondary-50" aria-labelledby="about-heading">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in">
            <Badge variant="primary" className="mb-4">Our Story</Badge>
            <h2 id="about-heading" className="heading-h2 mb-4">
              A Café Built for the Neighbourhood
            </h2>
            <div className="space-y-4 text-body text-text-secondary">
              <p>
                Founded by Ahmet and Deniz in 2021, Strelitzia began with a simple idea:
                a neighbourhood café that takes coffee seriously, serves honest food made fresh daily,
                and feels like a second living room for the community.
              </p>
              <p>
                Named after the striking Bird of Paradise flower — bold, beautiful, and a little
                unexpected — we source specialty coffee from independent UK roasters, bake our
                pastries each morning with real butter, and curate a small selection of wines,
                olive oils and pantry staples we genuinely love.
              </p>
              <p>
                Whether you're grabbing a takeaway flat white on your way to Dalston Junction,
                settling in for a long lunch with a glass of natural wine, or picking up a bag of
                beans for the weekend — you're always welcome here.
              </p>
            </div>
            <LinkButton variant="outline" href="/about" className="mt-6 group">
                Read Our Full Story
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </LinkButton>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary-200">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 flex items-center justify-center">
                <span className="text-body text-text-muted">Team photo placeholder</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-surface rounded-xl p-6 shadow-large max-w-xs border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Coffee className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body font-medium text-text-primary">Ahmet & Deniz</p>
                  <p className="text-body-sm text-text-muted">Founders</p>
                </div>
              </div>
              <p className="mt-3 text-body-sm text-text-secondary">
                "We wanted a place where the coffee is excellent, the food feels like home,
                and everyone knows your name — or at least your usual order."
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function GalleryPreviewSection() {
  const previewImages = GALLERY_IMAGES.slice(0, 4)

  return (
    <Section aria-labelledby="gallery-heading">
      <Container>
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 id="gallery-heading" className="heading-h2 mb-2">Inside Strelitzia</h2>
            <p className="text-body text-text-secondary">A glimpse of the space, the food & the faces</p>
          </div>
          <LinkButton variant="ghost" href="/gallery" className="group">
              View Gallery
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
        </header>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {previewImages.map((image, index) => (
            <figure key={image.id} className={cn(
              'relative aspect-square overflow-hidden rounded-xl bg-secondary-100 group',
              index === 0 && 'lg:col-span-2 lg:row-span-2 aspect-[4/3]',
              index === 1 && 'hidden lg:block'
            )}>
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 transition-transform duration-500 group-hover:scale-105">
                <span className="text-body text-text-muted">Image placeholder: {image.alt}</span>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-body-sm">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function VisitSection() {
  const days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' },
  ] as const

  return (
    <Section className="bg-text-primary text-white" aria-labelledby="visit-heading">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <div>
              <Badge variant="outline" className="mb-4 border-white/20 text-white">
                Visit Us
              </Badge>
              <h2 id="visit-heading" className="font-display text-h2 font-normal tracking-tight mb-4">
                Find Us on Kingsland Road
              </h2>
              <p className="text-body-lg text-white/80 mb-6">
                We're on the corner of Kingsland Road and Forest Road, a two-minute walk from
                Dalston Junction Overground. Look for the green frontage and the Bird of Paradise flower.
              </p>
              <address className="not-italic space-y-3 text-body text-white/90">
                <p className="font-medium">{BUSINESS_INFO.address.street}</p>
                <p>{BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.postcode}</p>
              </address>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-fast group flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-primary-500/20">
                  <MapPin className="h-6 w-6 text-primary-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-white/60">Open in Maps</p>
                  <p className="text-body font-medium">Get Directions</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-white/50 group-hover:text-white transition-colors" aria-hidden="true" />
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                className="card p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-fast group flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-primary-500/20">
                  <Phone className="h-6 w-6 text-primary-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm text-white/60">Call Us</p>
                  <p className="text-body font-medium">{BUSINESS_INFO.phone}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-white/50 group-hover:text-white transition-colors" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="heading-h4 mb-4">Opening Hours</h3>
              <dl className="space-y-3">
                {days.map((day) => {
                  const hours = BUSINESS_INFO.openingHours[day.key]
                  const isToday = new Date().getDay() === days.findIndex(d => d.key === day.key)
                  return (
                    <div
                      key={day.key}
                      className={cn(
                        'flex justify-between items-center py-2 px-3 rounded-lg transition-colors',
                        isToday ? 'bg-primary-500/20' : 'hover:bg-white/5'
                      )}
                    >
                      <dt className={cn('text-body font-medium', isToday ? 'text-primary-100' : 'text-white')}>
                        {day.label}
                      </dt>
                      <dd className={cn('text-body font-medium tabular-nums', isToday ? 'text-primary-100' : 'text-white/80')}>
                        {formatHours(hours)}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function NewsletterSection() {
  return (
    <Section className="bg-background" aria-labelledby="newsletter-heading">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="newsletter-heading" className="heading-h2 mb-4">Stay in the Loop</h2>
          <p className="text-body-lg text-text-secondary mb-8">
            Seasonal menu updates, new coffee arrivals, wine tastings & occasional surprises.
            No spam, just good things.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              className="flex-1 input"
              required
              autoComplete="email"
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-caption text-text-muted">
            By subscribing you agree to our <a href="/privacy" className="link">Privacy Policy</a>.
            Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </Section>
  )
}