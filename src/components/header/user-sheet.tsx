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

export function UserSheet() {
  const router = useRouter()

  const id = 'user_ID'
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage
            src="https://media.discordapp.net/attachments/714891795129171983/1208605498815938590/8_orgid_55e84459-0f48-4ee1-9a01-9aa6365d593c.jpg?ex=65e3e495&is=65d16f95&hm=052aed2c6bb8f73bc582eabe248809ba492cc0e8490186a057031e65d40349c0&=&format=webp"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
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
          <Button onClick={() => router.push('/settings')}>
            Acessar Configurações
          </Button>

          {/* coloar o user_ID do usuario que esta logado ali (se for aluno), caso seja instrutor esse botao nao deve aparecer */}
          <Button onClick={() => router.push(`/alunos/${id}`)}>
            {' '}
            Acessar Perfil
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
