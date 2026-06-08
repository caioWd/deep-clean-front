export type UserRole =
  | "client"
  | "pool_operator"

export interface User {
  id: number
  name: string
  email: string
  password?: string | null
  phone: string
  description?: string
  role: UserRole
  created_by?: number | null
}