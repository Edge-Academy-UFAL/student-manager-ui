export interface Activity {
  name: string
  activityType: 'RESEARCH' | 'OTHER' | 'TUTORING' | 'INTERNSHIP'
  description: string
  startDate: string
  conclusionDate: string | null
  hours: string
  paid: boolean
  onGoing: boolean
  id: string
}
