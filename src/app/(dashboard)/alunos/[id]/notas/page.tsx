/* eslint-disable @typescript-eslint/no-unused-vars */
import StudentNotas from '@/components/student-notas/student-notas'
import { cookies } from 'next/headers'

interface StudentGradesPageProps {
  params: { id: string }
}

const getDisciplinas = async () => {
  const token = cookies().get('token')?.value

  try {
    const res = await fetch(`http://127.0.0.1:8080/api/v1/subjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['disciplinas-table'], revalidate: 600 },
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }
}

const getNotas = async (email: string) => {
  const token = cookies().get('token')?.value

  try {
    const res = await fetch(`http://127.0.0.1:8080/api/v1/grades/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['disciplinas-table'], revalidate: 600 },
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }
}

const StudentCollegePage = async ({ params }: StudentGradesPageProps) => {
  const email = `${params.id}@edge.ufal.br`

  const notas = await getNotas(email)
  const disciplinas = await getDisciplinas()

  if (!notas || !disciplinas) {
    throw new Error('Erro ao buscar os dados')
  }

  return (
    <div className="flex justify-center">
      <StudentNotas
        notas={notas}
        subjects={disciplinas}
        email={`${params.id}@edge.ufal.br`}
      />
    </div>
  )
}

export default StudentCollegePage
