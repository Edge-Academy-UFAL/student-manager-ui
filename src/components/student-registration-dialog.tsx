'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from "@radix-ui/react-tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from "react"
import { MonthSelect, YearSelect } from "@/components/custom-select"

interface fromData {
    studentGroup: string,
    admissionMonth: string,
    admissionYear: string,
    emails: string
}

enum DialogPage {
    Input,
    EmailConfirmation,
    SubmissionMessage
}

function validateEmails(emails: string): Array<{ email: string, isValid: boolean }> {
    const emailArray = emails.split(',').map((email): string => email.trim())
    const emailValidation = []
    for (let email of emailArray) {
        let isValid = true
        if (!email.includes('@edge.ufal.br')) {
            isValid = false
        }
        const obj = { email: email, isValid: isValid }
        emailValidation.push(obj)
    }
    return emailValidation
}

function ConfirmationDialogContent(props: {
    validatedEmails: Array<{ email: string, isValid: Boolean }>,
    handleConfirm: () => void,
    handleGoBack: () => void
}) {
    const invalidEmailCount = props.validatedEmails.filter(email => !email.isValid).length;
    return (
        <>
            <DialogHeader>
                <DialogTitle>Verifique os e-mails inseridos</DialogTitle>
                <DialogDescription>
                    Abaixo estão listados os e-mails inseridos. Verifique se há
                    algum problema antes de enviar as mensagens de cadastro.
                    E-mails inválidos serão mostrados em vermelho.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="student-emails">E-mails</Label>
                <ScrollArea className="h-24 w-full rounded-md ">
                    {props.validatedEmails.map((email, index) => (
                        email.isValid
                            ?
                            <Badge className="w-full">{email.email}</Badge>
                            :
                            <Badge className="w-full" variant="destructive">{email.email}</Badge>
                    ))}
                </ScrollArea>
            </div>
            <DialogFooter>
                <Button variant="secondary" type="submit" onClick={props.handleGoBack}>Voltar</Button>
                <Button type="submit" disabled={invalidEmailCount > 0 ? true : false}
                    onClick={props.handleConfirm}>Confirmar</Button>
            </DialogFooter>
        </>
    )

}

function InputDialogContent(props: {
    formData: fromData,
    error: boolean,
    handleFormDataChange: (field: string, value: any) => void,
    handleSubmit: () => void
}) {

    let labelColor = props.error ? 'text-red-500' : '';
    let inputColor = props.error ? 'border-red-500' : '';

    return (
        <>
            <DialogHeader>
                <div className="flex items-end">
                    <DialogTitle>Registro de novos alunos</DialogTitle>
                    {
                        props.error ?
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ExclamationTriangleIcon className="ml-2 w-[16px] h-[16px] text-red-500 hover:cursor-pointer leading-0" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={10}>
                                        <p className="bg-red-600 py-2 px-4 rounded">Preencha os dados faltantes</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            :
                            null
                    }
                </div>

                <DialogDescription>
                    Adicione novos alunos ao programa Edge Academy. Insira abaixo os e-mails
                    do Edge separados por vírgula. Insira também o nome da nova turma e a data
                    de ingresso.
                </DialogDescription>
            </DialogHeader >
            <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="student-group" className={`${labelColor}`}>Turma</Label>
                    <Input type="student-group" id="student-group" placeholder="Identificação da turma"
                        value={props.formData.studentGroup} className={`${inputColor}`}
                        onChange={event => props.handleFormDataChange("studentGroup", event.target.value)} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="admission-date" className={`${labelColor}`}>Data de ingresso</Label>
                    <div className="grid grid-cols-2 gap-x-2.5">
                        <MonthSelect value={props.formData.admissionMonth} error={props.error}
                            onChange={value => props.handleFormDataChange("admissionMonth", value)} />
                        <YearSelect value={props.formData.admissionYear} startingYears={2016} error={props.error}
                            onChange={value => props.handleFormDataChange("admissionYear", value)} />
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="student-emails" className={`${labelColor}`}>E-mails</Label>
                    <Textarea className={`h-[160px] ${inputColor}`}
                        placeholder="Type the student e-mails here, separated by commas."
                        id="student-emails"
                        value={props.formData.emails}
                        onChange={event => props.handleFormDataChange("emails", event.target.value)}
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button type="submit" onClick={props.handleSubmit}
                    disabled={props.error}
                    variant={`${props.error ? 'destructive' : 'default'}`}>Submeter</Button>
            </DialogFooter>
        </>
    )
}

