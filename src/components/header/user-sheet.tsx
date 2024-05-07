'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export function UserSheet() {
  const router = useRouter()

  const { status, data } = useSession()

  const id = data?.user?.email
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage alt="Dirceu" src="/themaster.jpeg" />
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Informações</SheetTitle>
          <SheetDescription>
            Acesse suas configurações e perfil.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => router.push('/settings')}
            className="bg-transparent border text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Acessar Configurações
          </Button>

          {/* coloar o user_ID do usuario que esta logado ali (se for aluno), caso seja instrutor esse botao nao deve aparecer */}
          <Button
            className="bg-transparent border text-foreground hover:bg-foreground hover:text-background transition-colors"
            onClick={() => router.push(`/alunos/${id}`)}
          >
            {' '}
            Acessar Perfil
          </Button>

          {status === 'authenticated' && (
            <Button
              className="bg-transparent border text-foreground hover:bg-foreground hover:text-background transition-colors"
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/login' })
              }}
            >
              Sair
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
