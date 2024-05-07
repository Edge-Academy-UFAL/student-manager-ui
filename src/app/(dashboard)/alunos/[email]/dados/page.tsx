import StudentProfile from '@/components/student-profile/student-profile'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentProfilePageProps {
  params: { email: string }
}

const StudentProfilePage = ({ params }: StudentProfilePageProps) => {
  const email = params.email

  return (
    <div className="flex justify-center">
      <StudentProfile />
    </div>
  )
}

export default StudentProfilePage
