'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { UserIcon, HeartIcon, CogIcon, ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'Ахмед',
    lastName: user?.lastName || 'Магомедов',
    email: user?.email || 'ahmed@example.com',
    phone: '+7 (928) 123-45-67',
    city: 'Назрань'
  })

  const sidebarItems = [
    { id: 'profile', label: 'Профиль', icon: UserIcon },
    { id: 'ads', label: 'Мои объявления', icon: PlusIcon },
    { id: 'favorites', label: 'Избранное', icon: HeartIcon },
    { id: 'settings', label: 'Настройки', icon: CogIcon },
  ]

  const handleSave = () => {
    console.log('Saving profile data:', profileData)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const mockAds = [
    {
      id: '1',
      title: 'Toyota Camry 2020',
      price: '1 500 000 ₽',
      status: 'Активно',
      views: 245,
      image: '/placeholder-car.jpg'
    },
    {
      id: '2',
      title: 'iPhone 14 Pro Max',
      price: '85 000 ₽',
      status: 'На модерации',
      views: 12,
      image: '/placeholder-phone.jpg'
    }
  ]

  const mockFavorites = [
    {
      id: '3',
      title: 'Квартира 2-комнатная',
      price: '3 200 000 ₽',
      location: 'Назрань',
      image: '/placeholder-apartment.jpg'
    },
    {
      id: '4',
      title: 'MacBook Pro M2',
      price: '120 000 ₽',
      location: 'Магас',
      image: '/placeholder-laptop.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-sm text-gray-600">{profileData.email}</p>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-accent-red text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    )
                  })}
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                    Выйти
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Личная информация
                  </CardTitle>
                  <p className="text-gray-600">
                    Управляйте своими личными данными и настройками аккаунта
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
                      </label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия
                      </label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Электронная почта
                    </label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город
                    </label>
                    <Input
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSave}
                      className="bg-accent-red hover:bg-accent-red-hover text-white px-8 py-2 rounded-xl shadow-button"
                    >
                      Сохранить изменения
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'ads' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Мои объявления
                      </CardTitle>
                      <p className="text-gray-600">
                        Управляйте своими объявлениями
                      </p>
                    </div>
                    <Link href="/listings/create">
                      <Button className="bg-accent-red hover:bg-accent-red-hover text-white rounded-xl shadow-button">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Добавить объявление
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAds.map((ad) => (
                      <div key={ad.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Фото</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{ad.title}</h4>
                            <p className="text-accent-red font-bold">{ad.price}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                ad.status === 'Активно' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {ad.status}
                              </span>
                              <span>Просмотров: {ad.views}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            Редактировать
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg text-red-600 border-red-200 hover:bg-red-50">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'favorites' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Избранное
                  </CardTitle>
                  <p className="text-gray-600">
                    Объявления, которые вас заинтересовали
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockFavorites.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Фото</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-accent-red font-bold mb-2">{item.price}</p>
                          <p className="text-sm text-gray-600">{item.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Настройки
                  </CardTitle>
                  <p className="text-gray-600">
                    Настройте уведомления и приватность
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Email уведомления</h4>
                        <p className="text-sm text-gray-600">Получать уведомления о новых сообщениях</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS уведомления</h4>
                        <p className="text-sm text-gray-600">Получать SMS о важных событиях</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Показывать телефон</h4>
                        <p className="text-sm text-gray-600">Отображать номер телефона в объявлениях</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <Button className="bg-accent-red hover:bg-accent-red-hover text-white rounded-xl shadow-button">
                      Сохранить настройки
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
