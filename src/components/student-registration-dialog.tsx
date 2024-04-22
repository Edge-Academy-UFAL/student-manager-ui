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
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { PlusIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { MonthSelect, YearSelect } from '@/components/custom-select'
import { LoadingSpinner } from './loading-spinner'
import { getCookie } from 'cookies-next'

interface fromData {
  studentGroup: string
  admissionMonth: string
  admissionYear: string
  emails: string
}

interface BackendResponse {
  failedEmails: Array<string>
  successfulEmails: Array<string>
}

enum DialogPage {
  Input,
  EmailConfirmation,
  BackendResponse,
  Loading,
}

enum BackendResponseType {
  Success,
  InvitationSendingError,
  AnotherError,
}

function validateEmails(
  emails: string,
): Array<{ email: string; isValid: boolean }> {
  const emailArray = emails.split(',').map((email): string => email.trim())
  const emailValidation = []
  for (const email of emailArray) {
    let isValid = true

    // Counts how many times "@edge.ufal.br" appears in a email
    // for the cases where the instructor forgots an comma
    const emailAtCount =
      email.toLowerCase().split('@edge.ufal.br'.toLowerCase()).length - 1
    if (emailAtCount !== 1 || email.includes(' ') || email.includes('\n')) {
      isValid = false
    }
    const obj = { email, isValid }
    emailValidation.push(obj)
  }
  return emailValidation
}

function formDataIsValid(formData: fromData): boolean {
  if (
    formData.emails.trim() === '' ||
    formData.admissionMonth === '' ||
    formData.admissionYear === '' ||
    formData.studentGroup === '' ||
    isNaN(Number(formData.studentGroup)) ||
    Number(formData.studentGroup) <= 0
  ) {
    return false
  }
  return true
}

function InputDialogContent(props: {
  formData: fromData
  error: boolean
  handleFormDataChange: (field: string, value: string) => void
  handleSubmit: () => void
  handleFinalize: () => void
}) {
  const labelColor = props.error ? 'text-red-500' : ''
  const inputColor = props.error ? 'border-red-500' : ''

  return (
    <>
      <DialogHeader>
        <div className="flex items-end">
          <DialogTitle>Registro de novos alunos</DialogTitle>
          {props.error ? (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ExclamationTriangleIcon className="ml-2 w-[16px] h-[16px] text-red-500 hover:cursor-pointer leading-0" />
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10}>
                  <p className="bg-red-600 py-2 px-4 rounded">
                    Preencha os dados faltantes
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>

        <DialogDescription>
          Adicione novos alunos ao programa Edge Academy. Insira abaixo os
          e-mails do Edge separados por vírgula. Insira também o nome da nova
          turma e a data de ingresso.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="student-group" className={`${labelColor}`}>
            Turma
          </Label>
          <Input
            type="number"
            id="student-group"
            placeholder="Identificação da turma"
            value={props.formData.studentGroup}
            className={`${inputColor}`}
            onChange={(event) =>
              props.handleFormDataChange('studentGroup', event.target.value)
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="admission-date" className={`${labelColor}`}>
            Data de ingresso
          </Label>
          <div className="grid grid-cols-2 gap-x-2.5">
            <MonthSelect
              value={props.formData.admissionMonth}
              error={props.error}
              onChange={(value) =>
                props.handleFormDataChange('admissionMonth', value)
              }
            />
            <YearSelect
              value={props.formData.admissionYear}
              startingYears={2016}
              error={props.error}
              onChange={(value) =>
                props.handleFormDataChange('admissionYear', value)
              }
            />
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="student-emails" className={`${labelColor}`}>
            E-mails
          </Label>
          <Textarea
            className={`h-[160px] ${inputColor}`}
            placeholder="Digite os e-mails aqui. Lembre-se de separá-los por vírgulas."
            id="student-emails"
            value={props.formData.emails}
            onChange={(event) =>
              props.handleFormDataChange('emails', event.target.value)
            }
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={props.handleFinalize}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={props.handleSubmit}
          disabled={props.error}
          variant={`${props.error ? 'destructive' : 'default'}`}
        >
          Submeter
        </Button>
      </DialogFooter>
    </>
  )
}

function EmailConfirmationDialogContent(props: {
  validatedEmails: Array<{ email: string; isValid: boolean }>
  handleConfirm: () => void
  handleTryAgain: () => void
}) {
  const invalidEmailCount = props.validatedEmails.filter(
    (email) => !email.isValid,
  ).length
  return (
    <>
      <DialogHeader>
        <DialogTitle>Verifique os e-mails inseridos</DialogTitle>
        <DialogDescription>
          Abaixo estão listados os e-mails inseridos. Verifique se há algum
          problema antes de enviar as mensagens de cadastro. E-mails inválidos
          serão mostrados em vermelho.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Label htmlFor="student-emails">E-mails</Label>
        <ScrollArea className="h-24 w-full rounded-md ">
          {props.validatedEmails.map((email, index) => (
            <Badge
              key={index}
              className="w-full"
              variant={email.isValid ? 'outline' : 'destructive'}
            >
              {email.email}
            </Badge>
          ))}
        </ScrollArea>
      </div>
      <DialogFooter>
        <Button
          variant="secondary"
          type="submit"
          onClick={props.handleTryAgain}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          disabled={invalidEmailCount > 0}
          onClick={props.handleConfirm}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </>
  )
}

function BackendResponseDialogContent(props: {
  handleFinalize: () => void
  handleTryAgain: () => void
  handleTryAgainWithInvalidEmails: (
    invalidEmails: Array<string> | undefined,
  ) => void
  typeOfResponse: BackendResponseType
  responseCode?: string
  invalidEmails?: Array<string>
}) {
  // When a backend problem occours
  if (props.typeOfResponse === BackendResponseType.AnotherError) {
    return (
      <>
        <DialogHeader>
          <div className="flex items-end">
            <DialogTitle>Problemas no envio!</DialogTitle>
          </div>
          <DialogDescription>
            Atenção! Não foi possível completar a operação. Tente novamente.
            <h2 className="text-sm text-muted-foreground py-4">
              Código de erro:
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {props.responseCode ? props.responseCode : 'NULL'}
              </code>
            </h2>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={props.handleFinalize}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={props.handleTryAgain}
          >
            Voltar ao início
          </Button>
        </DialogFooter>
      </>
    )
    // when one or more of the e-mails are no sent
  } else if (
    props.typeOfResponse === BackendResponseType.InvitationSendingError
  ) {
    return (
      <>
        <DialogHeader>
          <div className="flex items-end">
            <DialogTitle>Problemas no envio!</DialogTitle>
          </div>
          <DialogDescription>
            Atenção! Não foi possível enviar um ou mais convites. Os e-mails que
            falharam estão listados abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-1 pt-4">
          <Label htmlFor="student-emails">E-mails inválidos</Label>
          <ScrollArea className="h-36 w-full rounded-md">
            {props.invalidEmails?.map((email, index) => (
              <Badge className="w-full" key={index} variant="destructive">
                {email}
              </Badge>
            ))}
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={props.handleFinalize}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() =>
              props.handleTryAgainWithInvalidEmails(props.invalidEmails)
            }
          >
            Voltar ao início
          </Button>
        </DialogFooter>
      </>
    )
    // when the process finishs successfully
  } else if (props.typeOfResponse === BackendResponseType.Success) {
    return (
      <>
        <DialogHeader>
          <div className="flex items-end">
            <DialogTitle>Convites Enviados!</DialogTitle>
          </div>
          <DialogDescription>
            Os convites foram enviados aos estudantes. Aguarde até que todos
            preencham seus cadastros.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="default"
            onClick={props.handleFinalize}
          >
            Finalizar
          </Button>
        </DialogFooter>
      </>
    )
  }
}

function LoadingDialogContent(props: { title: string; message: string }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.message}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center w-full h-[160px]">
        <LoadingSpinner size={50}></LoadingSpinner>
        <p>Carregando...</p>
      </div>
    </>
  )
}

