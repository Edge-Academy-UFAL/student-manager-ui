import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useAuth } from '@/app/contexts/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const loginFormSchema = z.object({
  email: z.string().email('Adicione um email válido'),
  password: z.string().max(20, 'A senha deve ter no máximo 20 caracteres'),
})

type LoginFormValue = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
  })

  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  })

  async function onSubmit(data: LoginFormValue) {
    const res = await login(data.email, data.password)

    if (res === 200) {
      toast({
        title: 'Login feito com sucesso',
        description: 'Seja bem vindo!',
      })

      router.push('/')
    }

    if (res >= 400 && res < 500) {
      form.setError('email', { message: '' })
      form.setError('password', { message: '' })
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Email ou senha inválidos',
      })
    }

    if (res >= 500) {
      toast({
        title: 'Não foi possível fazer login',
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
