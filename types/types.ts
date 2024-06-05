export interface Activity {
  name: string
  activityType: 'RESEARCH' | 'OTHERS' | 'TUTORING' | 'INTERNSHIP'
  description: string
  startDate: string
  conclusionDate: string | null
  workShift: string
  paid: boolean
  onGoing: boolean
  activityId: string
}
