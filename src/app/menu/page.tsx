import { Metadata } from 'next'
import { Container, Section } from '@/components/ui/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button, LinkButton } from '@/components/ui/Button'
import { MENU_CATEGORIES, BUSINESS_INFO, DIETARY_ICONS } from '@/lib/constants'
import { ArrowRight, Check, Search, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'View our full menu - specialty coffee, fresh deli sandwiches, seasonal salads, buttery pastries, and curated retail products.',
}

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuContent />
      <DietaryInfoSection />
      <RetailCTASection />
    </>
  )
}

function MenuHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden" aria-labelledby="menu-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">
            Fresh Daily • Seasonal Ingredients
          </Badge>
          <h1 id="menu-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            Our Menu
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            Specialty coffee from independent UK roasters, fresh deli dishes made each morning,
            buttery pastries baked in-house, and a curated selection of retail products to take home.
          </p>
        </div>
      </Container>
    </section>
  )
}

function MenuContent() {
  return (
    <Section aria-labelledby="menu-content-heading">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12">
          <nav className="lg:w-48 shrink-0 animate-fade-in" aria-label="Menu categories">
            <ul className="space-y-1" role="tablist">
              {MENU_CATEGORIES.map((category, index) => (
                <li key={category.id}>
                  <button
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-selected={index === 0}
                    aria-controls={`panel-${category.id}`}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg text-body font-medium transition-all duration-fast',
                      index === 0
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    )}
                  >
                    {category.name}
                    <span className="ml-2 text-body-sm text-text-muted">({category.items.length})</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1">
            {MENU_CATEGORIES.map((category, catIndex) => (
              <div
                key={category.id}
                id={`panel-${category.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${category.id}`}
                className={cn('animate-fade-in', catIndex > 0 && 'hidden lg:block')}
                style={{ animationDelay: `${catIndex * 100}ms` }}
              >
                <div className="mb-8">
                  <h2 className="heading-h2 mb-2">{category.name}</h2>
                  {category.description && (
                    <p className="text-body text-text-secondary">{category.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <MenuItemRow key={item.id} item={item} index={itemIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function MenuItemRow({ item, index }: { item: typeof MENU_CATEGORIES[0]['items'][0]; index: number }) {
  return (
    <Card variant="hover" className="p-4 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h3 className="heading-h4">{item.name}</h3>
            {item.popular && <Badge variant="accent">Popular</Badge>}
            {item.new && <Badge variant="primary">New</Badge>}
          </div>
          <p className="text-body text-text-secondary">{item.description}</p>
          {item.dietary && item.dietary.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Dietary information">
              {item.dietary.map((d) => (
                <Badge key={d.type} variant="outline" className="text-xs">
                  {d.icon} {d.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-body-lg font-medium text-text-primary tabular-nums whitespace-nowrap">
            {item.price.toFixed(2).replace('.00', '')}
          </span>
          {item.popular && (
            <span className="flex items-center gap-1 text-body-sm text-primary-600">
              <Check className="h-3 w-3" aria-hidden="true" />
              Favourite
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

function DietaryInfoSection() {
  const dietaryItems = [
    { type: 'vegetarian', label: 'Vegetarian', icon: '🥬', description: 'No meat or fish' },
    { type: 'vegan', label: 'Vegan', icon: '🌱', description: 'No animal products' },
    { type: 'gluten-free', label: 'Gluten-Free', icon: '🌾', description: 'No gluten-containing ingredients' },
    { type: 'dairy-free', label: 'Dairy-Free', icon: '🥛', description: 'No dairy products' },
    { type: 'contains-nuts', label: 'Contains Nuts', icon: '🌰', description: 'Includes tree nuts or peanuts' },
  ]

  return (
    <Section className="bg-secondary-50" aria-labelledby="dietary-heading">
      <Container>
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="dietary-heading" className="heading-h2 mb-4">Dietary Information</h2>
          <p className="text-body text-text-secondary">
            We clearly mark dietary information on all menu items. Please inform our team of any allergies
            as we cannot guarantee a completely allergen-free environment.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dietaryItems.map((item, index) => (
            <Card key={item.type} variant="hover" className="p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-4xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="heading-h4 mb-2">{item.label}</h3>
              <p className="text-body-sm text-text-secondary">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-primary-50 border border-primary-200">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary-100 shrink-0">
              <Search className="h-5 w-5 text-primary-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="heading-h4 mb-1">Have Questions?</h3>
              <p className="text-body text-text-secondary">
                Our team is happy to discuss ingredients, preparation methods, and dietary needs.
                Just ask at the counter or <a href="/visit" className="link">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function RetailCTASection() {
  return (
    <Section aria-labelledby="retail-cta-heading">
      <Container>
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="max-w-xl mx-auto">
            <h2 id="retail-cta-heading" className="heading-h2 mb-4">Take Strelitzia Home</h2>
            <p className="text-body-lg text-text-secondary mb-8">
              Coffee beans, natural wines, Greek olive oil, thyme honey, and our canvas tote bags.
              Perfect for gifts or treating yourself.
            </p>
            <LinkButton size="lg" href="/shop" className="group">
              Browse Shop
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  )
}