import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  let day = date.getDate() // Get the day of the month
  let month = date.getMonth() + 1 // Get the month (0-indexed, so add 1)
  const year = date.getFullYear() // Get the year

  // Add leading zeros if day or month is less than 10
  day = day < 10 ? '0' + day : day
  month = month < 10 ? '0' + month : month

  return `${day}-${month}-${year}` // Combine components in dd-mm-yyyy format
}
