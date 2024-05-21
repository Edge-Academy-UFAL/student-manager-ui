/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { FilePenLine } from 'lucide-react'

import { editActivity } from '@/lib/functions/http/edit-activity-req'

import { Activity } from '../../../../types/types'

const ACTIVITY_TYPES = [
  { code: 'RESEARCH', name: 'Pesquisa' },
  { code: 'EXTENSION', name: 'Extensão' },
  { code: 'TUTORING', name: 'Monitoria' },
  { code: 'INTERNSHIP', name: 'Estágio' },
]

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}

const EditActivityModal = ({
  title,
  type,
  description,
  startDate,
  endDate,
  shift,
  payment,
  inProgress,
}: Activity) => {
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [activityName, setActivityName] = useState(title || '')
  const [activityDescription, setActivityDescription] = useState(
    description || '',
  )
  const [activityWorkShift, setActivityWorkShift] = useState(shift || '')
  const [activityType, setActivityType] = useState(type.code || 'RESEARCH')
  const [activityStartDate, setActivityStartDate] = useState(
    formatDate(startDate) || '',
  )
  const [activityEndDate, setActivityEndDate] = useState(
    formatDate(endDate) || '',
  )

  const [activityStatusInProgress, setActivityStatusInProgress] = useState(
    inProgress || false,
  )
  const [activityStatusPaid, setActivityStatusPaid] = useState(payment || false)

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
    if (activityWorkShift.trim() === '') {
      setWorkShiftError('Campo obrigatório')
      isValid = false
    } else {
      setWorkShiftError('')
    }

    // Validação do tipo
    if (
      !ACTIVITY_TYPES.map((activity) => activity.code).includes(
        activityType.toString(),
      )
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
    if (!activityStatusInProgress && endDate.trim() === '') {
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
      type: activityType,
      description: activityDescription,
      startDate: activityStartDate,
      endDate: activityEndDate,
      workShift: activityWorkShift,
      payment: activityStatusPaid,
      inProgress: activityStatusInProgress,
    }

    console.log(data)

    // setLoading(true)

    // const res = await editActivity(data)

    // if (res) {
    //   await new Promise((resolve) => setTimeout(resolve, 500))
    //   // setar todos os estados para o valor inicial
    //   setOpen(false)
    //   toast({
    //     title: 'Atividade adicionada com sucesso',
    //   })
    // } else {
    //   toast({
    //     title: 'Erro ao adicionar atividade',
    //     description: 'Tente novamente mais tarde.',
    //     variant: 'destructive',
    //   })
    // }

    // setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="flex items-center gap-1">
          <FilePenLine
            size={15}
            className="hover:cursor-pointer hover:text-muted-foreground"
          />
          {/* <p>Editar</p> */}
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
            Edite a atividade <span className="font-bold">{activityName}</span>
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
                onValueChange={(value) =>
                  setActivityType(
                    value as
                      | 'RESEARCH'
                      | 'EXTENSION'
                      | 'TUTORING'
                      | 'INTERNSHIP',
                  )
                }
                defaultValue={activityType}
              >
                <SelectTrigger id="activity-type">
                  <SelectValue placeholder="Selecione o tipo da atividade" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem value="RESEARCH">Pesquisa</SelectItem>
                    <SelectItem value="EXTENSION">Extensão</SelectItem>
                    <SelectItem value="TUTORING">Monitoria</SelectItem>
                    <SelectItem value="INTERNSHIP">Estágio</SelectItem>
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
                value={description}
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
                <Input
                  id="start-date"
                  placeholder="10/09/2023"
                  type="date"
                  value={activityStartDate}
                  onChange={(e) => setActivityStartDate(e.target.value)}
                />
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
                <Input
                  id="end-date"
                  placeholder="01/10/2024"
                  type="date"
                  value={activityEndDate}
                  onChange={(e) => setActivityEndDate(e.target.value)}
                  disabled={activityStatusInProgress}
                />
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
                    setActivityEndDate('')
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
                <Button onClick={handleSubmit} type="button">
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
