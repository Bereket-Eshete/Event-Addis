'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Calendar, CheckCircle } from 'lucide-react'

export default function SignupSuccessPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{backgroundColor: 'var(--bg)'}}>
      <div className="max-w-md w-full space-y-8 text-center">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">EventAddis</span>
        </Link>

        <div className="bg-surface border border-muted rounded-lg p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold text-primary mb-4">
            Account Created Successfully!
          </h2>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">{email}</span>
          </div>
          
          <p className="text-muted mb-6">
            We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.
          </p>
          
          <div className="space-y-4">
            <div className="text-sm text-muted">
              <p>Didn't receive the email?</p>
              <ul className="mt-2 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• Wait a few minutes for delivery</li>
              </ul>
            </div>
            
            <Link 
              href="/login" 
              className="btn-primary px-6 py-3 rounded-lg inline-block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}