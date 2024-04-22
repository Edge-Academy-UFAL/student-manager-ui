'use client'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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

import {
  CalendarIcon,
  Eye,
  EyeOff,
  ImageIcon,
  MessageCircleQuestion,
  Upload,
} from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'

import { RegisterSchema } from '@/lib/schemas'
import { formatSignUpData } from '@/lib/functions/formatSignUpData'
import { useRouter, useSearchParams } from 'next/navigation'

const SignUpForm = ({ id }: { id: string }) => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  })

  const email = useSearchParams().get('email')

  const { toast } = useToast()
  const { push } = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const submitHandler = async (data: RegisterSchema) => {
    const dataToSend = formatSignUpData(data)

    // enviar os dados para a API

    const formData = new FormData()
    formData.append('name', dataToSend.name)
    formData.append('birthDate', dataToSend.birthdate)
    formData.append('course', dataToSend.course)
    formData.append('file', data.image[0])
    formData.append('registration', dataToSend.registration)
    formData.append('phone', dataToSend.phone)
    formData.append('secondaryPhone', dataToSend.secondaryPhone)
    formData.append('period', dataToSend.period)
    formData.append('entryPeriod', dataToSend.entryPeriod)
    formData.append('password', dataToSend.password)
    formData.append('email', email || '')
    formData.append('activationCode', id)

    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/students', {
        method: 'POST',
        body: formData,
      })

      const status = response.status

      if (response.ok) {
        if (status === 201) {
          toast({
            title: 'Cadastro realizado com sucesso',
            description: 'Seja bem vindo!',
          })

          push('/register/completed')
        }
      }

      if (status >= 400 && status < 500) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer o cadastro',
          description: 'Verifique os campos e tente novamente.',
        })
      }

      if (status >= 500) {
        toast({
          title: 'Não foi possível fazer o cadastro',
          description: 'Tente novamente mais tarde',
        })
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao enviar os dados.',
      })
    }
  }
  return (
    <Form {...form}>
      <form
        className="w-full md:w-[60vw] space-y-7"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="md:grid md:grid-cols-2 gap-5">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo*</FormLabel>
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
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso*</FormLabel>
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
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento*</FormLabel>
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
                        <Calendar
                          locale={ptBR}
                          defaultMonth={new Date(2003, 6)}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
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
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Matrícula*</FormLabel>
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
                  <FormLabel>Telefone*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="(99) 9999-9999"
                      pattern="(\([0-9]{2}\))\s([9]{1})([0-9]{4})-([0-9]{4})"
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
                  <FormLabel>Período Atual*</FormLabel>
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
                      {...field}
                      placeholder="(99) 9999-9999"
                      pattern="(\([0-9]{2}\))\s([9]{1})([0-9]{4})-([0-9]{4})"
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
                  <FormLabel className="flex items-center space-y-2">
                    <span>Ano letivo de Ingreeso*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <MessageCircleQuestion
                            size={20}
                            className="ml-1 pb-[0.40rem] hover:cursor-pointer hover:text-muted-foreground"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Período que o aluno ingressou na unidade acadêmica.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: 2021.1, 2023.2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye size={15} />
                          ) : (
                            <EyeOff size={15} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <Eye size={15} />
                          ) : (
                            <EyeOff size={15} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>{' '}
        </div>

        {/* <Upload de Foto de Perfil /> */}

        <div className=" px-0 flex items-stretch justify-normal gap-x-6">
          {selectedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="rounded-xl w-[100px] h-[100px] shadow-sm object-cover"
            />
          ) : (
            <div className="inline-flex items-center justify-between h-[100px] w-[100px]">
              <div className="p-6 border justify-center items-center flex rounded-xl">
                <ImageIcon size={56} />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <h1 className="font-semibold">Foto de Perfil</h1>
            <div className="text-gray-500 text-xs">
              Insira sua foto de perfil em formato PNG ou JPEG, com tamanho
              máximo de 5MB.
            </div>
            <div className="flex items-center justify-normal gap-x-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button size="lg" type="button">
                        <input
                          type="file"
                          className="hidden"
                          id="fileInput"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files)
                            setSelectedImage(e.target.files?.[0] || null)
                          }}
                          ref={field.ref}
                        />
                        <label
                          htmlFor="fileInput"
                          className="text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                        >
                          <Upload className="mr-2" />
                          <span className="whitespace-nowrap">
                            Fazer Upload
                          </span>
                        </label>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button className="w-full ">Cadastrar</Button>
      </form>
    </Form>
  )
}

export default SignUpForm
