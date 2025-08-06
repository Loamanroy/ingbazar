'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'ru' | 'ing'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ru: {
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.cars': 'Автомобили',
    'nav.myListings': 'Мои объявления',
    'nav.favorites': 'Избранное',
    'nav.islam': 'Ислам',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    'nav.logout': 'Выйти',
    'nav.postAd': 'Разместить объявление',
    
    'home.popularCategories': 'Популярные категории',
    'home.latestListings': 'Последние объявления',
    'home.popularListings': 'Популярные объявления',
    'home.search': 'Поиск объявлений...',
    
    'categories.automobiles': 'Автомобили',
    'categories.realEstate': 'Недвижимость',
    'categories.jobs': 'Работа',
    'categories.services': 'Услуги',
    'categories.electronics': 'Электроника',
    'categories.clothing': 'Одежда и обувь',
    
    'listing.price': 'Цена',
    'listing.city': 'Город',
    'listing.contact': 'Связаться',
    'listing.phone': 'Позвонить',
    'listing.description': 'Описание',
    'listing.specifications': 'Характеристики',
    'listing.urgent': 'Срочно',
    'listing.negotiable': 'Торг',
    'listing.top': 'ТОП',
    
    'islam.prayerTimes': 'Время намаза',
    'islam.hadith': 'Хадис дня',
    'islam.fajr': 'Фаджр',
    'islam.dhuhr': 'Зухр',
    'islam.asr': 'Аср',
    'islam.maghrib': 'Магриб',
    'islam.isha': 'Иша',
    
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.view': 'Просмотр',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Предыдущий',
  },
  ing: {
    'nav.home': 'Керда агIо',
    'nav.categories': 'Категореш',
    'nav.cars': 'Машинаш',
    'nav.myListings': 'Сан хаамаш',
    'nav.favorites': 'Дуьйцуш',
    'nav.islam': 'Ислам',
    'nav.profile': 'Профиль',
    'nav.login': 'Чувала',
    'nav.register': 'ДIаяздар',
    'nav.logout': 'Арадала',
    'nav.postAd': 'Хаам тIатоха',
    
    'home.popularCategories': 'Машхур категореш',
    'home.latestListings': 'ТIехьара хаамаш',
    'home.popularListings': 'Машхур хаамаш',
    'home.search': 'Хаамаш лахар...',
    
    'categories.automobiles': 'Машинаш',
    'categories.realEstate': 'Ӏаьржа',
    'categories.jobs': 'Болх',
    'categories.services': 'Хидматаш',
    'categories.electronics': 'Электроника',
    'categories.clothing': 'Хьаьбаш а маьшаш а',
    
    'listing.price': 'Мах',
    'listing.city': 'ГIала',
    'listing.contact': 'Дуьйцу',
    'listing.phone': 'Телефон тоха',
    'listing.description': 'Цуьнах лаьцна',
    'listing.specifications': 'Билгалонаш',
    'listing.urgent': 'Малхбузуш',
    'listing.negotiable': 'Дувцар',
    'listing.top': 'ТОП',
    
    'islam.prayerTimes': 'Намазан хан',
    'islam.hadith': 'Дийнан хадис',
    'islam.fajr': 'Фаджр',
    'islam.dhuhr': 'Зухр',
    'islam.asr': 'Аср',
    'islam.maghrib': 'Магриб',
    'islam.isha': 'Иша',
    
    'common.loading': 'Йуьлуш ю...',
    'common.error': 'ГIалат',
    'common.save': 'Ӏалашъе',
    'common.cancel': 'Цаоьшу',
    'common.delete': 'ДIаяккха',
    'common.edit': 'Хийца',
    'common.view': 'Хьажа',
    'common.back': 'ЮхагIа',
    'common.next': 'ТIехьара',
    'common.previous': 'Хьалхара',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'ing')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
