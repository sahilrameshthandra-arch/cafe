import { Metadata } from 'next'
import { VisitClient } from './VisitClient'

export const metadata: Metadata = {
  title: 'Visit',
  description: 'Find Strelitzia at 515 Kingsland Road, Dalston, London E8 4AR. Opening hours, directions, and contact information.',
}

export default function VisitPage() {
  return <VisitClient />
}