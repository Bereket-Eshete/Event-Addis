'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import toast from 'react-hot-toast'
import { Loader, Calendar } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')
    const userStr = searchParams.get('user')
    const error = searchParams.get('error')

    if (error) {
      toast.error('Google authentication failed')
      router.push('/login')
      return
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))
        setAuth(user, token)
        toast.success(`Welcome ${user.fullName}!`)
        
        // Role-based routing with delay for better UX
        setTimeout(() => {
          const redirectPath = user.role === 'organizer' ? '/dashboard' : '/user'
          router.push(redirectPath)
        }, 1000)
      } catch (err) {
        console.error('Auth callback error:', err)
        toast.error('Authentication failed. Please try again.')
        router.push('/login')
      }
    } else {
      toast.error('Authentication failed. Missing credentials.')
      router.push('/login')
    }
  }, [searchParams, router, setAuth])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--bg)'}}>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">EventAddis</span>
        </div>
        
        <Loader className="h-8 w-8 text-primary mx-auto mb-4 animate-spin" />
        <p className="text-primary">Completing Google sign in...</p>
      </div>
    </div>
  )
}