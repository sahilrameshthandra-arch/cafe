'use client'

import Link from 'next/link'
import { Coffee, MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESS_INFO, NAV_ITEMS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const formatHours = (hours: typeof BUSINESS_INFO.openingHours.monday) => {
    if (hours.closed) return 'Closed'
    return `${hours.open} – ${hours.close}`
  }

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const

  return (
    <footer className="bg-secondary-50 border-t border-border" role="contentinfo">
      <div className="container section-sm">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label={`${BUSINESS_INFO.name} - Home`}>
              <Coffee className="h-7 w-7 text-primary-600" aria-hidden="true" />
              <span className="font-display text-xl font-medium text-text-primary">{BUSINESS_INFO.name}</span>
            </Link>
            <p className="text-body text-text-secondary max-w-xs">
              Neighbourhood café, specialty coffee & deli on Kingsland Road.
              Fresh food, curated retail & a warm welcome — every day.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://instagram.com/${BUSINESS_INFO.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-body-sm font-medium',
                  'text-text-secondary hover:text-primary-600 hover:border-primary-300 transition-colors duration-fast'
                )}
                aria-label={`Follow us on Instagram @${BUSINESS_INFO.instagram.replace('@', '')}`}
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>@{BUSINESS_INFO.instagram.replace('@', '')}</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="heading-h4">Visit Us</h3>
            <address className="not-italic space-y-3 text-body text-text-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-text-primary">{BUSINESS_INFO.address.street}</p>
                  <p>{BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.postcode}</p>
                  <p>{BUSINESS_INFO.address.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-600 shrink-0" aria-hidden="true" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="link">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-600 shrink-0" aria-hidden="true" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="link">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </address>
          </div>

          <div className="space-y-6">
            <h3 className="heading-h4">Opening Hours</h3>
            <dl className="space-y-2 text-body-sm">
              {days.map((day) => {
                const hours = BUSINESS_INFO.openingHours[day.key]
                return (
                  <div key={day.key} className="flex justify-between gap-4">
                    <dt className="text-text-secondary">{day.label}</dt>
                    <dd className="text-text-primary font-medium whitespace-nowrap">
                      {formatHours(hours)}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-body-sm text-text-muted">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-4" aria-label="Footer navigation">
              <Link href="/visit" className="text-body-sm text-text-muted hover:text-text-primary transition-colors duration-fast">
                Visit & Contact
              </Link>
              <Link href="/menu" className="text-body-sm text-text-muted hover:text-text-primary transition-colors duration-fast">
                Menu
              </Link>
              <Link href="/shop" className="text-body-sm text-text-muted hover:text-text-primary transition-colors duration-fast">
                Shop
              </Link>
              <Link href="/privacy" className="text-body-sm text-text-muted hover:text-text-primary transition-colors duration-fast">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}