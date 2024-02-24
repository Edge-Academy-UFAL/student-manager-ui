import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const StudentProfileHeader = () => {
  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="flex items-center gap-10 px-10 py-10 dark:bg-[#0c0c0c] bg-[#f7f7f7] border-b">
        <Avatar className="h-[190px] w-[190px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
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
              <Link href="https://github.com/rafaelrlc">Perfil</Link>
            </li>
            <Separator orientation="vertical" />

            <li className="hover:decoration-2 hover:underline">
              <Link href="https://github.com/rafaelrlc">Desempenho</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href="https://github.com/rafaelrlc">Atividades</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href="https://github.com/rafaelrlc">Projetos</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href="https://github.com/rafaelrlc">Acadêmico</Link>
            </li>
            <Separator orientation="vertical" />
            <li className="hover:decoration-2 hover:underline">
              <Link href="https://github.com/rafaelrlc">Horários</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentProfileHeader
