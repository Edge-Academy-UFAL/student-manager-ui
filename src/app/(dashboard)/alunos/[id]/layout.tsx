import StudentProfileHeader from '@/components/profile/student-profile'

const StudentLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <StudentProfileHeader />
      {children}
    </div>
  )
}

export default StudentLayout
