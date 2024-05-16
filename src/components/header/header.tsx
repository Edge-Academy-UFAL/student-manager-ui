'use client'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { NavLink } from './nav-link'
import { UserSheet } from './user-sheet'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from './theme-toggle'
import { useTheme } from 'next-themes'
import logoLightMode from '@/assets/academy-logo-black.png'
import logoDarkMode from '@/assets/academy-logo-white.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// sample routes
export const adminAndInstructorRoutes = [
  {
    name: 'Alunos',
    path: '/alunos',
    icon: <Users className="h-4 w-4" />,
  },
]

export const studentRoutes = [] // quando tiver rotas para estudantes, incluir aqui

const Header = () => {
  const router = useRouter()

  const { data } = useSession()

  const { resolvedTheme } = useTheme()
  const [logo, setLogo] = useState(logoLightMode)

  useEffect(() => {
    const logo = resolvedTheme === 'light' ? logoLightMode : logoDarkMode
    setLogo(logo)
  }, [resolvedTheme])

  const routes = (() => {
    switch (data?.user.dtype) {
      case 'Student':
        return studentRoutes
      case 'Admin':
      case 'Instructor':
        return adminAndInstructorRoutes
      default:
        return studentRoutes
    }
  })()

  const navLinks = routes.map((route, index) => {
    return (
      <NavLink key={index} to={route.path}>
        {route.icon}
        <span className="hidden md:block">{route.name}</span>
      </NavLink>
    )
  })

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-background">
      <div className="flex items-center gap-4 lg:gap-6">
        <div
          className="flex gap-4 hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image
            className="flex gap-1.5 items-center"
            src={logo}
            alt="Edge Academy Logo"
            width={80}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center gap-4 lg:gap-6">{navLinks}</nav>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 ">
        <ThemeToggle />
        <Separator
          orientation="vertical"
          className="h-6 dark:bg-[#2d2d37]"
        />{' '}
        <UserSheet />
      </div>
    </header>
  )
}

export default Header
