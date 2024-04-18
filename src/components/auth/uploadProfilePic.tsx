import React from 'react'
import { Upload } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

const uploadProfilePic = () => {
  return (
    <Avatar className="h-[155px] w-[155px] mx-auto border-dashed border-2 border-gray-200 dark:border-zinc-700  flex flex-col items-center gap-2 text-gray-6 00 dark:text-gray-400 rounded-full hover:cursor-pointer">
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback>
        <Upload className="w-8 h-8" />
      </AvatarFallback>
    </Avatar>
  )
}
export default uploadProfilePic
