import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Upload } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { UserSession } from '@/lib/auth'
import { getNameInitials, getUsername } from '@/lib/utils'
import { revalidateUserPage } from '@/app/actions'

const AvatarEditable = ({
  photoUrlProps,
  name,
  email,
}: {
  photoUrlProps: string
  name: string
  email: string
}) => {
  const { data } = useSession()

  const [selectedImage, setSelectedImage] = useState<File | null>()
  const [canSaveImage, setCanSaveImage] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [photoUrl, setPhotoUrl] = useState<string>(photoUrlProps)

  const changeModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  const submitHandler = async () => {
    setCanSaveImage(false)
    const formData = new FormData()
    formData.append('file', selectedImage as Blob)

    const response = await fetch(
      `${process.env.backendRoute}/api/v1/students/${data?.user?.email}/photo`,
      {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${(data as UserSession).user?.authToken}`,
        },
      },
    )

    if (!response.ok) {
      setError('Não foi possível salvar a imagem')
    } else {
      setModalIsOpen(false)
      setSelectedImage(null)
      const studentResponse = await response.json()
      setPhotoUrl(studentResponse.photoUrl)
      await revalidateUserPage(getUsername(studentResponse.email))
    }

    setCanSaveImage(true)
  }

  return (
    <Avatar className="relative group h-[155px] w-[155px]">
      <AvatarImage
        src={`${process.env.backendRoute?.slice(0, -5)}:4566/student-manager-files/${photoUrl}`}
        alt="student-profile-picture"
        className='object-cover'
      />
      <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
      {data?.user?.email === email && (
        <Dialog open={modalIsOpen} onOpenChange={changeModal}>
          <DialogTrigger
            asChild
            className="absolute inset-0 flex items-center justify-center 
                       opacity-0 group-hover:opacity-80 dark:bg-gray-800 
                       text-white w-full"
          >
            <Button className="h-full">Alterar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Alterar foto de perfil</DialogTitle>
              {error && (
                <DialogDescription className="text-red-700">
                  {error}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className=" px-0 flex items-stretch justify-normal gap-x-6">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `${process.env.backendRoute?.slice(0, -5)}:4566/student-manager-files/` +
                        photoUrl
                  }
                  alt="Selected"
                  className="rounded-xl w-[100px] h-[100px] shadow-sm object-cover"
                />
              }
              <div className="space-y-2">
                <div className="text-gray-500 text-xs">
                  Insira sua foto de perfil em formato PNG ou JPEG, com tamanho
                  máximo de 5MB.
                </div>
                <div className="flex items-center justify-normal gap-x-2">
                  <Button size="lg" type="button">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onChange={(e) => {
                        setSelectedImage(e.target.files?.[0] || null)
                        setCanSaveImage(!!e.target.files?.[0])
                      }}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                    <label
                      htmlFor="fileInput"
                      className="text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                    >
                      <Upload className="mr-2" />
                      <span className="whitespace-nowrap">Fazer Upload</span>
                    </label>
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={submitHandler}
                disabled={canSaveImage === false}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Avatar>
  )
}

export default AvatarEditable
