// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../contexts/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
