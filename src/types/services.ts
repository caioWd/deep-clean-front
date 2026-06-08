export interface Service {
  id: number

  title: string
  description?: string

  address: string

  service_date: string
  service_time: string

  status: 'pending' | 'scheduled' | 'finished' | 'canceled'

  created_by: number
  client_id: number
  operator_id?: number | null

  created_at?: string
}