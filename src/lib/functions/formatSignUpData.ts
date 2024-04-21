import { RegisterSchema } from '../schemas'
import { formatDate } from '../utils'

export function formatSignUpData(data: RegisterSchema) {
  // remover caracteres não numéricos dos telefones
  const phone = data.phone.replace(/\D/g, '')
  const secondaryPhone = data.secondaryPhone?.replace(/\D/g, '') ?? ''

  // converter data de nascimento para o formato dd-mm-yyyy
  const birthdate = formatDate(data.birthdate)

  // converter curso para COMPUTER_SCIENCE ou COMPUTER_ENGINEERING
  const course =
    data.course === 'Ciência da Computação'
      ? 'COMPUTER_SCIENCE'
      : 'COMPUTER_ENGINEERING'

  const dataToSend = {
    name: data.name,
    birthdate,
    password: data.password,
    course,
    registration: data.registrationNumber,
    phone,
    secondaryPhone,
    period: data.semester,
    entryPeriod: data.entrySemester,
  }

  return dataToSend
}
