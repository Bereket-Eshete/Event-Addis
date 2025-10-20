import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  register: (data: { fullName: string; email: string; password: string; role: string; termsAccepted: boolean; organizationName?: string; organizationWebsite?: string; contactNumber?: string }) =>
    api.post('/auth/signup', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email?token=${token}`),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (data: { token: string; newPassword: string }) =>
    api.post('/auth/reset-password', data),
  
  googleAuth: (token: string) =>
    api.post('/auth/google', { token }),
}

export const dashboardAPI = {
  getUserInfo: () => api.get('/dashboard/user-info'),
  getOrganizerStats: () => api.get('/dashboard/organizer/stats'),
  getOrganizerEvents: (params?: { page?: number; limit?: number; status?: string }) => 
    api.get('/dashboard/organizer/events', { params }),
  getOrganizerBookings: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/organizer/bookings', { params }),
  getOrganizerPayments: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/organizer/payments', { params }),
  getOrganizerAnalytics: (period?: string) => 
    api.get(`/dashboard/organizer/analytics?period=${period || '30d'}`),
  
  // User dashboard endpoints
  getUserStats: () => api.get('/dashboard/user/stats'),
  getUserBookings: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/user/bookings', { params }),
  getUserPayments: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/user/payments', { params }),
  getUserFavorites: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/user/favorites', { params }),
  getUserMessages: (params?: { page?: number; limit?: number }) => 
    api.get('/dashboard/user/messages', { params }),
  markMessageAsRead: (messageId: string) => api.post(`/dashboard/user/messages/${messageId}/read`),
  addToFavorites: (eventId: string) => api.post('/dashboard/user/favorites', { eventId }),
  removeFromFavorites: (eventId: string) => api.delete(`/dashboard/user/favorites/${eventId}`),
}

export const eventsAPI = {
  createEvent: (data: any) => api.post('/api/events', data),
  updateEvent: (id: string, data: any) => api.patch(`/api/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/api/events/${id}`),
  getEvent: (id: string) => api.get(`/api/events/${id}`),
  getAllEvents: (params?: { page?: number; limit?: number; category?: string; search?: string }) => 
    api.get('/api/events', { params }),
  bookEvent: (eventId: string, data: any) => api.post(`/api/events/${eventId}/book`, data),
}

export const profileAPI = {
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
}

export default api