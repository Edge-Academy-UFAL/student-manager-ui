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
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth'

interface Disciplina {
  id: number
  name: string
  value: string
}

const STATUS = ['APROVADO', 'REPROVADO', 'CURSANDO']

const disciplinasMock = [
  {
    id: 1,
    name: 'Estrutura de Dados e Algoritmos',
    value: 'EDA',
  },
  {
    id: 2,
    name: 'Programação Web',
    value: 'PW',
  },
  {
    id: 3,
    name: 'Banco de Dados',
    value: 'BD',
  },
  {
    id: 4,
    name: 'Engenharia de Software',
    value: 'ES',
  },
  {
    id: 5,
    name: 'Programação Orientada a Objetos',
    value: 'POO',
  },
  {
    id: 6,
    name: 'Programação Funcional',
    value: 'PF',
  },
  {
    id: 7,
    name: 'Programação 2',
    value: 'P2',
  },
  {
    id: 8,
    name: 'Programação 3',
    value: 'P3',
  },
  {
    id: 9,
    name: 'Inteligência Artificial',
    value: 'IA',
  },
  {
    id: 10,
    name: 'Aprendizado de Máquina',
    value: 'AM',
  },
  {
    id: 11,
    name: 'Redes de Computadores',
    value: 'RC',
  },
]

export function AddNota() {
  const { token } = useAuth()

  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])

  const [periodo, setPeriodo] = useState('')
  const [nota, setNota] = useState('')
  const [status, setStatus] = useState('')
  const [disciplina, setDisciplina] = useState('')

  const [periodoError, setPeriodoError] = useState('')
  const [notaError, setNotaError] = useState('')
  const [situacaoError, setSituacaoError] = useState('')
  const [disciplinaError, setDisciplinaError] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // get disciplinas from API
    setDisciplinas(disciplinasMock)
  }, [])

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
    } else if (isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
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
    console.log(disciplinas)
    if (
      !disciplinas.map((disciplina) => disciplina.value).includes(disciplina)
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
      disciplina,
      nota,
      periodo,
      status,
    }

    setTimeout(() => {
      console.log('Nota adicionada com sucesso', data)
      setLoading(false)
      toast({
        title: 'Você enviou os seguintes valores:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })

      setNota('')
      setPeriodo('')
    }, 1500)

    console.log(data)
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-0 hover:text-muted-foreground">
            <Button className="mb-3 text-end self-end">Adicionar</Button>
          </Button>
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
                      <div key={disciplina.id}>
                        <SelectItem
                          value={disciplina.value}
                          className="hover:cursor-pointer"
                        >
                          {disciplina.name}
                        </SelectItem>
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
                    <SelectItem value="APROVADO">Aprovado ✅</SelectItem>
                    <SelectItem value="REPROVADO">Reprovado ❌</SelectItem>
                    <SelectItem value="CURSANDO">Cursando 📚</SelectItem>
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
