import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.placeholder.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: unknown) =>
    api.post('/auth/register', userData),
  googleAuth: () =>
    api.get('/auth/google'),
}

export const listingsApi = {
  getAll: (params?: unknown) =>
    api.get('/listings', { params }),
  getById: (id: string) =>
    api.get(`/listings/${id}`),
  create: (data: FormData) =>
    api.post('/listings', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (id: string, data: FormData) =>
    api.patch(`/listings/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: (id: string) =>
    api.delete(`/listings/${id}`),
  getPopular: (limit?: number) =>
    api.get('/listings/popular', { params: { limit } }),
  getRecent: (limit?: number) =>
    api.get('/listings/recent', { params: { limit } }),
  getMy: () =>
    api.get('/listings/my'),
}

export const categoriesApi = {
  getAll: () =>
    api.get('/categories'),
  getRoot: () =>
    api.get('/categories/root'),
  getById: (id: string) =>
    api.get(`/categories/${id}`),
  getBySlug: (slug: string) =>
    api.get(`/categories/slug/${slug}`),
}

export const islamApi = {
  getPrayerTimes: (city?: string) =>
    api.get('/islam/prayer-times', { params: { city } }),
  getDailyHadith: () =>
    api.get('/islam/hadith/daily'),
  getRandomHadith: () =>
    api.get('/islam/hadith/random'),
}

export const usersApi = {
  getProfile: () =>
    api.get('/users/profile'),
  updateProfile: (data: unknown) =>
    api.patch('/users/profile', data),
}
