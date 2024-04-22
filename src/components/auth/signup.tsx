'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import SignUpForm from './signup-form'

export default function SignUp({ id }: { id: string }) {
  return (
    <div className="flex flex-col justify-center items-center md:py-10">
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
          <SignUpForm id={id} />
        </CardContent>
      </Card>
    </div>
  )
}
