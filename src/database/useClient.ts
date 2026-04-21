import { Client } from '@/src/types/clients'
import { useSQLiteContext } from 'expo-sqlite'

export function useClient() {
  const database = useSQLiteContext()

  async function create(data: Omit<Client, 'id'>) {
    const statement = await database.prepareAsync(
      "INSERT INTO clients (name, email, phone) VALUES ($name, $email, $phone)"
    )
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $email: data.email,
        $phone: data.phone
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function get() {
    try {
      const query = "SELECT * FROM clients"
      const response = await database.getAllAsync<Client>(query)

      return response
    } catch (error) {
      throw error
    }
  }

  async function getById(id: number) {
    try {
      const query = "SELECT * FROM clients WHERE id = ?"
      const response = await database.getFirstAsync<Client>(query, [id])

      return response
    } catch (error) {
      throw error
    }
  }

  async function getByName(name: string) {
    try {
      const query = "SELECT * FROM clients WHERE name = ?"
      const response = await database.getAllAsync<Client>(query, [name])

      return response
    } catch (error) {
      throw error
    }
  }

  async function getByEmail(email: string) {
    try {
      const query = "SELECT * FROM clients WHERE email = ?"
      const response = await database.getAllAsync<Client>(query, [email])

      return response
    } catch (error) {
      throw error
    }
  }

  async function getByPhone(phone: string) {
    try {
      const query = "SELECT * FROM clients WHERE phone = ?"
      const response = await database.getAllAsync<Client>(query, [phone])

      return response
    } catch (error) {
      throw error
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM clients WHERE name LIKE ?"
      const response = await database.getAllAsync<Client>(query, `%${name}%`)

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(id: number, data: Omit<Client, 'id'>) {
    const statement = await database.prepareAsync(
      `
    UPDATE clients
    SET name = $name,
        email = $email,
        phone = $phone
    WHERE id = $id
    `
    )

    try {
      await statement.executeAsync({
        $id: id,
        $name: data.name,
        $email: data.email,
        $phone: data.phone,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      const query = "DELETE FROM clients WHERE id = ?"
      await database.runAsync(query, [id])
    } catch (error) {
      throw error
    }
  }

  return {
    create,
    get,
    getById,
    getByName,
    getByEmail,
    getByPhone,
    searchByName,
    update,
    remove,
  }
}