/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { revalidateRecordPage } from '@/app/actions'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { getUsername } from '@/lib/utils'
import { Upload } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Student } from '@/lib/domain'

const StudentRecordDialog = ({
  pdfViewerKey,
  setPdfViewerKey,
  studentData,
}: {
  pdfViewerKey: number
  setPdfViewerKey: (src: number) => void
  studentData: Student
}) => {
  const { data } = useSession()

  const [selectedRecord, setSelectedRecord] = useState<File | null>()
  const [canSaveRecord, setCanSaveRecord] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [fileSizeIsBiggestThanMax, setFileSizeIsBiggestThanMax] =
    useState<boolean>(false)
  const [fileTypeIsPdf, setFileTypeIsPdf] = useState<boolean>(true)
  const [inputIsLoaded, setInputIsLoaded] = useState<boolean>(false)

  const { toast } = useToast()

  const MAX_RECORD_DOC_SIZE = 2000000 // 2MB

  const changeModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  // Dá um delay no carregamento do botão de Fazer Upload para evitar bugs de sincronização do script
  // e.g. (clicar e não abrir a janela de enviar arquivo)
  useEffect(() => {
    setTimeout(() => {
      setInputIsLoaded(true)
    }, 1500)
  }, [])

  useEffect(() => {
    setCanSaveRecord(
      !!selectedRecord && !fileSizeIsBiggestThanMax && fileTypeIsPdf,
    )
  }, [selectedRecord, fileSizeIsBiggestThanMax, fileTypeIsPdf])

  const submitHandler = async () => {
    setCanSaveRecord(false)
    const formData = new FormData()
    formData.append('file', selectedRecord as Blob)

    const response = await fetch(
      `${process.env.backendRoute}/api/v1/students/${studentData.email}/record`,
      {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${data?.user.authToken}`,
        },
      },
    )

    if (!response.ok) {
      setError('Não foi possível salvar o histórico')
    } else {
      setError(null)
      setIsSaving(true)
      setSelectedRecord(null)

      const studentResponse = await response.json()
      revalidateRecordPage(getUsername(studentResponse.email)).then(() => {
        setIsSaving(false)
        setModalIsOpen(false)
        setPdfViewerKey(Math.random())
        toast({ description: 'Histórico atualizado.' })
      })
    }

    setCanSaveRecord(true)
  }

  return (
    <Dialog open={modalIsOpen} onOpenChange={changeModal}>
      <DialogTrigger asChild>
        <Button>Atualizar o Histórico</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar o Histórico Acadêmico</DialogTitle>
          {error && (
            <DialogDescription className="text-red-700">
              {error}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            Insira seu histórico acadêmico em formato PDF, com tamanho máximo de
            2MB.
          </div>
          <div className="flex items-center py-2 justify-normal gap-x-2">
            <Button size="lg" disabled={!inputIsLoaded} type="button">
              <input
                type="file"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  setSelectedRecord(e.target.files?.[0] || null)
                  setFileSizeIsBiggestThanMax(
                    !!e.target.files?.[0] &&
                      e.target.files?.[0].size > MAX_RECORD_DOC_SIZE,
                  )
                  setFileTypeIsPdf(
                    !!e.target.files?.[0] &&
                      e.target.files?.[0].type === 'application/pdf',
                  )
                }}
                accept="application/pdf"
              />
              <label
                htmlFor="fileInput"
                className="text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
              >
                <Upload className="mr-2" />
                <span className="whitespace-nowrap">Fazer Upload</span>
              </label>
            </Button>
          </div>
          <div>
            {selectedRecord && (
              <span className="text-muted-foreground text-sm">
                Arquivo enviado: {selectedRecord.name}
              </span>
            )}
          </div>
          <div>
            {isSaving && (
              <span className="text-muted-foreground text-sm">
                Salvando no sistema, aguarde...
              </span>
            )}
          </div>
          <div>
            {fileSizeIsBiggestThanMax && (
              <span className="text-red-700 text-sm">
                Arquivo maior que 2MB, favor enviar um menor.
              </span>
            )}
          </div>
          <div>
            {!fileTypeIsPdf && (
              <span className="text-red-700 text-sm">
                Arquivo é de extensão diferente que PDF, favor enviar um PDF
                válido.
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => {
              submitHandler()
            }}
            disabled={canSaveRecord === false}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StudentRecordDialog
