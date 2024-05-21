'use server'

import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/auth'
import React from 'react'
import StudentRecordFallback from '@/components/student-record/student-record-fallback'
import StudentRecord from '@/components/student-record/student-record'

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
		<div className='w-full h-full flex flex-col items-center'>
			{ studentData.academicRecordUrl ? 
				( <StudentRecord pdfSrc={ pdfSrc }/>) :
				( <StudentRecordFallback /> )
			}
		</div>
  )
}

export default StudentCollegeRecordPage
