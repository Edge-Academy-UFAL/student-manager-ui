import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { Student } from '@/lib/domain'

function getNameInitials(name: string) {
  const names = name.split(' ')
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
}

const StudentPageHeader = ({ student }: { student: Student }) => {
  function getFormatedEntryDate(entryDate: string): string {
    const entryDateObj: Date = new Date(entryDate)
    const month = entryDateObj.toLocaleString('pt-BR', { month: 'long' })
    return `${month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()} de ${entryDateObj.getFullYear()}`
  }

  return (
    <div className="">
      <div className="flex items-center gap-10 px-10 py-4 dark:bg-[#0c0c0c] bg-[#f7f7f7] border-b">
        <Avatar className="h-[155px] w-[155px]">
          <AvatarImage
            src={
              'http://localhost:4566/student-manager-files/' + student.photoUrl
            }
            alt="student-profile-picture"
          />
          <AvatarFallback>{getNameInitials(student.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-4xl font-bold">{student.name}</h1>
            </div>
            <p className="text-sm">
              Turma {student.studentGroup} • Ingresso{' '}
              {getFormatedEntryDate(student.entryDate)}
            </p>
          </div>

          <ul className="flex h-5 items-center space-x-4  mt-3">
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + student.email + '/profile'}>
                Dados pessoais
              </Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + student.email + '/notas'}>Notas</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentPageHeader
