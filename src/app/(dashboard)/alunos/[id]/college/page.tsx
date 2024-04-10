/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentCollegePageProps {
  params: { id: string }
}

const StudentCollegePage = ({ params }: StudentCollegePageProps) => {
  const id = params.id
  return (
    <div>
      <div>
        <h1>Student College</h1>
      </div>
      {id}
    </div>
  )
}

export default StudentCollegePage
