'use client'
import { CardTitle, CardHeader, CardFooter, Card } from '@/components/ui/card'

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
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'

import { formatToCompactBRFormat } from '@/lib/utils'

import { useEffect, useRef, useState } from 'react'

interface ExtendedActivity extends Activity {
  studentEmail: string
}

function isTextClamped(el: HTMLElement | null) {
  return !el || el.scrollHeight > el.clientHeight + 10
}

export default function ActivityCard({
  name,
  activityType,
  description,
  startDate,
  conclusionDate,
  workShift,
  paid,
  onGoing,
  activityId,
  studentEmail,
}: ExtendedActivity) {
  const { data } = useSession()
  const descriptionRef = useRef(null)
  const [isClamped, setIsClamped] = useState<boolean>(false)

  useEffect(() => {
    if (isTextClamped(descriptionRef.current)) {
      setIsClamped(true)
    }
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-5 grow">
        <div className="flex justify-between items-center mb-0">
          <div className="flex gap-2 items-center text-muted-foreground">
            {
              {
                TUTORING: (
                  <>
                    <GraduationCap size={18} />{' '}
                    <p className="text-sm ">Monitoria</p>
                  </>
                ),
                RESEARCH: (
                  <>
                    <FlaskConical size={18} />{' '}
                    <p className="text-sm ">Pesquisa</p>
                  </>
                ),
                OTHERS: (
                  <>
                    <Building size={18} /> <p className="text-sm ">Outros</p>
                  </>
                ),
                INTERNSHIP: (
                  <>
                    <Building size={18} /> <p className="text-sm ">Estágio</p>
                  </>
                ),
              }[activityType]
            }
          </div>

          {studentEmail === data?.user?.email ? (
            <div className="flex gap-1">
              <EditActivityModal
                name={name}
                activityType={activityType}
                description={description}
                startDate={startDate}
                conclusionDate={conclusionDate}
                workShift={workShift}
                paid={paid}
                onGoing={onGoing}
                activityId={activityId}
              />
              <RemoveActivity
                studentEmail={studentEmail}
                activityId={activityId}
                title={name}
              />
            </div>
          ) : null}
        </div>
        <CardTitle className="break-words">{name}</CardTitle>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="dark:text-white/80 text-black/90 text-sm mt-auto">
              <p
                ref={descriptionRef}
                className="break-words h-[40px] line-clamp-2 text-muted-foreground"
              >
                {description}
              </p>
            </div>
          </HoverCardTrigger>
          {isClamped && (
            <HoverCardContent className="w-[400px]">
              <p className="dark:text-white/80 text-black/90 text-sm break-words text-muted-foreground">
                {description}
              </p>
            </HoverCardContent>
          )}
        </HoverCard>
      </CardHeader>
      <Separator className="m-0 p-0" />
      <CardFooter className="block text-muted-foreground p-5">
        <div className="flex flex-col text-sm gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Início</span>
            </div>
            <p>{formatToCompactBRFormat(new Date(startDate))}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Finalização</span>
            </div>
            <p>
              {conclusionDate
                ? formatToCompactBRFormat(new Date(conclusionDate))
                : 'Em andamento'}
            </p>
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
            <p>{workShift}h</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
