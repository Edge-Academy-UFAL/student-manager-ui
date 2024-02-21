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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

function ContentInputDialog(
    props: {
        open: boolean,
        onOpenChange: (open: boolean) => void,
        studentEmails: string,
        handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
        handleSubmit: () => void
    }

) {
    function handleOpen() {
        props.onOpenChange(true)
    }

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={handleOpen}>
                    <PlusIcon />
                    <span className='ml-2'>Adicionar alunos</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg h-1000">
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
                        value={props.studentEmails}
                        onChange={props.handleChange}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={props.handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ConfirmationDialog(props: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    handleGoBack: () => void,
    handleConfirm: () => void
}) {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent className="sm:max-w-lg h-1000">
                <DialogHeader>
                    <DialogTitle>Você tem certeza?</DialogTitle>
                    <DialogDescription>
                        Add new students to the Edge Academy program. Insert below the
                        "@edge.ufal.br" email addresses of the students you want to add
                        separated by commas.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <span>lalalala</span>
                </div>
                <DialogFooter>
                    <Button type="cancel" onClick={props.handleGoBack}>Go back</Button>
                    <Button type="submit">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// function ConfirmationDialog(
//     props: {
//         emails: Array<{ email: string, isValid: Boolean }>,
//         handleConfirm: () => void,
//         handleGoBack: () => void
//     }
// ) {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="default">
//                     <PlusIcon />
//                     <span className='ml-2'>Adicionar alunos</span>
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-lg h-1000">
//                 <DialogHeader>
//                     <DialogTitle>Register new students</DialogTitle>
//                     <DialogDescription>
//                         Add new students to the Edge Academy program. Insert below the
//                         "@edge.ufal.br" email addresses of the students you want to add
//                         separated by commas.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     {props.emails.map((email, index) => (
//                         <Badge>{email.email}</Badge>
//                     ))}
//                 </div>
//                 <DialogFooter>
//                     <Button type="submit" onClick={props.handleGoBack}>Go back</Button>
//                     <Button type="submit" onClick={props.handleConfirm}>Confirm</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>

//     )
// }

export function StudentRegisterDialog() {

    const [studentEmails, setStudentEmails] = useState<string>("")
    const [showInputDialog, setShowInputDialog] = useState<boolean>(false)
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        // setError(noErrors);
        const { name, value } = event.target;
        setStudentEmails(value)
        // setUserData({ ...userData, [name]: value })
    }

    function validateEmails(emails: string): Array<{ email: string, isValid: Boolean }> {
        const emailArray = emails.split(',')
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

    function handleSubmit() {
        console.log(studentEmails)
        setShowInputDialog(false)
        setShowConfirmationDialog(true)
    }
    function handleConfirm(): void {
    }

    function handleGoBack(): void {
        setShowInputDialog(true)
        setShowConfirmationDialog(false)
        console.log("haahah")
    }

    return (
        <>
            <ContentInputDialog
                open={showInputDialog}
                onOpenChange={setShowInputDialog}
                studentEmails={studentEmails}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <ConfirmationDialog
                open={showConfirmationDialog}
                onOpenChange={setShowConfirmationDialog}
                handleGoBack={handleGoBack}
                handleConfirm={handleConfirm}
            />
        </>
    )
}