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
        data-current={pathname === props.to}
        className="flex items-center gap-1.5 text-sm font-medium"
      >
        {props.children}
      </h1>
    </Link>
  )
}
