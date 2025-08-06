'use client'

import React, { useState, useEffect } from 'react'
import { ListingCard } from '@/components/listings/ListingCard'
import { Button } from '@/components/ui/Button'
import { HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Listing {
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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const mockFavorites: Listing[] = [
          {
            id: '1',
            title: 'Toyota Camry 2020',
            description: 'Автомобиль в отличном состоянии, один владелец, полная комплектация',
            price: 1500000,
            currency: '₽',
            images: ['/placeholder-car.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-01T10:00:00Z',
            views: 245,
            isTop: true
          },
          {
            id: '2',
            title: 'iPhone 14 Pro Max 256GB',
            description: 'Новый iPhone в заводской упаковке, все аксессуары в комплекте',
            price: 85000,
            currency: '₽',
            images: ['/placeholder-phone.jpg'],
            city: 'Магас',
            createdAt: '2024-08-02T14:30:00Z',
            views: 156,
            isUrgent: true
          },
          {
            id: '3',
            title: 'Квартира 2-комнатная в центре',
            description: 'Продается уютная 2-комнатная квартира в центре города',
            price: 3200000,
            currency: '₽',
            images: ['/placeholder-apartment.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-03T09:15:00Z',
            views: 89,
            isNegotiable: true
          },
          {
            id: '4',
            title: 'MacBook Pro M2 13"',
            description: 'Ноутбук для работы и творчества, состояние отличное',
            price: 120000,
            currency: '₽',
            images: ['/placeholder-laptop.jpg'],
            city: 'Карабулак',
            createdAt: '2024-08-04T16:45:00Z',
            views: 67
          }
        ]
        
        setFavorites(mockFavorites)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <HeartIcon className="h-8 w-8 text-accent-red" />
            <h1 className="text-3xl font-bold text-gray-900">
              Избранное
            </h1>
          </div>
          <p className="text-gray-600">
            Объявления, которые вас заинтересовали ({favorites.length})
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              У вас пока нет избранных объявлений
            </h3>
            <p className="text-gray-600 mb-6">
              Добавляйте понравившиеся объявления в избранное, нажимая на сердечко
            </p>
            <Link href="/">
              <Button className="bg-accent-red hover:bg-accent-red-hover text-white px-8 py-3 rounded-xl shadow-button">
                Посмотреть объявления
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
