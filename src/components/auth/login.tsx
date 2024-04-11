'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import ReturnButton from './return-button'
import { LoginForm } from '@/app/(auth)/login/login-form'

export default function LoginAccount() {
  const { toast } = useToast()

  function handleForgotPassword() {
    toast({
      title: 'Processo para alteração de senha:',
      description: <span> Contate os administradores!</span>,
    })
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <ReturnButton />
      <div className="w-full m-auto lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              variant="link"
              onClick={handleForgotPassword}
              className="text-xs text-center"
            >
              Esqueceu sua senha?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
