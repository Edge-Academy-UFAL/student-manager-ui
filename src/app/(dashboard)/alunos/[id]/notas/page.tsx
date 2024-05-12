/* eslint-disable @typescript-eslint/no-unused-vars */
import StudentNotas from '@/components/student-notas/student-notas'
import { cookies } from 'next/headers'

interface StudentCollegePageProps {
  params: { id: string }
}

const getData = async (studentId: string) => {
  const token = cookies().get('token')?.value

  try {
    const res = await fetch('http://127.0.0.1:8080/api/v1/students', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['notas-table'], revalidate: 3600 },
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }
}

const StudentCollegePage = ({ params }: StudentCollegePageProps) => {
  const id = params.id

  // const data = getData(id)

  // if (!data) {
  //   throw new Error('Erro ao buscar os dados')
  // }

  return (
    <div className="flex justify-center">
      <StudentNotas />
    </div>
  )
}

export default StudentCollegePage
