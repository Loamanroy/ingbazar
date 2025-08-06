'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { ListingCard } from '@/components/listings/ListingCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'

interface Category {
  id: string
  nameRu: string
  nameIng: string
  slug: string
  icon: string
}

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

interface PrayerTimes {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

interface Hadith {
  text: string
  textIng: string
  source: string
}

const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  car: HomeIcon,
  home: BuildingOfficeIcon,
  briefcase: BriefcaseIcon,
  wrench: WrenchScrewdriverIcon,
  'device-mobile': DevicePhoneMobileIcon,
  sparkles: SparklesIcon,
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [recentListings, setRecentListings] = useState<Listing[]>([])
  const [popularListings, setPopularListings] = useState<Listing[]>([])
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [hadith, setHadith] = useState<Hadith | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockCategories = [
          { id: '1', nameRu: 'Автомобили', nameIng: 'Машинаш', slug: 'automobiles', icon: 'car' },
          { id: '2', nameRu: 'Недвижимость', nameIng: 'Ӏаьржа', slug: 'real-estate', icon: 'home' },
          { id: '3', nameRu: 'Работа', nameIng: 'Болх', slug: 'jobs', icon: 'briefcase' },
          { id: '4', nameRu: 'Услуги', nameIng: 'Хидматаш', slug: 'services', icon: 'wrench' },
          { id: '5', nameRu: 'Электроника', nameIng: 'Электроника', slug: 'electronics', icon: 'device-mobile' },
          { id: '6', nameRu: 'Одежда', nameIng: 'Хьаьбаш', slug: 'clothing', icon: 'sparkles' },
        ]

