import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AddNota } from './add-nota'
import { RemoveNota, EditNota } from './edit-nota'
import { DropdownFilters } from './table-filters'

interface Grade {
  name: string
  subjectCode: string
  subjectStatus: string
  studentId: string
  period: number
  finalGrade: number
  workload: string
}

interface Subject {
  code: string
  name: string
  workload: number
}

interface StudentGradesPageProps {
  notas: Grade[]
  subjects: Subject[]
  email: string
}

const StudentNotas = ({ notas, subjects, email }: StudentGradesPageProps) => {
  return (
    <div className="max-w-[90vw] w-full px-10 py-5 justify-center flex flex-col">
      <div className="flex gap-2 justify-end">
        <DropdownFilters />
        <AddNota subjects={subjects} email={email} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-bg">Disciplina</TableHead>
            <TableHead className="font-bold text-bg">Carga Horária</TableHead>
            <TableHead className="font-bold text-bg">Período</TableHead>
            <TableHead className="font-bold text-bg">Média Final</TableHead>
            <TableHead className="font-bold text-bg">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-ful]">
          {notas.map((row) => (
            <TableRow key={row.subjectCode}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.workload}</TableCell>
              <TableCell>{row.period}</TableCell>
              <TableCell>{row.finalGrade}</TableCell>
              <TableCell
                className={`${
                  row.subjectStatus === 'APPROVED'
                    ? 'text-green-600'
                    : row.subjectStatus === 'REPROVED'
                      ? 'text-red-600'
                      : 'text-cyan-600'
                }`}
              >
                {row.subjectStatus}
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <EditNota
                    id={row.subjectCode}
                    nome={row.name}
                    code={row.subjectCode}
                    semester={row.period}
                    media={row.finalGrade}
                    situacao={row.subjectStatus}
                  />
                  <RemoveNota
                    id={row.subjectCode}
                    nome={row.name}
                    code={row.subjectCode}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudentNotas
