import StudentPageHeader from '@/components/student-page-header'

const StudentLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { id: string }
}>) => {
  return (
    <div>
      <StudentPageHeader id={params.id} />
      <main className="p-5">{children}</main>
    </div>
  )
}

export default StudentLayout
