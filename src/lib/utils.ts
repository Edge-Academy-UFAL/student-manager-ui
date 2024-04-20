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

  return `${dayStr}-${monthStr}-${year}` // Combine components in dd-mm-yyyy format
}
