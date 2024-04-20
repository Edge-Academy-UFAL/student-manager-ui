import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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