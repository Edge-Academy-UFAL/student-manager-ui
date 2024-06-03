'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useToast } from './ui/use-toast'
import { useSession } from 'next-auth/react'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'

export function DeleteStudent(props: { name: string; email: string }) {
  const [confirmName, setConfirmName] = useState('')
  const [open, setOpen] = useState(false)
  const { data } = useSession()
  const { toast } = useToast()

  const token = data?.user.authToken

  async function handleDelete() {
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/students/` + props.email,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (res.ok) {
      toast({
        title: 'Aluno removido com sucesso',
        description: 'O aluno foi removido com sucesso',
      })
      setOpen(false)
    } else {
      toast({
        variant: 'destructive',
        title: 'Não foi possível remover o aluno',
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full h-full" asChild>
        <div>Desligar Aluno</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja remover o aluno {props.name}?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja desligar o aluno {props.name}? Se você tem
            certeza digite o <span className="underline">primeiro</span> nome do
            aluno no campo abaixo.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder={props.name.split(' ')[0]}
          type="text"
          className="outline-none focus-visible:outline-none"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
        />
        <DialogFooter>
          <DialogClose>
            <Button className="bg-background text-foreground hover:bg-muted border">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleDelete()}
            disabled={confirmName !== props.name.split(' ')[0]}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
