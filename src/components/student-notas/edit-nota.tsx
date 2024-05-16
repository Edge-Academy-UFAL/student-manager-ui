/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'

import { useAuth } from '@/contexts/auth'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Button } from '../ui/button'

import { Trash, FilePenLine } from 'lucide-react'

import { useToast } from '../ui/use-toast'
import { LoadingSpinner } from '../loading-spinner'

interface NotaProps {
  id: string
  nome: string
  code: string
  semester: number
  email: string
  media?: number
  situacao?: string
}

export const EditNota = ({
  id,
  code,
  nome,
  semester,
  email,
  media,
  situacao,
}: NotaProps) => {
  const { token } = useAuth()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const [periodo, setPeriodo] = useState(semester || '')
  const [nota, setNota] = useState(media || '')
  const [status, setStatus] = useState(situacao || '')

  const [periodoError, setPeriodoError] = useState('')
  const [notaError, setNotaError] = useState('')
  const [statusError, setStatusError] = useState('')

  const [loading, setLoading] = useState(false)

  const STATUS = ['APPROVED', 'REPROVED', 'ENROLLED']

  const validate = () => {
    let isValid = true

    // Validação do campo "Período"
    if (periodo.toString().trim() === '') {
      setPeriodoError('O período é obrigatório.')
      isValid = false
    } else if (
      isNaN(Number(periodo)) ||
      Number(periodo) < 1 ||
      Number(periodo) > 12
    ) {
      setPeriodoError('O período deve ser um número entre 1 e 12.')
      isValid = false
    } else {
      setPeriodoError('')
    }

    // Validação do campo "Média Final"
    if (nota.toString().trim() === '') {
      setNotaError('A média final é obrigatória.')
      isValid = false
    } else if (isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
      setNotaError('A média final deve ser um número entre 1 e 10.')
      isValid = false
    } else if (!/^\d+(\.\d{1,2})?$/.test(nota.toString())) {
      setNotaError('A média final deve ter no máximo duas casas decimais.')
      isValid = false
    } else {
      setNotaError('')
    }

    // Validação do campo "Situação"
    if (!STATUS.includes(status)) {
      setStatusError('A situação é obrigatória.')
      isValid = false
    }

    // Validar se houve mudanças
    if (semester === periodo && media === nota && situacao === status) {
      isValid = false
    }

    return isValid
  }

  const submitHandler = async (id: string) => {
    if (!validate()) {
      return
    }

    setLoading(true)

    const data = {
      id,
      nota,
      periodo,
      status,
      email,
    }

    setTimeout(() => {
      console.log('Nota atualizada com sucesso', data)
      setLoading(false)
      toast({
        title: 'Você enviou os seguintes valores:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }, 2000)

    console.log(data, token)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 hover:text-muted-foreground">
          <span>
            <FilePenLine size={17} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Atualizar nota e situação na disciplina</DialogTitle>
          <DialogDescription>
            Atualize sua nota e a situação na disciplina{' '}
            <span className="font-bold">
              {code} - {nome}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Label>Média Final</Label>
            <Input
              id="nota"
              className="col-span-3"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
            {notaError && (
              <span className="text-red-500 text-sm">{notaError}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label>Período</Label>
            <Input
              id="periodo"
              className="col-span-3"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            />
            {periodoError && (
              <span className="text-red-500 text-sm">{periodoError}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="username">Situação</Label>
            <Select
              onValueChange={(value) => setStatus(value)}
              defaultValue={situacao || ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Selecione a situação"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="APPROVED">Aprovado ✅</SelectItem>
                  <SelectItem value="REPROVED">Reprovado ❌</SelectItem>
                  <SelectItem value="ENROLLED">Cursando 📚</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {statusError && (
              <span className="text-red-500 text-sm">{statusError}</span>
            )}
          </div>
        </div>
        <DialogFooter>
          {!loading && (
            <Button
              type="button"
              className="w-[80px]"
              onClick={() => submitHandler(id)}
            >
              Salvar
            </Button>
          )}
          {loading && (
            <Button type="button" disabled className="w-[80px]">
              <span>
                <LoadingSpinner size={20} className="animate-spin" />
              </span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const RemoveNota = ({ id, code, nome, semester, email }: NotaProps) => {
  const { token } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const submitHandler = async () => {
    setLoading(true)

    const data = {
      subjectCode: code,
      period: semester,
      studentEmail: email,
    }

    console.log(data)

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/v1/grades`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Erro ao remover nota')
      }

      setLoading(false)
      setOpen(false)

      toast({
        title: `Nota da disciplina ${nome}-${code} foi removida.`,
      })
    } catch (error) {
      toast({
        title: 'Erro ao remover disciplina',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0 hover:text-red-500">
          <span>
            <Trash size={17} />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover essa nota?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja remover a disciplina{' '}
            <span className="font-bold underline">
              {code} - {nome}
            </span>{' '}
            do seu histórico de notas?
            <p className="mt-2">
              A disciplina será excluída e poderá ser adicionada novamente em
              outro momento.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {!loading && <Button onClick={submitHandler}>Remover</Button>}
          {loading && (
            <Button>
              <span>
                <LoadingSpinner size={20} className="animate-spin" />
              </span>
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
