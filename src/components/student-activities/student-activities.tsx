import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import TaskCard from './task-card'

const StudentActivities = () => {
  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <h2 className="text-2xl font-bold ml-1">Atividades:</h2>
      <Separator className="hidden" />
      <div className="flex flex-col gap-5 mt-5">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </ScrollArea>
  )
}

export default StudentActivities
