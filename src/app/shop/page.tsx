import { Metadata } from 'next'
import { ShopClient } from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our curated selection of coffee beans, natural wines, Greek olive oil, thyme honey, and merchandise. Available for purchase in-store.',
}

export default function ShopPage() {
  return <ShopClient />
}