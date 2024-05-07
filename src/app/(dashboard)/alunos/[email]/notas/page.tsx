/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentGradesPageProps {
  params: { email: string }
}

const StudentGradesPage = ({ params }: StudentGradesPageProps) => {
  const email = params.email

  return (
    <div className="flex items-center justify-center h-full">
      <h1>Notas do aluno</h1>
    </div>
  )
}

export default StudentGradesPage
