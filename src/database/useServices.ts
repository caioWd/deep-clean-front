import { Service } from '@/src/types/services'
import { useSQLiteContext } from "expo-sqlite"

export function useService() {
  const database = useSQLiteContext()

  async function create(data: Omit<Service, "id" | "created_at">) {
    const statement = await database.prepareAsync(`
      INSERT INTO services (
        title,
        description,
        address,
        service_date,
        service_time,
        status,
        created_by,
        client_id,
        operator_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    try {
      await statement.executeAsync([
        data.title,
        data.description ?? null,
        data.address,
        data.service_date,
        data.service_time,
        data.status,
        data.created_by,
        data.client_id,
        data.operator_id ?? null
      ])
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function get() {
    return await database.getAllAsync<Service>(
      "SELECT * FROM services ORDER BY service_date ASC"
    )
  }

  async function getById(id: number) {
    return await database.getFirstAsync<Service>(
      "SELECT * FROM services WHERE id = ?",
      [id]
    )
  }

  async function getByStatus(
    status: Service["status"]
  ) {
    return await database.getAllAsync<Service>(
      "SELECT * FROM services WHERE status = ?",
      [status]
    )
  }

  async function getByClient(clientId: number) {
    return await database.getAllAsync<Service>(
      `
      SELECT *
      FROM services
      WHERE client_id = ?
      ORDER BY service_date ASC
      `,
      [clientId]
    )
  }

  async function getByOperator(
    operatorId: number
  ) {
    return await database.getAllAsync<Service>(
      `
      SELECT *
      FROM services
      WHERE operator_id = ?
      ORDER BY service_date ASC
      `,
      [operatorId]
    )
  }

  async function getPendingServices() {
    return await database.getAllAsync<Service>(
      `
      SELECT *
      FROM services
      WHERE status = 'pending'
      ORDER BY service_date ASC
      `
    )
  }

  async function searchByTitle(title: string) {
    return await database.getAllAsync<Service>(
      `
      SELECT *
      FROM services
      WHERE title LIKE ?
      `,
      [`%${title}%`]
    )
  }

  async function update(
    id: number,
    data: Omit<Service, "id" | "created_at">
  ) {
    const statement = await database.prepareAsync(`
      UPDATE services
      SET
        title = ?,
        description = ?,
        address = ?,
        service_date = ?,
        service_time = ?,
        status = ?,
        created_by = ?,
        client_id = ?,
        operator_id = ?
      WHERE id = ?
    `)

    try {
      await statement.executeAsync([
        data.title,
        data.description ?? null,
        data.address,
        data.service_date,
        data.service_time,
        data.status,
        data.created_by,
        data.client_id,
        data.operator_id ?? null,
        id
      ])
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function updateStatus(
    id: number,
    status: Service["status"]
  ) {
    await database.runAsync(
      `
      UPDATE services
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    )
  }

  async function assignOperator(
    serviceId: number,
    operatorId: number
  ) {
    await database.runAsync(
      `
      UPDATE services
      SET
        operator_id = ?,
        status = 'scheduled'
      WHERE id = ?
      `,
      [operatorId, serviceId]
    )
  }

  async function remove(id: number) {
    await database.runAsync(
      "DELETE FROM services WHERE id = ?",
      [id]
    )
  }


  return {
    create,
    get,
    getById,
    getByStatus,
    getByClient,
    getByOperator,
    getPendingServices,
    searchByTitle,
    update,
    updateStatus,
    assignOperator,
    remove,
  }
}