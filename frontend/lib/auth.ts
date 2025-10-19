import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { profileAPI } from './api'

interface User {
  id: string
  email: string
  fullName: string
  role: 'attendee' | 'organizer'
  isEmailVerified: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  validateAuth: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token)
        }
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
        }
        set({ user: null, token: null, isAuthenticated: false })
      },
      validateAuth: async () => {
        const { token } = get()
        if (!token) {
          set({ user: null, token: null, isAuthenticated: false })
          return
        }

        try {
          set({ isLoading: true })
          const response = await profileAPI.getProfile()
          const userData = response.data
          set({ 
            user: {
              id: userData.id,
              email: userData.email,
              fullName: userData.fullName,
              role: userData.role,
              isEmailVerified: userData.isEmailVerified
            }, 
            isAuthenticated: true 
          })
        } catch (error) {
          // Token is invalid or user doesn't exist
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
          }
          set({ user: null, token: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)