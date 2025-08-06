'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon, 
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { categoriesApi } from '@/lib/api'

interface Category {
  id: string
  nameRu: string
  nameIng: string
  slug: string
  icon: string
  description?: string
  children?: Category[]
}

const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  car: HomeIcon,
  home: BuildingOfficeIcon,
  briefcase: BriefcaseIcon,
  wrench: WrenchScrewdriverIcon,
  'device-mobile': DevicePhoneMobileIcon,
  sparkles: SparklesIcon,
}

export default function CategoriesPage() {
  const { t, language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll()
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-red mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {t('nav.categories')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Выберите категорию для поиска объявлений или размещения своего
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.icon] || HomeIcon
          
          return (
            <Card key={category.id} className="card-hover shadow-xl group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-accent-red/10 rounded-xl group-hover:bg-accent-red/20 transition-colors">
                    <IconComponent className="h-10 w-10 text-accent-red" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900 group-hover:text-accent-red transition-colors">
                      {language === 'ru' ? category.nameRu : category.nameIng}
                    </CardTitle>
                    {category.description && (
                      <p className="text-base text-gray-600 mt-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Subcategories */}
                {category.children && category.children.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Подкategории:
                    </h4>
                    {category.children.slice(0, 5).map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/categories/${subcategory.slug}`}
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-accent-red transition-colors py-2 px-2 rounded-lg hover:bg-gray-50"
                      >
                        <span>
                          {language === 'ru' ? subcategory.nameRu : subcategory.nameIng}
                        </span>
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    ))}
                    {category.children.length > 5 && (
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-sm text-accent-red hover:text-accent-red-hover font-medium"
                      >
                        Показать все ({category.children.length})
                      </Link>
                    )}
                  </div>
                )}
                
                {/* View Category Button */}
                <Link href={`/categories/${category.slug}`}>
                  <div className="flex items-center justify-between text-accent-red hover:text-accent-red-hover font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Просмотреть объявления</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Special Sections */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {/* Automobiles Special Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-xl card-hover">
          <CardContent className="p-10">
            <div className="flex items-center space-x-6 mb-6">
              <div className="p-4 bg-blue-200 rounded-xl">
                <HomeIcon className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-900">Автомобили</h3>
                <p className="text-lg text-blue-700">Специальный раздел с расширенными фильтрами</p>
              </div>
            </div>
            <Link href="/categories/automobiles">
              <div className="flex items-center justify-between text-blue-600 hover:text-blue-700 font-semibold text-lg">
                <span>Перейти в автомобили</span>
                <ChevronRightIcon className="h-6 w-6" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Islam Section */}
        <Card className="islamic-gradient border-accent-green/20 shadow-xl card-hover">
          <CardContent className="p-10">
            <div className="flex items-center space-x-6 mb-6">
              <div className="p-4 bg-accent-green/20 rounded-xl">
                <span className="text-3xl">🕌</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent-green">Ислам</h3>
                <p className="text-lg text-accent-green-hover">Время намаза и хадисы</p>
              </div>
            </div>
            <Link href="/islam">
              <div className="flex items-center justify-between text-accent-green hover:text-accent-green-hover font-semibold text-lg">
                <span>Перейти в исламский раздел</span>
                <ChevronRightIcon className="h-6 w-6" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <div className="mt-16 text-center">
        <Card className="bg-gray-50 shadow-xl">
          <CardContent className="p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Не можете найти нужную категорию?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Свяжитесь с нами, и мы поможем вам разместить объявление в подходящей категории
            </p>
            <Link href="/contact">
              <span className="text-accent-red hover:text-accent-red-hover font-semibold text-lg">
                Связаться с поддержкой
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
