'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { islamApi } from '@/lib/api'

interface PrayerTimes {
  city: string
  date: string
  hijriDate: string
  timings: {
    fajr: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
}

interface Hadith {
  text: string
  textIng: string
  source: string
}

export default function IslamPage() {
  const { t, language } = useLanguage()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [hadith, setHadith] = useState<Hadith | null>(null)
  const [allHadith, setAllHadith] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Magas')

  const cities = [
    { value: 'Magas', label: 'Магас' },
    { value: 'Nazran', label: 'Назрань' },
    { value: 'Karabulak', label: 'Карабулак' },
    { value: 'Malgobek', label: 'Малгобек' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prayerRes, hadithRes] = await Promise.all([
          islamApi.getPrayerTimes(selectedCity),
          islamApi.getDailyHadith(),
        ])

        setPrayerTimes(prayerRes.data)
        setHadith(hadithRes.data)
        
        const mockAllHadith = [
          {
            text: 'Поистине, дела оцениваются по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести.',
            textIng: 'Хьакъехь, болхаш нийтийн коьрта дувцуш ду, цхьана стагана хьожуш ю цуна нийт йолу хIума бен.',
            source: 'Сахих аль-Бухари'
          },
          {
            text: 'Верующий не тот, кто наедается досыта, в то время как его сосед остается голодным.',
            textIng: 'Доттаг1а цаьрг дац цу, цуна доза дуьйна долуш йолчул тIехь.',
            source: 'Сахих аль-Бухари'
          },
          {
            text: 'Лучший из людей тот, кто приносит пользу людям.',
            textIng: 'Наха юкъера х1ума наханна пайда йолу стаг ю.',
            source: 'Ат-Табарани'
          }
        ]
        setAllHadith(mockAllHadith)
      } catch (error) {
        console.error('Error fetching Islam data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCity])

  const getRandomHadith = async () => {
    try {
      const response = await islamApi.getRandomHadith()
      setHadith(response.data)
    } catch (error) {
      console.error('Error fetching random hadith:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen islamic-gradient">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-8xl block mb-4">🕌</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-accent-green mb-6">
            Исламский раздел
          </h1>
          <p className="text-xl text-accent-green-hover max-w-4xl mx-auto leading-relaxed">
            Время намаза и хадисы для мусульман Республики Ингушетия
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prayer Times */}
          <div>
            <Card className="bg-white border-accent-green/20 shadow-xl">
              <CardHeader className="bg-accent-green text-white rounded-t-xl">
                <CardTitle className="text-2xl flex items-center">
                  <span className="text-3xl mr-3">🕐</span>
                  {t('islam.prayerTimes')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* City Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выберите город:
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-accent-green focus:border-accent-green transition-colors"
                  >
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>

                {prayerTimes && (
                  <div>
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-accent-green">
                        {prayerTimes.city}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{prayerTimes.date}</p>
                      <p className="text-sm text-gray-600">{prayerTimes.hijriDate}</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: t('islam.fajr'), time: prayerTimes.timings.fajr, icon: '🌅' },
                        { name: t('islam.dhuhr'), time: prayerTimes.timings.dhuhr, icon: '☀️' },
                        { name: t('islam.asr'), time: prayerTimes.timings.asr, icon: '🌤️' },
                        { name: t('islam.maghrib'), time: prayerTimes.timings.maghrib, icon: '🌅' },
                        { name: t('islam.isha'), time: prayerTimes.timings.isha, icon: '🌙' },
                      ].map((prayer) => (
                        <div
                          key={prayer.name}
                          className="flex items-center justify-between p-5 bg-islamic-bg rounded-xl border border-accent-green/20 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-3xl">{prayer.icon}</span>
                            <span className="font-semibold text-accent-green text-lg">
                              {prayer.name}
                            </span>
                          </div>
                          <span className="text-2xl font-mono font-bold text-accent-green-hover">
                            {prayer.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Hadith Section */}
          <div>
            <Card className="bg-white border-accent-green/20 shadow-xl">
              <CardHeader className="bg-accent-green text-white rounded-t-xl">
                <CardTitle className="text-2xl flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">📖</span>
                    {t('islam.hadith')}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={getRandomHadith}
                    className="text-white hover:bg-accent-green-hover rounded-lg px-4 py-2"
                  >
                    Обновить
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {hadith && (
                  <div className="space-y-6">
                    <blockquote className="text-xl text-gray-800 italic leading-relaxed border-l-4 border-accent-green pl-6 bg-islamic-bg/30 p-6 rounded-r-xl">
                      &ldquo;{language === 'ru' ? hadith.text : hadith.textIng}&rdquo;
                    </blockquote>
                    <cite className="block text-base text-accent-green font-semibold">
                      — {hadith.source}
                    </cite>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Hadith */}
            <Card className="mt-8 bg-white border-accent-green/20 shadow-xl">
              <CardHeader className="bg-islamic-bg">
                <CardTitle className="text-xl text-accent-green">
                  Все хадисы
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8 max-h-96 overflow-y-auto">
                  {allHadith.map((hadithItem, index) => (
                    <div key={index} className="border-b border-accent-green/20 pb-6 last:border-b-0">
                      <blockquote className="text-base text-gray-700 italic mb-3 leading-relaxed">
                        &ldquo;{language === 'ru' ? hadithItem.text : hadithItem.textIng}&rdquo;
                      </blockquote>
                      <cite className="text-sm text-accent-green font-medium">
                        — {hadithItem.source}
                      </cite>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Islamic Resources */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-islamic-bg to-islamic-light border-accent-green/30 shadow-xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold text-accent-green mb-6">
                Дополнительные ресурсы
              </h3>
              <p className="text-xl text-accent-green-hover mb-8">
                Изучайте Ислам с проверенными источниками
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button className="bg-accent-green hover:bg-accent-green-hover shadow-button-green px-6 py-3">
                  Коран онлайн
                </Button>
                <Button className="bg-accent-green hover:bg-accent-green-hover shadow-button-green px-6 py-3">
                  Исламские лекции
                </Button>
                <Button className="bg-accent-green hover:bg-accent-green-hover shadow-button-green px-6 py-3">
                  Мечети Ингушетии
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
