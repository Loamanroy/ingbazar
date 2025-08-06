'use client'

import React, { useState, useEffect } from 'react'
import { ListingCard } from '@/components/listings/ListingCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
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

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const mockListings: Listing[] = [
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
            description: 'Продается уютная 2-комнатная квартира в центре города с ремонтом',
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
            title: 'MacBook Pro M2 13" 512GB',
            description: 'Ноутбук для работы и творчества, состояние отличное, все документы',
            price: 120000,
            currency: '₽',
            images: ['/placeholder-laptop.jpg'],
            city: 'Карабулак',
            createdAt: '2024-08-04T16:45:00Z',
            views: 67
          },
          {
            id: '5',
            title: 'Диван угловой с подушками',
            description: 'Удобный угловой диван в хорошем состоянии, подходит для гостиной',
            price: 35000,
            currency: '₽',
            images: ['/placeholder-sofa.jpg'],
            city: 'Малгобек',
            createdAt: '2024-08-05T11:20:00Z',
            views: 43,
            isNegotiable: true
          },
          {
            id: '6',
            title: 'Велосипед горный Trek',
            description: 'Горный велосипед в отличном состоянии, подходит для активного отдыха',
            price: 25000,
            currency: '₽',
            images: ['/placeholder-bike.jpg'],
            city: 'Сунжа',
            createdAt: '2024-08-06T08:30:00Z',
            views: 78
          },
          {
            id: '7',
            title: 'Платье вечернее размер M',
            description: 'Красивое вечернее платье, одевалось один раз, идеальное состояние',
            price: 8000,
            currency: '₽',
            images: ['/placeholder-dress.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-07T19:45:00Z',
            views: 34,
            isUrgent: true
          },
          {
            id: '8',
            title: 'Холодильник Samsung 350л',
            description: 'Двухкамерный холодильник в рабочем состоянии, экономичный',
            price: 18000,
            currency: '₽',
            images: ['/placeholder-fridge.jpg'],
            city: 'Магас',
            createdAt: '2024-08-08T12:15:00Z',
            views: 56,
            isNegotiable: true
          }
        ]
        
        setListings(mockListings)
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'popular':
        return (b.views || 0) - (a.views || 0)
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

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
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Все объявления
              </h1>
              <p className="text-gray-600">
                Найдите то, что вам нужно среди {listings.length} объявлений
              </p>
            </div>
            
            <Link href="/listings/create">
              <Button className="bg-accent-red hover:bg-accent-red-hover text-white rounded-xl shadow-button">
                Разместить объявление
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск по объявлениям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none"
              >
                <option value="newest">Сначала новые</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="popular">По популярности</option>
              </select>
              
              <Button
                variant="outline"
                className="rounded-xl border-2 border-gray-200 hover:border-accent-red"
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Показано {sortedListings.length} из {listings.length} объявлений
          </div>
        </div>

        {/* Listings Grid */}
        {sortedListings.length === 0 ? (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить поисковый запрос
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
              className="rounded-xl"
            >
              Показать все объявления
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
