'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'

import { enumToStringCourse, formatDateToReadableBRFormat } from '@/lib/utils'
import { StudentInfoEditDialog } from './student-info-edit-dialog'

import ActivityCard from './activity/activity-card'
import InfoBox from './info-box'

import AddActivityModal from './activity/add-activity-modal'

import { Activity } from '../../../types/types'

import { formatPhoneNumber, Value } from 'react-phone-number-input'

export interface StudentInfo {
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
  studentInfo,
  activities,
}: {
  username: string
  studentInfo: StudentInfo
  activities: Activity[]
}) => {
  const [studentData, setStudentData] = useState<StudentInfo | null>(
    studentInfo,
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
      <div className="flex flex-col lg:flex-row p-6 gap-5 rounded-lg border mt-2">
        <div className="basis-1/2">
          <InfoBox title="Sobre mim" text={studentData.about} />
        </div>
        <div className="basis-1/2 flex flex-row justify-between lg:gap-4 md:justify-start lg:justify-evenly">
          <div className="flex flex-col items-start gap-y-1">
            <InfoBox title="E-mail" text={studentData.email} />
            <InfoBox
              title="Data de nascimento"
              text={formatDateToReadableBRFormat(
                new Date(studentData.birthDate),
              )}
            />
            <InfoBox
              title="Telefone"
              text={formatPhoneNumber(`+55${studentData.phone}` as Value)}
            />
            <InfoBox
              title="Telefone secundário"
              text={
                studentData.secondaryPhone
                  ? formatPhoneNumber(
                      `+55${studentData.secondaryPhone}` as Value,
                    )
                  : 'Não fornecido'
              }
            />
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <InfoBox
              title="Curso"
              text={enumToStringCourse(studentData.course)}
            />
            <InfoBox
              title="Número de matrícula"
              text={studentData.registration}
            />
            <InfoBox title="Período" text={`${studentData.period}°`} />
            <InfoBox
              title="Ano letivo de entrada"
              text={studentData.entryPeriod}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Atividades extras</h2>
        {studentData.email === data?.user?.email ? <AddActivityModal /> : null}
      </div>
      <div className="mt-3 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.activityId}
            {...activity}
            studentEmail={studentData.email}
          />
        ))}
      </div>
    </div>
  )
}

export default StudentProfile
