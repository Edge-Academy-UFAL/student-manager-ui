'use client'

import { useState } from 'react'
import StudentRecordDialog from './student-record-dialog'
import StudentRecordFallback from './student-record-fallback'
import { Student } from '@/lib/domain'

const StudentRecord = ({
  studentData,
  pdfSrc,
}: {
  studentData: Student
  pdfSrc: string
}) => {
  // Isso eh utilizado para atualizar o embed toda vez que atualizar o historico
  const [pdfViewerKey, setPdfViewerKey] = useState(Math.random())

  const dateRegex = /\d{4}-\d{2}-\d{2}/
  let updatedAtFormatted = ''

  if (studentData.academicRecordUrl) {
    const updatedAtMatch = studentData.academicRecordUrl.match(dateRegex)

    if (updatedAtMatch) {
      const [year, month, day] = updatedAtMatch[0].split('-')
      // Format the date as DD/MM/YYYY
      updatedAtFormatted = `${day}/${month}/${year}`
    }
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[90vw] w-full flex flex-col px-10 py-5 h-full justify-center">
        <div className="flex flex-row justify-between mb-5 items-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Histórico do Aluno</h2>
            <h3 className="text-muted-foreground">
              Atualizado em: {updatedAtFormatted}
            </h3>
          </div>
          <StudentRecordDialog
            pdfViewerKey={pdfViewerKey}
            setPdfViewerKey={setPdfViewerKey}
            studentData={studentData}
          />
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
            <StudentRecordFallback />
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentRecord
