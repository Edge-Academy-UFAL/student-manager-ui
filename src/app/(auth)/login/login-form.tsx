import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

import { signIn, useSession } from 'next-auth/react'

import { LoginFormSchema } from '@/lib/schemas'

export function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  })
  const { status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (status !== 'loading' && status === 'authenticated') {
      router.push('/')
    }
  })

  async function onSubmit(data: LoginFormSchema, e?: Event) {
    e?.preventDefault()
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (!res) {
      toast({
        title: 'Não foi possível fazer login',
        description: 'Tente novamente mais tarde',
      })

      return
    }

    if (res.status === 200) {
      toast({
        title: 'Login feito com sucesso',
        description: 'Seja bem vindo!',
      })

      router.push('/')
    }

    if (res.status >= 400 && res.status < 500) {
      form.setError('email', { message: '' })
      form.setError('password', { message: '' })
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Email ou senha inválidos',
      })
    }

    if (res.status >= 500) {
      toast({
        title: 'Não foi possível fazer login',
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data, e: unknown) =>
          onSubmit(data, e as Event),
        )}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}
