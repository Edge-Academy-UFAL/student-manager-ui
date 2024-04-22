'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '../../contexts/auth'
import LoginPage from '@/app/(auth)/login/page'

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  const route = usePathname()

  if (!isAuthenticated && !route.startsWith('/register')) {
    return <LoginPage />
  }

  return children
}
