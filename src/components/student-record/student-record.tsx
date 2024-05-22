'use client'

import { useState } from "react"
import StudentRecordDialog from "./student-record-dialog"
import StudentRecordFallback from "./student-record-fallback"

const StudentRecord = ({ studentData, pdfSrc }: { studentData: any, pdfSrc: string }) => {
  const [pdfViewerKey, setPdfViewerKey] = useState(Math.random())

  return (
    <div className='flex justify-center'>
      <div className='max-w-[90vw] w-full flex flex-col px-10 py-5 h-full justify-center'>
        <div className="flex flex-row justify-between my-5">
          <h2 className="text-2xl font-bold">Histórico do Aluno</h2>
          <StudentRecordDialog pdfViewerKey={ pdfViewerKey } setPdfViewerKey={ setPdfViewerKey }/>
        </div>
        <div className='w-full h-full flex flex-col items-center'>
          { studentData.academicRecordUrl ? 
            ( <div className="w-full justify-center flex flex-col">
                <embed className="w-full h-screen" src={ pdfSrc } key={ pdfViewerKey } />
              </div>
            ) :
            ( <StudentRecordFallback /> )
          }
        </div>
      </div>
    </div>   
  )
}

export default StudentRecord
