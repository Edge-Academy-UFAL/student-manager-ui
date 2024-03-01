/* eslint-disable @typescript-eslint/no-unused-vars */
interface StudentProjectsPageProps {
  params: { id: string }
}

const StudentProjectsPage = ({ params }: StudentProjectsPageProps) => {
  const id = params.id
  return (
    <div>
      <div>
        <h1>StudentProjectsPage</h1>
      </div>
      {id}
    </div>
  )
}

export default StudentProjectsPage
