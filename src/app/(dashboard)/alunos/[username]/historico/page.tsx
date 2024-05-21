/* eslint-disable prettier/prettier */
'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from 'react'
import StudentRecordFallback from '@/components/student-record/student-record-fallback'
import StudentRecord from '@/components/student-record/student-record'
import StudentRecordDialog from '@/components/student-record/student-record-dialog'

const getData = async (email: string) => {
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  try {
    console.log(`${process.env.backendRoute}/api/v1/students/${email}`)
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/students/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 15,
        },
      },
    )

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }
}

const StudentCollegeRecordPage = async ({ params }: { params: { username: string } }) => {
	const studentData = await getData(`${params.username}@edge.ufal.br`)
  if (!studentData) {
    throw new Error('Erro ao buscar os dados')
  }

	const pdfSrc = `${process.env.awsUrl}/${process.env.awsBucket}/${studentData.academicRecordUrl}`;
	
  return (
    <div className='flex justify-center'>
      <div className='max-w-[90vw] w-full flex flex-col px-10 py-5 h-full justify-center'>
        <div className="flex flex-row justify-between my-5">
          <h2 className="text-2xl font-bold">Histórico do Aluno</h2>
          <StudentRecordDialog />
        </div>
        <div className='w-full h-full flex flex-col items-center'>
          { studentData.academicRecordUrl ? 
            ( <StudentRecord pdfSrc={ pdfSrc }/>) :
            ( <StudentRecordFallback /> )
          }
        </div>
      </div>
    </div>   	
  )
}

export default StudentCollegeRecordPage
