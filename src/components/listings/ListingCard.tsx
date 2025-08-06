'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Card, CardContent } from '@/components/ui/Card'
import { formatPrice, formatDate, truncateText } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'

interface ListingCardProps {
  listing: {
    id: string
    title: string
    description: string
    price: number
    currency?: string
    images?: string[]
    city: string
    createdAt: string
    isUrgent?: boolean
    isNegotiable?: boolean
    isTop?: boolean
    views?: number
  }
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}

export function ListingCard({ listing, isFavorite = false, onToggleFavorite }: ListingCardProps) {
  const { t } = useLanguage()
  const imageUrl = listing.images?.[0] || '/placeholder-image.jpg'

  return (
    <Card className="group card-hover cursor-pointer">
      <Link href={`/listings/${listing.id}`}>
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
            <Image
              src={imageUrl}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {listing.isTop && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                {t('listing.top')}
              </span>
            )}
            {listing.isUrgent && (
              <span className="bg-accent-red text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                {t('listing.urgent')}
              </span>
            )}
            {listing.isNegotiable && (
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                {t('listing.negotiable')}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onToggleFavorite(listing.id)
              }}
              className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/listings/${listing.id}`}>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent-red transition-colors line-clamp-2">
              {listing.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {truncateText(listing.description, 100)}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-accent-red">
                {formatPrice(listing.price, listing.currency)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{listing.city}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{formatDate(listing.createdAt)}</span>
              </div>
            </div>
            
            {listing.views && (
              <div className="text-xs text-gray-400">
                Просмотров: {listing.views}
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
