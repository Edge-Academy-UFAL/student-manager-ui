import { GeistMono } from 'geist/font/mono'
import type { Metadata } from 'next'
import { Providers } from './providers'

import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

export const metadata: Metadata = {
  title: 'Edge Academy',
  description: 'Gerenciador de alunos do Edge Academy.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <Providers session={session}>
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
