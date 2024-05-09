'use client'

import Link from 'next/link'
import { Separator } from './ui/separator'
import { Student } from '@/lib/domain'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { getUsername } from '@/lib/utils'
import AvatarEditable from './header/avatar-editable'
interface SubpageData {
  name: string
  route: string
  active: boolean
}

const StudentPageHeader = ({ student }: { student: Student }) => {
  const username = getUsername(student.email)

  // Add new subpages here
  const subpages: Array<SubpageData> = [
    { name: 'Dados pessoais', route: 'dados', active: false },
    { name: 'Notas', route: 'notas', active: false },
  ]

  // Gets the current loaded subpage route pathname and sets it as active
  const pathname = usePathname().split('/').at(-1)
  subpages.forEach((part, index) => {
    if (part.route === pathname) {
      subpages[index].active = true
    }
  })

  function getFormatedEntryDate(entryDate: string): string {
    const entryDateObj: Date = new Date(entryDate)
    const month = entryDateObj.toLocaleString('pt-BR', { month: 'long' })
    return `${month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()} de ${entryDateObj.getFullYear()}`
  }

  return (
    <div className="">
      <div className="flex items-center gap-10 px-10 py-4 dark:bg-[#0c0c0c] bg-[#f7f7f7] border-b">
        <AvatarEditable name={student.name} photoUrlProps={student.photoUrl} />
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
            {subpages.map((subpage, index) => (
              <Fragment key={subpage.route}>
                <li className="hover:decoration-2 hover:underline">
                  <Link
                    className={subpage.active ? 'decoration-2 underline' : ''}
                    href={`/alunos/${username}/${subpage.route}`}
                  >
                    {subpage.name}
                  </Link>
                </li>
                {index < subpages.length - 1 ? (
                  <Separator orientation="vertical" key={`sep-${index + 1}`} />
                ) : (
                  ''
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentPageHeader
