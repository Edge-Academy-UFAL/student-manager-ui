'use client'

import { useState } from 'react'
import StudentRecordDialog from './student-record-dialog'
import StudentRecordFallback from './student-record-fallback'
import { Student } from '@/lib/domain'
import { useSession } from 'next-auth/react'

const StudentRecord = ({
  studentData,
  pdfSrc,
}: {
  studentData: Student
  pdfSrc: string
}) => {
  // Isso eh utilizado para atualizar o embed toda vez que atualizar o historico
  const [pdfViewerKey, setPdfViewerKey] = useState(Math.random())
  const user = useSession().data?.user
  const isAuthorizedUpdateRecord =
    user?.dtype === 'Student' && user?.email === studentData.email

  const dateRegex = /\d{4}-\d{2}-\d{2}/
  let date = null

  const dateFormat = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'long',
    timeStyle: undefined,
  })

  if (studentData.academicRecordUrl) {
    const updatedAtMatch =
      studentData.academicRecordUrl.match(dateRegex)?.toString() +
      'T00:00:00.000-0300' // ajusta o fuso horário para Brasília
    if (updatedAtMatch) {
      date = new Date(updatedAtMatch)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[90vw] w-full flex flex-col px-10 py-5 h-full justify-center">
        <div className="flex flex-row justify-between mb-5 items-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Histórico do Aluno</h2>
            <h3 className="text-muted-foreground">
              {date && `Atualizado em: ${dateFormat.format(date)}`}
            </h3>
          </div>
          {isAuthorizedUpdateRecord && (
            <StudentRecordDialog
              pdfViewerKey={pdfViewerKey}
              setPdfViewerKey={setPdfViewerKey}
              studentData={studentData}
            />
          )}
        </div>
        <div className="w-full h-full flex flex-col items-center">
          {studentData.academicRecordUrl ? (
            <div className="w-full justify-center flex flex-col items-center">
              {pdfSrc ? (
                <embed
                  className="w-full h-screen"
                  src={pdfSrc}
                  key={pdfViewerKey}
                  type="application/pdf"
                />
              ) : (
                <div className="flex items-start justify-center h-32">
                  <p className="text-center w-[40rem] text-red-700">
                    Se você está vendo esta mensagem ou o seu navegador não tem
                    suporte a visualizar PDF ou o arquivo do histórico do aluno
                    está corrompido.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <StudentRecordFallback
              isAuthorizedUpdateRecord={isAuthorizedUpdateRecord}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentRecord
