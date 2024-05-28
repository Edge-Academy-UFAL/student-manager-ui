/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '../../ui/button'

import { Trash } from 'lucide-react'

import { useToast } from '../../ui/use-toast'
import { LoadingSpinner } from '../../loading-spinner'

import { removeGrade } from '@/lib/functions/http/remove-nota-req'

import { ToastAction } from '../../ui/toast'
import { addActivity } from '@/lib/functions/http/add-activity-req'

interface RemoveActivityProps {
  title: string
  id: string
}

export const RemoveActivity = ({ title, id }: RemoveActivityProps) => {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const submitHandler = async () => {
    setLoading(true)

    const data = {}

    // setLoading(true)

    // const res = await removeGrade(data)

    // if (!res) {
    //   toast({
    //     title: 'Erro ao remover atividade',
    //     description: 'Tente novamente mais tarde.',
    //     variant: 'destructive',
    //   })
    // } else {
    //   await new Promise((resolve) => setTimeout(resolve, 500))
    //   setOpen(false)

    //   const undoData = {}

    //   toast({
    //     title: `A atividade ${id} - ${title} removida com sucesso.`,
    //     action: (
    //       <ToastAction
    //         altText="Try again"
    //         onClick={() => {
    //           addActivity(undoData)
    //         }}
    //       >
    //         Desfazer
    //       </ToastAction>
    //     ),
    //   })
    // }

    // setLoading(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span className="flex items-center gap-1">
          <Trash
            size={15}
            className="hover:cursor-pointer hover:text-red-600"
          />
          {/* <p>Remover</p> */}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover atividade extra</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja remover a atividade{' '}
            <span className="font-bold underline">{title}</span> da sua lista?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {!loading && <Button onClick={submitHandler}>Remover</Button>}
          {loading && (
            <Button>
              <span>
                <LoadingSpinner size={20} className="animate-spin" />
              </span>
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}