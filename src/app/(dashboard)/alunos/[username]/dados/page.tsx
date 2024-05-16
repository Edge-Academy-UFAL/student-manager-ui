import StudentProfile from '@/components/student-profile/student-profile'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentProfilePageProps {
  params: { username: string }
}

const StudentProfilePage = ({ params }: StudentProfilePageProps) => {
  const email = `${params.username}@edge.ufal.br`

  return (
    <div className="flex justify-center">
      <StudentProfile username={params.username} />
    </div>
  )
}

export default StudentProfilePage
