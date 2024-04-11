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
    return (
        <>
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    These are the e-mails typed. Please verify if they are correct before submiting.
                    Invalid e-mails will not be registered.
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
                <Button variant="secondary" type="submit" onClick={props.handleGoBack}>Go back</Button>
                <Button type="submit" onClick={props.handleConfirm}>Confirm</Button>
            </DialogFooter>
        </>
    )

}

function InputDialogContent(props: {
    emails: string,
    error: boolean,
    handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: () => void

}) {
    return (
        <>
            <DialogHeader>
                <div className="flex items-end">
                    <DialogTitle>Register new students</DialogTitle>
                    {
                        props.error ?
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ExclamationTriangleIcon className="ml-2 w-[16px] h-[16px] text-red-500 hover:cursor-pointer leading-0" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={10}>
                                        <p className="bg-red-600 py-2 px-4 rounded">Enter the e-mails in the box below.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            :
                            null
                    }
                </div>

                <DialogDescription>
                    Add new students to the Edge Academy program. Insert below the
                    "@edge.ufal.br" email addresses of the students you want to add
                    separated by commas.
                </DialogDescription>
            </DialogHeader >
            <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="student-group">Turma</Label>
                    <Input type="student-group" id="student-group" placeholder="Identificação da turma" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="admission-date">Data de ingresso</Label>
                    <div className="grid grid-cols-2 gap-x-2.5">
                        <MonthSelect />
                        <YearSelect startingYears={2016} />
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="student-emails" className={`${props.error ? 'text-red-500' : ''}`}>E-mails</Label>
                    <Textarea className={`h-[160px] ${props.error ? 'border-red-500' : ''}`}
                        placeholder="Type the student e-mails here, separated by commas."
                        id="student-emails"
                        value={props.emails}
                        onChange={props.handleTextAreaChange}
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={props.handleSubmit}
                    disabled={props.error}
                    variant={`${props.error ? 'destructive' : 'default'}`}>Submit</Button>
            </DialogFooter>
        </>
    )
}


export function StudentRegisterDialog() {

    const [emails, setEmails] = useState<string>("")
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [validatedEmails, setValidatedEmails] = useState<Array<{ email: string, isValid: boolean }>>([])
    const [error, setError] = useState<boolean>(false)

    function handleDialogOpen(): void {
        // This is necessary to always open the dialog on the input page.
        setShowConfirmation(false)
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

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setError(false)
        setEmails(event.target.value)
    }

    function handleSubmit(): void {
        setError(false)

        if (emails.trim() === "") {
            setError(true)
            return
        }
        setValidatedEmails(validateEmails(emails))
        setShowConfirmation(true)
    }

    function handleGoBack(): void {
        setShowConfirmation(false)
        setError(false)

    }

    function handleConfirm(): void {
        console.log("enviei para o backend")
        console.log(validatedEmails)
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
                    showConfirmation
                        ?
                        <ConfirmationDialogContent
                            validatedEmails={validatedEmails}
                            handleConfirm={handleConfirm}
                            handleGoBack={handleGoBack}
                        />
                        :
                        <InputDialogContent
                            emails={emails}
                            error={error}
                            handleTextAreaChange={handleTextAreaChange}
                            handleSubmit={handleSubmit}
                        />
                }
            </DialogContent>
        </Dialog>
    )
}