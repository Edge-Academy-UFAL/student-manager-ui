// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../contexts/auth'
import { ImageProvider } from '@/contexts/image-upload'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ImageProvider>{children}</ImageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
