'use client'
import { Separator } from '../ui/separator'
import { Cat } from 'lucide-react'
import { NavLink } from './nav-link'
import { ModeToggle } from '../theme-toggle'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Header = () => {
  const router = useRouter()
  return (
    <header className="flex h-16 items-center justify-between border-b dark:border-[#29292c] bg-white px-6 dark:bg-[#18181A]">
      <div className="flex items-center gap-4 lg:gap-6">
        <div
          className="flex gap-4 hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image
            src="https://media.discordapp.net/attachments/1025173249543393330/1207042757361664090/edge_logo.png?ex=65de352b&is=65cbc02b&hm=0fddaf3499fbcb9e2b1a204933f199ee065ea94b7fdd5bef3025fcb4b58f41a0&=&format=webp&quality=lossless&width=1056&height=1056"
            alt="logo"
            width={40}
            height={10}
          />
          {/* <h1 className="flex items-center gap-1.5 text-base transition-colors font-medium text-gray-950 hover:text-gray-800 dark:text-white">
            Edge Academy
          </h1> */}
        </div>

        <Separator orientation="vertical" className="h-6" />

        <NavLink to="/">
          <Cat className="mt-[0.2rem] h-4 w-4" />
          <span className="hidden md:block">Route 1</span>
        </NavLink>

        <NavLink to="/">
          <Cat className="h-4 w-4" />
          <span className="hidden md:block">Route 2</span>
        </NavLink>

        <NavLink to="/">
          <Cat className="h-4 w-4" />
          <span className="hidden md:block">Route 2</span>
        </NavLink>

        <NavLink to="/">
          <Cat className="h-4 w-4" />
          <span className="hidden md:block">Route 3</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 ">
        <Separator orientation="vertical" className="h-6 dark:bg-[#2d2d37]" />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
