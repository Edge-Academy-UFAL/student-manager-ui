'use client'

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
import { Upload } from 'lucide-react'
import ReturnButton from './return-button'

export default function SignUp() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <ReturnButton />
      <div className="w-full m-auto lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Cadastro de Aluno
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os campos abaixo para completar seu cadastro
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Adicionar foto</Label>
              <div className="flex flex-col items-center space-y-3 hover:cursor-pointer">
                <div className="w-full  p-12 border-dashed border-2 border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Upload className="w-10 h-10" />
                  <span className="text-xs text-center">
                    Arraste e solte o arquivo aqui ou clique para selecionar
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Cadastrar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
