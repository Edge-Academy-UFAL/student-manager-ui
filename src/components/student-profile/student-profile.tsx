/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'

import { enumToStringCourse } from '@/lib/utils'
import { StudentInfoEditDialog } from './student-info-edit-dialog'

import ActivityCard from './activity/activity-card'
import InfoBox from './info-box'

import AddActivityModal from './activity/add-activity-modal'
import EditActivityModal from './activity/edit-activity-modal'

import { Activity } from '../../../types/types'

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
  const [atividades, setAtividades] = useState<Activity[]>(activities)

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
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Atividades extras</h2>
        <AddActivityModal />
      </div>
      <div className="mt-3 grid xl:grid-cols-4 grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
      </div>
    </div>
  )
}

export default StudentProfile
