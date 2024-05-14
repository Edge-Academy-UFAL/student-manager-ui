/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTableDemo from '@/components/table'
import { UserSession, authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const prodURL = `https://json-server-edge-academy.vercel.app/students`
const devURL = `http://localhost:3333/students`

// se quiser testar com dados no localhost basta mudar a url para "devURL" e rodar "pnpm json-server server.json -w -p 3333" no terminal
// lembrar de trocar de volta para a url do "prodURL" antes de fazer o commit para não dar erro no build

const StudentSearchPage = async () => {
  const session = await getServerSession(authOptions)

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.backendRoute}/api/v1/students`, {
        headers: {
          Authorization: `Bearer ${(session as UserSession).user.authToken}`,
        },
        next: {
          revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
        },
      })

      if (!res.ok) {
        return null
      }

      return res.json()
    } catch (error) {
      throw new Error('Erro de conexão com o servidor')
    }
  }

  const studentsData = await getData()

  if (!studentsData) {
    throw new Error('Erro ao buscar os dados')
  }

  return (
    <div className="flex justify-center">
      <DataTableDemo data={studentsData} />
    </div>
  )
}

export default StudentSearchPage
