/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import StudentIRACharts from '@/components/student-notas/student-ira-charts'
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
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/grades/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['disciplinas-table'], revalidate: 600 },
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

const getIRA = async (email: string) => {
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken
  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/grades/${email}/ira`, {
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

const getGradesAverage = async (email: string) => {
  const session = await getServerSession(authOptions)
  const token = session?.user.authToken
  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/grades/${email}/average`, {
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
  const ira = await getIRA(email)
  const gradesAverage = await getGradesAverage(email)
  const haveNotas = ira.length !== 0

  if (!notas || !disciplinas || !ira || !gradesAverage) {
    throw new Error('Erro ao buscar os dados')
  }


  return (
    <div className="flex flex-col items-center justify-center">
      <StudentNotas
        notas={notas}
        subjects={disciplinas}
        email={`${params.username}@edge.ufal.br`}
      />
      <StudentIRACharts haveNotas={haveNotas} iraList={ira} gradesAverageList={gradesAverage}/>
    </div>
  )
}

export default StudentCollegePage
