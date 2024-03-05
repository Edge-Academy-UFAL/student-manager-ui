import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Separator } from './ui/separator'

const StudentPageHeader = ({ id }: { id: string }) => {
  return (
    <div className="">
      <div className="flex items-center gap-10 px-10 py-4 dark:bg-[#0c0c0c] bg-[#f7f7f7] border-b">
        <Avatar className="h-[155px] w-[155px]">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>{id}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-4xl font-bold">Rafael Ribeiro</h1>
            </div>
            <p className="text-sm">Turma 1 • Ingresso Junho de 2024 </p>
          </div>

          <ul className="flex h-5 items-center space-x-4  mt-3">
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/profile'}>Perfil</Link>
            </li>
            <Separator orientation="vertical" />

            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/performance'}>Desempenho</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/activities'}>Atividades</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/projects'}>Projetos</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/college'}>Acadêmico</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href={'/alunos/' + id + '/schedule'}>Horários</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentPageHeader
