import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="">
      <div className="flex flex-col gap-5 min-h-screen items-center justify-center">
        <div>
          <h1 className="text-8xl font-bold text-center">404</h1>
          <p className="text-4xl font-medium text-center">Page Not Found</p>
        </div>

        <Link
          href="/"
          className="w-1/2 px-6 py-4 tracking-wide transition-colors duration-200 bg-foreground text-background rounded-lg shrink-0 sm:w-auto"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
