// Common type definitions used across the application

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  error?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

export interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface Contact {
  phone: string
  email: string
  alternatePhone?: string
}

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  createdBy?: string
  updatedBy?: string
}