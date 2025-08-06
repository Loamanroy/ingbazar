'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    condition: '',
    city: 'Назрань',
    isNegotiable: false,
    isUrgent: false
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'automobiles', name: 'Автомобили', subcategories: ['Легковые', 'Грузовые', 'Мотоциклы', 'Запчасти'] },
    { id: 'real-estate', name: 'Недвижимость', subcategories: ['Квартиры', 'Дома', 'Коммерческая', 'Участки'] },
    { id: 'electronics', name: 'Электроника', subcategories: ['Телефоны', 'Компьютеры', 'Фототехника', 'ТВ и аудио'] },
    { id: 'clothing', name: 'Одежда и обувь', subcategories: ['Мужская одежда', 'Женская одежда', 'Детская одежда', 'Обувь'] },
    { id: 'home', name: 'Дом и сад', subcategories: ['Мебель', 'Бытовая техника', 'Посуда', 'Инструменты'] },
    { id: 'services', name: 'Услуги', subcategories: ['Ремонт', 'Обучение', 'Красота', 'Транспорт'] }
  ]

  const conditions = ['Новое', 'Отличное', 'Хорошее', 'Удовлетворительное']
  const cities = ['Назрань', 'Магас', 'Карабулак', 'Малгобек', 'Сунжа']

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 10) {
      alert('Максимум 10 фотографий')
      return
    }
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      console.log('Creating listing:', formData, images)
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/profile?tab=ads')
    } catch (error) {
      console.error('Error creating listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(cat => cat.id === formData.category)

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Разместить объявление
            </h1>
            <p className="text-gray-600">
              Заполните форму, чтобы разместить ваше объявление
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название объявления *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Например: iPhone 14 Pro Max 256GB"
                    className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Хорошее название поможет быстрее найти покупателя
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Опишите товар подробно: состояние, особенности, причину продажи..."
                    rows={6}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Подкатегория
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none"
                      disabled={!selectedCategory}
                    >
                      <option value="">Выберите подкатегорию</option>
                      {selectedCategory?.subcategories.map(sub => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена *
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="0"
                        className="rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red pr-12"
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₽
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Состояние
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none"
                    >
                      <option value="">Выберите состояние</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-accent-red focus:ring-accent-red focus:outline-none"
                      required
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNegotiable}
                      onChange={(e) => handleInputChange('isNegotiable', e.target.checked)}
                      className="rounded border-gray-300 text-accent-red focus:ring-accent-red"
                    />
                    <span className="ml-2 text-sm text-gray-700">Торг уместен</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isUrgent}
                      onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                      className="rounded border-gray-300 text-accent-red focus:ring-accent-red"
                    />
                    <span className="ml-2 text-sm text-gray-700">Срочная продажа</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Фотографии
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Добавьте до 10 фотографий. Первая фотография будет главной.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Upload Button */}
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-accent-red hover:bg-red-50 transition-colors">
                    <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 text-center">
                      Добавить фото
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Image Previews */}
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square relative group">
                      <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Фото {index + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-accent-red text-white text-xs px-2 py-1 rounded">
                          Главная
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-8 py-3 rounded-xl"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent-red hover:bg-accent-red-hover text-white px-8 py-3 rounded-xl shadow-button"
              >
                {loading ? 'Публикация...' : 'Опубликовать объявление'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
