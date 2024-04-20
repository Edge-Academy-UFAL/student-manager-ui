import React from 'react'
import { Label } from '../ui/label'
import { Upload } from 'lucide-react'

const uploadProfilePic = () => {
  return (
    <div className="grid gap-3">
      <Label>Foto de Perfil*</Label>
      <div className="flex flex-col w-full space-y-3 hover:cursor-pointer">
        <div className="p-4 border-dashed border-2 border-gray-200 dark:border-zinc-700 rounded-xl flex flex-col items-center gap-2 text-gray-6 00 dark:text-gray-400">
          <Upload className="w-6 h-6 text-gray-400 dark:text-gray-100" />
        </div>
      </div>
    </div>
  )
}

export default uploadProfilePic
