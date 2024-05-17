'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import InfoBox from './info-box'
import { enumToStringCourse } from '@/lib/utils'
import { StudentInfoEditDialog } from './student-info-edit-dialog'

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

const StudentProfile = ({
  studentDataServerSide,
}: {
  username: string
  studentDataServerSide: StudentResponse
}) => {
  const [studentData, setStudentData] = useState<StudentResponse | null>(
    studentDataServerSide,
  )

  const { data } = useSession()

  if (!studentData) return <div>Erro ao carregar dados...</div>

  return (
    <div className="w-screen max-w-[92%] mx-4 mt-9">
      <div className="flex flex-row justify-between">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-bold mb-3">Informações básicas</h2>
        </div>
        {studentData.email === data?.user?.email ? (
          <StudentInfoEditDialog
            studentData={studentData}
            setStudentData={setStudentData}
          />
        ) : null}
      </div>
      <div className="flex flex-row gap-5 p-6 rounded-lg border mt-2">
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
