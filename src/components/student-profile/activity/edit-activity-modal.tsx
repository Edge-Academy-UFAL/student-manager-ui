import React, { useState } from 'react'

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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CalendarIcon, FilePenLine } from 'lucide-react'

import { editActivity } from '@/lib/functions/http/edit-activity-req'

import { Activity } from '../../../../types/types'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarWithDropdowns } from '@/components/ui/calendar-with-dropdowns'
import { ptBR } from 'date-fns/locale'
import {
  cn,
  formatDateToReadableBRFormat,
  createDateOnCurrentTimezone,
  formatDateToYYYYMMDD,
} from '@/lib/utils'

const ACTIVITY_TYPES = [
  { code: 'RESEARCH', name: 'Pesquisa' },
  { code: 'TUTORING', name: 'Monitoria' },
  { code: 'INTERNSHIP', name: 'Estágio' },
  { code: 'OTHERS', name: 'Outro' },
]

// const formatDate = (dateString: string) => {
//   const [day, month, year] = dateString.split('/')
//   return `${year}-${month}-${day}`
// }

const EditActivityModal = ({
  name,
  activityType,
  description,
  startDate,
  conclusionDate,
  workShift,
  paid,
  onGoing,
  activityId,
}: Activity) => {
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [activityName, setActivityName] = useState(name || '')
  const [activityDescription, setActivityDescription] = useState(
    description || '',
  )
  const [activityWorkShift, setActivityWorkShift] = useState(workShift || '')
  const [type, setType] = useState(activityType || '')
  const [activityStartDate, setActivityStartDate] = useState(startDate || '')
  const [activityEndDate, setActivityEndDate] = useState<string | null>(
    conclusionDate || null,
  )

  const [activityStatusInProgress, setActivityStatusInProgress] = useState(
    onGoing || false,
  )
  const [activityStatusPaid, setActivityStatusPaid] = useState(paid || false)

  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [workShiftError, setWorkShiftError] = useState('')
  const [typeError, setTypeError] = useState('')
  const [startDateError, setStartDateError] = useState('')
  const [endDateError, setEndDateError] = useState('')

  const validate = () => {
    let isValid = true

    // Validalção do nome
    if (activityName.trim() === '') {
      setNameError('Campo obrigatório')
      isValid = false
    } else {
      setNameError('')
    }

    // Validação da descrição
    if (activityDescription.trim() === '') {
      setDescriptionError('Campo obrigatório')
      isValid = false
    } else {
      setDescriptionError('')
    }

    // Validação da dedicação semanal
    if (activityWorkShift.toString().trim() === '') {
      setWorkShiftError('Campo obrigatório')
      isValid = false
    } else {
      setWorkShiftError('')
    }

    // Validação do tipo
    if (
      !ACTIVITY_TYPES.map((activity) => activity.code).includes(type.toString())
    ) {
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
    if (!activityStatusInProgress && activityEndDate === null) {
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
      name: activityName,
      activityId,
      activityType: type,
      description: activityDescription,
      startDate: activityStartDate,
      conclusionDate: activityEndDate ? activityEndDate.slice(0, 10) : null,
      workShift: Number(activityWorkShift),
      paid: activityStatusPaid,
      onGoing: activityStatusInProgress,
    }

    setLoading(true)

    const res = await editActivity(data)

    if (res) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // setar todos os estados para o valor inicial
      setOpen(false)
      toast({
        title: 'Atividade editada com sucesso!',
      })
    } else {
      toast({
        title: 'Erro ao editar atividade.',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }

    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="flex items-center gap-1">
          <FilePenLine
            size={15}
            className="hover:cursor-pointer hover:text-muted-foreground"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div
          key="1"
          className="bg-background border p-6 rounded-lg shadow max-w-lg mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">
            Editar uma atividade extra
          </h3>
          <p className="text-sm text-foreground mb-6">
            Edite a atividade <span className="font-bold">{name} </span>
            utilizando o formulário abaixo. Evite deixar informações
            desatualizadas.
          </p>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="activity-type"
              >
                Tipo da atividade*
              </label>
              <Select
                onValueChange={(
                  value: 'RESEARCH' | 'TUTORING' | 'INTERNSHIP' | 'OTHERS',
                ) => setType(value)}
                defaultValue={type}
              >
                <SelectTrigger id="activity-type">
                  <SelectValue placeholder="Selecione o tipo da atividade" />
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
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
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
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
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
                value={activityWorkShift}
                onChange={(e) => setActivityWorkShift(e.target.value)}
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
                        !activityStartDate && 'text-muted-foreground',
                      )}
                    >
                      {activityStartDate ? (
                        formatDateToReadableBRFormat(
                          new Date(activityStartDate),
                        )
                      ) : (
                        <span>Selecione um data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarWithDropdowns
                      locale={ptBR}
                      defaultMonth={new Date(activityStartDate)}
                      mode="single"
                      selected={createDateOnCurrentTimezone(activityStartDate)}
                      onSelect={(e) =>
                        setActivityStartDate(e ? formatDateToYYYYMMDD(e) : '')
                      }
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
                        !activityEndDate && 'text-muted-foreground',
                      )}
                      disabled={activityStatusInProgress}
                    >
                      {activityEndDate ? (
                        formatDateToReadableBRFormat(new Date(activityEndDate))
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
                        activityEndDate ? new Date(activityEndDate) : new Date()
                      }
                      mode="single"
                      selected={createDateOnCurrentTimezone(activityEndDate)}
                      onSelect={(e) =>
                        setActivityEndDate(e ? formatDateToYYYYMMDD(e) : '')
                      }
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
                  checked={activityStatusInProgress}
                  onCheckedChange={(checked) => {
                    setActivityStatusInProgress(checked)
                    setActivityEndDate(null)
                  }}
                />
                <Label className="ml-2 text-sm" htmlFor="status-in-progress">
                  Em andamento
                </Label>
              </div>
              <div className="flex items-center">
                <Switch
                  id="status-paid"
                  checked={activityStatusPaid}
                  onCheckedChange={(checked) => {
                    setActivityStatusPaid(checked)
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
                  Editar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditActivityModal
