/* eslint-disable @typescript-eslint/no-unused-vars */
import StudentNotas from '@/components/student-notas/student-notas'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
interface StudentGradesPageProps {
  params: { username: string }
}

const getDisciplinas = async () => {
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken
  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/subjects`, {
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
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken

  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/grades/${email}`, {
      method: 'GET',
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
  const email = `${params.username}@edge.ufal.br`

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
        email={`${params.username}@edge.ufal.br`}
      />
    </div>
  )
}

export default StudentCollegePage
