'use client'
import { Cat, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../theme-toggle'
import { Separator } from '../ui/separator'
import { NavLink } from './nav-link'
import { UserSheet } from './user-sheet'

// sample routes
export const routes = [
  {
    name: 'Alunos',
    path: '/alunos',
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: 'Route 2',
    path: '/rota2',
    icon: <Cat className="h-4 w-4" />,
  },
  {
    name: 'Route 3',
    path: '/rota3',
    icon: <Cat className="h-4 w-4" />,
  },
  {
    name: 'Route 4',
    path: '/rota4',
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
    <header className="flex h-16 items-center justify-between border-b px-6 bg-background">
      <div className="flex items-center gap-4 lg:gap-6">
        <div
          className="flex gap-4 hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          <h1 className="flex items-center gap-1.5 text-base transition-colors font-medium bg-gradient-to-r p-[0.35rem] rounded-lg  from-[#5dead3] to-[#92d625] text-white shadow-sm">
            Edge Academy
          </h1>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center gap-4 lg:gap-6">{navLinks}</nav>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 ">
        <ModeToggle />
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
