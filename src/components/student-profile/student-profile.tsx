'use client'
import { UserSession } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import InfoBox from './info-box'
import { enumToStringCourse } from '@/lib/utils'
import { StudentInfoEditDialog } from './student-info-edit-dialog'
import { LoadingSpinner } from '../loading-spinner'
export interface StudentResponse {
  name: string
  photoUrl: string
  birthDate: string
  course: string
  registration: string
  phone: string
  secondaryPhone: string | null // Pode ser null caso não tenha sido fornecido
  period: number
  entryPeriod: string
  dtype: string
  email: string
  entryDate: string
  studentGroup: number
  about: string
}

const StudentProfile = ({ username }: { username: string }) => {
  const [studentData, setStudentData] = useState<StudentResponse | null>(null)
  const [isLoading, setLoading] = useState(true)

  const { data } = useSession()

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(
        `${process.env.backendRoute}/api/v1/students/${username}@edge.ufal.br`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${(data as UserSession).user.authToken}`,
          },
        },
      )

      if (response.ok) {
        const studentInfos = await response.json()
        studentInfos.about = studentInfos.about || 'Não fornecido!'
        setStudentData(studentInfos)
        setLoading(false)
      }
    }
    fetchStudentData()
  }, [username, data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <LoadingSpinner size={70}></LoadingSpinner>
      </div>
    )
  }
  if (!studentData) return <div>Erro ao carregar dados...</div>

  return (
    <div className="w-screen max-w-[90%] mx-4 mt-9">
      <div className="flex flex-row justify-between">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-bold">Informações básicas</h2>
        </div>
        {studentData.email === data?.user?.email ? (
          <StudentInfoEditDialog
            studentData={studentData}
            setStudentData={setStudentData}
          />
        ) : null}
      </div>
      <div className="flex flex-row gap-5 p-6 rounded-sm shadow-lg border mt-2">
        <div className="w-[40%]">
          <InfoBox title="Sobre mim" text={studentData.about} />
        </div>
        <div className="w-[60%] flex flex-row justify-evenly">
          <div className="w-[30%]">
            <InfoBox title="Email" text={studentData.email} />
            <InfoBox title="Data de nascimento" text={studentData.birthDate} />
            <InfoBox title="Telefone" text={studentData.phone} />
            <InfoBox
              title="Telefone secundário"
              text={studentData.secondaryPhone || 'Não fornecido'}
            />
          </div>
          <div className="w-[30%]">
            <InfoBox
              title="Curso"
              text={enumToStringCourse(studentData.course)}
            />
            <InfoBox
              title="Número de matrícula"
              text={studentData.registration}
            />
            <InfoBox title="Período" text={`${studentData.period}`} />
            <InfoBox title="Período de entrada" text={studentData.entryDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
