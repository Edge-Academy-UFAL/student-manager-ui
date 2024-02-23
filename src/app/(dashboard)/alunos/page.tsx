/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTableDemo from '@/components/table'
import { notFound } from 'next/navigation'

const getData = async () => {
  const res = await fetch(`http://localhost:3333/students`, {
    next: {
      revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
    },
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
