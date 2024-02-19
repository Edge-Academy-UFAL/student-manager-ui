import Header from '@/components/header/header'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default DashboardLayout
