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

const rows = [
  {
    id: 1,
    disciplina: 'Matemática',
    code: 'MAT-001',
    carga: '80h',

    periodo: '3',
    nota: '8.0',
    status: 'APROVADO',
  },
  {
    id: 2,
    disciplina: 'Português',
    code: 'POR-001',
    carga: '80h',

    periodo: '3',
    nota: '6.0',
    status: 'REPROVADO',
  },
  {
    id: 3,
    disciplina: 'História',
    code: 'HIS-001',
    carga: '80h',

    periodo: '3',
    nota: '7.0',
    status: 'APROVADO',
  },
  {
    id: 4,
    disciplina: 'Geografia',
    code: 'GEO-001',
    carga: '80h',

    periodo: '3',
    nota: '9.0',
    status: 'CURSANDO',
  },
  {
    id: 5,
    disciplina: 'Inglês',
    code: 'ING-001',
    carga: '80h',

    periodo: '3',
    nota: '10.0',
    status: 'APROVADO',
  },
]

const StudentNotas = () => {
  return (
    <div className="max-w-[90vw] w-full px-10 py-5 justify-center flex flex-col">
      <AddNota />
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
        <TableBody className="w-full h-[300px]">
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.disciplina}</TableCell>
              <TableCell>{row.carga}</TableCell>
              <TableCell>{row.periodo}</TableCell>
              <TableCell>{row.nota}</TableCell>
              <TableCell
                className={`${
                  row.status === 'APROVADO'
                    ? 'text-green-600'
                    : row.status === 'REPROVADO'
                      ? 'text-red-600'
                      : 'text-cyan-600'
                }`}
              >
                {row.status}
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <EditNota
                    id={row.id}
                    nome={row.disciplina}
                    code={row.code}
                    semester={row.periodo}
                    media={row.nota}
                    situacao={row.status}
                  />
                  <RemoveNota
                    id={row.id}
                    nome={row.disciplina}
                    code={row.code}
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
