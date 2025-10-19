"use client";

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { validateAuth, token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (token) {
      validateAuth();
    }
  }, [token, validateAuth]);

  // Validate token every 5 minutes if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      validateAuth();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, validateAuth]);

  // Validate token when window gains focus
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleFocus = () => {
      validateAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isAuthenticated, validateAuth]);

  return <>{children}</>;
}