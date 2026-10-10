'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Coffee, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import { BUSINESS_INFO } from '@/lib/constants'
import { Button, LinkButton } from '@/components/ui/Button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-sticky transition-all duration-normal ease-out-expo',
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-subtle' : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
            aria-label={`${BUSINESS_INFO.name} - Home`}
          >
            <Coffee className="h-7 w-7 text-primary-600" aria-hidden="true" />
            <span className="font-display text-xl font-medium text-text-primary hidden sm:block">
              {BUSINESS_INFO.name}
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-body-sm font-medium transition-colors duration-fast',
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-body-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-secondary-50 transition-colors duration-fast"
              aria-label={`Call ${BUSINESS_INFO.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call</span>
            </a>
            <LinkButton size="sm" href="/visit" className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Visit</span>
              </LinkButton>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-fast"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-normal ease-out-expo border-t border-border bg-background',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label="Mobile menu"
        >
          <div className="py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg text-body font-medium transition-colors duration-fast',
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-body font-medium text-text-secondary hover:text-primary-600 hover:bg-secondary-50 transition-colors duration-fast"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <LinkButton variant="secondary" href="/visit" className="w-full justify-start px-4 py-3 flex items-center gap-3">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span>Get Directions</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}