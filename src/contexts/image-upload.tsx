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
  setImageUrl: Dispatch<SetStateAction<string | null>>
}

const ImageContext = createContext<ImageContextType>({
  imageUrl: null,
  setImageUrl: () => null,
})

export const useImage = () => useContext(ImageContext)

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageContext.Provider>
  )
}
