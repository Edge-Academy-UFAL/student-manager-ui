/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentGradesPageProps {
  params: { username: string }
}

const StudentGradesPage = ({ params }: StudentGradesPageProps) => {
  const email = `${params.username}@edge.ufal.br`

  return (
    <div className="flex items-center justify-center h-full">
      <h1>Notas do aluno</h1>
    </div>
  )
}

export default StudentGradesPage
