import React from 'react'
import ListingDetailClient from './ListingDetailClient'

export async function generateStaticParams() {
  return Array.from({ length: 22 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export default function ListingDetailPage() {
  return <ListingDetailClient />
}
