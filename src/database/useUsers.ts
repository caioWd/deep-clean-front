import { User } from '@/src/types/users'
import { useSQLiteContext } from 'expo-sqlite'

export function useUser() {
  const database = useSQLiteContext()

  async function create(data: Omit<User, 'id'>) {
    const statement = await database.prepareAsync(`
      INSERT INTO users (
        name,
        email,
        password,
        phone,
        description,
        role,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    try {
      await statement.executeAsync([
        data.name,
        data.email,
        data.password ?? null,
        data.phone,
        data.description ?? null,
        data.role,
        data.created_by ?? null
      ])
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function get() {
    return await database.getAllAsync<User>(
      'SELECT * FROM users'
    )
  }

  async function getById(id: number) {
    return await database.getFirstAsync<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    )
  }

  async function getByName(name: string) {
    return await database.getAllAsync<User>(
      'SELECT * FROM users WHERE name = ?',
      [name]
    )
  }

  async function getByEmail(email: string) {
    return await database.getAllAsync<User>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
  }

  async function getByPhone(phone: string) {
    return await database.getAllAsync<User>(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    )
  }

  async function searchByName(name: string) {
    return await database.getAllAsync<User>(
      'SELECT * FROM users WHERE name LIKE ?',
      [`%${name}%`]
    )
  }

  async function getByRole(role: User['role']) {
    return await database.getAllAsync<User>(
      'SELECT * FROM users WHERE role = ?',
      [role]
    )
  }

  async function getClients() {
    return await database.getAllAsync<User>(
      `
      SELECT *
      FROM users
      WHERE role = 'client'
      `
    )
  }

  async function getClientsByOperator(
    operatorId: number
  ) {
    return await database.getAllAsync<User>(
      `
      SELECT *
      FROM users
      WHERE role = 'client'
        AND created_by = ?
      `,
      [operatorId]
    )
  }

  async function getPoolOperators() {
    return await database.getAllAsync<User>(
      `
      SELECT *
      FROM users
      WHERE role = 'pool_operator'
      `
    )
  }

  async function update(
    id: number,
    data: Omit<User, 'id'>
  ) {
    const statement = await database.prepareAsync(`
      UPDATE users
      SET
        name = ?,
        email = ?,
        password = ?,
        phone = ?,
        description = ?,
        role = ?,
        created_by = ?
      WHERE id = ?
    `)

    try {
      await statement.executeAsync([
        data.name,
        data.email,
        data.password ?? null,
        data.phone,
        data.description ?? null,
        data.role,
        data.created_by ?? null,
        id
      ])
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    await database.runAsync(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
  }

  async function login(
    email: string,
    password: string
  ) {
    return await database.getFirstAsync<User>(
      `
      SELECT *
      FROM users
      WHERE email = ?
        AND password = ?
        AND role = 'pool_operator'
      `,
      [email, password]
    )
  }

  async function searchClientsByOperator(
    name: string,
    operatorId: number
  ) {
    return await database.getAllAsync<User>(
      `
    SELECT *
    FROM users
    WHERE role = 'client'
      AND created_by = ?
      AND name LIKE ?
    `,
      [operatorId, `%${name}%`]
    )
  }

  return {
    create,
    get,
    getById,
    getByName,
    getByEmail,
    getByPhone,
    searchByName,
    searchClientsByOperator,
    getByRole,
    getClients,
    getClientsByOperator,
    getPoolOperators,
    update,
    remove,
    login,
  }
}