'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Calendar, Loader } from 'lucide-react'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

function TokenHandler({ onTokenReceived }: { onTokenReceived: (token: string | null) => void }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token = searchParams.get('token')
    onTokenReceived(token)
  }, [searchParams, onTokenReceived])
  
  return null
}

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (token === null) return // Still loading
    if (token) {
      verifyEmail(token)
    } else {
      setStatus('error')
      setMessage('Invalid verification link')
    }
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await authAPI.verifyEmail(token)
      setStatus('success')
      setMessage(response.data.message)
      toast.success('Email verified successfully!')
      setTimeout(() => router.push('/login'), 3000)
    } catch (error: any) {
      setStatus('error')
      const errorMessage = error.response?.data?.message || 'Email verification failed'
      setMessage(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <Suspense fallback={null}>
        <TokenHandler onTokenReceived={setToken} />
      </Suspense>
      <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{backgroundColor: 'var(--bg)'}}>
        <div className="max-w-md w-full space-y-8 text-center">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">EventAddis</span>
        </Link>

        {status === 'loading' && (
          <div>
            <Loader className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-primary mb-2">Verifying Email</h2>
            <p className="text-muted">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Email Verified!</h2>
            <p className="text-muted mb-4">{message}</p>
            <p className="text-sm text-muted">Redirecting to login page...</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Verification Failed</h2>
            <p className="text-muted mb-6">{message}</p>
            <Link href="/login" className="btn-primary px-6 py-3 rounded-lg">
              Go to Login
            </Link>
          </div>
        )}
        </div>
      </div>
    </>
  )
}