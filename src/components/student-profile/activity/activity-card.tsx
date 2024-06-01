'use client'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from '@/components/ui/card'

import {
  FlaskConical,
  GraduationCap,
  Building,
  Timer,
  DollarSign,
  Calendar,
} from 'lucide-react'
import { Separator } from '../../ui/separator'

import EditActivityModal from './edit-activity-modal'
import { RemoveActivity } from './remove-activity-modal'
import { Activity } from '../../../../types/types'

import { useSession } from 'next-auth/react'

interface ExtendedActivity extends Activity {
  studentEmail: string
}

export default function ActivityCard({
  name,
  activityType,
  description,
  startDate,
  conclusionDate,
  hours,
  paid,
  onGoing,
  id,
  studentEmail,
}: ExtendedActivity) {
  const { data } = useSession()
  return (
    <Card>
      <CardHeader className="p-5">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-2 items-center text-muted-foreground">
            {
              {
                TUTORING: <GraduationCap size={18} />,
                RESEARCH: <FlaskConical size={18} />,
                OTHER: <Building size={18} />,
                INTERNSHIP: <Building size={18} />,
              }[activityType]
            }
            <p className="text-sm ">{activityType}</p>
          </div>

          {studentEmail === data?.user?.email ? (
            <div className="flex gap-1">
              <EditActivityModal
                name={name}
                activityType={activityType}
                description={description}
                startDate={startDate}
                conclusionDate={conclusionDate}
                hours={hours}
                paid={paid}
                onGoing={onGoing}
                id={id}
              />
              <RemoveActivity title="PIBIC: Teste smells" id="234829" />
            </div>
          ) : null}
        </div>
        <CardTitle className="break-words">{name}</CardTitle>
        <CardDescription className="dark:text-white/80 text-black/90 dark:hover:bg-[#161616] hover:bg-[#f0f0f0]  hover:cursor-pointer hover:border-2 hover:p-[0.35rem] rounded-xl">
          <span className="mb-2 break-words">
            {description.length > 220
              ? `${description.slice(0, 220)}...` // fazer dialog com a descrição completa
              : description}
          </span>
        </CardDescription>
      </CardHeader>
      <Separator className="mb-4" />
      <CardFooter className="block text-muted-foreground p-5">
        <div className="flex flex-col text-sm gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Início</span>
            </div>
            <p>{startDate}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              {!onGoing ? <span>Finalização</span> : <span>Em andamento</span>}
            </div>
            <p>{conclusionDate}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Remunerado</span>
            </div>
            {paid ? <p>Sim</p> : <p>Não</p>}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Dedicação semanal</span>
            </div>
            <p>{hours}h</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
