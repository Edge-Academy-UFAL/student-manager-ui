import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="">
      <div className="flex h-[calc(100vh-70px)] flex-col items-center justify-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-4xl font-medium">Page Not Found</p>
        <Link
          href="/"
          className="mt-4 text-xl p-3  text-white rounded-lg bg-gradient-to-tr from-[#00cdac] to-[#8ac926] shadow"
        >
          Ir para o inicio
        </Link>
      </div>
    </div>
  )
}
