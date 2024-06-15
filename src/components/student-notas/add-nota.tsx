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

import { Check, ChevronsUpDown, Plus } from 'lucide-react'

import { cn, handleLimitRange } from '@/lib/utils'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Label } from '../ui/label'

import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'
import { LoadingSpinner } from '../loading-spinner'
import { useState } from 'react'
import { Separator } from '../ui/separator'
import { addGrade } from '@/lib/functions/http/add-nota-req'
import { ScrollArea } from '../ui/scroll-area'

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

  const [open, setOpen] = useState(false)
  const [openDisciplnas, setOpenDisciplnas] = useState(false)

  const [disciplinas, setDisciplinas] = useState<Subject[]>(subjects || [])

  const [periodo, setPeriodo] = useState('')
  const [nota, setNota] = useState('')
  const [status, setStatus] = useState('')
  const [disciplina, setDisciplina] = useState<Subject>({} as Subject)

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
      setNota('')
    } else if (isNaN(Number(nota)) || Number(nota) < 0 || Number(nota) > 10) {
      setNotaError('A média final deve ser um número entre 1 e 10.')
      isValid = false
      console.log('2')
    } else if (!/^\d+(\.\d{1,2})?$/.test(nota.toString())) {
      setNotaError('A média final deve ter no máximo duas casas decimais.')
      isValid = false
      console.log('3')
    } else {
      setNotaError('')
      console.log('4')
    }

    // Validação do campo "Status"
    if (!STATUS.includes(status)) {
      setSituacaoError('A situação é obrigatória.')
      isValid = false
    } else {
      setSituacaoError('')
    }

    // Validação do campo "Disciplina"
    if (!disciplina.code) {
      setDisciplinaError('A disciplina é obrigatória.')
      isValid = false
    } else {
      setDisciplinaError('')
    }

    // Validação do campo "Média Final", permitir campo nulo quando a situação for "Cursando" (USAR NA PROXIMA SPRINT)
    if (status === 'ENROLLED') {
      setNotaError('')
    } else {
      if (nota.trim() === '') {
        setNotaError('A média final é obrigatória.')
        isValid = false
      } else if (isNaN(Number(nota)) || Number(nota) < 0 || Number(nota) > 10) {
        setNotaError('A média final deve ser um número entre 0 e 10.')
        isValid = false
      } else if (!/^\d+(\.\d{1,2})?$/.test(nota)) {
        setNotaError('A média final deve ter no máximo duas casas decimais.')
        isValid = false
      } else {
        setNotaError('')
      }
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validate()) {
      return
    }

    const data = {
      subjectCode: disciplina.code,
      studentEmail: email,
      period: periodo,
      finalGrade: nota,
      subjectStatus: status,
    }

    setLoading(true)
    const res = await addGrade(data)

    if (res) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setNota('')
      setPeriodo('')
      setDisciplina({} as Subject)
      setOpen(false)
      toast({
        title: 'Disciplina adicionada com sucesso',
      })
    } else {
      toast({
        title: 'Erro ao adicionar nota',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }

    setLoading(false)
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Adicionar Disciplina</DialogTitle>
            <DialogDescription>
              Escolha abaixo a disciplina que você deseja adicionar e o perído
              em que cursou ou está cursando a matéria. Caso já tenha cursado,
              insira também a sua média final. Caso ainda esteja cursando, deixe
              o campo da nota em branco.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Label>Disciplinas</Label>
              <Popover
                modal={true}
                open={openDisciplnas}
                onOpenChange={setOpenDisciplnas}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                  >
                    {disciplina.name || 'Selecione a disciplina'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[475px]">
                  <ScrollArea className="h-72">
                    <Command>
                      <CommandInput placeholder="Busque por uma disciplina" />
                      <CommandEmpty>
                        Nenhuma disciplina encontrada.
                      </CommandEmpty>
                      <CommandGroup className="">
                        {disciplinas.map((disciplina) => (
                          // eslint-disable-next-line react/jsx-key
                          <CommandItem
                            className="hover:cursor-pointer"
                            key={disciplina.code}
                            value={disciplina.code + ' - ' + disciplina.name}
                            onSelect={(currentValue) => {
                              setDisciplina(disciplina)
                              setOpenDisciplnas(false)
                            }}
                          >
                            {disciplina.code + ' - ' + disciplina.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              {disciplinaError && (
                <span className="text-red-500 text-sm">{disciplinaError}</span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Média Final</Label>
              <Input
                id="nota"
                className="col-span-3"
                type="number"
                value={nota.toString()}
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
                onClick={() => {
                  setDisciplina({} as Subject)
                  setNota('')
                  setPeriodo('')
                  setNotaError('')
                  setPeriodoError('')
                  setDisciplinaError('')
                  setSituacaoError('')
                }}
                className="bg-background border text-foreground hover:cursor-pointer hover:bg-background hover:text-muted-foreground"
              >
                Cancelar
              </Button>
            </DialogClose>
            {!loading && (
              <Button type="button" className="w-[80px]" onClick={handleSubmit}>
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
