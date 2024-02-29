import StudentProfile from '@/components/student-profile/student-profile'

/* eslint-disable @typescript-eslint/no-unused-vars */
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
    <div className="p-5">
      <h1>Student Profile</h1>
      <StudentProfile />
    </div>
  )
}

export default StudentProfilePage
