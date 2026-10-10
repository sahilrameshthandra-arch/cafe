'use client'

import { Container, Section } from '@/components/ui/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Button, LinkButton } from '@/components/ui/Button'
import { Input, Textarea, Label } from '@/components/ui/Input'
import { BUSINESS_INFO } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, Send, Map, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

const days = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const

function formatHours(hours: typeof BUSINESS_INFO.openingHours.monday) {
  if (hours.closed) return 'Closed'
  return `${hours.open} – ${hours.close}`
}

export function VisitClient() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormState('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setFormState('idle'), 5000)
  }

  const currentDay = days[new Date().getDay()].key
  const todayHours = BUSINESS_INFO.openingHours[currentDay as keyof typeof BUSINESS_INFO.openingHours]
  const isOpen = !todayHours.closed

  return (
    <>
      <VisitHero />
      <VisitContent
        formState={formState}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        todayHours={todayHours}
        currentDay={currentDay}
      />
      <MapSection />
    </>
  )
}

function VisitHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden" aria-labelledby="visit-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">Visit Us</Badge>
          <h1 id="visit-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            Find Us on Kingsland Road
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            We're on the corner of Kingsland Road and Forest Road, a two-minute walk from
            Dalston Junction Overground. Look for the green frontage and the Bird of Paradise flower.
          </p>
        </div>
      </Container>
    </section>
  )
}

function VisitContent({
  formState,
  formData,
  setFormData,
  handleSubmit,
  isOpen,
  todayHours,
  currentDay,
}: {
  formState: 'idle' | 'submitting' | 'success' | 'error'
  formData: { name: string; email: string; subject: string; message: string }
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>
  handleSubmit: (e: React.FormEvent) => void
  isOpen: boolean
  todayHours: typeof BUSINESS_INFO.openingHours.monday
  currentDay: string
}) {
  return (
    <Section aria-labelledby="visit-heading">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary-50">
                  <MapPin className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="visit-heading" className="heading-h3">Visit Us</h2>
                  <p className="text-body-sm text-text-secondary">515 Kingsland Road, Dalston, London E8 4AR</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-4 hover:bg-secondary-50 transition-colors duration-fast group flex items-center gap-4"
                >
                  <div className="p-3 rounded-lg bg-primary-50">
                    <Map className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-body-sm text-text-muted">Open in Maps</p>
                    <p className="text-body font-medium group-hover:text-primary-600 transition-colors">Get Directions</p>
                  </div>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                  className="card p-4 hover:bg-secondary-50 transition-colors duration-fast group flex items-center gap-4"
                >
                  <div className="p-3 rounded-lg bg-primary-50">
                    <Phone className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-body-sm text-text-muted">Call Us</p>
                    <p className="text-body font-medium group-hover:text-primary-600 transition-colors">{BUSINESS_INFO.phone}</p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-50">
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  isOpen ? 'bg-green-500' : 'bg-red-500'
                )} aria-hidden="true" />
                <div>
                  <p className="text-body font-medium text-text-primary">
                    {isOpen ? 'Open Now' : 'Currently Closed'}
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    {isOpen ? `Closes at ${todayHours.close}` : `Opens at ${todayHours.open}`}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="heading-h3 mb-6">Opening Hours</h3>
              <dl className="space-y-3">
                {days.map((day) => {
                  const hours = BUSINESS_INFO.openingHours[day.key]
                  const isToday = day.key === currentDay
                  return (
                    <div
                      key={day.key}
                      className={cn(
                        'flex justify-between items-center py-3 px-4 rounded-lg transition-colors border border-border',
                        isToday ? 'bg-primary-50 border-primary-200' : 'hover:bg-secondary-50'
                      )}
                    >
                      <dt className={cn('text-body font-medium', isToday ? 'text-primary-700' : 'text-text-primary')}>
                        {day.label}
                      </dt>
                      <dd className={cn('text-body font-medium tabular-nums', isToday ? 'text-primary-700' : 'text-text-secondary')}>
                        {formatHours(hours)}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </Card>

            <Card className="p-6">
              <h3 className="heading-h3 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      disabled={formState === 'submitting'}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                    disabled={formState === 'submitting'}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more..."
                    required
                    disabled={formState === 'submitting'}
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={formState === 'submitting'}>
                  {formState === 'submitting' && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send className="h-5 w-5 ml-2" aria-hidden="true" />
                </Button>

                {formState === 'success' && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 animate-fade-in">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-body font-medium text-green-800">Message sent!</p>
                      <p className="text-body-sm text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {formState === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 animate-fade-in">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
                    <p className="text-body text-red-800">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}
              </form>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Card className="p-6 sticky top-24">
              <h3 className="heading-h3 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-start group flex items-center gap-3"
                >
                  <MapPin className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                  className="btn-secondary w-full justify-start group flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="btn-secondary w-full justify-start group flex items-center gap-3"
                >
                  <Mail className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>Email Us</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone.replace(/\D/g, '')}?text=Hi%20Strelitzia%2C%20I%27d%20like%20to%20know%20more%20about...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-start group flex items-center gap-3"
                >
                  <Send className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
                <LinkButton variant="outline" href="/menu" className="w-full justify-start group">
                  <Clock className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>View Menu</span>
                </LinkButton>
                <LinkButton variant="outline" href="/shop" className="w-full justify-start group">
                  <MapPin className="h-5 w-5 text-primary-600 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span>Browse Shop</span>
                </LinkButton>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="heading-h4 mb-3">Follow Us</h4>
                <a
                  href={`https://instagram.com/${BUSINESS_INFO.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-body text-text-secondary hover:text-primary-600 transition-colors"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  <span>@{BUSINESS_INFO.instagram.replace('@', '')}</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function MapSection() {
  return (
    <Section className="bg-secondary-50" aria-labelledby="map-heading">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="map-heading" className="heading-h2 mb-4">Location</h2>
          <p className="text-body-lg text-text-secondary mb-8">
            Find us at the corner of Kingsland Road and Forest Road, Dalston
          </p>

          <div className="aspect-video rounded-2xl overflow-hidden bg-secondary-200 border border-border">
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 flex flex-col items-center justify-center gap-4 p-8">
              <MapPin className="h-16 w-16 text-primary-300" aria-hidden="true" />
              <div>
                <p className="text-body-lg font-medium text-text-primary">Interactive Map</p>
                <p className="text-body text-text-secondary">Click below to open in Google Maps</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                Open in Google Maps
                <Map className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-display font-medium text-text-primary">2 min</div>
              <div className="text-body-sm text-text-secondary">from Dalston Junction</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-display font-medium text-text-primary">5 min</div>
              <div className="text-body-sm text-text-secondary">from Dalston Kingsland</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-display font-medium text-text-primary">10 min</div>
              <div className="text-body-sm text-text-secondary">from Shoreditch High St</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}