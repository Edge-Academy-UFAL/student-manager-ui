'use client' // Error components must be Client Components

import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section>
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-foreground">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {error.message}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Um erro inesperado ocorreu. Por favor, tente novamente.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={reset}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-transparent text-foreground border rounded-lg gap-x-2 sm:w-auto "
            >
              <RefreshCw size={16} />

              <span>Tentar Novamente</span>
            </button>

            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-sm tracking-widetransition-colors duration-200 bg-foreground text-background rounded-lg shrink-0 sm:w-auto "
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
