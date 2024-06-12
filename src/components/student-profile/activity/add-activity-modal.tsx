/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { useToast } from '@/components/ui/use-toast'

import { Switch } from '../../ui/switch'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { CalendarIcon, Plus } from 'lucide-react'

import { addActivity } from '@/lib/functions/http/add-activity-req'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarWithDropdowns } from '@/components/ui/calendar-with-dropdowns'
import { ptBR } from 'date-fns/locale'
import { cn, formatDateToReadableBRFormat } from '@/lib/utils'

const ACTIVITY_TYPES = [
  { code: 'RESEARCH', name: 'Pesquisa' },
  { code: 'TUTORING', name: 'Monitoria' },
  { code: 'INTERNSHIP', name: 'Estágio' },
  { code: 'OTHERS', name: 'Outro' },
]

const AddActivityModal = () => {
  const { toast } = useToast()

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [workShift, setWorkShift] = React.useState('')
  const [type, setType] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState<string | null>(null)

  const [inProgress, setInProgress] = React.useState(false)
  const [statusPaid, setStatusPaid] = React.useState(false)

  const [nameError, setNameError] = React.useState('')
  const [descriptionError, setDescriptionError] = React.useState('')
  const [workShiftError, setWorkShiftError] = React.useState('')
  const [typeError, setTypeError] = React.useState('')
  const [startDateError, setStartDateError] = React.useState('')
  const [endDateError, setEndDateError] = React.useState('')

  const resetFields = () => {
    setName('')
    setDescription('')
    setWorkShift('')
    setType('')
    setStartDate('')
    setEndDate('')
    setInProgress(false)
    setStatusPaid(false)
  }

  const validate = () => {
    let isValid = true

    // Validação do nome
    if (name.trim() === '') {
      setNameError('Campo obrigatório')
      isValid = false
    } else {
      setNameError('')
    }

    // Validação da descrição
    if (description.trim() === '') {
      setDescriptionError('Campo obrigatório')
      isValid = false
    } else {
      setDescriptionError('')
    }

    // Validação da dedicação semanal
    if (workShift.trim() === '') {
      setWorkShiftError('Campo obrigatório')
      isValid = false
    } else {
      setWorkShiftError('')
    }

    // Validação do tipo
    if (!ACTIVITY_TYPES.map((activity) => activity.code).includes(type)) {
      setTypeError('Campo obrigatório')
      isValid = false
    } else {
      setTypeError('')
    }

    // Validação da data de início
    if (startDate.trim() === '') {
      setStartDateError('Campo obrigatório')
      isValid = false
    } else {
      setStartDateError('')
    }

    // Validação da data de término
    if (!inProgress && endDate === null) {
      setEndDateError('Campo obrigatório')
      isValid = false
    } else {
      setEndDateError('')
    }
    return isValid
  }
  const handleSubmit = async () => {
    if (!validate()) {
      return
    }

    const data = {
      name,
      description,
      workShift: Number(workShift),
      activityType: type,
      startDate: startDate.slice(0, 10),
      conclusionDate: endDate ? endDate.slice(0, 10) : null,
      onGoing: inProgress,
      isPaid: statusPaid,
    }

    setLoading(true)

    const res = await addActivity(data)

    if (res) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // setar todos os estados para o valor inicial
      setOpen(false)
      resetFields()
      toast({
        title: 'Atividade adicionada com sucesso!',
      })
    } else {
      toast({
        title: 'Erro ao adicionar atividade',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }

    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>
          <Plus className="h-6 w-6 cursor-pointer" />
        </span>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div
          key="1"
          className="bg-background border p-6 rounded-lg shadow max-w-lg mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">
            Adicionar uma atividade extra
          </h3>
          <p className="text-sm text-foreground mb-6">
            Adicione aqui uma atividade extra que você realizou ou está
            realizando. Atividades extras podem incluir Pesquisa, Monitoria,
            Estágio, Extensão ou outras atividades similares.
          </p>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="activity-type"
              >
                Tipo da atividade*
              </label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger id="activity-type">
                  <SelectValue placeholder="Selecione a atividade" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {ACTIVITY_TYPES.map((activity) => (
                      <div
                        key={activity.code}
                        className="w-[--radix-select-trigger-width]"
                      >
                        <SelectItem
                          value={activity.code}
                          className="hover:cursor-pointer"
                        >
                          {activity.name}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {typeError && (
                <span className="text-red-500 text-sm">{typeError}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="activity-name"
              >
                Nome da atividade*
              </label>
              <Input
                id="activity-name"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <span className="text-red-500 text-sm">{nameError}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="description"
              >
                Descrição*
              </label>
              <Textarea
                id="description"
                placeholder="Escreva uma descrição detalhada da atividade."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && (
                <span className="text-red-500 text-sm">{descriptionError}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="weekly-dedication"
              >
                Dedicação semanal (h)*
              </label>
              <Input
                id="weekly-dedication"
                placeholder="20"
                type="number"
                value={workShift}
                onChange={(e) => setWorkShift(e.target.value)}
              />
              {workShiftError && (
                <span className="text-red-500 text-sm">{workShiftError}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="start-date"
                >
                  Data de início*
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal w-full',
                        !startDate && 'text-muted-foreground',
                      )}
                    >
                      {startDate ? (
                        formatDateToReadableBRFormat(new Date(startDate))
                      ) : (
                        <span>Selecione um data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWithDropdowns
                      locale={ptBR}
                      defaultMonth={
                        startDate ? new Date(startDate) : new Date()
                      }
                      mode="single"
                      selected={new Date(startDate || '')}
                      onSelect={(e) => setStartDate(e?.toISOString() || '')}
                      disabled={(date) =>
                        date > new Date() || date < new Date('2000-01-01')
                      }
                      captionLayout="dropdown-buttons"
                      fromYear={2000}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                {startDateError && (
                  <span className="text-red-500 text-sm">{startDateError}</span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="end-date"
                >
                  Data de conclusão
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal w-full',
                        !endDate && 'text-muted-foreground',
                      )}
                      disabled={inProgress}
                    >
                      {endDate ? (
                        formatDateToReadableBRFormat(new Date(endDate))
                      ) : (
                        <span>Selecione um data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWithDropdowns
                      locale={ptBR}
                      defaultMonth={endDate ? new Date(endDate) : new Date()}
                      mode="single"
                      selected={new Date(endDate || '')}
                      onSelect={(e) => setEndDate(e?.toISOString() || '')}
                      disabled={(date) =>
                        date > new Date() || date < new Date('2000-01-01')
                      }
                      captionLayout="dropdown-buttons"
                      fromYear={2000}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                {endDateError && (
                  <span className="text-red-500 text-sm">{endDateError}</span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Switch
                  id="status-in-progress"
                  checked={inProgress}
                  onCheckedChange={(checked) => {
                    setInProgress(checked)
                    setEndDate(null)
                  }}
                />
                <Label className="ml-2 text-sm" htmlFor="status-in-progress">
                  Em andamento
                </Label>
              </div>
              <div className="flex items-center">
                <Switch
                  id="status-paid"
                  checked={statusPaid}
                  onCheckedChange={(checked) => {
                    setStatusPaid(checked)
                  }}
                />
                <Label className="ml-2 text-sm" htmlFor="status-paid">
                  Remunerado
                </Label>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button className="bg-background border text-foreground hover:cursor-pointer hover:bg-background hover:text-muted-foreground">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button onClick={handleSubmit} type="button" disabled={loading}>
                  Adicionar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddActivityModal
