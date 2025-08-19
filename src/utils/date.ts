import { format, parseISO, differenceInDays, addDays, subDays } from 'date-fns'

export const formatDate = (date: Date | string, dateFormat: string = 'yyyy-MM-dd'): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, dateFormat)
}

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
}

export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate)
}

export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days)
}

export const subtractDaysFromDate = (date: Date, days: number): Date => {
  return subDays(date, days)
}

export const getDateRange = (days: number): { startDate: Date; endDate: Date } => {
  const endDate = new Date()
  const startDate = subtractDaysFromDate(endDate, days)
  return { startDate, endDate }
}