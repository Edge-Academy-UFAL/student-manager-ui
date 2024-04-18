/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Upload, UploadCloud } from 'lucide-react'
import { Button } from '../ui/button'
import { useImage } from '@/contexts/image-upload'

export default function ImageUpload() {
  const { setImageUrl } = useImage()

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [setImageUrl],
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload size={15} className="mr-2" /> Fazer Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg">
            Insira uma foto de perfil:
          </DialogTitle>
          <div
            {...getRootProps()}
            className="cursor-pointer border-2 border-dotted p-2 rounded-lg"
          >
            <input {...getInputProps()} />

            <div>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <UploadCloud size={37} />
                <p className="mt-2 text-sm hover:underline">
                  Drag your files here or click in this area.
                </p>
                <p className="mt-2 text-xs">
                  Max file size: 10MB, Accepted: jpg, png
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
