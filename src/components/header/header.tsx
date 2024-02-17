'use client'
import { Separator } from '../ui/separator'
import { Cat } from 'lucide-react'
import { NavLink } from './nav-link'
import { ModeToggle } from '../theme-toggle'
import { useRouter } from 'next/navigation'

// sample routes
export const routes = [
  {
    name: 'Route 1',
    path: '/',
    icon: <Cat className="h-4 w-4" />,
  },
  {
    name: 'Route 2',
    path: '/',
    icon: <Cat className="h-4 w-4" />,
  },
  {
    name: 'Route 3',
    path: '/',
    icon: <Cat className="h-4 w-4" />,
  },
  {
    name: 'Route 4',
    path: '/',
    icon: <Cat className="h-4 w-4" />,
  },
]

const Header = () => {
  const router = useRouter()

  const navLinks = routes.map((route, index) => {
    return (
      <NavLink key={index} to={route.path}>
        {route.icon}
        <span className="hidden md:block">{route.name}</span>
      </NavLink>
    )
  })

  return (
    <header className="flex h-16 items-center justify-between border-b dark:border-[#29292c] bg-white px-6 dark:bg-[#111113]">
      <div className="flex items-center gap-4 lg:gap-6">
        <div
          className="flex gap-4 hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          <h1 className="flex items-center gap-1.5 text-base transition-colors font-medium text-gray-950 hover:text-gray-800 dark:text-white">
            Edge Academy
          </h1>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center gap-4 lg:gap-6">{navLinks}</nav>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 ">
        <Separator orientation="vertical" className="h-6 dark:bg-[#2d2d37]" />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
