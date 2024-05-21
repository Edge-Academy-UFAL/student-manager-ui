export interface ActivityType {
  code: `${'RESEARCH' | 'EXTENSION' | 'TUTORING' | 'INTERNSHIP'}`
  name: `${'Pesquisa' | 'Extensão' | 'Monitoria' | 'Estágio'}`
}

export interface Activity {
  title: string
  type: ActivityType
  description: string
  startDate: string
  endDate: string
  shift: string
  payment: boolean
  inProgress: boolean
}
