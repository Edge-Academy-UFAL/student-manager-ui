/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveRight, MoveLeft } from 'lucide-react'

const ReturnButton = ({
  className,
  onClick,
  side,
  label,
}: {
  className?: string
  label?: any
  onClick?: () => void
  side?: 'left' | 'right'
}) => {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        className="bg-slate-800 no-underline group cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full text-background bg-zinc-950 dark:bg-white py-0.5 px-4 ring-1 ring-white/10 ">
          {side === 'left' && <MoveLeft className="w-4 h-4 text-bg" />}

          <span className="hidden md:block">{label}</span>
          {side === 'right' && <MoveRight className="w-4 h-4 text-bg" />}
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
    </div>
  )
}

export default ReturnButton
