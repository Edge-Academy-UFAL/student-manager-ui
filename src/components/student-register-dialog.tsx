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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

function validateEmails(emails: string): Array<{ email: string, isValid: Boolean }> {
    const emailArray = emails.split(',').map((email) : string => email.trim())
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
    handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: () => void

}) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Register new students</DialogTitle>
                <DialogDescription>
                    Add new students to the Edge Academy program. Insert below the
                    "@edge.ufal.br" email addresses of the students you want to add
                    separated by commas.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="student-emails">E-mails</Label>
                <Textarea className="h-[160px]"
                    placeholder="Type the student e-mails here, separated by commas."
                    id="student-emails"
                    value={props.emails}
                    onChange={props.handleTextAreaChange}
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={props.handleSubmit}>Submit</Button>
            </DialogFooter>
        </>
    )
}


export function StudentRegisterDialog() {

    const [emails, setEmails] = useState<string>("")
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [validatedEmails, setValidatedEmails] = useState<Array<{ email: string, isValid: Boolean }>>([])

    function handleDialogOpen(): void {
        // This is necessary to always open the dialog on the input page.
        setShowConfirmation(false)
        setShowDialog(true)
    }

    function onShowDialogChange(): void {
        // This is necessary, because when the Dialog is closed showDialog
        // is false. So, everytime showDialog tried to change to true, this
        // would trigger and the Dialog would never open.
        showDialog && setShowDialog(false)
    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEmails(event.target.value)
    }

    function handleSubmit() :void {
        setValidatedEmails(validateEmails(emails))
        setShowConfirmation(true)
    }

    function handleGoBack(): void {
        setShowConfirmation(false)
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
                        handleTextAreaChange={handleTextAreaChange}
                        handleSubmit={handleSubmit}
                    />
                }
            </DialogContent>
        </Dialog>
    )
}