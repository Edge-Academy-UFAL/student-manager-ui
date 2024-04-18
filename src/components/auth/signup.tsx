'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import ReturnButton from './return-button'

import { useRouter } from 'next/navigation'
import SignUpForm from './signup-form'

export default function SignUp() {
  const { push } = useRouter()

  return (
    <div className="flex flex-col justify-center items-center md:py-10">
      <ReturnButton
        className="absolute left-0 top-0 p-4"
        label="Voltar"
        onClick={() => {
          push('/')
        }}
      />

      <Card className="md:rounded-xl rounded-none relative">
        <CardHeader className="space-y-1">
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
    </div>
  )
}
