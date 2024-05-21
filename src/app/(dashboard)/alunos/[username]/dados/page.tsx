import StudentProfile from '@/components/student-profile/student-profile'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { Activity } from '../../../../../../types/types'

const mockActivities: Activity[] = [
  {
    title: 'PIBIC: Teste smells',
    type: {
      code: 'RESEARCH',
      name: 'Pesquisa',
    },
    description:
      'Projeto de iniciação científica com objetivo de desenvolver uma ferramenta para remoção de test smells em testes automatizados escritos em Javascript.',
    startDate: '01/01/2021',
    endDate: '',
    shift: '20',
    payment: true,
    inProgress: true,
  },
  {
    title: 'Laboratório TOCA',
    type: {
      code: 'EXTENSION',
      name: 'Extensão',
    },
    description:
      'Projeto de extensão com objetivo de desenvolver uma ferramenta para remoção de test smells em testes automatizados escritos em Javascript.',
    startDate: '01/01/2021',
    endDate: '',
    shift: '20',
    payment: true,
    inProgress: true,
  },
  {
    title: 'Monitoria de Cálculo 1',
    type: {
      code: 'TUTORING',
      name: 'Monitoria',
    },
    description:
      'Monitoria de cálculo 1 com o objetivo de auxiliar os alunos nas dúvidas e dificuldades encontradas na disciplina.',
    startDate: '01/01/2021',
    endDate: '',
    shift: '20',
    payment: true,
    inProgress: true,
  },
  {
    title: 'Iniciação Científica em IA',
    type: {
      code: 'RESEARCH',
      name: 'Pesquisa',
    },
    description:
      'Projeto de iniciação científica que visa o desenvolvimento de algoritmos de inteligência artificial aplicados à análise de dados biomédicos.',
    startDate: '01/05/2022',
    endDate: '',
    shift: '15',
    payment: true,
    inProgress: true,
  },
  {
    title: 'Oficina de Robótica',
    type: {
      code: 'EXTENSION',
      name: 'Extensão',
    },
    description:
      'Projeto de extensão que promove a aprendizagem de robótica e programação para alunos do ensino fundamental e médio.',
    startDate: '01/06/2022',
    endDate: '01/12/2022',
    shift: '20',
    payment: false,
    inProgress: true,
  },
  {
    title: 'Monitoria de Álgebra Linear',
    type: {
      code: 'TUTORING',
      name: 'Monitoria',
    },
    description:
      'Monitoria de Álgebra Linear destinada a auxiliar os alunos na compreensão de conceitos e resolução de problemas matemáticos complexos.',
    startDate: '01/07/2022',
    endDate: '01/01/2023',
    shift: '18',
    payment: true,
    inProgress: false,
  },
  {
    title: 'Desenvolvimento de Jogos Digitais',
    type: {
      code: 'RESEARCH',
      name: 'Pesquisa',
    },
    description:
      'Monitoria de Programação Estruturada focada em ajudar os alunos a desenvolver habilidades de codificação e resolução de problemas em linguagens como C e Pascal.',
    startDate: '01/08/2022',
    endDate: '01/02/2023',
    shift: '15',
    payment: true,
    inProgress: false,
  },
  {
    title: 'Clube de Leitura e Escrita',
    type: {
      code: 'EXTENSION',
      name: 'Extensão',
    },
    description:
      'Projeto de extensão que incentiva a leitura e a escrita criativa entre os estudantes, com encontros semanais para discussão de livros e produção de textos.',
    startDate: '01/09/2022',
    endDate: '01/06/2023',
    shift: '20',
    payment: false,
    inProgress: false,
  },
  {
    title: 'Monitoria de Programação Estruturada',
    type: {
      code: 'TUTORING',
      name: 'Monitoria',
    },
    description:
      'Monitoria de Programação Estruturada focada em ajudar os alunos a desenvolver habilidades de codificação e resolução de problemas em linguagens como C e Pascal.',
    startDate: '01/10/2022',
    endDate: '01/04/2023',
    shift: '18',
    payment: true,
    inProgress: false,
  },
]

interface StudentProfilePageProps {
  params: { username: string }
}

const fetchStudentData = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.backendRoute}/api/v1/students/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['user-data'], revalidate: 15 },
    },
  )

  if (response.ok) {
    const studentInfos = await response.json()
    studentInfos.about = studentInfos.about || 'Não fornecido!'
    return studentInfos
  } else {
    throw new Error('Erro ao buscar os dados')
  }
}

const StudentProfilePage = async ({ params }: StudentProfilePageProps) => {
  const email = `${params.username}@edge.ufal.br`
  const session = await getServerSession(authOptions)

  const data = await fetchStudentData(email, session?.user.authToken ?? '')

  if (!data) {
    throw new Error('Erro ao buscar os dados')
  }

  return (
    <div className="flex justify-center">
      <StudentProfile
        username={params.username}
        studentInfo={data}
        activities={mockActivities}
      />
    </div>
  )
}

export default StudentProfilePage
