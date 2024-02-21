/* eslint-disable @typescript-eslint/no-unused-vars */
import DataTableDemo from '@/components/table'
import { tableData } from '@/lib/utils'

// const getData = async () => {
//   const res = await fetch(`http://localhost:3000/api/students`, {
//     cache: 'no-store', // o ideal é que tenha cache pois os dados não mudam constantemente mas por enquanto vou deixar sem cache
//   })

//   if (!res.ok) {
//     return null
//   }

//   return res.json()
// }

const StudentSearchPage = async () => {
  // const data = await getData()

  // if (!data) {
  //   return notFound()
  // }

  return (
    <div>
      <DataTableDemo data={tableData} />
    </div>
  )
}

export default StudentSearchPage