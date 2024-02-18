import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-gray-100">
      <div className="flex h-[calc(100vh-70px)] flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
        <Link href="/chat" className="mt-4 text-xl hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  )
}
