import StudentPageHeader from '@/components/student-page-header'

const StudentLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <StudentPageHeader />
      {children}
    </div>
  )
}

export default StudentLayout
