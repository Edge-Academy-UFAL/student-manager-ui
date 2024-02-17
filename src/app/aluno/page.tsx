import React from 'react'
import DataTableDemo from '@/components/table'
import { DataTableDemo2 } from '@/components/table2'
import { tableData, Payment } from '@/lib/sample-data'

// const getData = async () => {
//   // const res = await fetch(`http://localhost:5432/student-manager/students`, {
//   //   cache: 'no-store', // o ideal é que tenha cache pois os dados não mudam constantemente mas por enquanto vou deixar sem cache
//   // })
//   // if (!res.ok) {
//   //   return null
//   // }
//   // return res.json()
// }

const StudentSearchPage = () => {
  // const data = getData()

  const data: Payment[] = tableData

  return (
    <div>
      <DataTableDemo data={data} />
    </div>
  )
}

export default StudentSearchPage
