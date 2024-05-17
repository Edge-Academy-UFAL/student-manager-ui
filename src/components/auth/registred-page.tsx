import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ReistredPage = () => {
  return (
    <div className="flex flex-col justify-center items-center md:py-10 h-screen">
      <Card className="md:rounded-xl rounded-none relative">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-center">
            Cadastro Concluído
          </CardTitle>
          <CardDescription className="text-center">
            Seu cadastro foi concluído com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p>Agora você pode acessar a plataforma com seu e-mail e senha.</p>
          </div>
          <Link href="/login" className="w-full mt-2">
            <Button className="w-full" variant="default">
              Acessar a página de login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReistredPage
