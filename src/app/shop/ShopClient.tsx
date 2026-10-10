'use client'

import { Container, Section } from '@/components/ui/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button, LinkButton } from '@/components/ui/Button'
import { RETAIL_PRODUCTS, BUSINESS_INFO } from '@/lib/constants'
import { ShoppingBag, Coffee, Wine, Package, Gift, Heart, Plus, Minus, Check, Truck, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { cn, formatPrice } from '@/lib/utils'

export function ShopClient() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [categories, setCategories] = useState<string[]>(['all'])

  const filteredProducts = categories.includes('all')
    ? RETAIL_PRODUCTS
    : RETAIL_PRODUCTS.filter(p => categories.includes(p.category))

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = RETAIL_PRODUCTS
    .filter(p => cart[p.id])
    .reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0)

  const toggleCategory = (cat: string) => {
    setCategories(prev => {
      if (cat === 'all') return ['all']
      if (prev.includes('all')) return [cat]
      const next = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      return next.length === 0 ? ['all'] : next
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const next = { ...prev }
      const current = next[id] || 0
      const updated = Math.max(0, current + delta)
      if (updated === 0) delete next[id]
      else next[id] = updated
      return next
    })
  }

  return (
    <>
      <ShopHero />
      <ShopContent
        products={filteredProducts}
        categories={categories}
        toggleCategory={toggleCategory}
        cart={cart}
        updateQuantity={updateQuantity}
        cartCount={cartCount}
      />
      {cartCount > 0 && (
        <CartDrawer
          cart={cart}
          updateQuantity={updateQuantity}
          cartTotal={cartTotal}
          onClose={() => setCart({})}
        />
      )}
    </>
  )
}

function ShopHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden" aria-labelledby="shop-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">Curated Selection</Badge>
          <h1 id="shop-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            Take Strelitzia Home
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            Coffee beans from independent UK roasters, natural wines, Greek olive oil, thyme honey,
            and our canvas totes. Perfect for gifts or treating yourself.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-slide-up stagger-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <Truck className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span className="text-body-sm text-text-secondary">In-store pickup only</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <Gift className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span className="text-body-sm text-text-secondary">Gift wrapping available</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ShopContent({
  products,
  categories,
  toggleCategory,
  cart,
  updateQuantity,
  cartCount,
}: {
  products: typeof RETAIL_PRODUCTS
  categories: string[]
  toggleCategory: (cat: string) => void
  cart: Record<string, number>
  updateQuantity: (id: string, delta: number) => void
  cartCount: number
}) {
  const categoryLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    all: { label: 'All', icon: null },
    coffee: { label: 'Coffee', icon: <Coffee className="h-4 w-4" /> },
    wine: { label: 'Wine', icon: <Wine className="h-4 w-4" /> },
    pantry: { label: 'Pantry', icon: <Package className="h-4 w-4" /> },
    merchandise: { label: 'Merchandise', icon: <ShoppingBag className="h-4 w-4" /> },
    gift: { label: 'Gifts', icon: <Gift className="h-4 w-4" /> },
  }

  return (
    <Section aria-labelledby="shop-heading">
      <Container>
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 id="shop-heading" className="heading-h2 mb-2">Our Selection</h2>
            <p className="text-body text-text-secondary">Curated products we genuinely love and use at home</p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {Object.entries(categoryLabels).map(([id, { label, icon }]) => (
              <button
                key={id}
                role="tab"
                aria-selected={categories.includes(id)}
                onClick={() => toggleCategory(id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-fast',
                  categories.includes(id)
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary'
                )}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </header>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onUpdateQuantity={updateQuantity}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
            <h3 className="heading-h3 mb-2">No products in this category</h3>
            <p className="text-body text-text-secondary">Try selecting a different category</p>
          </div>
        )}

        <div className="mt-12 p-6 rounded-xl bg-secondary-50 border border-border text-center">
          <h3 className="heading-h4 mb-3">Visit Us to Purchase</h3>
          <p className="text-body text-text-secondary mb-6 max-w-xl mx-auto">
            Our shop is currently in-store only. Come browse the shelves, chat with the team,
            and take home your favourites. We're happy to help with recommendations and gift wrapping.
          </p>
          <LinkButton variant="outline" href="/visit">
            Get Directions
          </LinkButton>
        </div>
      </Container>
    </Section>
  )
}

