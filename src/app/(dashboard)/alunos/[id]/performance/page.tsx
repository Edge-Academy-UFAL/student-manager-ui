/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentPerformancePageProps {
  params: { id: string }
}

const StudentPerformancePage = ({ params }: StudentPerformancePageProps) => {
  const id = params.id
  return (
    <div>
      <div>
        <h1>StudentPerformancePage</h1>
      </div>
      {id}
    </div>
  )
}

export default StudentPerformancePage
