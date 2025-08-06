'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, UserIcon, HeartIcon, PlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { t, language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.categories'), href: '/categories' },
    { name: t('nav.cars'), href: '/categories/automobiles' },
    { name: t('nav.islam'), href: '/islam' },
  ]

  return (
    <header className="bg-white shadow-lg border-b fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-red rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">ИД</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-900">
                Доска объявлений
              </span>
              <span className="block text-sm text-accent-red font-medium">
                Республики Ингушетия
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-accent-red px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('home.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="hidden md:flex">
              <button
                onClick={() => setLanguage(language === 'ru' ? 'ing' : 'ru')}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {language === 'ru' ? 'ГӀалгӀай' : 'Русский'}
              </button>
            </div>

            {/* Post Ad Button */}
            <Link href="/listings/create">
              <Button size="sm" className="hidden md:flex bg-accent-red hover:bg-accent-red-hover shadow-button">
                <PlusIcon className="h-4 w-4 mr-2" />
                {t('nav.postAd')}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/favorites">
                  <Button variant="ghost" size="sm">
                    <HeartIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t('home.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-2 border-gray-200 focus:border-accent-red focus:ring-accent-red"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-accent-red px-3 py-2 text-base font-medium rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-2 pt-4 border-t">
                <Link href="/listings/create" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {t('nav.postAd')}
                  </Button>
                </Link>
                
                <button
                  onClick={() => setLanguage(language === 'ru' ? 'ing' : 'ru')}
                  className="w-full text-left text-sm text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  {language === 'ru' ? 'ГӀалгӀай' : 'Русский'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
