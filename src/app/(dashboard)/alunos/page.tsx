/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTableDemo from '@/components/table'
import { notFound } from 'next/navigation'

const prodURL = `https://json-server-edge-academy.vercel.app/students`
const devURL = `http://localhost:3333/students`

// se quiser testar com dados no localhost basta mudar a url para "devURL" e rodar "pnpm json-server server.json -w -p 3333" no terminal
// lembrar de trocar de volta para a url do "prodURL" antes de fazer o commit para não dar erro no build
const getData = async () => {
  const res = await fetch(prodURL, {
    // next: {
    //   revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
    // },
    cache: 'no-store',
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

const StudentSearchPage = async () => {
  const data = await getData()

  if (!data) {
    return notFound()
  }

  return (
    <div>
      <DataTableDemo data={data} />
    </div>
  )
}

export default StudentSearchPage
