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
// import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export function UserSheet() {
  // const router = useRouter()

  const { status, data } = useSession()

  // const id = data?.user?.email
  const photoUrl = data?.user.photoUrl
    ? `${process.env.awsUrl}/${process.env.awsBucket}/${data?.user.photoUrl}`
    : undefined
  console.log(photoUrl)
  const username = data?.user.name

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage
            className="rounded-xl shadow-sm object-cover"
            alt="Profile Photo"
            src={photoUrl}
          />
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu do usuário</SheetTitle>
          <SheetDescription>
            Acesse configurações e outras opções de usuário.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* Código comentado pois estas rotas não estarão disponíveis na versão atual */}

          {/* <Button
            onClick={() => router.push('/settings')}
            className="bg-transparent border text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Acessar Configurações
          </Button> */}

          {/* coloar o user_ID do usuario que esta logado ali (se for aluno), caso seja instrutor esse botao nao deve aparecer */}
          {/* <Button
            className="bg-transparent border text-foreground hover:bg-foreground hover:text-background transition-colors"
            onClick={() => router.push(`/alunos/${id}`)}
          >
            {' '}
            Acessar Perfil
          </Button> */}

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
