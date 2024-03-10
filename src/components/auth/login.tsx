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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import ReturnButton from './return-button'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido')
    .min(5, 'E-mail inválido')
    .max(255, 'E-mail inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(255, 'A senha deve ter no máximo 255 caracteres'),
})

type LoginSchema = z.infer<typeof LoginSchema>

export default function LoginAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const { toast } = useToast()
  const { push } = useRouter()

  const submitHandler = (data: LoginSchema) => {
    console.log(data)
    toast({
      title: 'Você enviou os seguintes valores:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    // wait for 2 seconds
    setTimeout(() => {
      console.log('Redirecting...')
    }, 2000)

    push('/alunos/1232/profile')
  }
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <ReturnButton />
      <form
        className="w-full m-auto lg:max-w-lg"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar fazer login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@edge.ufal.br"
                {...register('email')}
              />

              <p className="text-red-500 text-xs">{errors?.email?.message}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              <p className="text-red-500 text-xs">
                {errors?.password?.message}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar de mim
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Login
            </Button>

            {/* A ideia é quando o aluno clicar, ele vai ser redirecionado a uma página para requisitar um link de cadastro para seu e-mail */}
            <p className="mt-5 text-xs text-center">
              Não possui uma conta?{' '}
              <Link href="/register" className=" font-bold hover:underline">
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
