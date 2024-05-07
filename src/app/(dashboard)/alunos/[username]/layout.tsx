import StudentPageHeader from '@/components/student-page-header'
import { UserSession, authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const getData = async (email: string) => {
  const session = await getServerSession(authOptions)
  const token = (session as UserSession).user.authToken

  try {
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

const StudentLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { username: string }
}>) => {
  const studentData = await getData(`${params.username}@edge.ufal.br`)

  return (
    <div>
      <StudentPageHeader student={studentData} />
      <main className="p-5">{children}</main>
    </div>
  )
}

export default StudentLayout
