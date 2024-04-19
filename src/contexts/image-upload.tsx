'use client'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

interface ImageContextType {
  imageUrl: string | null
  imageFile: File | null
  setImageUrl: Dispatch<SetStateAction<string | null>>
  setImageFile: Dispatch<SetStateAction<File | null>>
}

const ImageContext = createContext<ImageContextType>({
  imageUrl: null,
  imageFile: null,
  setImageUrl: () => null,
  setImageFile: () => null,
})

export const useImage = () => useContext(ImageContext)

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

  return (
    <ImageContext.Provider
      value={{ imageUrl, setImageUrl, imageFile, setImageFile }}
    >
      {children}
    </ImageContext.Provider>
  )
}