        const mockListings = [
          {
            id: '1',
            title: 'Toyota Camry 2020',
            description: 'Автомобиль в отличном состоянии, один владелец, полная комплектация. Пробег 45 000 км, все ТО пройдены в срок. Кожаный салон, климат-контроль, навигация.',
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
            description: 'Новый iPhone в заводской упаковке, все аксессуары в комплекте. Цвет Deep Purple, гарантия Apple 1 год. Никогда не использовался.',
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
            description: 'Продается уютная 2-комнатная квартира в центре города с евроремонтом. 65 кв.м, 5 этаж из 9, лифт работает. Рядом школы, магазины.',
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
            description: 'Ноутбук для работы и творчества, состояние отличное, все документы. 16GB RAM, Touch Bar, батарея держит 8+ часов. Чехол в подарок.',
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
            description: 'Удобный угловой диван в хорошем состоянии, подходит для гостиной. Размер 280x180 см, механизм раскладки работает идеально.',
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
            description: 'Горный велосипед Trek в отличном состоянии, подходит для активного отдыха. 21 скорость, алюминиевая рама, дисковые тормоза.',
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
            description: 'Красивое вечернее платье размер M, одевалось один раз на свадьбу. Цвет бордовый, длина в пол, очень элегантное.',
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
            description: 'Двухкамерный холодильник Samsung в рабочем состоянии, экономичный класс A+. No Frost, LED подсветка, 5 лет эксплуатации.',
            price: 18000,
            currency: '₽',
            images: ['/placeholder-fridge.jpg'],
            city: 'Магас',
            createdAt: '2024-08-08T12:15:00Z',
            views: 56,
            isNegotiable: true
          },
          {
            id: '9',
            title: 'Стиральная машина Bosch 7кг',
            description: 'Стиральная машина Bosch с загрузкой 7кг, отличное состояние. 1400 об/мин, класс энергопотребления A+++, тихая работа.',
            price: 28000,
            currency: '₽',
            images: ['/placeholder-washer.jpg'],
            city: 'Назрань',
            createdAt: '2024-07-28T14:20:00Z',
            views: 123,
            isNegotiable: true
          },
          {
            id: '10',
            title: 'Детская коляска 3в1',
            description: 'Детская коляска-трансформер 3в1: люлька, прогулочная, автокресло. Цвет серый, в комплекте дождевик и москитная сетка.',
            price: 15000,
            currency: '₽',
            images: ['/placeholder-stroller.jpg'],
            city: 'Карабулак',
            createdAt: '2024-07-29T09:30:00Z',
            views: 87,
            isTop: true
          },
          {
            id: '11',
            title: 'Кроссовки Nike Air Max 42',
            description: 'Оригинальные кроссовки Nike Air Max размер 42, состояние отличное. Носились 2 месяца, есть коробка и чек.',
            price: 6500,
            currency: '₽',
            images: ['/placeholder-sneakers.jpg'],
            city: 'Сунжа',
            createdAt: '2024-07-30T16:45:00Z',
            views: 45
          },
          {
            id: '12',
            title: 'Телевизор Samsung 55" 4K',
            description: 'Smart TV Samsung 55 дюймов с поддержкой 4K HDR. Состояние идеальное, пульт и документы в комплекте. Настенное крепление в подарок.',
            price: 45000,
            currency: '₽',
            images: ['/placeholder-tv.jpg'],
            city: 'Магас',
            createdAt: '2024-07-31T11:15:00Z',
            views: 198,
            isTop: true
          },
          {
            id: '13',
            title: 'Гитара акустическая Yamaha',
            description: 'Акустическая гитара Yamaha F310, отличное состояние. Подходит для начинающих и опытных музыкантов. Чехол в комплекте.',
            price: 12000,
            currency: '₽',
            images: ['/placeholder-guitar.jpg'],
            city: 'Малгобек',
            createdAt: '2024-08-01T08:20:00Z',
            views: 67
          },
          {
            id: '14',
            title: 'Микроволновка LG 23л',
            description: 'Микроволновая печь LG объемом 23 литра, мощность 800Вт. Гриль, автоматические программы, таймер. Состояние отличное.',
            price: 7500,
            currency: '₽',
            images: ['/placeholder-microwave.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-02T13:40:00Z',
            views: 34,
            isUrgent: true
          },
          {
            id: '15',
            title: 'Книжный шкаф из массива',
            description: 'Книжный шкаф из натурального дерева, 5 полок, высота 180см. Ручная работа, очень качественный и красивый.',
            price: 22000,
            currency: '₽',
            images: ['/placeholder-bookshelf.jpg'],
            city: 'Карабулак',
            createdAt: '2024-08-03T10:25:00Z',
            views: 56,
            isNegotiable: true
          },
          {
            id: '16',
            title: 'Планшет iPad Air 64GB',
            description: 'Apple iPad Air 4-го поколения, 64GB Wi-Fi. Цвет Space Gray, состояние идеальное. Защитное стекло и чехол в подарок.',
            price: 38000,
            currency: '₽',
            images: ['/placeholder-tablet.jpg'],
            city: 'Сунжа',
            createdAt: '2024-08-04T15:10:00Z',
            views: 89
          },
          {
            id: '17',
            title: 'Куртка зимняя мужская XL',
            description: 'Зимняя куртка мужская размер XL, очень теплая, подходит до -30°C. Цвет черный, капюшон с мехом, много карманов.',
            price: 4500,
            currency: '₽',
            images: ['/placeholder-jacket.jpg'],
            city: 'Магас',
            createdAt: '2024-08-05T09:50:00Z',
            views: 23,
            isNegotiable: true
          },
          {
            id: '18',
            title: 'Фотоаппарат Canon EOS 2000D',
            description: 'Зеркальная фотокамера Canon EOS 2000D с объективом 18-55mm. Отличное состояние, мало использовался. Карта памяти в подарок.',
            price: 32000,
            currency: '₽',
            images: ['/placeholder-camera.jpg'],
            city: 'Назрань',
            createdAt: '2024-08-06T12:30:00Z',
            views: 145,
            isTop: true
          },
          {
            id: '19',
            title: 'Кофемашина Delonghi',
            description: 'Автоматическая кофемашина Delonghi с капучинатором. Готовит эспрессо, американо, капучино. Встроенная кофемолка.',
            price: 25000,
            currency: '₽',
            images: ['/placeholder-coffee.jpg'],
            city: 'Малгобек',
            createdAt: '2024-08-07T14:15:00Z',
            views: 78
          },
          {
            id: '20',
            title: 'Матрас ортопедический 160x200',
            description: 'Ортопедический матрас размер 160x200, высота 22см. Независимые пружины, натуральный латекс. Использовался 1 год.',
            price: 18000,
            currency: '₽',
            images: ['/placeholder-mattress.jpg'],
            city: 'Карабулак',
            createdAt: '2024-08-08T11:45:00Z',
            views: 67,
            isNegotiable: true
          },
          {
            id: '21',
            title: 'Пылесос Dyson V8',
            description: 'Беспроводной пылесос Dyson V8 Absolute, мощная батарея, много насадок. Отлично подходит для уборки дома и машины.',
            price: 21000,
            currency: '₽',
            images: ['/placeholder-vacuum.jpg'],
            city: 'Сунжа',
            createdAt: '2024-08-09T16:20:00Z',
            views: 92,
            isUrgent: true
          },
          {
            id: '22',
            title: 'Сумка женская Louis Vuitton',
            description: 'Женская сумка Louis Vuitton, оригинал, состояние отличное. Цвет коричневый, размер средний, есть документы подлинности.',
            price: 85000,
            currency: '₽',
            images: ['/placeholder-bag.jpg'],
            city: 'Магас',
            createdAt: '2024-08-10T13:55:00Z',
            views: 234,
            isTop: true
          }
        ]

        setCategories(mockCategories)
        setRecentListings(mockListings.slice(0, 8))
        setPopularListings(mockListings.slice(0, 4))
        
        setPrayerTimes({
          fajr: '04:30',
          dhuhr: '12:45',
          asr: '16:20',
          maghrib: '19:15',
          isha: '20:45',
        })
        
        setHadith({
          text: 'Поистине, дела оцениваются по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести.',
          textIng: 'Хьакъехь, болхаш нийтийн коьрта дувцуш ду, цхьана стагана хьожуш ю цуна нийт йолу хIума бен.',
          source: 'Сахих аль-Бухари'
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 px-6 md:px-0">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Доска объявлений
          <span className="block text-accent-red">Республики Ингушетия</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
          Крупнейшая площадка для размещения объявлений в Республике Ингушетия. 
          Покупайте и продавайте товары и услуги быстро и безопасно.
        </p>
        <Link href="/listings/create">
          <Button size="lg" className="text-lg px-10 py-4 bg-accent-red hover:bg-accent-red-hover shadow-button">
            {t('nav.postAd')}
          </Button>
        </Link>
      </section>

      {/* Islam Widget */}
      {(prayerTimes || hadith) && (
        <section className="mb-16">
          <Card className="islamic-gradient border-accent-green/20 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-accent-green flex items-center text-2xl">
                <span className="text-3xl mr-3">🕌</span>
                {t('islam.prayerTimes')} и {t('islam.hadith')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {prayerTimes && (
                  <div className="bg-white/60 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="font-semibold text-accent-green mb-4 flex items-center">
                      <span className="text-xl mr-2">🕐</span>
                      {t('islam.prayerTimes')}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: t('islam.fajr'), time: prayerTimes.fajr, icon: '🌅' },
                        { name: t('islam.dhuhr'), time: prayerTimes.dhuhr, icon: '☀️' },
                        { name: t('islam.asr'), time: prayerTimes.asr, icon: '🌤️' },
                        { name: t('islam.maghrib'), time: prayerTimes.maghrib, icon: '🌅' },
                        { name: t('islam.isha'), time: prayerTimes.isha, icon: '🌙' },
                      ].map((prayer) => (
                        <div key={prayer.name} className="flex items-center justify-between py-2 px-3 bg-white/40 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{prayer.icon}</span>
                            <span className="font-medium text-accent-green">{prayer.name}</span>
                          </div>
                          <span className="font-mono font-bold text-accent-green-hover">{prayer.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {hadith && (
                  <div className="bg-white/60 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="font-semibold text-accent-green mb-4 flex items-center">
                      <span className="text-xl mr-2">📖</span>
                      {t('islam.hadith')}
                    </h3>
                    <blockquote className="text-accent-green-hover italic mb-4 leading-relaxed border-l-4 border-accent-green pl-4">
                      &ldquo;{language === 'ru' ? hadith.text : hadith.textIng}&rdquo;
                    </blockquote>
                    <cite className="text-sm text-accent-green font-medium">— {hadith.source}</cite>
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                <Link href="/islam">
                  <Button className="bg-accent-green hover:bg-accent-green-hover shadow-button-green">
                    Подробнее об Исламе
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Popular Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          {t('home.popularCategories')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.icon] || HomeIcon
            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="category-hover cursor-pointer group shadow-lg">
                  <CardContent className="p-8 text-center">
                    <IconComponent className="h-14 w-14 mx-auto mb-4 text-gray-600 group-hover:text-accent-red transition-colors" />
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-accent-red transition-colors">
                      {language === 'ru' ? category.nameRu : category.nameIng}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Listings */}
      {popularListings.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('home.popularListings')}
            </h2>
            <Link href="/listings?sort=popular">
              <Button variant="outline" className="border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white">
                Все популярные
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {popularListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Listings */}
      {recentListings.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('home.latestListings')}
            </h2>
            <Link href="/listings">
              <Button variant="outline" className="border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white">
                Все объявления
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Advertisement Banner */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-xl">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Хотите разместить рекламу?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Увеличьте продажи с помощью нашей рекламной платформы
            </p>
            <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-3 text-lg">
              Узнать подробнее
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
