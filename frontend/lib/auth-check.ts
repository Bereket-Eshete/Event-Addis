import { useAuth } from './auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthCheck = (requireAuth = true) => {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, requireAuth, router])

  return { isAuthenticated, user }
}

export const useRoleCheck = (allowedRoles: string[]) => {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      const redirectPath = user.role === 'organizer' ? '/dashboard' : '/user'
      router.push(redirectPath)
    }
  }, [isAuthenticated, user, allowedRoles, router])

  return { isAuthenticated, user }
}