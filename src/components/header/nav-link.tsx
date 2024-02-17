import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link href={props.to}>
      <h1
        data-current={pathname === props.to} // add data-current attribute to the NavLink component to indicate the current route
        className="flex items-center gap-1.5 text-[0.9rem] font-medium text-gray-500 hover:text-gray-900 
        dark:text-white dark:hover:text-gray-300 transition-colors duration-200 ease-in-out cursor-pointer"
      >
        {props.children}
      </h1>
    </Link>
  )
}