function SubmissionMessageDialogContent(props: {
    handleFinalize: () => void,
    handleGoBack: () => void
}) {

    const typeOfMessage = 1;

    // When a backend problem occours
    if (typeOfMessage === 0) {
        return (
            <>
                <DialogHeader>
                    <div className="flex items-end">
                        <DialogTitle>Problemas no envio!</DialogTitle>
                    </div>
                    <DialogDescription>
                        Atenção! Não foi possível completar a operação. Tente novamente mais tarde.
                    </DialogDescription>
                </DialogHeader >
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant='secondary'>Cancelar</Button>
                    </DialogClose>
                    <Button type="button" variant='default' onClick={props.handleGoBack}>Voltar</Button>
                </DialogFooter>
            </>
        )
        // when one or more of the e-mails are no sent
    } else if (typeOfMessage === 1) {
        return (
            <>
                <DialogHeader>
                    <div className="flex items-end">
                        <DialogTitle>Problemas no envio!</DialogTitle>
                    </div>
                    <DialogDescription>
                        Atenção! Não foi possível enviar um ou mais convites. Os e-mails que falharam estão listados abaixo.
                    </DialogDescription>
                </DialogHeader >
                <div className="grid gap-4 py-4">
                    vários emails aqui
                    um
                    dois
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant='secondary'>Cancelar</Button>
                    </DialogClose>
                    <Button type="button" variant='default' onClick={props.handleGoBack}>Voltar</Button>
                </DialogFooter>
            </>
        )
        // when the process finishs successfully
    } else if (typeOfMessage === 2) {
        return (<>
            <DialogHeader>
                <div className="flex items-end">
                    <DialogTitle>Convites Enviados!</DialogTitle>
                </div>
                <DialogDescription>
                    Os convites foram enviados aos estudantes. Aguarde até que todos preencham seus cadastros.
                </DialogDescription>
            </DialogHeader >
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant='default' onClick={props.handleFinalize}>Ok</Button>
                </DialogClose>
            </DialogFooter>
        </>)
    }

}

export function StudentRegistrationDialog() {
    const [formData, setFormData] = useState<fromData>({
        studentGroup: '',
        admissionMonth: '',
        admissionYear: '',
        emails: ''
    })
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogPage, setDialogPage] = useState<DialogPage>(DialogPage.Input);
    const [validatedEmails, setValidatedEmails] = useState<Array<{ email: string, isValid: boolean }>>([]);
    const [error, setError] = useState<boolean>(false);

    function handleDialogOpen(): void {
        // This is necessary to always open the dialog on the input page.
        setDialogPage(DialogPage.Input)
        setShowDialog(true)
        setError(false)
        setValidatedEmails([])
    }

    function onShowDialogChange(): void {
        // This is necessary, because when the Dialog is closed showDialog
        // is false. So, everytime showDialog tried to change to true, this
        // would trigger and the Dialog would never open.
        showDialog && setShowDialog(false)
    }

    const handleFormDataChange = (field: string, value: any) => {
        setError(false)
        setFormData(prevState => ({ ...prevState, [field]: value }));
    };

    function formDataIsValid(formData: fromData): boolean {
        if (formData.emails.trim() === "" || formData.admissionMonth === "" ||
            formData.admissionYear === "" || formData.studentGroup === "") {
            setError(true)
            return false
        }
        return true
    }

    function handleSubmit(): void {
        setError(false)

        if (!formDataIsValid(formData)) {
            return
        }

        setValidatedEmails(validateEmails(formData.emails))
        setDialogPage(DialogPage.EmailConfirmation);
    }

    function handleGoBack(): void {
        setDialogPage(DialogPage.Input);
        setError(false)
    }

    function handleConfirm(): void {
        console.log("enviei para o backend")
        console.log(validatedEmails)

        // backend request logic

        setDialogPage(DialogPage.SubmissionMessage)
    }

    function handleFinalize(): void {
        setFormData({
            studentGroup: '',
            admissionMonth: '',
            admissionYear: '',
            emails: ''
        })
        setValidatedEmails([])
        setError(false)
    }

    return (
        <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={handleDialogOpen}>
                    <PlusIcon />
                    <span className='ml-2'>Adicionar alunos</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                {
                    dialogPage === DialogPage.Input &&
                    <InputDialogContent
                        formData={formData}
                        error={error}
                        handleFormDataChange={handleFormDataChange}
                        handleSubmit={handleSubmit}
                    />
                }
                {
                    dialogPage === DialogPage.EmailConfirmation &&
                    <ConfirmationDialogContent
                        validatedEmails={validatedEmails}
                        handleConfirm={handleConfirm}
                        handleGoBack={handleGoBack}
                    />
                }
                {
                    dialogPage === DialogPage.SubmissionMessage &&
                    <SubmissionMessageDialogContent
                        handleFinalize={handleFinalize}
                        handleGoBack={handleGoBack}
                    />
                }
            </DialogContent>
        </Dialog>
    )
}