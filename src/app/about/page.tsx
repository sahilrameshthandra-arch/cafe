import { Metadata } from 'next'
import { Container, Section } from '@/components/ui/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button, LinkButton } from '@/components/ui/Button'
import { BUSINESS_INFO, TEAM_MEMBERS } from '@/lib/constants'
import { Coffee, MapPin, Users, Heart, Sparkles, Clock, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Strelitzia - our story, our team, and our commitment to specialty coffee, fresh food, and community on Kingsland Road.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <TimelineSection />
      <VisitCTA />
    </>
  )
}

function AboutHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden" aria-labelledby="about-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">Our Story</Badge>
          <h1 id="about-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            A Café Built for the Neighbourhood
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            Founded in 2021 by Ahmet and Deniz, Strelitzia brings together specialty coffee,
            honest deli food, and a warm welcome on Kingsland Road.
          </p>
        </div>
      </Container>
    </section>
  )
}

function StorySection() {
  return (
    <Section aria-labelledby="story-heading">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6 animate-fade-in">
            <h2 id="story-heading" className="heading-h2">How It Started</h2>
            <div className="space-y-4 text-body text-text-secondary">
              <p>
                Ahmet and Deniz met while working in London's specialty coffee scene.
                They shared a vision: a neighbourhood café that takes coffee seriously,
                serves honest food made fresh daily, and feels like a second living room for the community.
              </p>
              <p>
                They found the perfect spot at 515 Kingsland Road — a corner location with big windows,
                original features, and a constant flow of familiar faces. The name came naturally:
                <em className="font-display italic">Strelitzia</em>, the Bird of Paradise flower —
                bold, beautiful, and a little unexpected. Just like the café they wanted to build.
              </p>
              <p>
                Since opening in 2021, the menu has evolved with the seasons and the community.
                The coffee programme rotates through independent UK roasters. The deli counter
                changes daily based on what's fresh. The retail shelves feature products they
                genuinely use and love at home.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <StatCard value="2021" label="Founded" />
              <StatCard value="271+" label="Google Reviews" />
              <StatCard value="4.7" label="Rating" />
              <StatCard value="2" label="Founders" />
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary-200 relative">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 flex items-center justify-center">
                <span className="text-body text-text-muted">Founders photo placeholder</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-surface rounded-xl p-6 shadow-large max-w-xs border border-border">
              <blockquote className="text-body text-text-secondary italic">
                "We wanted a place where the coffee is excellent, the food feels like home,
                and everyone knows your name — or at least your usual order."
              </blockquote>
              <footer className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">Ahmet & Deniz</p>
                  <p className="text-caption text-text-muted">Founders</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border text-center">
      <p className="font-display text-3xl sm:text-4xl font-medium text-text-primary">{value}</p>
      <p className="text-body-sm text-text-muted mt-1">{label}</p>
    </div>
  )
}

function ValuesSection() {
  const values = [
    {
      icon: Coffee,
      title: 'Coffee First',
      description: 'We rotate independent UK roasters so there\'s always something new to discover. Espresso, filter, and seasonal drinks — all crafted with care.',
    },
    {
      icon: Heart,
      title: 'Fresh Daily',
      description: 'Our deli counter is stocked each morning with sandwiches, salads, and hot dishes made in-house. Pastries baked fresh with real butter.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Dog-friendly, laptop-friendly during quiet hours, and always ready for a chat. We\'re part of the neighbourhood fabric.',
    },
    {
      icon: Sparkles,
      title: 'Curated Quality',
      description: 'Every product on our shelves — coffee, wine, olive oil, honey — is something we\'d buy ourselves. No filler, just favourites.',
    },
  ]

  return (
    <Section className="bg-secondary-50" aria-labelledby="values-heading">
      <Container>
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="values-heading" className="heading-h2 mb-4">What We Stand For</h2>
          <p className="text-body-lg text-text-secondary">Four principles that guide everything we do</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={value.title} variant="hover" className="p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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

function TeamSection() {
  return (
    <Section aria-labelledby="team-heading">
      <Container>
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="team-heading" className="heading-h2 mb-4">The Team</h2>
          <p className="text-body-lg text-text-secondary">
            A small, passionate team dedicated to making your visit special
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => (
            <Card key={member.id} variant="hover" className="p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="aspect-square w-32 h-32 mx-auto mb-4 rounded-full bg-secondary-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-200 flex items-center justify-center">
                  <span className="text-body text-text-muted">Team photo</span>
                </div>
              </div>
              <h3 className="heading-h4 mb-1">{member.name}</h3>
              <p className="text-body-sm text-primary-600 font-medium mb-3">{member.role}</p>
              <p className="text-body-sm text-text-secondary">{member.bio}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-body text-text-secondary mb-6 max-w-xl mx-auto">
            We\'re always looking for passionate people who love coffee, food, and hospitality.
            Check our Instagram for any openings, or drop your CV at the counter.
          </p>
          <LinkButton variant="outline" href="mailto:info@strelitzia515.co.uk?subject=Job%20Enquiry">
            Join the Team
          </LinkButton>
        </div>
      </Container>
    </Section>
  )
}

function TimelineSection() {
  const milestones = [
    { year: '2021', title: 'Strelitzia Opens', description: 'Ahmet and Deniz open the doors at 515 Kingsland Road', icon: Sparkles },
    { year: '2022', title: 'Retail Expansion', description: 'Curated coffee beans, wines, and pantry staples added to shelves', icon: Coffee },
    { year: '2023', title: 'Community Hub', description: 'Becomes a recognised neighbourhood spot — 200+ reviews, 4.7 rating', icon: Award },
    { year: '2024', title: 'Seasonal Programme', description: 'Launches rotating seasonal drinks menu and quarterly wine tastings', icon: Sparkles },
    { year: '2025', title: 'New Concept Announced', description: 'Plans shared for a related concept-store venture in Kentish Town', icon: MapPin },
  ]

  return (
    <Section className="bg-text-primary text-white" aria-labelledby="timeline-heading">
      <Container>
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="timeline-heading" className="font-display text-h2 font-normal tracking-tight mb-4">Our Journey</h2>
          <p className="text-body-lg text-white/80">From first espresso to neighbourhood institution</p>
        </header>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-white/10" aria-hidden="true" />
          <div className="space-y-10">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative pl-12 sm:pl-20 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="absolute left-0 sm:left-4 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-500 flex items-center justify-center border-4 border-text-primary z-10">
                  <milestone.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-display text-2xl font-medium text-primary-300">{milestone.year}</span>
                    <h3 className="heading-h4 text-white">{milestone.title}</h3>
                  </div>
                  <p className="text-body text-white/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function VisitCTA() {
  return (
    <Section aria-labelledby="visit-cta-heading">
      <Container>
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="max-w-xl mx-auto">
            <h2 id="visit-cta-heading" className="heading-h2 mb-4">Come Say Hello</h2>
            <p className="text-body-lg text-text-secondary mb-8">
              We're open daily from 7:30am on Kingsland Road. Whether it's your first visit
              or your hundredth, there's always a seat for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton size="lg" href="/visit" className="group">
                Get Directions
                <MapPin className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </LinkButton>
              <LinkButton size="lg" variant="outline" href="/menu" className="group">
                View Menu
                <Sparkles className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}