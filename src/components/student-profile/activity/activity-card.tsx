/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import EditActivityModal from './edit-activity-modal'
import { RemoveActivity } from './remove-activity-modal'
import { Activity } from '../../../../types/types'

export default function ActivityCard({
  title,
  type,
  description,
  startDate,
  endDate,
  shift,
  payment,
  inProgress,
}: Activity) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-2 items-center text-muted-foreground">
            {
              {
                TUTORING: <GraduationCap size={18} />,
                RESEARCH: <FlaskConical size={18} />,
                EXTENSION: <Building size={18} />,
                INTERNSHIP: <Building size={18} />,
              }[type.code]
            }
            <p className="text-sm ">{type.name}</p>
          </div>

          <div className="flex gap-1">
            <EditActivityModal
              title={title}
              type={type}
              description={description}
              startDate={startDate}
              endDate={endDate}
              shift={shift}
              payment={payment}
              inProgress={inProgress}
            />
            <RemoveActivity title="PIBIC: Teste smells" id="234829" />
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="dark:text-white/80 text-black/90">
          <span className="mt-5">{description}</span>
        </CardDescription>
      </CardHeader>
      <Separator className="mb-4" />
      <CardFooter className="block text-muted-foreground h-[30%]">
        <div className="flex flex-col text-sm gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Data de início</span>
            </div>
            <p>{startDate}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              {!inProgress ? (
                <span>Data de finalização</span>
              ) : (
                <span>Em andamento</span>
              )}
            </div>
            <p>{endDate}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Remunerado</span>
            </div>
            {payment ? <p>Sim</p> : <p>Não</p>}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>Dedicação semanal</span>
            </div>
            <p>{shift}h</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
