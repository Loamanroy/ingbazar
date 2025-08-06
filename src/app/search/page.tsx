'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ListingCard } from '@/components/listings/ListingCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

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

function SearchContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    city: '',
    category: '',
    condition: ''
  })

  const cities = ['Все города', 'Назрань', 'Магас', 'Карабулак', 'Малгобек', 'Сунжа']
  const categories = ['Все категории', 'Автомобили', 'Недвижимость', 'Электроника', 'Одежда', 'Дом и сад']
  const conditions = ['Любое состояние', 'Новое', 'Отличное', 'Хорошее', 'Удовлетворительное']

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const mockResults: Listing[] = [
          {
            id: '1',
            title: 'Toyota Camry 2020',
            description: 'Автомобиль в отличном состоянии, один владелец',
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
            title: 'iPhone 14 Pro Max',
            description: 'Новый iPhone в заводской упаковке',
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
            title: 'MacBook Pro M2',
            description: 'Ноутбук для работы и творчества',
            price: 120000,
            currency: '₽',
            images: ['/placeholder-laptop.jpg'],
            city: 'Карабулак',
            createdAt: '2024-08-04T16:45:00Z',
            views: 67
          },
          {
            id: '4',
            title: 'Квартира 2-комнатная',
            description: 'Уютная квартира в центре города',
            price: 3200000,
            currency: '₽',
            images: ['/placeholder-apartment.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-03T09:15:00Z',
            views: 89,
            isNegotiable: true
          }
        ]
        
        setResults(mockResults)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', query, filters)
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Поиск объявлений
          </h1>
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Что вы ищете?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl border-2 border-gray-200 hover:border-accent-red"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
            <Button
              type="submit"
              className="bg-accent-red hover:bg-accent-red-hover text-white rounded-xl shadow-button"
            >
              Найти
            </Button>
          </form>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white p-6 rounded-xl shadow-lg border mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена от
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена до
                  </label>
                  <Input
                    type="number"
                    placeholder="∞"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-accent-red focus:ring-accent-red focus:outline-none"
                  >
                    {cities.map(city => (
                      <option key={city} value={city === 'Все города' ? '' : city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-accent-red focus:ring-accent-red focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'Все категории' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Состояние
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-accent-red focus:ring-accent-red focus:outline-none"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition === 'Любое состояние' ? '' : condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {query ? `Результаты поиска по запросу "${query}"` : 'Все объявления'} 
              <span className="font-semibold"> ({results.length})</span>
            </p>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:border-accent-red focus:ring-accent-red focus:outline-none">
              <option>По дате (новые)</option>
              <option>По цене (дешевые)</option>
              <option>По цене (дорогие)</option>
              <option>По популярности</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <Button
              onClick={() => {
                setQuery('')
                setFilters({
                  minPrice: '',
                  maxPrice: '',
                  city: '',
                  category: '',
                  condition: ''
                })
              }}
              variant="outline"
              className="rounded-xl"
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка поиска...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
