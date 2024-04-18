'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import ReturnButton from './return-button'
import UploadProfilePic from './uploadProfilePic'

import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SignUpForm from './signup-form'

export default function SignUp() {
  const [showUploadProfilePic, setShowUploadProfilePic] = useState(false)

  const { push } = useRouter()

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <ReturnButton
        className="absolute left-0 top-0 p-4"
        label="Voltar"
        onClick={() => {
          push('/')
        }}
      />
      {!showUploadProfilePic && (
        <Card className="md:rounded-xl rounded-none relative">
          <CardHeader className="space-y-1">
            <ReturnButton
              onClick={() => {
                setShowUploadProfilePic(true)
              }}
              label={<Camera size={18} />}
              className="absolute right-0 top-0 p-4"
            />
            <CardTitle className="text-xl text-center">
              Cadastro de Aluno
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os campos abaixo para completar seu cadastro
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <SignUpForm />
          </CardContent>
        </Card>
      )}

      {showUploadProfilePic && (
        <Card className="md:rounded-xl rounded-none relative max-w-xl mx-auto">
          <CardHeader className="relative">
            <ReturnButton
              onClick={() => {
                setShowUploadProfilePic(false)
              }}
              label="Voltar"
              side="left"
            />
            <div className="pb-2 text-center">
              <CardTitle className="text-xl mb-2">Foto de Perfil</CardTitle>
              <CardDescription>
                Faça o upload de uma foto para seu perfil
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <UploadProfilePic />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Enviar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
