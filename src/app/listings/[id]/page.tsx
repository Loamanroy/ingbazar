'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  HeartIcon, 
  ShareIcon, 
  MapPinIcon, 
  EyeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface ListingDetail {
  id: string
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  city: string
  createdAt: string
  views: number
  isUrgent?: boolean
  isNegotiable?: boolean
  isTop?: boolean
  category: string
  subcategory: string
  condition: string
  seller: {
    id: string
    name: string
    rating: number
    reviewsCount: number
    isVerified: boolean
    phone: string
    joinedDate: string
  }
  specifications?: Record<string, string>
}

export default function ListingDetailPage() {
  const params = useParams()
  const [listing, setListing] = useState<ListingDetail | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const mockListing: ListingDetail = {
          id: params.id as string,
          title: 'Винтажная камера Canon AE-1 Program',
          description: 'Продаю винтажную пленочную камеру Canon AE-1 Program в отличном состоянии. Камера полностью рабочая, все функции работают исправно. В комплекте объектив Canon FD 50mm f/1.8. Идеально подходит для любителей пленочной фотографии и коллекционеров. Камера хранилась в сухом месте, регулярно обслуживалась. Торг уместен при личной встрече.',
          price: 25000,
          currency: '₽',
          images: [
            '/placeholder-camera-1.jpg',
            '/placeholder-camera-2.jpg',
            '/placeholder-camera-3.jpg',
            '/placeholder-camera-4.jpg'
          ],
          city: 'Назрань',
          createdAt: '2024-08-01T10:00:00Z',
          views: 342,
          isNegotiable: true,
          category: 'Электроника',
          subcategory: 'Фототехника',
          condition: 'Отличное',
          seller: {
            id: '1',
            name: 'Магомед Алиев',
            rating: 4.8,
            reviewsCount: 23,
            isVerified: true,
            phone: '+7 (928) 123-45-67',
            joinedDate: '2023-03-15'
          },
          specifications: {
            'Тип камеры': 'Пленочная SLR',
            'Формат пленки': '35мм',
            'Объектив': 'Canon FD 50mm f/1.8',
            'Состояние': 'Отличное',
            'Год выпуска': '1981',
            'Страна производства': 'Япония'
          }
        }
        
        setListing(mockListing)
      } catch (error) {
        console.error('Error fetching listing:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Объявление не найдено</h1>
          <Link href="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-accent-red">Главная</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-accent-red">{listing.category}</Link>
            <span>/</span>
            <span className="text-gray-900">{listing.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/3] relative">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Фото товара</span>
                  </div>
                </div>
                
                {/* Image Navigation */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2">
                      {listing.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {listing.isTop && (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                      ТОП
                    </span>
                  )}
                  {listing.isUrgent && (
                    <span className="bg-accent-red text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                      Срочно
                    </span>
                  )}
                  {listing.isNegotiable && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                      Торг
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Описание
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            {/* Specifications */}
            {listing.specifications && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Характеристики
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(listing.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Price and Seller Info */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h1>
                  <div className="text-3xl font-bold text-accent-red mb-4">
                    {listing.price.toLocaleString()} {listing.currency}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{listing.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{listing.views} просмотров</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-accent-red hover:bg-accent-red-hover text-white font-semibold py-3 rounded-xl shadow-button">
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Показать телефон
                  </Button>
                  
                  <Button variant="outline" className="w-full border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white font-semibold py-3 rounded-xl">
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                    Написать сообщение
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="flex-1 rounded-xl"
                    >
                      {isFavorite ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                      <ShareIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Продавец
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{listing.seller.name}</h4>
                      {listing.seller.isVerified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Проверен
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                      <span>{listing.seller.rating} ({listing.seller.reviewsCount} отзывов)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  На сайте с {new Date(listing.seller.joinedDate).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
                
                <Link href={`/users/${listing.seller.id}`}>
                  <Button variant="outline" className="w-full rounded-xl">
                    Посмотреть профиль
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="shadow-lg bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-900">
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Встречайтесь в людных местах</li>
                  <li>• Проверяйте товар перед покупкой</li>
                  <li>• Не переводите деньги заранее</li>
                  <li>• Доверяйте своим инстинктам</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
