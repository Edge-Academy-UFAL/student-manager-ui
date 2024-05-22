/* eslint-disable prettier/prettier */
'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import StudentRecord from '@/components/student-record/student-record'


const getStudentData = async (email: string) => {
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  try {
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/students/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 0,
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

const checkPdfIsValid = async (academicRecordUrl : string) => {
  try {
    const res = await fetch(
      `${process.env.awsUrl}/${process.env.awsBucket}/${academicRecordUrl}`,
      {
        method: 'GET',
        next: {
          revalidate: 0,
        },
      },
    )

    if (!res.ok) {
      return false
    }

    return true
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }
}


const StudentCollegeRecordPage = async ({ params }: { params: { username: string } }) => {
	const studentData = await getStudentData(`${params.username}@edge.ufal.br`)
  if (!studentData) {
    throw new Error('Erro ao buscar os dados')
  }

  const pdfSrc = await checkPdfIsValid(studentData.academicRecordUrl) ? `${process.env.awsUrl}/${process.env.awsBucket}/${studentData.academicRecordUrl}` : '' 
  
  
  return <StudentRecord studentData={studentData} pdfSrc={pdfSrc} />
}

export default StudentCollegeRecordPage
