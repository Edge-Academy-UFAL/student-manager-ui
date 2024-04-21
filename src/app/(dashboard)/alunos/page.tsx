/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTableDemo from '@/components/table'
import { cookies } from 'next/headers'

const prodURL = `https://json-server-edge-academy.vercel.app/students`
const devURL = `http://localhost:3333/students`

// se quiser testar com dados no localhost basta mudar a url para "devURL" e rodar "pnpm json-server server.json -w -p 3333" no terminal
// lembrar de trocar de volta para a url do "prodURL" antes de fazer o commit para não dar erro no build
const getData = async () => {
  const token = cookies().get('token')?.value

  try {
    const res = await fetch('http://127.0.0.1:8080/api/v1/students', {
      headers: {
        Authorization: `Bearer ${token}`,
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

const StudentSearchPage = async () => {
  const data = await getData()

  if (!data) {
    throw new Error('Erro ao buscar os dados')
  }

  return (
    <div className="flex justify-center">
      <DataTableDemo data={data} />
    </div>
  )
}

export default StudentSearchPage
