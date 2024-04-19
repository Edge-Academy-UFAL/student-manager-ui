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

export default function ImageUpload({ onChange, value, ...props }) {
  const { setImageUrl, setImageFile } = useImage()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
        setImageFile(file) // Store the file
      }
      reader.readAsDataURL(file)
      onChange(acceptedFiles[0])
    },
    [setImageUrl, setImageFile, onChange],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize: 15 * 1024 * 1024, // 15MB max size
      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
      },
    })

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size / 1024 / 1024} MB
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload size={15} className="mr-2" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg">
            Insert a profile picture:
          </DialogTitle>
          <div
            {...getRootProps()}
            className={`cursor-pointer border-2 border-dotted p-2 rounded-lg ${isDragActive ? 'bg-blue-100' : ''}`}
          >
            <input {...getInputProps()} type="file" />
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <UploadCloud size={37} />
              <p className="mt-2 text-sm hover:underline">
                Click or drag an image here
              </p>
              {fileRejectionItems.length > 0 && (
                <div className="text-red-500">
                  <ul>{fileRejectionItems}</ul>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
