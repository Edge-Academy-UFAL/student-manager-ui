import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const day = date.getDate() // Get the day of the month
  const month = date.getMonth() + 1 // Get the month (0-indexed, so add 1)
  const year = date.getFullYear() // Get the year

  // Convert day and month to strings and add leading zeros if less than 10
  const dayStr = day < 10 ? '0' + day.toString() : day.toString()
  const monthStr = month < 10 ? '0' + month.toString() : month.toString()

  return `${year}-${monthStr}-${dayStr}` // Combine components in dd-mm-yyyy format
}

export function enumToStringCourse(course: string) {
  switch (course) {
    case 'COMPUTER_ENGINEERING':
      return 'Engenharia da Computação'
    case 'COMPUTER_SCIENCE':
      return 'Ciência da Computação'
    default:
      return course
  }
}

// This function gets the text before the @edge.ufal.br
// It is used for routing porpuses
export function getUsername(email: string) {
  return email.split('@')[0]
}

export function getNameInitials(name: string) {
  const names = name.split(' ')
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
}

// TODO: Make it work with both 8 digit numbers and 9 digit numbers
export function formatPhone(phone: string): string {
  if (phone === '') {
    return ''
  }
  if (phone.length === 11) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
  }

  if (phone.length === 10) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`
  }

  return phone
}

export function getMaxSemesterBasedOnCourse(course: string): number {
  return course === 'Engenharia de Computação' ? 15 : 12
}

export function handleLimitRange(
  value: number,
  min: number,
  max: number,
): number {
  if (isNaN(value)) {
    return min
  }
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

export function formatDateToReadableBRFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date)

  const parts = formattedDate.split(' ')
  parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1)

  return parts.join(' ')
}
