'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'

import ReturnButton from './return-button'
import SelectCourse from './select-couse'
import UploadProfilePic from './uploadProfilePic'

import { RegisterSchema } from '@/lib/schemas'

import { Eye, EyeOff } from 'lucide-react'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  })

  const { toast } = useToast()
  // const { push } = useRouter()

  const [course, setCourse] = useState('Ciência da Computação')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const submitHandler = (data: RegisterSchema) => {
    console.log(data)
    toast({
      title: 'Você enviou os seguintes valores:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <ReturnButton />
      <form
        className="w-full m-auto lg:max-w-4xl"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Cadastro de Aluno
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os campos abaixo para completar seu cadastro
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="md:grid md:grid-cols-2 gap-5">
              <div className="grid gap-3">
                <Label>Nome Completo*</Label>
                <Input {...register('name')} />
                <p className="text-red-500 text-xs">{errors?.name?.message}</p>
              </div>
              <div className="grid gap-3">
                <Label>Curso*</Label>
                <SelectCourse course={course} setCourse={setCourse}>
                  <Input {...register('course')} value={course} />
                </SelectCourse>
                <p className="text-red-500 text-xs">
                  {errors?.course?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Data de Nascimento*</Label>
                <Input type="date" {...register('dateOfBirth')} />
                <p className="text-red-500 text-xs">
                  {errors?.dateOfBirth?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Número de matricula*</Label>
                <Input {...register('registrationNumber')} />
                <p className="text-red-500 text-xs">
                  {errors?.registrationNumber?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Telefone*</Label>
                <Input
                  {...register('phoneNumber')}
                  placeholder="(99) 9999-9999"
                  pattern="(\([0-9]{2}\))\s([9]{1})([0-9]{4})-([0-9]{4})"
                />

                <p className="text-red-500 text-xs">
                  {errors?.phoneNumber?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Período*</Label>
                <Input
                  type="number"
                  min="1"
                  max="8"
                  {...register('semester', {
                    setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
                  })}
                />
                <p className="text-red-500 text-xs">
                  {errors?.semester?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Telefone Secundário</Label>
                <Input
                  {...register('secondaryPhoneNumber')}
                  placeholder="(99) 9999-9999"
                  pattern="(\([0-9]{2}\))\s([9]{1})([0-9]{4})-([0-9]{4})"
                />
                <p className="text-red-500 text-xs">
                  {errors?.secondaryPhoneNumber?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Período de Ingresso*</Label>
                <Input
                  {...register('entrySemester')}
                  placeholder="Ex: 2021.1, 2022.2"
                />
                <p className="text-red-500 text-xs">
                  {errors?.entrySemester?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Senha*</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
                <p className="text-red-500 text-xs">
                  {errors?.password?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <Label>Confirmar senha*</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </button>
                </div>
                <p className="text-red-500 text-xs">
                  {errors?.confirmPassword?.message}
                </p>
              </div>{' '}
            </div>
            {/* Ainda falta fazer o upload de foto */}
            <UploadProfilePic />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Cadastrar</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}