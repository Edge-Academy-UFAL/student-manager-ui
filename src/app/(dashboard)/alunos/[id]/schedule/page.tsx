/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentSchedulePageProps {
  params: { id: string }
}

const StudentSchedulePage = ({ params }: StudentSchedulePageProps) => {
  const id = params.id
  return (
    <div>
      <div>
        <h1>StudentSchedulePage</h1>
      </div>
      {id}
    </div>
  )
}

export default StudentSchedulePage