function ProductCard({
  product,
  quantity,
  onUpdateQuantity,
  index,
}: {
  product: typeof RETAIL_PRODUCTS[0]
  quantity: number
  onUpdateQuantity: (id: string, delta: number) => void
  index: number
}) {
  const categoryIcons: Record<string, React.ReactNode> = {
    coffee: <Coffee className="h-4 w-4" />,
    wine: <Wine className="h-4 w-4" />,
    pantry: <Package className="h-4 w-4" />,
    merchandise: <ShoppingBag className="h-4 w-4" />,
    gift: <Gift className="h-4 w-4" />,
  }

  return (
    <Card variant="hover" className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-200 relative overflow-hidden">
        <span className="text-body text-text-muted">Product image: {product.name}</span>
        {product.featured && (
          <Badge className="absolute top-3 left-3" variant="primary">Featured</Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-body">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-caption text-primary-600 mb-1">
              {categoryIcons[product.category]}
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
            <h3 className="heading-h4">{product.name}</h3>
          </div>
          <span className="text-body-lg font-medium text-text-primary shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-body-sm text-text-secondary line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(product.id, -1)}
                disabled={!product.inStock}
                className="p-1.5 rounded-lg bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary disabled:opacity-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-body font-medium text-text-primary w-8 text-center">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(product.id, 1)}
                disabled={!product.inStock}
                className="p-1.5 rounded-lg bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary disabled:opacity-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              className="w-full"
              disabled={!product.inStock}
              onClick={() => onUpdateQuantity(product.id, 1)}
            >
              <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CartDrawer({
  cart,
  updateQuantity,
  cartTotal,
  onClose,
}: {
  cart: Record<string, number>
  updateQuantity: (id: string, delta: number) => void
  cartTotal: number
  onClose: () => void
}) {
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = RETAIL_PRODUCTS.find(p => p.id === id)!
    return { product, qty }
  })

  return (
    <div className="fixed bottom-0 right-0 left-0 md:left-auto md:w-96 md:bottom-4 md:right-4 md:rounded-xl md:shadow-large md:border md:border-border z-50 animate-slide-up">
      <div className="bg-surface rounded-t-xl md:rounded-xl shadow-large border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="heading-h4">Your Cart ({cartItems.length})</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            aria-label="Close cart"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto p-4 space-y-4">
          {cartItems.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-3">
              <div className="w-16 h-16 rounded-lg bg-secondary-100 flex-shrink-0 overflow-hidden">
                <span className="text-body text-text-muted">Image</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-text-primary truncate">{product.name}</p>
                <p className="text-body-sm text-text-secondary">{formatPrice(product.price)} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="p-1 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="text-body font-medium w-8 text-center">{qty}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="p-1 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <span className="text-body font-medium text-text-primary shrink-0">
                {formatPrice(product.price * qty)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4 space-y-3">
          <div className="flex justify-between text-body">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary font-medium">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-body-sm text-text-secondary">
            <span>Pickup at Strelitzia</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between text-body font-medium text-text-primary pt-2 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <Button className="w-full" size="lg" onClick={() => alert('Redirecting to in-store pickup...')}>
            Proceed to Pickup
            <ShoppingBag className="h-5 w-5 ml-2" aria-hidden="true" />
          </Button>

          <p className="text-center text-caption text-text-muted">
            Pay in-store · Gift wrapping available · All prices include VAT
          </p>
        </div>
      </div>
    </div>
  )
}