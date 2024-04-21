'use client'

import { useAuth } from '../../contexts/auth'
import LoginPage from '@/app/(auth)/login/page'

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return children
}
