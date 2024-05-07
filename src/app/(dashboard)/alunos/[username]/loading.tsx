import { LoadingSpinner } from '@/components/loading-spinner'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size={70}></LoadingSpinner>
    </div>
  )
}

export default Loading
