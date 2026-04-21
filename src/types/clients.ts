export interface Client {
  id: number
  name: string
  email: string
  phone: string
  description: string
}

export interface ClientsList {
  clients: Client[]
}