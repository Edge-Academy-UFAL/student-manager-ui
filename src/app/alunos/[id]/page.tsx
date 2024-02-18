import StudentProfile from '@/components/profile/student-profile'
import { notFound } from 'next/navigation'
interface StudentProfilePageProps {
  params: { id: string }
}

// const getData = async (id: string) => {
//   const res = await fetch(`http://localhost:3000/api/students/${id}`, {
//     cache: 'no-store',
//   })

//   if (!res.ok) {
//     return null
//   }

//   return res.json()
// }

const StudentProfilePage = ({ params }: StudentProfilePageProps) => {
  // const data = getData(params.id)

  // if (!data) {
  //   return notFound();
  // }

  return (
    <div>
      <StudentProfile />
    </div>
  )
}

export default StudentProfilePage
