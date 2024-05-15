/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Label } from '../ui/label'

import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'
import { LoadingSpinner } from '../loading-spinner'
import { useState } from 'react'
import { Separator } from '../ui/separator'
import { useAuth } from '@/contexts/auth'

interface Subject {
  code: string
  name: string
  workload: number
}

interface AddNotaProps {
  subjects: Subject[]
  email: string
}

const STATUS = ['APPROVED', 'REPROVED', 'ENROLLED']

export function AddNota({ subjects, email }: AddNotaProps) {
  const { toast } = useToast()

  const { token } = useAuth()

  const [open, setOpen] = useState(false)

  const [disciplinas, setDisciplinas] = useState<Subject[]>(subjects || [])

  const [periodo, setPeriodo] = useState('')
  const [nota, setNota] = useState('')
  const [status, setStatus] = useState('')
  const [disciplina, setDisciplina] = useState('')

  const [periodoError, setPeriodoError] = useState('')
  const [notaError, setNotaError] = useState('')
  const [situacaoError, setSituacaoError] = useState('')
  const [disciplinaError, setDisciplinaError] = useState('')

  const [loading, setLoading] = useState(false)

  const validate = () => {
    let isValid = true

    // Validação do campo "Período"
    if (periodo.trim() === '') {
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
    if (nota.trim() === '') {
      setNotaError('A média final é obrigatória.')
      isValid = false
    } else if (isNaN(Number(nota)) || Number(nota) < 0 || Number(nota) > 10) {
      setNotaError('A média final deve ser um número entre 1 e 10.')
      isValid = false
    } else if (!/^\d+(\.\d{1,2})?$/.test(nota)) {
      setNotaError('A média final deve ter no máximo duas casas decimais.')
      isValid = false
    } else {
      setNotaError('')
    }

    // Validação do campo "Status"
    if (!STATUS.includes(status)) {
      setSituacaoError('A situação é obrigatória.')
      isValid = false
    } else {
      setSituacaoError('')
    }

    // Validação do campo "Disciplina"
    if (
      !disciplinas.map((disciplina) => disciplina.code).includes(disciplina)
    ) {
      setDisciplinaError('A disciplina é obrigatória.')
      isValid = false
    } else {
      setDisciplinaError('')
    }

    return isValid
  }

  const submitHandler = async () => {
    if (!validate()) {
      return
    }

    setLoading(true)

    const data = {
      subjectCode: disciplina,
      studentEmail: email,
      period: periodo,
      finalGrade: nota,
      subjectStatus: status,
    }

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/v1/grades`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Erro ao adicionar nota')
      }

      setLoading(false)
      setNota('')
      setPeriodo('')
      setOpen(false)

      toast({
        title: 'Disciplina adicionada com sucesso!',
      })

      return res.json()
    } catch (error) {
      toast({
        title: 'Erro ao adicionar nota',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-3 text-end self-end">Adicionar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Adicionar Disciplina</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Label>Disciplinas</Label>
              <Select onValueChange={(value) => setDisciplina(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Selecione a disciplina"
                    className="w-full"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {disciplinas.map((disciplina) => (
                      <div key={disciplina.code}>
                        <SelectItem
                          value={disciplina.code}
                          className="hover:cursor-pointer"
                        >
                          {disciplina.name}
                        </SelectItem>
                        <Separator />
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {disciplinaError && (
                <span className="text-red-500 text-sm">{disciplinaError}</span>
              )}
            </div>
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
              <Select onValueChange={(value) => setStatus(value)}>
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
              {situacaoError && (
                <span className="text-red-500 text-sm">{situacaoError}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-background border text-foreground hover:cursor-pointer hover:bg-background hover:text-muted-foreground"
              >
                Cancelar
              </Button>
            </DialogClose>
            {!loading && (
              <Button
                type="button"
                className="w-[80px]"
                onClick={submitHandler}
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
    </div>
  )
}
