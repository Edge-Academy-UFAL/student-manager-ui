import StudentProfile from '@/components/student-profile/student-profile'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentProfilePageProps {
  params: { id: string }
}

const StudentProfilePage = ({ params }: StudentProfilePageProps) => {
  const id = params.id
  return (
    <div className="p-5">
      <h1>Student Profile</h1>
      {id}
      <StudentProfile />
    </div>
  )
}

export default StudentProfilePage