export function StudentRegistrationDialog() {
  const [formData, setFormData] = useState<fromData>({
    studentGroup: '',
    admissionMonth: '',
    admissionYear: '',
    emails: '',
  })
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [validatedEmails, setValidatedEmails] = useState<
    Array<{ email: string; isValid: boolean }>
  >([])
  const [error, setError] = useState<boolean>(false)
  const [dialogState, _setDialogState] = useState<{
    page: DialogPage
    data: Record<string, unknown>
  }>({
    page: DialogPage.Input,
    data: {},
  })

  function setDialogState(page: DialogPage, data?: Record<string, unknown>) {
    if (data) {
      _setDialogState({ page, data })
    } else {
      _setDialogState({ page, data: {} })
    }
  }

  function handleDialogOpen(): void {
    // This is necessary to remove error indicators when re-opening the dialog.
    setShowDialog(true)
    setError(false)
  }

  function onShowDialogChange(): void {
    // This is necessary, because when the Dialog is closed showDialog
    // is false. So, everytime showDialog tried to change to true, this
    // would trigger and the Dialog would never open.
    showDialog && setShowDialog(false)
  }

  function handleFormDataChange(field: string, value: string): void {
    setError(false)
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }

  function handleSubmit(): void {
    setError(false)

    if (!formDataIsValid(formData)) {
      setError(true)
      return
    }

    setValidatedEmails(validateEmails(formData.emails))
    setDialogState(DialogPage.EmailConfirmation)
  }

  function handleTryAgain() {
    setError(false)
    setValidatedEmails([])
    setDialogState(DialogPage.Input)
  }

  function handleTryAgainWithInvalidEmails(
    invalidEmails: Array<string> | undefined,
  ) {
    if (!invalidEmails) {
      invalidEmails = []
    }
    setError(false)
    handleFormDataChange('emails', invalidEmails.join(', '))
    setValidatedEmails([])
    setDialogState(DialogPage.Input)
  }

  async function handleConfirm() {
    // Set loading state
    setDialogState(DialogPage.Loading, {
      title: 'Enviando convites.',
      message:
        'Os convites estão sendo enviados para os alunos. Por favor, aguarde.',
    })

    // prepare data
    const requestData = {
      emails: validatedEmails.map((email) => email.email),
      entryDate: `${formData.admissionYear}-${formData.admissionMonth.padStart(2, '0')}-01`,
      studentGroup: Number(formData.studentGroup),
    }

    const res = await fetch(`${process.env.backendRoute}/api/v1/register`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify(requestData),
      method: 'POST',
    })

    // Validate response and show appropriate response dialog
    if (res.ok) {
      const data: BackendResponse = (await res.json()) as BackendResponse

      if (data.failedEmails.length === 0) {
        setDialogState(DialogPage.BackendResponse, {
          typeOfResponse: BackendResponseType.Success,
        })
      } else {
        setDialogState(DialogPage.BackendResponse, {
          typeOfResponse: BackendResponseType.InvitationSendingError,
          invalidEmails: data.failedEmails,
        })
      }
    } else {
      setDialogState(DialogPage.BackendResponse, {
        typeOfResponse: BackendResponseType.AnotherError,
        responseCode: res.status,
      })
    }
  }

  function handleFinalize(): void {
    setShowDialog(false)

    setValidatedEmails([])
    setError(false)

    // This is necessary to wait the dialog to close
    // before the dialog is changed. Otherwise, the user
    // sees the dialog change after it clicks to close.
    setTimeout(() => {
      setFormData({
        studentGroup: '',
        admissionMonth: '',
        admissionYear: '',
        emails: '',
      })
      setDialogState(DialogPage.Input)
    }, 100)
  }

  return (
    <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={handleDialogOpen}>
          <PlusIcon />
          <span className="ml-2">Adicionar alunos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {dialogState.page === DialogPage.Input && (
          <InputDialogContent
            formData={formData}
            error={error}
            handleFormDataChange={handleFormDataChange}
            handleSubmit={handleSubmit}
            handleFinalize={handleFinalize}
          />
        )}
        {dialogState.page === DialogPage.EmailConfirmation && (
          <EmailConfirmationDialogContent
            validatedEmails={validatedEmails}
            handleConfirm={handleConfirm}
            handleTryAgain={handleTryAgain}
          />
        )}
        {dialogState.page === DialogPage.BackendResponse && (
          <BackendResponseDialogContent
            handleFinalize={handleFinalize}
            handleTryAgain={handleTryAgain}
            handleTryAgainWithInvalidEmails={handleTryAgainWithInvalidEmails}
            {...(dialogState.data as {
              typeOfResponse: BackendResponseType
              responseCode: string
              invalidEmails: Array<string>
            })}
          />
        )}
        {dialogState.page === DialogPage.Loading && (
          <LoadingDialogContent
            {...(dialogState.data as { title: string; message: string })}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
