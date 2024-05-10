'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { LoadingSpinner } from '@/components/loading-spinner'
import { useSession } from 'next-auth/react'
import { Settings, CalendarIcon } from 'lucide-react'

import { Dispatch, SetStateAction, useState } from 'react'

import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarWithDropdowns } from '../ui/calendar-with-dropdowns'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn, formatPhone, formatDate } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'

import { z } from 'zod'
import { StudentResponse } from './student-profile'
import { Textarea } from '../ui/textarea'
import { ScrollArea } from '../ui/scroll-area'
import { UserSession } from '@/lib/auth'
import { useToast } from '../ui/use-toast'

interface EditableInfoData {
  about: string | ''
  name: string
  birthDate: Date
  course: 'Ciência da Computação' | 'Engenharia de Computação'
  phone: string
  secondaryPhone: string | ''
  semester: string
  entrySemester: string
  registration: string
}

interface StudentEditRequest {
  name: string
  birthDate: string
  course: string
  registration: string
  phone: string
  secondaryPhone: string
  period: number
  entryPeriod: string
  about: string
}

const EditInfoSchema = z.object({
  about: z
    .string()
    .max(1000, 'Limite seu texto a 1000 caracteres')
    .optional()
    .or(z.literal('')),
  name: z
    .string()
    .min(3, 'Preencha com seu nome completo.')
    .max(30, 'Limite de 30 caracteres atingido')
    .regex(
      /^[a-zA-Z\sáéêíóúãáçÃÁÉÊÍÓÚ]+$/,
      'O nome deve conter apenas letras A-Z a-z, espaços e acentos.',
    ),
  birthDate: z.date(),
  course: z.enum(['Ciência da Computação', 'Engenharia de Computação']),
  phone: z
    .string()
    .min(10, 'Número de telefone inválido.')
    .max(15, 'Número de telefone inválido.')
    .regex(
      /^(\([0-9]{2}\))\s?([9]?)([0-9]{4})-([0-9]{4})$/,
      'Números de telefone válidos são da forma (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX',
    ),
  secondaryPhone: z
    .string()
    .min(10, 'Número de telefone inválido.')
    .max(15, 'Número de telefone inválido.')
    .regex(
      /^(\([0-9]{2}\))\s?([9]?)([0-9]{4})-([0-9]{4})$/,
      'Números de telefone válidos são da forma (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX',
    )
    .optional()
    .or(z.literal('')),
  semester: z.coerce
    .string()
    .min(1, 'Semestre Inválido.')
    .max(10, 'Semestre Inválido.'),
  entrySemester: z.string().refine(
    (value) => {
      const currentYear = new Date().getFullYear()
      const entryYear = parseInt(value.split('.')[0], 10)
      return /^\d{4}\.(1|2)$/.test(value) && entryYear <= currentYear
    },
    {
      message:
        'O ano do período de ingresso não pode ser posterior ao ano atual e deve estar no formato ANO.SEMESTRE_LETIVO (ex: 2020.1, 2020.2, 2024.1, 2024.2)',
    },
  ),
  registration: z.string().refine((value) => /^\d{8}$/.test(value), {
    message: 'Formato de matrícula inválido',
  }),
})

type EditInfoSchema = z.infer<typeof EditInfoSchema>

function formatInfoEditData(data: EditInfoSchema): StudentEditRequest {
  const phone = data.phone.replace(/\D/g, '')
  const secondaryPhone = data.secondaryPhone?.replace(/\D/g, '') ?? ''

  const course =
    data.course === 'Ciência da Computação'
      ? 'COMPUTER_SCIENCE'
      : 'COMPUTER_ENGINEERING'

  const dataToSend: StudentEditRequest = {
    name: data.name,
    birthDate: formatDate(data.birthDate),
    course,
    registration: data.registration,
    phone,
    secondaryPhone,
    period: Number(data.semester),
    entryPeriod: data.entrySemester,
    about: data.about ?? '',
  }

  return dataToSend
}

