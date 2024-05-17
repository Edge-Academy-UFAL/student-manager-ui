import StudentProfile from '@/components/student-profile/student-profile'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

interface StudentProfilePageProps {
  params: { username: string }
}

const fetchStudentData = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.backendRoute}/api/v1/students/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['user-data'], revalidate: 15 },
    },
  )

  if (response.ok) {
    const studentInfos = await response.json()
    studentInfos.about = studentInfos.about || 'Não fornecido!'
    return studentInfos
  } else {
    throw new Error('Erro ao buscar os dados')
  }
}

const StudentProfilePage = async ({ params }: StudentProfilePageProps) => {
  const email = `${params.username}@edge.ufal.br`
  const session = await getServerSession(authOptions)

  const data = await fetchStudentData(email, session?.user.authToken ?? '')

  if (!data) {
    throw new Error('Erro ao buscar os dados')
  }

  return (
    <div className="flex justify-center">
      <StudentProfile username={params.username} studentDataServerSide={data} />
    </div>
  )
}

export default StudentProfilePage
