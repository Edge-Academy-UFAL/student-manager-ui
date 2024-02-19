import Link from 'next/link'
import { Button } from '../ui/button'
const ReturnButton = () => {
  return (
    <div className="absolute left-0 top-0 p-4">
      <Button>
        <Link href="/" className="flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </span>
          Voltar
        </Link>
      </Button>
    </div>
  )
}

export default ReturnButton