const EditInfoDialogContent = ({
  form,
}: {
  form: UseFormReturn<EditInfoSchema>
}) => {
  return (
    <Form {...form}>
      <div className="w-full lg:max-w-[46rem] max-h-[60vh] p-1">
        <div className="mb-2 lg:mb-4">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobre mim</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none h-[80px] lg:h-[110px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 gap-8">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal w-full',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Selecione um data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarWithDropdowns
                          locale={ptBR}
                          defaultMonth={field.value}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          captionLayout="dropdown-buttons"
                          fromYear={1980}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o seu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ciência da Computação">
                        Ciência da Computação
                      </SelectItem>
                      <SelectItem value="Engenharia de Computação">
                        Engenharia de Computação
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="registration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Matrícula</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="(99) 99999-9999"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Atual</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o seu período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="secondaryPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Secundário</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="(99) 99999-9999"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="entrySemester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano Letivo de Ingreeso</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: 2021.1, 2023.2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export function StudentInfoEditDialog({
  studentData,
  setStudentData,
}: {
  studentData: StudentResponse
  setStudentData: Dispatch<SetStateAction<StudentResponse | null>>
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { data } = useSession()
  const { toast } = useToast()

  const defaultFormData: EditableInfoData = {
    about: studentData.about,
    name: studentData.name,
    birthDate: new Date(studentData.birthDate),
    course:
      studentData.course === 'COMPUTER_SCIENCE'
        ? 'Ciência da Computação'
        : 'Engenharia de Computação',
    phone: formatPhone(studentData.phone),
    secondaryPhone: formatPhone(studentData.secondaryPhone || ''),
    semester: studentData.period.toString(),
    entrySemester: studentData.entryPeriod,
    registration: studentData.registration,
  }

  const form = useForm<EditInfoSchema>({
    resolver: zodResolver(EditInfoSchema),
    defaultValues: defaultFormData,
  })

  const errors = form.formState.errors

  function handleDialogOpen(): void {
    // This is necessary to remove error indicators when re-opening the dialog.
    setShowDialog(true)
  }

  function onShowDialogChange(): void {
    // This is necessary, because when the Dialog is closed showDialog
    // is false. So, everytime showDialog tried to change to true, this
    // would trigger and the Dialog would never open.
    showDialog && setShowDialog(false)
  }

  const submitHandler = async (formData: EditInfoSchema) => {
    const requestData: StudentEditRequest = formatInfoEditData(formData)

    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = `${process.env.backendRoute}/api/v1/students/${studentData.email}`
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(data as UserSession).user.authToken}`,
        },
        body: JSON.stringify(requestData),
      })
      const status = res.status

      if (res.ok) {
        if (status === 200) {
          setStudentData({ ...studentData, ...requestData })
          setShowDialog(false)

          toast({
            title: 'Informações atualizadas com sucesso',
            description: 'Seus dados foram atuaizados!',
          })
        }
      }

      if (status >= 400 && status < 500) {
        toast({
          variant: 'destructive',
          title: 'Erro ao atualizar seus dados.',
          description: 'Verifique os valores enviados e tente novamente.',
        })
      }

      if (status >= 500) {
        toast({
          title: 'Não foi possível atualizar os seus dados.',
          description: 'Tente novamente mais tarde.',
        })
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao enviar os dados.',
      })
    }

    // This is required to prevent weird ui behavior when closing the modal
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
  }

  return (
    <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={handleDialogOpen}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[46rem]">
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <DialogHeader className="px-1">
            <DialogTitle>Editar informações básicas</DialogTitle>
            <DialogDescription>
              Atualize seu texto de apresentação, dados acadêmicos e outras
              informações pessoais para manter seu perfil correto e atualizado.
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-[160px]">
              <LoadingSpinner size={50}></LoadingSpinner>
              <p>Enviando modificações...</p>
            </div>
          ) : (
            <ScrollArea className="py-3">
              <EditInfoDialogContent form={form} />
            </ScrollArea>
          )}

          <DialogFooter
            className="px-1 sm:flex-col-reverse sm:space-x-0 
                     sm:gap-y-2 lg:flex-row lg:justify-end lg:space-x-2 
                     lg:gap-y-0"
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowDialog(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={Object.keys(errors).length !== 0 || loading}
              variant={`${Object.keys(errors).length !== 0 ? 'destructive' : 'default'}`}
            >
              Editar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
